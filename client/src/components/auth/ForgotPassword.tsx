"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { forgotPassword } from "@/api/auth.routes";
import { AxiosError } from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(e.target.value);
  };
    
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const response = forgotPassword(email);

    response
      .then(() => console.log("Email sent"))
      .catch((error: AxiosError) => console.error(error))
      .finally(() => setLoading(false));
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
            Recuperar contraseña
          </h1>
        </div>
        <Card className="border-none shadow-none">
          <form
            data-cy="login-form"
            onSubmit={handleSubmit} 
            className="space-y-2 mt-[10rem]"
          >
            <div className="rounded-xl space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="email" className="text-[#8BD0EF]">
                Correo electrónico
              </Label>
              <Input
                data-cy="email-input"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Ingrese su correo electronico"
                className="rounded-xl bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
              />
              <p className="text-xs text-[#8BD0EF] font-medium">
                Te enviaremos un código de recuperación
              </p>
            </div>
            {loading 
              ? <Button 
                  type="submit" 
                  className="w-full h-[52px] rounded-xl bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide" 
                  disabled={true}
                >
                  Procesando...
                </Button>
              : <Button 
                  type="submit" 
                  className="w-full h-[52px] rounded-xl bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
                >
                  Enviar
                </Button>
            }
          </form>
          {error && <p className="text-center text-red-600">{error}</p>}
        </Card>
      </div>
    </main>
  )
}

export default ForgotPasswordPage;