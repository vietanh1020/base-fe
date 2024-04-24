import { httpClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const endpoint = "/bill";
export const useGetBill = () => {
  return useQuery([endpoint], async () => {
    const { data } = await httpClient().get(endpoint);

    return data;
  });
};

export const useGetBillDetail = (id: string) => {
  return useQuery(
    [endpoint, id],
    async () => {
      const { data } = await httpClient().get(endpoint + "/" + id);

      return data;
    },
    { enabled: !!id }
  );
};
