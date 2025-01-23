"use client";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const Registered = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasTriggered = useRef(false);

  const { email, registered } = location.state || {};

  useEffect(() => {
    if (!hasTriggered.current) {
      hasTriggered.current = true;
      if (!email) navigate('/auth/register')
    }
  }, [])

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
          {!registered 
            ? <h1 className="text-lightBlue font-medium mt-5 mb-4 text-center">
                Revisa tu dirección de correo
              </h1>
            : <h1 className="text-lightBlue font-medium mt-5 mb-4 text-center">
                El correo <span className="text-orange-600">{email}</span> ya está registrado
              </h1>
          }
          {!registered 
            ? <p className="text-lightBlue text-center">
                Te hemos una confimación de registro a <span className="text-orange-600">{email}</span>
              </p>
            : <p className="text-lightBlue text-center">
                Si aún no has verificado tu correo, reenvía el código de verificación.
                Si ya lo has veriifcado, intenta iniciar sesión.
              </p>
            }
        </div>
        <Card className="shadow-none border-none">
          <div>
            <Link to="/auth/login">
              <Button className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
                {!registered ? "Ya lo confirmé" : "Iniciar sesión"}
              </Button>
            </Link>
          </div>
          <div className="mt-5">
            <Button className="w-full h-[52px] bg-[#11668233] text-[#BDE9FF] text-base font-normal tracking-wide">
              Reenviar confirmación
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Registered;
