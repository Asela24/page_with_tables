import { Button } from "@mui/material";
import { useState } from "react";
import { CardForm } from "../CardForm/CardForm";
import { TableItem } from "../../types/table";

type Props = {
  buttonLabel: string;
  item?: TableItem;
};

export const CardFormModal = ({ buttonLabel, item }: Props) => {
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
      >
        {buttonLabel}
      </Button>
      <CardForm
        open={open}
        info={item}
        type="create"
        onClose={handleClose}
        key={formKey}
      />
    </>
  );
};
