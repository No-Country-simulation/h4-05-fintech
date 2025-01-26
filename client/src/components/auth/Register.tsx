"use client";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IRegister } from "@/interfaces/auth,interfaces";
import { ApiErrorMessages, IApiError } from "@/api/api-errors";
import { loginWithApple, loginWithGoogle, registerUser } from "@/api/auth.routes";
import { OAuth2Button } from "../ui/oauth2-button";

const initilValues: IRegister = {
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [formData, setFormData] = useState<IRegister>(initilValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = loginWithGoogle();
    response.then(({ data }) => window.location.href = data.url);
  }

  const handleAppleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = loginWithApple();
    response.then(({ data }) => window.location.href = data.url);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = registerUser(formData);

    response
      .then(() => navigate('/auth/registered', { 
        state: { 
          email: formData.email, 
          registered: false 
        } 
      }))
      .catch((error: AxiosError) => {
        const errorMessage: IApiError = error.response?.data as IApiError;
        if (errorMessage.message === ApiErrorMessages.REGISTERED_USER) {
          navigate('/auth/registered', { 
            state: { 
              email: formData.email, 
              registered: true 
            } 
          })
        }
      })
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
            Registrarse
          </h1>
        </div>
        <Card className="shadow-none border-none">
          <form 
            data-cy="register-form" 
            onSubmit={handleSubmit} 
            className="space-y-2"
          >
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="email" className="text-[#8BD0EF]">
                Correo electrónico
              </Label>
              <Input
                data-cy="email-input"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese su correo electronico"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
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
                data-cy="password-input"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="***********"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
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
                data-cy="confirm-password-input"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="***********"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
              />
              <p className="text-xs text-[#8BD0EF] font-medium">
                Minimo 8 caracteres
              </p>
            </div>
            {loading 
              ? <Button
                  type="submit"
                  className="w-full h-[52px] bg-[#8D4E2A33] text-[#BDE9FF] text-base font-normal tracking-wide"
                >
                  Procesando...
                </Button>
              : <Button
                  type="submit"
                  className="w-full h-[52px] bg-[#8D4E2A33] text-[#BDE9FF] text-base font-normal tracking-wide"
                >
                  Registrarse
                </Button>
            }
          </form>
          {error && <p>{error}</p>}
          <div className="flex justify-center items-center gap-4 mt-5">
            <OAuth2Button
              data-cy="apple-button"
              label="Apple" 
              className="hover:opacity-80 transition-opacity" 
              onClick={handleAppleLogin}
            />
            <OAuth2Button
              data-cy="google-button"
              label="Google"
              className="hover:opacity-80 transition-opacity" 
              onClick={handleGoogleLogin}
            />
          </div>
        </Card>
      </div>
    </main>
  );
};

export default RegisterPage;
