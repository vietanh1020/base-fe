import { httpClient } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endpoint = "/order";

export const useGetCompanyOrders = (status = 0, date = "") => {
  return useQuery([endpoint, status, date], async () => {
    const { data } = await httpClient().get(
      `${endpoint}?status=${status}&date=${date}`
    );
    return data;
  });
};
