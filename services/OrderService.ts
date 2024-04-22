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

export const useGetOrderDetail = (id: string) => {
  return useQuery([endpoint, id], async () => {
    const { data } = await httpClient().get(`${endpoint}/${id}`);
    return data;
  });
};

export const useCustomerGetOrder = (id: string) => {
  return useQuery(
    [endpoint, id, , "customerGet"],
    async () => {
      const { data } = await httpClient().get(`/order/customer/${id}`);
      return data;
    },
    {
      enabled: !!id,
    }
  );
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [endpoint],
    async (data: any) => {
      const res = await httpClient().post(endpoint, data);
      return res.data;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([endpoint]);
      },
    }
  );
};

export const useCancelFoodOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [endpoint],
    async (id: any) => {
      const res = await httpClient().put(endpoint + "/cancel/" + id);
      return res.data;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["customerGet"]);
      },
    }
  );
};

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["/status"],
    async (body: any) => {
      const { orderId, ...data } = body;

      const res = await httpClient().put("/order/status/" + orderId, data);
      return res.data;
    },

    {
      onSuccess: async () => {
        queryClient.invalidateQueries([endpoint]);
      },
    }
  );
};
