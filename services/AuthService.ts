import { LoginDto, RegisterDto } from "@/types";
import { httpClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export const authLocal = async (payload: LoginDto) => {
  const { data } = await httpClient().post(`/auth/login`, payload);

  return data;
};

export const loginGoogle = async (idToken: string) => {
  const { data } = await httpClient().post(`/auth/google`, {
    token: idToken,
  });
  return data;
};

export const authLogout = async () => {
  await httpClient().post(`/auth/logout`);
};

export const refreshToken = async () => {
  const res = await httpClient().get(`/auth/refresh-token`);
};

// TODO:
export const deviceToken = async (token: string) => {
  const res = await httpClient().post(`/auth/device`, { token });
  return res.data;
};

export const useRegister = () => {
  return useMutation(
    ["/auth/admin"],
    async (data: RegisterDto) => {
      const res = await httpClient().post(`auth/admin`, data);
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
