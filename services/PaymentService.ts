import { httpClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = (table: string) => {
  return useQuery([`/order`, table], async () => {
    const res = await httpClient().get(`/order?tableId=${table}`);
    return res.data;
  });
};

export const useGetOrderDetail = (orderId: string) => {
  return useQuery([`/payments/orders/${orderId}`], async () => {
    const res = await httpClient().get(`/payments/orders/${orderId}`);
    return res.data;
  });
};

export const useGetInvoice = () => {
  return useQuery(["/payment/invoice"], async () => {
    const res = await httpClient().get(`/payment/invoice`);
    return res.data;
  });
};
