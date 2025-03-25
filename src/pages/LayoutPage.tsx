import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router";
import { Header } from "../features/shared/components/Header/Header";

const LayoutPage = () => {
  const [cookies] = useCookies(["authToken"]);
  const navigation = useNavigate();
  useEffect(() => {
    if (!cookies.authToken) {
      navigation("/auth");
      return;
    }

    navigation("/table");
  }, [cookies.authToken, navigation]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutPage;
