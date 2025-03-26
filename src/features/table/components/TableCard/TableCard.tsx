import {
  Button,
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { TableItem as TableItemType } from "../../types/table";
import { TableRow } from "../TableRow/TableRow";
import { Delete } from "@mui/icons-material";
import {
  removeTableItem,
  selectIsItemLoading,
  selectTableInfo,
} from "../../slices/tablesInfoSlice";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { CardFormModal } from "../CardFormModal/CardFormModal";

export const TableCard = (details: TableItemType) => {
  const [cookies] = useCookies(["authToken"]);
  const dispatch = useDispatch<AppDispatch>();
  const formattedDetails = Object.entries(details);
  const { error, isLoading: isAllDataLoading } = useSelector(selectTableInfo);
  const isLoading =
    useSelector((state: RootState) => selectIsItemLoading(state, details.id)) ||
    isAllDataLoading;

  const handleItemRemove = () => {
    if (cookies.authToken && details?.id) {
      dispatch(
        removeTableItem({
          token: cookies.authToken,
          id: details.id,
        })
      );
    }
  };

  return (
    <TableContainer
      component={Card}
      variant="outlined"
      sx={{ maxWidth: "400px" }}
    >
      <CardActions>
        <Button
          variant="contained"
          endIcon={<Delete />}
          size="small"
          onClick={handleItemRemove}
          loading={isLoading}
          disabled={isLoading || !!error}
        >
          Remove
        </Button>
        <CardFormModal
          buttonLabel="Update"
          info={details}
          type="update"
          loading={isLoading}
        />
      </CardActions>
      <CardContent>
        <Table>
          <TableBody>
            {formattedDetails.map((detail) => (
              <TableRow label={detail[0]} value={detail[1]} key={detail[0]} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </TableContainer>
  );
};
