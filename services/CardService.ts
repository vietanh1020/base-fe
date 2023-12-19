/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/utils/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CardDto, CreateCardDto, UpdateCardDto } from "@/types/Card";

const endPoint = `/payments/cards`;

export const useGetAllCards = () => {
  return useQuery<CardDto[]>([endPoint], async () => {
    const res = await httpClient().get(endPoint);
    return res.data as CardDto[];
  });
};

export const useGetCard = (id: string) => {
  return useQuery<CardDto>([endPoint, id], async () => {
    const res = await httpClient().get(`${endPoint}/${id}`);
    return res.data as CardDto;
  });
};

export const useCreateCard = () => {
  return useMutation(
    [endPoint],
    async (data: CreateCardDto) => {
      const res = await httpClient().post(endPoint, data);
      return res.data;
    },
    {
      onError: async (err: any) => {
        const errorMessage =
          err?.response?.data?.message || "Internal Server Error";
        toast.error(
          Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
        );
      },
    }
  );
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [endPoint],
    async (req: { id: string; data: UpdateCardDto }) => {
      const { id, data } = req;
      const res = await httpClient().put(`${endPoint}/${id}`, {
        ...data,
      });
      return res.data as CardDto;
    },
    {
      onSuccess: async () => {
        toast.success("Update card Success");
        queryClient.invalidateQueries([endPoint]);
      },
      onError: async (err: any) => {
        toast.error(err.response.data.message);
      },
    }
  );
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [endPoint],
    async (id: string) => {
      const res = await httpClient().delete(`${endPoint}/${id}`);
      return res.data as CardDto;
    },
    {
      onSuccess: async () => {
        toast.success("Deleted card Success");
        queryClient.invalidateQueries([endPoint]);
      },
      onError: async () => {
        toast.error("Deleted card Failed");
      },
    }
  );
};

export const useSetDefaultCard = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [endPoint],
    async (req: { id: string }) => {
      const { id } = req;
      const res = await httpClient().put(`${endPoint}/${id}/default`);
      return res.data as CardDto;
    },
    {
      onSuccess: async () => {
        toast.success("Set default card successfully!");
        queryClient.invalidateQueries([endPoint]);
      },
      onError: async (err: any) => {
        toast.error(err.response.data.message);
      },
    }
  );
};
