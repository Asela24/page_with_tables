import { useSelector } from "react-redux";
import {
  selectTableInfo,
} from "../features/table/slices/tablesInfoSlice";
import { AlertNotification } from "../features/shared/components/AlertNotification/AlertNotification";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { TableCard } from "../features/table/components/TableCard/TableCard";
import { Box, CircularProgress } from "@mui/material";
import { CardFormModal } from "../features/table/components/CardFormModal/CardFormModal";
import { NoCardsMessage } from "../features/table/components/NoCardsMessage/NoCardsMessage";
import { fetchTableContent } from "../features/table/slices/asyncThunkActions";

const TablePage = () => {
  const [cookies] = useCookies<string>(["authToken"]);
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, isLoading } = useSelector(selectTableInfo);

  useEffect(() => {
    if (!cookies.authToken) return;

    dispatch(fetchTableContent(cookies.authToken));
  }, [dispatch, cookies]);

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {error && <AlertNotification message={error} severity="error" />}
      <CardFormModal buttonLabel="Add table" type="create" />
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: isLoading ? "center" : "normal",
        }}
      >
        {isLoading && !data.length ? (
          <CircularProgress
            sx={{
              marginTop: "100px",
            }}
          />
        ) : (
          <>
            {!data?.length ? (
              <NoCardsMessage />
            ) : (
              data.map((item) => <TableCard key={item.id} {...item} />)
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default TablePage;
