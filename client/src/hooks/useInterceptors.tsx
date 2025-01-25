import { useContext, useEffect, useRef, useState } from 'react'
import { apiProtectedRoutes } from '@/api/axios'
import { AxiosError } from 'axios';
import useRefresh from './useRefresh';
import { AuthContext } from '@/context/AuthContext';

export const useProtectedRoutes = () => {
  const [request, setRequest] = useState<boolean>(false)
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const hasFetched = useRef(false);
  const { setRefresh } = useRefresh({})

  useEffect(() => {
    if (!hasFetched.current || request) {
      hasFetched.current = true
      setRequest(false);

      const requestIntercept = apiProtectedRoutes.interceptors.request.use(
        (config) => {
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${accessToken}`
          }
          return config
        }, (error) => Promise.reject(error)
      )
  
      const responseIntercept = apiProtectedRoutes.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
          const prevRequest = error.config
          if (!prevRequest) return;
          else if (error?.response?.status === 401) {
            console.log('error');
            const data = await setRefresh();
            if (data) {
              const { accessToken: newAccessToken } = data;
              setAccessToken(newAccessToken);
              prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return apiProtectedRoutes(prevRequest);
            };
          }
          return Promise.reject(error)
        }
      )
  
      return () => {
        apiProtectedRoutes.interceptors.request.eject(requestIntercept)
        apiProtectedRoutes.interceptors.response.eject(responseIntercept)
      }
    }
  }, [request])

  return { apiProtectedRoutes, setRequest };
}

export default useProtectedRoutes;