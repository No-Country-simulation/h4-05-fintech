import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { IProfileData } from "@/interfaces/profile.interfaces";
import { websocketClient } from "@/api/ws-server";
import { AuthContext } from "@/context/AuthContext";

const Dashboard = () => {
  const { accessToken } = useContext(AuthContext);
  const [_profileData, setProfileData] = useState<IProfileData | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(true);

  const hasFetched = useRef(false);
  const navigate = useNavigate();

  const { setLogout } = useLogout({
    onSuccess: () => navigate('/auth'),
    onReject: () => console.error("Unexpected error"),
  })

  const { apiProtectedRoutes } = useProtectedRoutes();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;

      const response = apiProtectedRoutes.get<IProfileData>('/profile/data');
      const localData = localStorage.getItem('skipped') as string;
      const skipped = JSON.parse(localData) as { time: number };
    
      response.then(({ data }) => {
        setLoadingDashboard(false);
        setProfileData(data)
        if (!data.surveyAnswered && !skipped) {
          sessionStorage.setItem('profile', JSON.stringify(data))
          navigate('/profile/start', { state: { started: true }})
        } else if (!data.surveyAnswered && skipped.time <= new Date().getTime()) {
          navigate('/financial-survey/pending', { state: { started: true }})
        }
      });
    }
  }, [])

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLogout();
  }

  const handleEventTrigger = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    websocketClient(accessToken);
  }

  return (
    (loadingDashboard 
      ? <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">Cargando...</h1>
        </div>
      : <main>
          <header className="flex justify-between">
            <div>
              <p className="text-[#BDE9FF]">Onboarding</p>
            </div>
          </header>
          <section className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex justify-between items-center py-3">
              <div>
                <Button
                  data-cy="logout-button"
                  className="w-full px-4 py-3 bg-[#11668233] text-[#BDE9FF] text-base font-normal tracking-wide"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </div>
            </div>
            <div>
              <Button
                data-cy="logout-button"
                className="w-full px-4 py-3 bg-[#11668233] text-[#BDE9FF] text-base font-normal tracking-wide"
                onClick={handleEventTrigger}
              >
                Disparar evento
              </Button>
            </div>
          </section>
        </main>
    )
  )
}

export default Dashboard;