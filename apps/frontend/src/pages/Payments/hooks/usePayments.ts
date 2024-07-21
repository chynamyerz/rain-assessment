import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useScreenSize } from "@hooks/useScreenSize";
import { Payment } from "@store/payments/types";
import { queryFnHelper } from "@utils/queryClientHelpers";

export const usePayments = () => {
  const { isMediumAndAbove } = useScreenSize();
  const columns: GridColDef<Payment>[] = useMemo(
    () => getColumns(),
    [isMediumAndAbove]
  );

  /**
   *
   * Queries
   *
   */
  const { isPending, data } = useQuery<{ payments: Payment[] }>({
    queryKey: ["Payments"],
    queryFn: async () => {
      return queryFnHelper<{ payments: Payment[] }>("/payments");
    },
  });

  /**
   *
   * Handlers
   *
   */

  function getColumns() {
    const dateCol: GridColDef<Payment> = {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (value) => {
        return dayjs(value).format("YYYY-MM-DD");
      },
    };
    const statusCol: GridColDef<Payment> = {
      field: "status",
      headerName: "Status",
      flex: 1,
    };
    const columns: GridColDef<Payment>[] = [dateCol, statusCol];
    if (isMediumAndAbove) {
      return [
        ...columns,
        {
          field: "amount",
          headerName: "Amount",
          flex: 1,
          valueFormatter: (value: number) => {
            return `R${value.toFixed(2)}`;
          },
        } as GridColDef<Payment>,
      ];
    }
    return columns;
  }

  return {
    rowData: data?.payments || [],
    columns,
    isPending,
  };
};
