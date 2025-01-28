import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

  const [formData, setFormData] = useState<IUpdateProfileData>(data);

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
        <div className=" justify-end grid-rows-12">
          <p className="text-[#88D0EF] text-center">¿Quién eres?</p>
        </div>
        <Card className=" border-none shadow-none">
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="name"
                className="text-[#8BD0EF]"
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
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
              />
            </div>
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
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
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
              />
            </div>
            <Link to='/edad'>
              <Button 
                className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
                onClick={nextQuestion}
              >
                Siguiente
              </Button>
            </Link>
        </Card>
      </div>
    </main>
  )
}

export default NamesPage;
