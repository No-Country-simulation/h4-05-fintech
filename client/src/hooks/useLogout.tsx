import { useContext } from "react";
import { AxiosError } from "axios";
import { logout } from "@/api/auth.routes";
import { AuthContext } from "@/context/AuthContext";

type options = {
  onSuccess?: VoidFunction;
  onReject?: (e: AxiosError) => void;
}

const useLogout = ({ onSuccess, onReject }: options ) => {
  const { setAccessToken, setSessionLoading, setSession } = useContext(AuthContext);

  const setLogout = () => {
    setSessionLoading(true);

    logout()
      .then(() => {
        setAccessToken(null);
      })
      .then(() => {
        setSession(false);
        onSuccess?.();
      })
      .catch((error: AxiosError) => {
        onReject?.(error)
      })
      .finally(() => {
        setSessionLoading(false);
      })
  }

  return { setLogout };
}

export default useLogout;