import { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import useRefresh from "@/hooks/useRefresh";

export interface IAuthContext {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>
  session: boolean,
  setSession: Dispatch<SetStateAction<boolean>>,
  sessionLoading: boolean,
  setSessionLoading: Dispatch<SetStateAction<boolean>>,
  isLogin: boolean,
  setIsLogin: Dispatch<SetStateAction<boolean>>,
  protectedPage: boolean | null,
  setProtectedPage: Dispatch<SetStateAction<boolean | null>>,
};

const defaultState: IAuthContext = {
  accessToken: null,
  setAccessToken: () => {},
  session: false,
  setSession: () => {},
  sessionLoading: false,
  setSessionLoading: () => {},
  isLogin: false,
  setIsLogin: () => {},
  protectedPage: null,
  setProtectedPage: () => {},
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);
  const [session, setSession] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [protectedPage, setProtectedPage] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const hasFetched = useRef(false);

  const from = location.state?.from.pathname;

  const { setRefresh } = useRefresh({
    onSuccess: () => {
      setSessionLoading(false);
      setSession(true);
      navigate(from, { replace: true });
    },
    onReject: () => {
      setSessionLoading(false);
      setSession(false);
      if (protectedPage) navigate('/auth');
    },
    setToken: (token: string) => setAccessToken(token),
  })

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setRefresh();
    }
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        accessToken,
        setAccessToken,
        session,
        setSession,
        sessionLoading,
        setSessionLoading,
        isLogin,
        setIsLogin,
        protectedPage,
        setProtectedPage,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
