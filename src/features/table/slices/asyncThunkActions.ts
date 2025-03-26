import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOST } from "../../../utils/consts";
import { apiRequestWrapper } from "../../shared/utils/apiRequestWrapper";
import { TableItem } from "../types/table";
import { getRequestConfig } from "../utils/getRequestConfig";

const BASE = "ru/data/v3/testmethods/docs/userdocs";

export const fetchTableContent = createAsyncThunk(
  "table/fetchContent",
  async (token: string, { rejectWithValue }) => {
    return apiRequestWrapper({
      url: `${HOST}/${BASE}/get`,
      options: getRequestConfig(token),
      onError: rejectWithValue,
    });
  }
);

export const removeTableItem = createAsyncThunk(
  "table/removeItem",
  async (
    { id, token }: { id: string; token: string },
    { dispatch, rejectWithValue }
  ) => {
    await apiRequestWrapper({
      url: `${HOST}/${BASE}delete/${id}`,
      options: getRequestConfig(token, "DELETE"),
      onError: rejectWithValue,
      onSuccess: () => dispatch(fetchTableContent(token)),
    });
    return id;
  }
);

export const addTableItem = createAsyncThunk(
  "table/addItem",
  async (
    {
      token,
      data,
      onSuccess,
    }: { token: string; data: Omit<TableItem, "id">; onSuccess?: () => void },
    { dispatch, rejectWithValue }
  ) => {
    const response = await apiRequestWrapper({
      url: `${HOST}/${BASE}/create`,
      options: getRequestConfig(token, "POST", data),
      onError: rejectWithValue,
    });
    onSuccess?.();
    dispatch(fetchTableContent(token));
    return response;
  }
);

export const updateTableItem = createAsyncThunk(
  "table/updateItem",
  async (
    {
      id,
      token,
      data,
      onSuccess,
    }: { id: string; token: string; data: TableItem; onSuccess: () => void },
    { dispatch, rejectWithValue }
  ) => {
    const response = await apiRequestWrapper({
      url: `${HOST}/${BASE}/set/${id}`,
      options: getRequestConfig(token, "POST", data),
      onError: rejectWithValue,
      onSuccess: onSuccess,
    });
    dispatch(fetchTableContent(token));
    return { id, data: response };
  }
);
