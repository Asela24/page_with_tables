import { TableInfoState } from "../slices/tablesInfoSlice";

export const handleItemPending = (state: TableInfoState, id: string) => {
  state.loadingItemIds.push(id);
  state.error = null;
};

export const handleItemFulfilled = (state: TableInfoState, id: string) => {
  state.loadingItemIds = state.loadingItemIds.filter((itemId) => itemId !== id);
};

export const handleItemRejected = (
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
