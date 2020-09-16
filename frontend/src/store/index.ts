import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import employeeReducer from "./employee";

export default configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});
