"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
const registry: string = process.env.REGISTRY as string;

interface formValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const initilValues: formValues = {
  email: "",
  password: "",
  confirmPassword: "",
};



const Register = () => {
  const [formData, setFormData] = useState<formValues>(initilValues);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submitted");
    setMessage("");
    setError("");

    try {
      const { data } = await axios.post(
        registry,
        formData
      );
      const accessToken = data.accessToken;
      console.log(accessToken);
      setMessage(data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.data?.message || "¡La operación se realizó con éxito!");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            width={342}
            height={50}
          />
          <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">
            Registrarse
          </h1>
        </div>
        <Card className="shadow-none border-none">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="email" className="text-[#8BD0EF]">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese su correo electronico"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
              />
              <p className="text-xs text-[#8BD0EF] font-medium">
                Ingrese una cuenta de correo válida
              </p>
            </div>
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="password" className="text-[#8BD0EF]">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="***********"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
              />
              <p className="text-xs text-[#8BD0EF] font-medium">
                Minimo 8 caracteres
              </p>
            </div>
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="password" className="text-[#8BD0EF]">
                Confirmar contraseña
              </Label>
              <Input
                id="password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="***********"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
              />
              <p className="text-xs text-[#8BD0EF] font-medium">
                Minimo 8 caracteres
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-[52px] bg-[#8D4E2A33] text-[#BDE9FF] text-base font-normal tracking-wide"
            >
              Registrarse
            </Button>
          </form>
          <div className="flex justify-center items-center gap-4 mt-5">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img
                src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977163/fintech/qv7hg5otdckrcprbxtrf.svg"
                alt="Login with Apple"
                width={25}
                height={31}
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img
                src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977147/fintech/mass56ztwpkywyfnbhx9.svg"
                alt="Login with Google"
                width={25}
                height={26}
              />
            </a>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Register;
