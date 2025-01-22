import { useState, useContext } from "react";
import { AxiosError } from "axios";
import { login } from "@/api/auth.routes";
import { ILogin } from "@/interfaces/auth,interfaces";
import { AuthContext } from "@/context/AuthContext";

type options = {
  onSuccess?: VoidFunction;
  onReject?: (e: AxiosError) => void;
}

const useLogin = ({ onSuccess, onReject }: options ) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAccessToken, setSessionLoading } = useContext(AuthContext);
  
  const setLogin = (formData: ILogin) => {
    setLoading(true);

    login(formData)
      .then(({ data }) => {
        setSessionLoading(true);
        setAccessToken(data.accessToken);
      })
      .then(() => {
        onSuccess?.();
      })
      .catch((error: AxiosError) => {
        onReject?.(error)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return { setLogin, loading };

}

export default useLogin;