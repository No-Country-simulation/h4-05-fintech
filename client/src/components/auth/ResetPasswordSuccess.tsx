import {  Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const ResetPasswordSuccess = ()  => {
  const [loading, setLoading] = useState<boolean>(true);

  const hasFetched = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  const reset = location.state as { reset: boolean }

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setLoading(false);

      if (!reset) {
        navigate('/auth')
      }
    }
  }, [])


  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {loading 
        ? <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">Cargando...</h1>
        : <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col items-center">
              <img
                src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
                alt="Logo"
                width={342}
                height={50}
              />
              <Card className="shadow-none border-none">
                <div className="justify-end space-y-3 grid-rows-12 mt-[16rem]">
                  <div>
                    <h1 className="text-lightBlue font-medium mt-5 mb-4 text-base">
                      Has reestablecido tu contraseña. Ahora intenta iniciar sesión.
                    </h1>
                  </div>
                  <div>
                    <Link to="/auth/login">
                      <Button type="submit" className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
                        Iniciar sesión
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        }
    </main>
  );
};

export default ResetPasswordSuccess;