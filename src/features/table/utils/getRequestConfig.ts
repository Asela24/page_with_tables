import { TableItem } from "../types/table";

export const getRequestConfig = (
  token: string,
  method: string = "GET",
  data?: TableItem
) => ({
  method,
  headers: {
    "X-Auth": token,
    "Content-Type": "application/json",
  },
  ...(data && { body: JSON.stringify(data) }),
});