import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useScreenSize } from "@hooks/useScreenSize";
import { Payment } from "@store/payments/types";
import { queryFnHelper } from "@utils/queryClientHelpers";

export const usePayments = () => {
  const { isMediumAndAbove } = useScreenSize();
  const columns: GridColDef<Payment>[] = useMemo(() => {
    if (isMediumAndAbove) {
      return [
        {
          field: "date",
          headerName: "Date",
          flex: 1,
          valueFormatter: (value) => {
            return dayjs(value).format("YYYY-MM-DD");
          },
        },
        { field: "status", headerName: "Status", flex: 1 },
        {
          field: "amount",
          headerName: "Amount",
          flex: 1,
          valueFormatter: (value: number) => {
            return `R${value.toFixed(2)}`;
          },
        },
      ] as GridColDef<Payment>[];
    }
    return [
      { field: "name", flex: 1 },
      { field: "status", flex: 1 },
    ] as GridColDef<Payment>[];
  }, [isMediumAndAbove]);

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

  return {
    rowData: data?.payments || [],
    columns,
    isPending,
  };
};
