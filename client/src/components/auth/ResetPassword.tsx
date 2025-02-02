import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IResetPassword } from "@/interfaces/auth,interfaces";
import { resetPassword, verifyResetPasswordCode } from "@/api/auth.routes";

const initilValues: IResetPassword = {
  newPassword: "",
  confirmPassword: ""
};

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState<IResetPassword>(initilValues);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean | null>();

  const hasFetched = useRef(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
  
      const response = verifyResetPasswordCode(code);
  
      response
        .then(() => setVerified(true))
        .catch((_error) => {
          setVerified(false);
          setTimeout(() => {
            navigate('/auth')
          }, 3000)
        })
        .finally(() => setLoadingPage(false));
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = resetPassword(code, formData);

    response
      .then(() => navigate('/auth/reset-password/success', { state: { reset: true } }))
      .catch((error: AxiosError) => console.error(error))
      .finally(() => setLoading(false));
  };
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {loadingPage
        ? <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">Cargando...</h1>
        : <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col items-center">
              <img
                src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
                alt="Logo"
                width={342}
                height={50}
              />
              <h1 className="text-lightBlue font-medium mt-5 mb-4 text-base text-center">
                {!verified 
                  ? 'Ha ocurrido un error en el proceso de verificación. Volviendo a la página de inicio.'
                  : 'Recuperación de contraseña'
                }
              </h1>
            </div>
            {verified &&
              <Card className="border-none shadow-none">
                <form
                  data-cy="login-form"
                  onSubmit={handleSubmit} 
                  className="space-y-2 mt-[10rem]"
                >
                  <div className="rounded-lg space-y-2 bg-darkBlue p-3">
                    <Label htmlFor="email" className="text-lightBlue">
                      Nueva contraseña
                    </Label>
                    <Input
                      data-cy="password-input"
                      id="password"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="***********"
                      className="bg-customGray text-lightBlue placeholder:text-lightBlue focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                      required
                    />
                    <p className="text-xs text-[#8BD0EF] font-medium">
                      Minimo 8 caracteres, una mayúscula y un número
                    </p>
                  </div>
                  <div className="rounded-lg space-y-2 bg-darkBlue p-3">
                    <Label htmlFor="password" className="text-lightBlue">
                      Confirmar Contraseña
                    </Label>
                    <Input
                      data-cy="confirm-password-input"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="***********"
                      className="bg-customGray text-lightBlue placeholder:text-lightBlue focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                      required
                    />
                    <p className="text-xs text-lightBlue font-medium">
                      Minimo 8 caracteres, una mayúscula y un número
                    </p>
                  </div>
                  {loading 
                    ? <Button type="submit" className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide" disabled={true}>
                        Procesando...
                      </Button>
                    : <Button 
                        type="submit" 
                        className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
                      >
                        Cambiar contraseña
                      </Button>
                  }
                </form>
                {error && <p className="text-center text-red-600">{error}</p>}
              </Card>
            }
          </div>
        }     
    </main>
  )
}

export default ResetPasswordPage;