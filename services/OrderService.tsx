import { httpClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const endpoint = "/menu";
export const useGetMenu = (company: string) => {
  return useQuery([endpoint], async () => {
    const { data } = await httpClient().get(endpoint + "/" + company);
    return data;
  });
};
