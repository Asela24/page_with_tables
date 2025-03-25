import { Modal, Typography } from "@mui/material";
import { LoginForm } from "../LoginForm/LoginForm";
import { CustomBox } from "../../../shared/components/CustomBox/CustomBox";

export const LoginModal = () => {
  return (
    <Modal open={true} disableAutoFocus>
      <CustomBox>
        <Typography variant="h6" align="center" gutterBottom>
          Please Login
        </Typography>
        <LoginForm />
      </CustomBox>
    </Modal>
  );
};
