import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    role: undefined,
    userId: undefined,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
  },
});

export const { setLoggedIn } = slice.actions;

// Thunk
export const fetchLoginStatus = (args: any) => {
  const { username, password } = args;
  return async (dispatch: any) => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/login?username=${username}&password=${password}`
      ).then((res) => res.json());

      dispatch(setLoggedIn(result?.data));
    } catch (err) {
      dispatch(setLoggedIn({ role: undefined, userId: undefined }));
    }
  };
};

// Selectors
export const selectAuth = (state: any) => state?.auth;

export default slice.reducer;
