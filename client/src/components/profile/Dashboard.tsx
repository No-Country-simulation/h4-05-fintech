import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { useEffect, useState } from "react";
import { IProfileData } from "@/interfaces/profile.interfaces";

const defaultValues: IProfileData = {
  id: "",
  name: null,
  lastname: null,
  image: null,
  surveyAnswered: false,
  financialProfileResults: null,
  itemsSaved: []
}

const Dashboard = () => {
  const [profileData, setProfileData] = useState<IProfileData>(defaultValues)
  const navigate = useNavigate();

  const { setLogout } = useLogout({
    onSuccess: () =>  navigate('/auth'),
    onReject: () => console.error("Ha ocurrido un error"),
  })

  const { apiProtectedRoutes } = useProtectedRoutes();

  useEffect(() => {
    const response = apiProtectedRoutes.get<IProfileData>('/profile/data')

    response
      .then(({ data }) => {
        setProfileData(data);
      })
  }, [])

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLogout();
  }

  return (
    <main>
      <nav className="flex justify-between items-center py-3">
      <div>
        <p className="text-[#BDE9FF]">Mi tablero</p>
      </div>
      <div>
        <Button 
          className="w-full px-4 py-3 bg-[#11668233] text-[#BDE9FF] text-base font-normal tracking-wide"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </nav>
    <section>
      <p>{profileData.name}</p>
      <p>{profileData.lastname}</p>
      <p>{profileData.financialProfileResults}</p>
    </section>
    </main>
  )
}

export default Dashboard