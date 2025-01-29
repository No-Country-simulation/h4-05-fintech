import { ILogin, IRegister, IResetPassword } from "@/interfaces/auth,interfaces";
import { apiRoutes } from "./axios";
import { AxiosResponse } from "axios";

const controller = new AbortController();

export const registerUser = (formData: IRegister): Promise<AxiosResponse> => {
  return apiRoutes.post('/auth/registry', formData , {
    signal: controller.signal,
  });
}

export const resendVerification = (email: string): Promise<AxiosResponse> => {
  return apiRoutes.post('/auth/resend-verification', { email }, {
    signal: controller.signal,
  });
}

export const verifyUser = (code: string | null): Promise<AxiosResponse> => {
  return apiRoutes.get(`/auth/verify?code=${code}`);;
}

export const login = (formData: ILogin): Promise<AxiosResponse<{ accessToken: string }>> => {
  return apiRoutes.post<{ accessToken: string }>('/auth/login', formData,
    {
      signal: controller.signal,
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    }
  );
}

export const loginWithGoogle = (): Promise<AxiosResponse<{ url: string }>> => {
  return apiRoutes.get<{ url: string }>('/oauth2/google/login');
}

export const loginWithApple = (): Promise<AxiosResponse<{ url: string }>> => {
  return apiRoutes.get<{ url: string }>('/oauth2/apple/login');
}

export const refreshSession = (): Promise<AxiosResponse<{ accessToken: string }>> => {
  return apiRoutes.get<{ accessToken: string }>('/auth/refresh',
    {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    }
  );
}

export const logout = (): Promise<AxiosResponse> => {
  return apiRoutes.get('/auth/logout', 
    {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      }
    }
  );
}

export const forgotPassword = (email: string): Promise<AxiosResponse> => {
  return apiRoutes.post('/auth/forgot-password', { email }, {
    signal: controller.signal,
  });
}

export const verifyResetPasswordCode = (code: string | null): Promise<AxiosResponse> => {
  return apiRoutes.get(`/auth/password-reset?code=${code}`);;
}

export const resetPassword = (
  code: string | null, 
  formData: IResetPassword
): Promise<AxiosResponse> => {
  return apiRoutes.put(
    `/auth/password-reset?code=${code}`, 
    formData, 
    {
      signal: controller.signal,
   }
  );
}