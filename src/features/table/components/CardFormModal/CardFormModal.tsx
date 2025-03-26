import { Button } from "@mui/material";
import { useState } from "react";
import { CardForm } from "../CardForm/CardForm";
import { TableItem } from "../../types/table";
import { TableActionType } from "../../types/tableActionType";

type Props = {
  buttonLabel: string;
  type: TableActionType;
  info?: TableItem;
  loading?: boolean;
};

export const CardFormModal = ({ buttonLabel, info, type, loading }: Props) => {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleClose = () => {
    setOpen(false);
    setFormKey((key) => key + 1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="info"
        size="small"
        onClick={handleOpen}
        loading={loading}
        disabled={loading}
      >
        {buttonLabel}
      </Button>
      <CardForm
        open={open}
        info={info}
        type={type}
        onClose={handleClose}
        key={formKey}
      />
    </>
  );
};
