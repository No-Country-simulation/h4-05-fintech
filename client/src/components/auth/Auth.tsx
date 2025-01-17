import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Auth = () => {
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
        <Card className="shadow-none border-none mt-30">
          <div>
            <Link to="/auth/login">
              <Button className="w-full h-[52px] bg-[#11668233] text-[#BDE9FF] text-base font-normal tracking-wide">
                Iniciar sesión
              </Button>
            </Link>
          </div>

          <div className="mt-5">
            <Link to="/auth/register">
              <Button className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
                Registrarme
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Auth;