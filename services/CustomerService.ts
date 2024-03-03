import { httpClient } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useGetProfile = () => {
  return useQuery([endpoint], async () => {
    const { data } = await httpClient().get(`${endpoint}/profile`);

    return data;
  });
};

export const useChangeAvt = () => {
  return useMutation([endpoint], async (data: any) => {
    const res = await httpClient().post(`${endpoint}/avatar`, data);
    return res.data;
  });
};
