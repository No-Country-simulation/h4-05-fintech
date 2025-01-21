import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { instance } from "@/api/axios";
import { Navigate, useNavigate } from "react-router";

interface formValues {
  email: string;
  password: string;
}

const initilValues: formValues = {
  email: "",
  password: "",
};

const LoginPage = () => {

  const [formData, setFormData] = useState<formValues>(initilValues); 
  const navigate = useNavigate();


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    setMessage("");
    setError("");

    try {
      const { data } = await instance.post(
        '/auth/login',
        formData,
        {
          withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }
        }
      );
      setMessage(data.message);
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      setError(
        error.response?.data?.message || "¡La operación se realizó con éxito!"
      );
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
            Inicio de Sesión
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
                Mínimo 8 caracteres
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
                Recuperar Contraseña
              </p>
            </div>

            <Button type="submit" className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
              Iniciar sesión
            </Button>
          </form>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
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

export default LoginPage;
