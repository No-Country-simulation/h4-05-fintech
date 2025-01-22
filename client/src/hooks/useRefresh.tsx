import { AxiosError } from "axios";
import { refreshSession } from "@/api/auth.routes";

type options = {
  onSuccess?: VoidFunction;
  onReject?: (e: AxiosError) => void;
  setToken?: (token: string) => void;
}

const useRefresh = ({ onSuccess, onReject, setToken }: options ) => {
  const setRefresh = async () => {
    try {
      const { data } = await refreshSession();
      setToken?.(data.accessToken);
      onSuccess?.()
      return data;
    } catch (error) {
      if (error instanceof AxiosError) onReject?.(error)
      else console.error(error);
    };
  }
  return { setRefresh };
}

export default useRefresh;