import { LoginDto, RegisterDto } from "@/types";
import { httpClient } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const endPoint = "/auth/local";

export const authLocal = async (payload: LoginDto) => {
  const { data } = await httpClient().post(`/auth/local`, payload);
  return data;
};

export const authLogout = async () => {
  await httpClient().post(`/auth/logout`);
};

export const refreshToken = async () => {
  const res = await httpClient().get(`/auth/refresh-token`);
};

export const useGetUserProfile = (isFetching: boolean) => {
  const queryClient = useQueryClient();

  return useQuery([endPoint, isFetching], async () => {
    const res = await httpClient().get(endPoint);
    const { data } = res.data;

    return data;
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["/auth/signup"],
    async (data: RegisterDto) => {
      const res = await httpClient().post(`auth/signup`, data);
      const access_token = res.data.data.access_token;
      return res.data;
    },
    {
      onSuccess: async () => {
        // queryClient.invalidateQueries(['/users/profile'])
      },
    }
  );
};

export const authForgotPassword = async (email: string) => {
  const res = await httpClient().post(`/auth/forgot-password`, {
    email: email,
  });
  return res.data.data;
};
