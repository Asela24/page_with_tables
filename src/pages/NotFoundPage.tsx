import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" component="div" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Page Not Found
      </Typography>
      <Button variant="contained" onClick={handleRedirect}>
        Go to Main Page
      </Button>
    </Box>
  );
};

export default NotFoundPage;
