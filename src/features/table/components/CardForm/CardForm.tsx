import { SubmitHandler, useForm } from "react-hook-form";
import { TableItem } from "../../types/table";
import { DEFAULT_TABLE_FORM_VALUES } from "../../utils/defaultTableFormValues";
import { ControlledTextField } from "../../../shared/components/ControlledTextField/ControlledTextField";
import { Box, Button, Modal, CircularProgress } from "@mui/material";
import { ControlledDatePicker } from "../../../shared/components/ControlledDatePicker/ControlledDatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  addTableItem,
  selectIsItemLoading,
  selectTableInfo,
  updateTableItem,
} from "../../slices/tablesInfoSlice";
import { AppDispatch, RootState } from "../../../../store/store";
import { useCookies } from "react-cookie";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { tableFormSchema } from "../../utils/tableFormSchema";
import { CustomBox } from "../../../shared/components/CustomBox/CustomBox";

type CreateProps = {
  info?: TableItem;
  type: "create";
  onClose: () => void;
  open: boolean;
};

type UpdateProps = {
  info: TableItem;
  type: "update";
  onClose: () => void;
  open: boolean;
};

type Props = CreateProps | UpdateProps;

export const CardForm = ({ info, type, onClose, open }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { addLoading } = useSelector(selectTableInfo);
  const isItemLoading = useSelector((state: RootState) =>
    selectIsItemLoading(state, info?.id)
  );
  const [cookies] = useCookies(["authToken"]);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: info || DEFAULT_TABLE_FORM_VALUES,
    resolver: zodResolver(tableFormSchema),
  });

  const handleFormSaving: SubmitHandler<TableItem> = async (data) => {
    const dateObject = {
      token: cookies?.authToken,
      data,
      onSuccess: () => {
        onClose();
        reset();
      },
    };

    if (type === "create") {
      await dispatch(addTableItem(dateObject));
    } else if (info?.id) {
      await dispatch(updateTableItem({ id: info.id, ...dateObject }));
    }
  };

  const isLoading = type === "create" ? addLoading : isItemLoading;

  return (
    <Modal open={open} onClose={onClose}>
      <CustomBox>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSaving)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingTop: "8px",
          }}
        >
          <ControlledTextField
            label="Company Signature Name"
            name="companySignatureName"
            control={control}
          />
          <ControlledDatePicker
            control={control}
            name="companySigDate"
            label="Company Signature Date"
          />
          <ControlledTextField
            label="Document Name"
            name="documentName"
            control={control}
          />
          <ControlledTextField
            label="Document Status"
            name="documentStatus"
            control={control}
          />
          <ControlledTextField
            label="Document Type"
            name="documentType"
            control={control}
          />
          <ControlledTextField
            label="Employee Number"
            name="employeeNumber"
            control={control}
          />
          <ControlledTextField
            label="Employee Signature Name"
            name="employeeSignatureName"
            control={control}
          />
          <ControlledDatePicker
            control={control}
            label="Employee Signature Date"
            name="employeeSigDate"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ maxWidth: "150px" }}
            disabled={isLoading}
            loading={isLoading}
          >
            Save
          </Button>
        </Box>
      </CustomBox>
    </Modal>
  );
};
