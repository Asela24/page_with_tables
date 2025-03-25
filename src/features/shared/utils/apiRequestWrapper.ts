export const apiRequestWrapper = async ({
  url,
  onError,
  onSuccess,
  options,
}: {
  url: string;
  onError: (value: unknown) => void;
  onSuccess?: <T>(data: T) => void;
  options?: RequestInit;
}) => {
  try {
    const response = await fetch(url, options);

    const { data, error_text, error_code, error_message } =
      await response.json();

    if (!response.ok || error_code !== 0) {
      throw new Error(error_text || error_message);
    }

    onSuccess?.(data);
    return data;
  } catch (error) {
    if (error) {
      return onError(String(error));
    } else {
      return onError("An unknown error occurred");
    }
  }
};
