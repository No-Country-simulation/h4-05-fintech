import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';
import { verifyUser } from '@/api/auth.routes';
import { Card } from '../ui/card';

const VerifyPage = ()  => {
  const [loading, setLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean | null>();

  const hasFetched = useRef(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;

      const response = verifyUser(code);

      response
        .then(() => setVerified(true))
        .catch((_error) => {
          setVerified(false);
          setTimeout(() => {
            navigate('/auth')
          }, 3000)
        })
        .finally(() => setLoading(false));
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
            {verified
              ? <div className="justify-end space-y-3 grid-rows-12 mt-[16rem]">
                  <div>
                    <h1 className="text-lightBlue font-medium mt-5 mb-4 text-base">
                      Usuario verificado con éxito. Ya puedes iniciar sesión.
                    </h1>
                  </div>
                  <div>
                    <Link to="/auth/login">
                      <Button type="submit" className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide">
                        Iniciar sesión
                      </Button>
                    </Link>
                  </div>
                </div>
              : <h1 className="text-lightBlue font-medium mt-5 mb-4 text-base text-center">
                  Ha ocurrido un error en el proceso de verificación. Volviendo a la página de inicio.
                </h1>
            }
            </Card>
            </div>
          </div>
        }
    </main>
  );
};

export default VerifyPage;