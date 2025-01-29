import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { IUpdateProfileData } from "@/interfaces/profile.interfaces";

const AgePage = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const prev = location.state as boolean;
  const session = sessionStorage.getItem('profile') as string;

  const data = JSON.parse(session) as IUpdateProfileData;

  const [formData, setFormData] = useState<IUpdateProfileData>({ ...data, age: 0 });

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!prev) navigate('/profile/start')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem('profile', JSON.stringify(formData));
    navigate('/profile/occupation', { state: { prev: true }});
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
          <p className="text-[#88D0EF] text-center">¿Qué edad tienes?</p>
        </div>
        <Card className="border-none shadow-none">
          <div className="rounded-lg space-y-2 bg-[#11668233] px-2 py-2 mb-3">
            <Label htmlFor="name"
              className="text-[#8BD0EF]"
            >
              Edad
            </Label>
            <Input
              id="age"
              type="number"
              name="age"
              min={0}
              value={formData.age}
              onChange={handleChange}
              placeholder="Ingresa tu edad"
              className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
              required
            />
          </div>
            <Button 
              className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
              onClick={nextQuestion}
            >
              Continuar
            </Button>
        </Card>
      </div>
    </main>
  )
}

export default AgePage;
