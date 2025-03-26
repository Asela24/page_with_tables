import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableItem } from "../types/table";
import { RootState } from "../../../store/store";
import { HOST } from "../../../utils/consts";
import { apiRequestWrapper } from "../../shared/utils/apiRequestWrapper";
import { getRequestConfig } from "../utils/getRequestConfig";

interface TableInfoState {
  isLoading: boolean;
  loadingItemIds: string[];
  data: TableItem[];
  addLoading: boolean;
  error: string | null;
}

const initialState: TableInfoState = {
  isLoading: false,
  loadingItemIds: [],
  addLoading: false,
  data: [],
  error: null,
};

const handleItemPending = (state: TableInfoState, id: string) => {
  state.loadingItemIds.push(id);
  state.error = null;
};

const handleItemFulfilled = (state: TableInfoState, id: string) => {
  state.loadingItemIds = state.loadingItemIds.filter((itemId) => itemId !== id);
};

const handleItemRejected = (
  state: TableInfoState,
  action: { error: { message?: string } },
  id?: string
) => {
  if (id) {
    state.loadingItemIds = state.loadingItemIds.filter(
      (itemId) => itemId !== id
    );
  }
  state.error = action.error.message || "An error occurred";
};

export const fetchTableContent = createAsyncThunk(
  "table/fetchContent",
  async (token: string, { rejectWithValue }) => {
    return apiRequestWrapper({
      url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
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
      url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
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
      url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
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
      url: `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      options: getRequestConfig(token, "POST", data),
      onError: rejectWithValue,
      onSuccess: onSuccess,
    });
    dispatch(fetchTableContent(token));
    return { id, data: response };
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTableContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.sort((a: TableItem, b: TableItem) =>
          a?.id?.localeCompare(b?.id || "")
        );
      })
      .addCase(fetchTableContent.rejected, (state, action) => {
        state.isLoading = false;
        handleItemRejected(state, action);
      });

    builder
      .addCase(removeTableItem.pending, (state, action) => {
        handleItemPending(state, action.meta.arg.id);
      })
      .addCase(removeTableItem.fulfilled, (state, action) => {
        handleItemFulfilled(state, action.payload);
      })
      .addCase(removeTableItem.rejected, (state, action) => {
        handleItemRejected(state, action, action.meta.arg.id);
      });

    builder
      .addCase(addTableItem.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addTableItem.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addTableItem.rejected, (state, action) => {
        state.addLoading = false;
        handleItemRejected(state, action);
      });

    builder
      .addCase(updateTableItem.pending, (state, action) => {
        handleItemPending(state, action.meta.arg.id);
      })
      .addCase(updateTableItem.fulfilled, (state, action) => {
        handleItemFulfilled(state, action.payload.id);
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      })
      .addCase(updateTableItem.rejected, (state, action) => {
        handleItemRejected(state, action, action.meta.arg.id);
      });
  },
});

export const { clearError } = tableSlice.actions;
export const selectTableInfo = (state: RootState) => state.tableInfo;
export const selectIsItemLoading = (state: RootState, id?: string) =>
  id ? state.tableInfo.loadingItemIds.includes(id) : false;
export default tableSlice.reducer;
