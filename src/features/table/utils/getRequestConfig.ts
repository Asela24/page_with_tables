export const getRequestConfig = <T>(
  token: string,
  method: string = "GET",
  data?: T
) => ({
  method,
  headers: {
    "X-Auth": token,
    "Content-Type": "application/json",
  },
  ...(data && { body: JSON.stringify(data) }),
});