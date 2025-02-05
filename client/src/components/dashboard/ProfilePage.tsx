import { Link, useNavigate, useOutletContext } from "react-router";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import { IProfileDataForDashboard } from "@/interfaces/profile.interfaces";
import { Card } from "../ui/card";
import DefaultProfileImage from "../ui/default-profile-image";

const ProfilePage = () => {
  const { profileData } = useOutletContext<{ profileData: IProfileDataForDashboard }>();

  const navigate = useNavigate();

  const { setLogout } = useLogout({
    onSuccess: () => navigate('/auth'),
    onReject: () => console.error("Unexpected error"),
  })

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLogout();
  }

  return (
    <section className="w-full space-y-4 lg:max-w-md row-span-12 mb-32">
      <div className="flex flex-col items-center mt-8 mb-8" >
        <img
          src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
          alt="Logo"
          className="w-[341px] h-[49px]"
        />
      </div>
      <Card className="w-full rounded-xl bg-darkBlue p-6 border-none">
        <div className="flex items-center justify-between space-y-2 mb-4">
          <h1 className="text-lightBlue font-bold">Tu perfil</h1>
            {profileData?.surveyAnswered
              ? <p className="px-4 py-1 text-[14px] rounded-xl bg-turqouise text-lightBlue">Completado</p>
              : <p className="px-4 py-1 text-[14px] rounded-xl bg-rusty text-lightOrange">Pendiente</p>
            }
        </div>
        <div className="w-[50%] grid grid-flow-col grid-rows-3 gap-1">
          {!profileData?.image 
            ? <DefaultProfileImage className="row-span-3 w-[80%]" />
            : <img src={profileData.image} className="row-span-3 rounded-full w-[80%] mt-1" />
          }
          <p className="col-span-2 text-lightBlue text-[14px]">{profileData?.name} {profileData?.lastname}</p>
          {profileData?.surveyAnswered
            ? <p className="col-span-2 text-lightBlue text-[14px]">Tu perfil inicial</p>
            : <Link className="col-span-2 text-lightBlue text-[14px]" to={'/financial-survey'}>Completar perfil</Link>
          }
        </div>
      </Card>
      <Card className="w-full rounded-xl bg-darkBlue px-3 py-5 border-none">
        <h1 className="text-lightBlue font-bold">Objetivos financieros</h1>
        <p className="text-lightBlue">Comprar una casa</p>
      </Card>
      <Card className="w-full rounded-xl bg-darkBlue px-3 py-5 border-none">
        <h1 className="text-lightBlue font-bold">Nivel de conocimiento</h1>
        <progress className="progressBar" value={50} max={10}>{0}%</progress>  
      </Card>
      <Card className="w-full space-y-3 rounded-xl bg-darkBlue px-3 py-5 border-none">
        <h1 className="text-lightBlue font-bold">Perfil de riesgo</h1>
        <div className="flex justify-between">
          {profileData?.profile
            ? <p className="px-4 py-1 text-[14px] rounded-xl bg-copper text-black]">{profileData.profile}</p> 
            : <p className="px-4 py-1 text-[14px] rounded-xl bg-gray-400 text-black]">Indefinido</p>
          }
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame">
              <path d="M0 0.84668H20V20.8467H0V0.84668Z" stroke="#E5E7EB"/>
              <path id="Vector" d="M2.5 3.34668C2.5 2.65527 1.94141 2.09668 1.25 2.09668C0.558594 2.09668 0 2.65527 0 3.34668V16.4717C0 18.1982 1.39844 19.5967 3.125 19.5967H18.75C19.4414 19.5967 20 19.0381 20 18.3467C20 17.6553 19.4414 17.0967 18.75 17.0967H3.125C2.78125 17.0967 2.5 16.8154 2.5 16.4717V3.34668ZM18.3828 6.72949C18.8711 6.24121 18.8711 5.44824 18.3828 4.95996C17.8945 4.47168 17.1016 4.47168 16.6133 4.95996L12.5 9.07715L10.2578 6.83496C9.76953 6.34668 8.97656 6.34668 8.48828 6.83496L4.11328 11.21C3.625 11.6982 3.625 12.4912 4.11328 12.9795C4.60156 13.4678 5.39453 13.4678 5.88281 12.9795L9.375 9.49121L11.6172 11.7334C12.1055 12.2217 12.8984 12.2217 13.3867 11.7334L18.3867 6.7334L18.3828 6.72949Z" fill="#F97316"/>
            </g>
          </svg>
        </div>
      </Card>
      <Card className="w-full rounded-xl bg-darkBlue px-3 py-5 border-none">
        <h1 className="text-lightBlue font-bold mb-5">Recomendaciones</h1>
        <ul className="space-y-6"></ul>
        {profileData.recommendations?.length 
          ? profileData.tips?.map((tip, index) => {
            return (
              <li key={index} className="text-lightBlue">
                <p className="text-justify">{tip}</p>
              </li>
            )
          })
          : <p className="text-lightBlue text-justify">No hay recomendaciones</p>
        }
      </Card>
      <div className="w-full space-y-3">
        <Button
          data-cy="logout-button"
          className="w-full px-4 py-3 rounded-xl bg-darkBlue text-lightBlue text-base font-normal tracking-wide"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </section>
  )
}

export default ProfilePage;