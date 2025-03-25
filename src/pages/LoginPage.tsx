import { useSelector } from "react-redux";
import { LoginModal } from "../features/auth/components/LoginModal/LoginModal";
import { selectAuthState } from "../features/auth/slices/authSlice";
import { AlertNotification } from "../features/shared/components/AlertNotification/AlertNotification";

const LoginPage = () => {
  const { error } = useSelector(selectAuthState);
  return (
    <>
      {error && <AlertNotification message={error} severity="error" />}
      <LoginModal />
    </>
  );
};

export default LoginPage;
