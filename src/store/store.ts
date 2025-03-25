import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import tableInfoReducer from "../features/table/slices/tablesInfoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tableInfo: tableInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
