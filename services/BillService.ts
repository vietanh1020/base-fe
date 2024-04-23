import { httpClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const endpoint = "/bill";
export const useGetBill = () => {
  return useQuery([endpoint], async () => {
    const { data } = await httpClient().get(endpoint);

    return data;
  });
};
