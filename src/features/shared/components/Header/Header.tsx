import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export const Header = () => {
  const [cookies, , removeCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (cookies.authToken) {
      removeCookie("authToken");
    } else {
      navigate("/auth");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Table app
          </Typography>
          <Button
            color="inherit"
            startIcon={<LoginIcon />}
            variant="contained"
            onClick={handleAuthAction}
          >
            {cookies.authToken ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
