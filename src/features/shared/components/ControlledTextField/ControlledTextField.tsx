import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: keyof T;
  label: string;
  textFieldProps?: TextFieldProps;
} & UseControllerProps<T>;

export const ControlledTextField = <T extends FieldValues>({
  name,
  label,
  textFieldProps,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      {...rest}
      name={name}
      control={rest.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            {...textFieldProps}
            fullWidth
            margin="normal"
            size="small"
            onChange={onChange}
            value={value}
            error={!!error}
            helperText={!error ? textFieldProps?.helperText : error.message}
            label={label}
            variant="outlined"
            sx={{
              margin: "0",
            }}
          />
        );
      }}
    />
  );
};
