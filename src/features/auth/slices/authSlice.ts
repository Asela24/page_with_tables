import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

import { FormFields } from "../types/form";
import { apiRequestWrapper } from "../../shared/utils/apiRequestWrapper";
import { Cookies } from "react-cookie";
import { HOST } from "../../../utils/consts";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userInfo: FormFields, { rejectWithValue }) => {
    const config = {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await apiRequestWrapper({
      url: `${HOST}/ru/data/v3/testmethods/docs/login`,
      onError: rejectWithValue,
      onSuccess: (data: unknown) => {
        const cookies = new Cookies();
        const responseData = data as { token: string };
        cookies.set("authToken", responseData.token, { path: "/" });
      },
      options: config,
    });

    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
