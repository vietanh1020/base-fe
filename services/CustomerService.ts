import { toast } from "react-toastify";
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

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["/auth/staff"],
    async (data: any) => {
      const res = await httpClient().post("/auth/staff", data);
      return res.data;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([endpoint]);
      },
    }
  );
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
