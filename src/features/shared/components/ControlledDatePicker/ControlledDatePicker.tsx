import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: keyof T;
  label: string;
} & UseControllerProps<T>;

export const ControlledDatePicker = <T extends FieldValues>({
  control,
  label,
  name,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label={label}
              onChange={(newValue) =>
                onChange(newValue ? newValue.toISOString() : null)
              }
              value={value ? dayjs(value) : null}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message ? error.message : undefined,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};
