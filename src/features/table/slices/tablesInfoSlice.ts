import { createSlice } from "@reduxjs/toolkit";
import { TableItem } from "../types/table";
import { RootState } from "../../../store/store";
import { handleItemRejected, handleItemPending, handleItemFulfilled } from "../utils/actionHelpers";
import { fetchTableContent, removeTableItem, addTableItem, updateTableItem } from "./asyncThunkActions";

export interface TableInfoState {
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
