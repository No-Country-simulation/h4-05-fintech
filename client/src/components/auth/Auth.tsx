import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AuthPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            className="w-[342px] h-[50px]"
          />
        </div>
        <Card className="flex flex-col shadow-none border-none">
          <div className="justify-end space-y-6 grid-rows-12 mt-[20rem]">
            <div>
              <Link to="/auth/login">
                <Button 
                  className="w-full h-[52px] rounded-xl bg-[#11668233] text-[#BDE9FF] text-base font-normal tracking-wide"
                  data-cy="login"
                >
                  Iniciar sesión
                </Button>
              </Link>
            </div>
            <div>
              <Link to="/auth/register">
                <Button 
                  className="w-full h-[52px] rounded-xl bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
                  data-cy="register"
                >
                  Registrarme
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default AuthPage;