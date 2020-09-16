import { createSlice } from "@reduxjs/toolkit";

const initialState: { [key: string]: any } = {};

export const slice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    deleteEmployee: (state, action) => {
      state = state.filter((employee: any) => employee.id === action.payload);
    },
    setEmployees: (state, action) => {
      for (const employee of action.payload) {
        state[employee?.id] = employee;
      }
    },
    updateEmployee: (state, action) => {
      state[action.payload.id] = action.payload;
    },
  },
});

export const {
  addEmployee,
  deleteEmployee,
  setEmployees,
  updateEmployee,
} = slice.actions;

// Thunks
export const fetchEmployeeList = (args?: any) => {
  const params = args ? `id=${args}` : "";
  return async (dispatch: any) => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/employees${params}`
      ).then((res) => res.json());

      dispatch(setEmployees(result));
    } catch (err) {
      dispatch(setEmployees({}));
    }
  };
};

export const addEmployeeToList = (args: any) => {
  const { id, data } = args;
  return async (dispatch: any) => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/employee/${id}`,
        {
          method: "POST",
          body: data,
        }
      ).then((res) => res.json());

      dispatch(updateEmployee(result));
    } catch (err) {}
  };
};

export const updateEmployeeList = (args: any) => {
  const { id, data } = args;
  return async (dispatch: any) => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/employee/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      ).then((res) => res.json());

      dispatch(updateEmployee(result));
    } catch (err) {}
  };
};

export const deleteEmployeeFromList = (args: any) => {
  const { id } = args;
  return async (dispatch: any) => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/employee/${id}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());

      dispatch(deleteEmployee(id));
    } catch (err) {}
  };
};

// Selectors
export const selectEmployees = (state: any) => state?.employee;

export default slice.reducer;
