import { TableRow as BaseTableRow, TableCell } from "@mui/material";

type Props = {
  label: string;
  value: string;
};

export const TableRow = ({ label, value }: Props) => {
  return (
    <BaseTableRow>
      <TableCell sx={{ fontWeight: "600" }}>{label}</TableCell>
      <TableCell
        align="right"
        sx={{
          wordWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
      >
        {value}
      </TableCell>
    </BaseTableRow>
  );
};
