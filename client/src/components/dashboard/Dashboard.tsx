import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { useEffect, useRef, useState } from "react";
import { IProfileData } from "@/interfaces/profile.interfaces";
import { useNavigate } from "react-router";

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
  const [profileData, setProfileData] = useState<IProfileData>(defaultValues);

  const hasFetched = useRef(false);
  const navigate = useNavigate();

  const { setLogout } = useLogout({
    onSuccess: () => navigate('/auth'),
    onReject: () => console.error("Ha ocurrido un error"),
  })

  const { apiProtectedRoutes } = useProtectedRoutes();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;

      const response = apiProtectedRoutes.get<IProfileData>('/profile/data');

      response
        .then(({ data }) => {
          setProfileData(data);
          const { surveyAnswered } = data;
          if (!surveyAnswered) navigate('/financial-survey');
        })
    }
  }, [])

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLogout();
  }

  const handleUpdateProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  }

  const handleSubmitProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = apiProtectedRoutes.put('/profile/data', profileData);

    response
      .then(({ data }) => console.log('Perfil actualizado con éxito'));
  }

  return (
    <main>
      <nav className="flex justify-between items-center py-3">
      <div>
        <p className="text-[#BDE9FF]">Mi tablero</p>
      </div>
      <div>
        <Button
          data-cy="logout-button"
          className="w-full px-4 py-3 bg-[#11668233] text-[#BDE9FF] text-base font-normal tracking-wide"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </nav>
    <section>
      <p>{profileData.id}</p>
      <p>{profileData.lastname}</p>
      <p>{profileData.financialProfileResults}</p>
    </section>
    </main>
  )
}

export default Dashboard