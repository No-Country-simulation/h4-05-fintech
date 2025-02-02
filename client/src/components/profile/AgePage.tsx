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
          <p className="text-lightBlue text-center">¿Qué edad tienes?</p>
        </div>
        <Card className="border-none shadow-none">
          <div className="rounded-lg space-y-2 bg-darkBlue px-2 py-2 mb-3">
            <Label htmlFor="name"
              className="text-lightBlue"
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
              className="bg-customGray text-lightBlue placeholder:text-lightBlue focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
              required
            />
          </div>
            <Button 
              className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
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
