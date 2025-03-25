import { useState, useEffect } from "react";
import { Snackbar, SnackbarCloseReason, Alert } from "@mui/material";

interface Props {
  message: string | null;
  severity: "error" | "success";
}

export const AlertNotification = ({ message, severity }: Props) => {
  const [open, setOpen] = useState(Boolean(message));

  useEffect(() => {
    setOpen(Boolean(message));
  }, [message]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%", "& .MuiAlert-message": { lineHeight: "1.43" } }}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
