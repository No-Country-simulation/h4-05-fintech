"use client";
import { Button } from "@/components/ui/button";
import { Card} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast} from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";
import {useState} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Register = () => {

  const [formData, setFormData] = useState({ 
    email: "",
    password: "",
    confirmPassword: ""
});
const [message, setMessage] = useState("");
const [error, setError] = useState("");

const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submitted");
    setMessage("");
    setError("");

    try {
      const { data } = await axios.post("https://iupi-fintech-api-dev.onrender.com/auth/registry", formData);
      setMessage(data.message);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message ||  toast.success("¡La operación se realizó con éxito!", {
    duration: 4000,
    progress: true,
    position: "top-right",
    transition: "bounceIn",
    icon: '',
    sonido: true,
  }));
    }
  };


return (
    <main className="min-h-screen flex flex-col items-center justify-center mt-20">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <Image
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            width={342}
            height={50}
            priority
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

            <Button className="w-full h-[52px] bg-[#8D4E2A33] text-[#BDE9FF] text-base font-normal tracking-wide">
              Registrarse
            </Button>
          </form>
          <div className="flex justify-center items-center gap-4 -mt-250">
            <Link href="/auth" className="hover:opacity-80 transition-opacity">
              <Image
                src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977163/fintech/qv7hg5otdckrcprbxtrf.svg"
                alt="Login with Apple"
                width={25}
                height={31}
              />
            </Link>
            <Link href="/auth" className="hover:opacity-80 transition-opacity">
              <Image
                src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977147/fintech/mass56ztwpkywyfnbhx9.svg"
                alt="Login with Google"
                width={25}
                height={26}
              />
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Register;