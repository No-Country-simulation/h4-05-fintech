import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "../ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import Select from "../ui/select";
import { IUpdateProfileData } from "@/interfaces/profile.interfaces";

const OccupationPage = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, prev } = location.state as { data: IUpdateProfileData; prev: boolean };

  const [formData, setFormData] = useState<IUpdateProfileData>(data);

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
    navigate('/profile/summary', { state: { data: formData, prev: true }});
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
          <p className="text-[#88D0EF] text-center">Cual es tu ocupación?</p>
        </div>
        <Card className=" border-none shadow-none">
          <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
            <Label htmlFor="name"
              className="text-[#8BD0EF]"
            >
              Ocupación:
            </Label>
            <Select
              name='occupation'
              options={options}
              onChange={handleChange}
              value={formData.occupation!}
              className="w-full h-[52px] bg-[#11668233] text-[#8BD0EF] text-base font-normal tracking-wide px-2 mx-2"
            />
          </div>
          <Button
            onClick={finishProfile}
            className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
          >
            Continuar
          </Button>
        </Card>
      </div>
    </main>
  )
}

export default OccupationPage;
