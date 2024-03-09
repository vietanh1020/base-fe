import { httpClient } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const endpoint = "/menu";

export const useAdminGetMenu = () => {
  return useQuery([endpoint], async () => {
    const { data } = await httpClient().get(endpoint);
    return data;
  });
};

export const useCustomerGetMenu = (id: string) => {
  return useQuery([`user_menu`, id], async () => {
    const { data } = await httpClient().get(endpoint + "/" + id);
    return data;
  });
};

export const useGetMenu = (company: string) => {
  return useQuery([endpoint], async () => {
    const { data } = await httpClient().get(endpoint + "/" + company);
    return data;
  });
};

export const useCreateFood = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["/menu"],
    async (data: any) => {
      const res = await httpClient().post(`/menu`, data);
      return res.data;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["/menu"]);
      },
      onError: async (error: any) => {
        toast.error(error?.response.data?.message[0]);
      },
    }
  );
};

export const useUploadFoodImg = () => {
  return useMutation(["/menu/images"], async (formData: any) => {
    const res = await httpClient().post(`/menu/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for uploading files
      },
    });
    return res.data;
  });
};

export const useDeleteFood = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["/menu"],
    async (id) => {
      const res = await httpClient().delete(`/menu/${id}`);
      return res.data;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["/menu"]);
      },
    }
  );
};
