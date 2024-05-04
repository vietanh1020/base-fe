import { httpClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export const useGetOrderMonthly = () => {
  const endPoint = `/month/statistics`;
  return useQuery([`/order/month/statistics`], async () => {
    const res = await httpClient().get(`/month/statistics`);
    return res.data;
  });
};

export const useGetFoodDaily = (date: any) => {
  const endPoint = `/order/daily/food/statistics`;
  return useQuery([endPoint, date], async () => {
    const { data: foods } = await httpClient().get(
      `${endPoint}?date=${date ? moment(date).format("YYYY-MM-DD") : ""}`
    );

    return Object.keys(foods).map((key) => {
      return {
        ...foods[key],
        id: key,
      };
    });
  });
};

export const useGetFoodMonthly = (date: string) => {
  const endPoint = `/order/monthly/food/statistics`;
  return useQuery([endPoint], async () => {
    const { data: foods } = await httpClient().get(endPoint);
    return Object.keys(foods).map((key) => {
      return {
        ...foods[key],
        id: key,
      };
    });
  });
};

export const useGetTurnover = (date: string) => {
  const endPoint = `/order/month/statistics`;
  return useQuery([endPoint], async () => {
    const { data } = await httpClient().get(endPoint);
    return data;
  });
};
