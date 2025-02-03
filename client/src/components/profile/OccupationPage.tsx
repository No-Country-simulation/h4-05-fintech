import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "../ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import Select from "../ui/select";
import { IUpdateProfileData } from "@/interfaces/profile.interfaces";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { AxiosError } from "axios";
import { IApiError } from "@/api/api-errors";

const OccupationPage = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const prev = location.state as boolean;
  const session = sessionStorage.getItem('profile') as string;

  const data = JSON.parse(session) as IUpdateProfileData;

  const [formData, setFormData] = useState<IUpdateProfileData>({ ...data, occupation: ' ' });
  const { apiProtectedRoutes, setRequest } = useProtectedRoutes();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!prev) navigate('/profile/start')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const finishProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRequest(true);

    const { name, lastname, age, occupation }: IUpdateProfileData = {...formData, age: +formData.age }
    const response = apiProtectedRoutes.put('/profile/data', { name, lastname, age, occupation });
    
    response
      .then(() => {
        sessionStorage.removeItem('profile');
        navigate('/financial-survey')
      })
      .catch((error: AxiosError) => {
        const errorMessage: IApiError = error.response?.data as IApiError;
        console.error(errorMessage.message);
      })
  }

  const options = [
    { value: '', label: 'Seleccionar', disabled: true },
    { value: 'Arquitecto', label: 'Arquitecto' },
    { value: 'Ingeniero', label: 'Ingeniero' },
    { value: 'Abogado', label: 'Abogado' },
  ]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center mt-[11rem]" >
          <img
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            className="w-[341px] h-[49px]"
          />
        </div>
        <div className=" justify-end grid-rows-12">
          <p className="text-lightBlue text-center">Cual es tu ocupación?</p>
        </div>
        <Card className="border-none shadow-none">
          <div className="rounded-lg space-y-2 bg-darkBlue px-2 py-2 mb-3">
            <Label htmlFor="occupation"
              className="text-lightBlue"
            >
              Ocupación:
            </Label>
            <Select
              name='occupation'
              options={options}
              onChange={handleChange}
              value={formData.occupation!}
              className="w-full h-[52px] bg-darkBlue text-lightBlue text-base font-normal tracking-wide px-3"
            />
          </div>
          <Button
            onClick={finishProfile}
            className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
          >
            Continuar
          </Button>
        </Card>
      </div>
    </main>
  )
}

export default OccupationPage;
