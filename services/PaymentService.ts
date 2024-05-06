import { httpClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export const useGetOrder = (table: string) => {
  return useQuery([`/order`, table], async () => {
    const res = await httpClient().get(`/order?tableId=${table}`);
    return res.data;
  });
};

export const useGetTableOrder = (table: string) => {
  return useQuery([`/orderTable`, table], async () => {
    const { data } = await httpClient().get(`/order?tableId=${table}`);
    const res: any = {};
    data.forEach((element: any) => {
      res[element.tableId] = res?.[element.tableId]
        ? [...res?.[element.tableId], ...element.details]
        : element.details;
    });

    return res;
  });
};

export const useGetOrderHistory = (table: string, date: any) => {
  return useQuery([`/order/history`, table, date], async () => {
    const res = await httpClient().get(
      `/order/history?tableId=${table}&date=${
        date ? moment(date).format("YYYY-MM-DD") : ""
      }`
    );
    return res.data;
  });
};

export const useGetOrderDetail = (orderId: string) => {
  return useQuery(
    [`/payments/orders/${orderId}`],
    async () => {
      const res = await httpClient().get(`/payments/orders/${orderId}`);
      return res.data;
    },
    {
      enabled: !!orderId,
    }
  );
};

export const useGetInvoice = () => {
  return useQuery(["/payment/invoice"], async () => {
    const res = await httpClient().get(`/payment/invoice`);
    return res.data;
  });
};
