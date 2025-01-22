import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { logout } from "@/api/auth.routes";
import { AuthContext } from "@/context/AuthContext";

type options = {
  onSuccess?: VoidFunction;
  onReject?: (e: AxiosError) => void;
}

const useLogout = ({ onSuccess, onReject }: options ) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAccessToken } = useContext(AuthContext);

  const setLogout = () => {
    setLoading(true);

    logout()
      .then(() => {
        setAccessToken(null);
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

  return { setLogout, loading };
}

export default useLogout;