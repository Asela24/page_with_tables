import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const NoCardsMessage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" color="textSecondary">
        There are no cards available.
      </Typography>
    </Box>
  );
};
