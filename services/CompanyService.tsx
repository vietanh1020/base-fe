import { httpClient } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const endpoint = "/company";

export const useGetCompany = () => {
  return useQuery([endpoint], async () => {
    const { data } = await httpClient().get(endpoint);
    return data;
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [endpoint],
    async (id) => {
      const res = await httpClient().delete(`${endpoint}/${id}`);
      return res.data;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([endpoint]);
      },
    }
  );
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [endpoint],
    async (id) => {
      const res = await httpClient().delete(`${endpoint}/${id}`);
      return res.data;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([endpoint]);
      },
    }
  );
};
