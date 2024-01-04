import { httpClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function applyPagination(documents: any, page: any, rowsPerPage: any) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

const endpoint = "/users";
export const useGetUser = () => {
  return useQuery([endpoint], async () => {
    const { data } = await httpClient().get(endpoint);

    return data;
  });
};
