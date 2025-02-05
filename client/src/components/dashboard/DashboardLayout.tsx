import { useEffect, useRef, useState } from "react";
import DashboardFooter from "../ui/dashboard-footer"
import { Outlet, useNavigate } from "react-router";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { IProfileData } from "@/interfaces/profile.interfaces";

const DashboardLayout = () => {
  const [profileData, setProfileData] = useState<IProfileData | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(true);

  const hasFetched = useRef(false);
  const navigate = useNavigate();

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

  return (
    (loadingDashboard 
      ? <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">Cargando...</h1>
        </div>
      : <>
          <main className="lg:flex lg:justify-center grid grid-rows-12">
            <Outlet context={{ profileData }} />
          </main>
          <footer className="w-full -ml-4 fixed bottom-0">
            <DashboardFooter className="bg-turqouise text-lightBlue" />
          </footer>
        </>
    )
  )
}

export default DashboardLayout;