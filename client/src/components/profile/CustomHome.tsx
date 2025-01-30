import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import Navbar from "../ui/navbar"
import TopNavbar from "../ui/top-navbar";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { IProfileData } from "@/interfaces/profile.interfaces";
import { useNavigate } from "react-router";

const CustomHome = () => {
  const [profileData, setProfileData] = useState<IProfileData | null>(null); 
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(true); 

  const { apiProtectedRoutes } = useProtectedRoutes();
  const hasFetched = useRef(false);
  const navigate = useNavigate();

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
      : <main className="grid grid-rows-12">
          <header className="w-full -ml-4 fixed top-0">
            <TopNavbar profileData={profileData} className="bg-[rgb(13,54,67)] text-[#BDE9FF] px-3" />
          </header>
          <section className="row-span-12 mb-24">
            <Card className="w-full rounded-xl mt-24 text-[#BDE9FF] bg-[rgba(17,102,130,0.2)] p-3 border-none mb-3">
              <p className="font-semibold text-center">Balance Total</p>
              <p className="font-bold text-[24px]">$0</p>
            </Card>
            <div className="flex space-x-2 justify-center items-center mb-3">
              <Card className="w-full rounded-xl bg-[rgba(17,102,130,0.2)] text-[#BDE9FF] p-3 border-none">
                <div className="flex justify-start items-center space-x-3">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame">
                      <g clipPath="url(#clip0_597_2116)">
                        <path id="Vector" d="M12 5C11.4469 5 11 4.55313 11 4C11 3.44687 11.4469 3 12 3H17C17.5532 3 18 3.44687 18 4V9C18 9.55312 17.5532 10 17 10C16.4469 10 16 9.55312 16 9V6.41563L10.7063 11.7063C10.3156 12.0969 9.68127 12.0969 9.29065 11.7063L6.00002 8.41562L1.70627 12.7063C1.31565 13.0969 0.681274 13.0969 0.290649 12.7063C-0.0999756 12.3156 -0.0999756 11.6812 0.290649 11.2906L5.29065 6.29063C5.68127 5.9 6.31565 5.9 6.70627 6.29063L10 9.58438L14.5844 5H12Z" fill="#BDE9FF"/>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_597_2116">
                        <path d="M0 0H18V16H0V0Z" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="font-semibold">Ingresos</p>
                </div>
                <p className="font-semibold text-[24px]">$0</p>
              </Card>
              <Card className="w-full rounded-xl bg-[rgba(143,82,55,0.63)] text-[rgb(255,195,169)] p-3 border-none">
                <div className="flex justify-start items-center space-x-3">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame">
                      <g clipPath="url(#clip0_597_2124)">
                        <path id="Vector" d="M12 11.0002C11.4469 11.0002 11 11.4471 11 12.0002C11 12.5533 11.4469 13.0002 12 13.0002H17C17.5532 13.0002 18 12.5533 18 12.0002V7.0002C18 6.44707 17.5532 6.0002 17 6.0002C16.4469 6.0002 16 6.44707 16 7.0002V9.58457L10.7063 4.29395C10.3156 3.90332 9.68127 3.90332 9.29065 4.29395L6.00002 7.58457L1.70627 3.29395C1.31565 2.90332 0.681274 2.90332 0.290649 3.29395C-0.0999756 3.68457 -0.0999756 4.31895 0.290649 4.70957L5.29065 9.70957C5.68127 10.1002 6.31565 10.1002 6.70627 9.70957L10 6.41582L14.5844 11.0002H12Z" fill="#FFDBCA"/>
                     </g>
                    </g >
                    <defs>
                      <clipPath id="clip0_597_2124">
                        <path d="M0 0H18V16H0V0Z" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="font-semibold">Gastos</p>
                </div>
                <p className="font-semibold text-[24px]">$0</p>
              </Card>
            </div>
            <Card className="w-full rounded-xl space-y-3 bg-[rgba(17,102,130,0.2)] text-[#BDE9FF] px-3 py-6 border-none mb-3">
              <h1 className="font-bold">Objetivos Financieros</h1>
              <Card className="bg-[rgba(134,225,255,0.2)] text-[#BDE9FF] p-3 border-none rounded-xl">
                <p>Fondo de emergencia</p>
                <progress className="progressBar" value={75} max={100}>{75}%</progress>
              </Card>
              <Card className="bg-[rgba(134,225,255,0.2)] text-[#BDE9FF] p-3 border-none rounded-xl">
                <p>Fondo de emergencia</p>
                <progress className="progressBar" value={75} max={100}>{75}%</progress>
              </Card>
            </Card>
            <Card className="w-full rounded-xl space-y-3 bg-[rgba(17,102,130,0.2)] p-3 border-none mb-3">
              <Card className="bg-[rgba(134,225,255,0.2)] p-3 border-none rounded-xl">
                <div className="grid grid-flow-col grid-rows-3 pt-3 -mb-3">
                  <div className="row-span-3 size-9 mt-1 ">
                    <svg className="bg-white rounded-full p-2" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Frame">
                        <g clipPath="url(#clip0_596_1983)">
                          <path id="Vector" d="M12.5 3V3.02187C12.3344 3.00937 12.1687 3 12 3H8C7.48438 3 6.98438 3.06562 6.50625 3.1875C6.50312 3.125 6.5 3.0625 6.5 3C6.5 1.34375 7.84375 0 9.5 0C11.1562 0 12.5 1.34375 12.5 3ZM12 4C12.1094 4 12.2188 4.00313 12.325 4.00938C12.4563 4.01875 12.5875 4.03125 12.7188 4.05C13.2688 3.40938 14.0875 3 15 3H15.3594C15.6844 3 15.9219 3.30625 15.8438 3.62188L15.4125 5.34688C15.9062 5.80938 16.3094 6.37187 16.5844 7H17C17.5531 7 18 7.44688 18 8V11C18 11.5531 17.5531 12 17 12H16C15.7156 12.3781 15.3781 12.7156 15 13V15C15 15.5531 14.5531 16 14 16H13C12.4469 16 12 15.5531 12 15V14H8V15C8 15.5531 7.55312 16 7 16H6C5.44688 16 5 15.5531 5 15V13C3.90937 12.1812 3.16563 10.9281 3.025 9.5H2.125C0.95 9.5 0 8.55 0 7.375C0 6.2 0.95 5.25 2.125 5.25H2.25C2.66563 5.25 3 5.58437 3 6C3 6.41563 2.66563 6.75 2.25 6.75H2.125C1.78125 6.75 1.5 7.03125 1.5 7.375C1.5 7.71875 1.78125 8 2.125 8H3.1C3.47812 6.13125 4.90312 4.64062 6.73438 4.1625C7.1375 4.05625 7.5625 4 8 4H12ZM14 8.25C14 8.05109 13.921 7.86032 13.7803 7.71967C13.6397 7.57902 13.4489 7.5 13.25 7.5C13.0511 7.5 12.8603 7.57902 12.7197 7.71967C12.579 7.86032 12.5 8.05109 12.5 8.25C12.5 8.44891 12.579 8.63968 12.7197 8.78033C12.8603 8.92098 13.0511 9 13.25 9C13.4489 9 13.6397 8.92098 13.7803 8.78033C13.921 8.63968 14 8.44891 14 8.25Z" fill="#16A34A"/>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_596_1983">
                          <path d="M0 0H18V16H0V0Z" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p className="col-span-2 text-lightBlue text-[14px]">Incrementa tus ahorros</p>
                  <p className="col-span-2 text-lightBlue text-[14px]">Podrías ahorrar 15% más este mes</p>
                </div>
              </Card>
              <Card className="bg-[rgba(134,225,255,0.2)] p-3 border-none rounded-xl">
              <div className="grid grid-flow-col grid-rows-3 pt-3 -mb-3">
                <div className="row-span-3 size-9 mt-1 ">
                  <svg className="bg-white rounded-full p-2" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame">
                      <path d="M0 0H16V16H0V0Z" stroke="#E5E7EB"/>
                      <path id="Vector" d="M2 2C2 1.44687 1.55313 1 1 1C0.446875 1 0 1.44687 0 2V12.5C0 13.8813 1.11875 15 2.5 15H15C15.5531 15 16 14.5531 16 14C16 13.4469 15.5531 13 15 13H2.5C2.225 13 2 12.775 2 12.5V2ZM14.7063 4.70625C15.0969 4.31563 15.0969 3.68125 14.7063 3.29063C14.3156 2.9 13.6812 2.9 13.2906 3.29063L10 6.58437L8.20625 4.79063C7.81563 4.4 7.18125 4.4 6.79063 4.79063L3.29063 8.29062C2.9 8.68125 2.9 9.31563 3.29063 9.70625C3.68125 10.0969 4.31563 10.0969 4.70625 9.70625L7.5 6.91563L9.29375 8.70938C9.68437 9.1 10.3188 9.1 10.7094 8.70938L14.7094 4.70937L14.7063 4.70625Z" fill="#2563EB"/>
                    </g>
                  </svg>
                </div>
                <p className="col-span-2 text-lightBlue text-[14px]">Incrementa tus ahorros</p>
                <p className="col-span-2 text-lightBlue text-[14px]">Podrías ahorrar 15% más este mes</p>
              </div>
            </Card>
          </Card>
        </section>
        <footer className="w-full -ml-4 fixed bottom-0">
          <Navbar className="bg-[#11668233] text-[#BDE9FF]" />
        </footer>
      </main>
    )
  )
}

export default CustomHome;