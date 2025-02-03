import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { IUpdateProfileData } from "@/interfaces/profile.interfaces";

const NamesPage = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const started = location.state as boolean;
  const session = sessionStorage.getItem('profile') as string;

  const data = JSON.parse(session) as IUpdateProfileData;

  const [formData, setFormData] = useState<IUpdateProfileData>({ 
    ...data, 
    name: data.name ?? '', 
    lastname: data.lastname ?? '' 
  });

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!started) navigate('/profile/start')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem('profile', JSON.stringify(formData));
    navigate('/profile/age', { state: { prev: true }});
  }

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
        <div className="justify-end grid-rows-12">
          <p className="text-lightBlue text-center">¿Quién eres?</p>
        </div>
        <Card className="border-none shadow-none">
          <div className="rounded-xl space-y-2 bg-[#11668233] px-2 py-2 mb-3">
            <Label htmlFor="name"
              className="text-lightBlue"
            >
              Nombre
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              className="rounded-xl bg-customGray text-lightBlue placeholder:text-lightBlue focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
              required
            />
          </div>
          <div className="rounded-xl space-y-2 bg-[#11668233] mb-3 px-2 py-2">
            <Label htmlFor="apellido"
              className="text-[#8BD0EF]"
            >
              Apellido
            </Label>
            <Input
              id="lastname"
              type="text"
              name="lastname"
              value={formData.lastname!}
              onChange={handleChange}
              placeholder="Ingresa tu apellido"
              className="rounded-xl bg-customGray text-lightBlue placeholder:text-lightBlue focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
              required
            />
          </div>
          <Button 
            className="w-full rounded-xl h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
            onClick={nextQuestion}
          >
            Siguiente
          </Button>
        </Card>
      </div>
    </main>
  )
}

export default NamesPage;
