import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, InputAdornment, IconButton, Button } from "@mui/material";
import { ControlledTextField } from "../../../shared/components/ControlledTextField/ControlledTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser, selectAuthState } from "../../slices/authSlice";
import { FormFields } from "../../types/form";
import { DEFAULT_VALUES } from "../../utils/defaultValues";
import { loginFormSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";

export const LoginForm = () => {
  const { loading } = useSelector(selectAuthState);
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, formState: { isDirty } } = useForm<FormFields>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onSubmit",
  });

  const { showPassword, togglePasswordVisibility } =
    useTogglePasswordVisibility();


  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    dispatch(loginUser(data));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        gap: "16px",
        flexDirection: "column",
      }}
    >
      <ControlledTextField name="username" label="Username" control={control} />
      <ControlledTextField
        control={control}
        name="password"
        label="Password"
        textFieldProps={{
          type: showPassword ? "text" : "password",
          helperText: 'Password must have "password" value',
          slotProps: {
            input: {
              autoComplete: "off",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        color="primary"
        sx={{ mt: 2 }}
        loading={loading}
        disabled={!isDirty}
      >
        Login
      </Button>
    </Box>
  );
};
