import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center mt-10">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <Image
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            width={342}
            height={50}
            priority
          />
          
        </div>
        <Card className="shadow-none border-none mt-30">
            <div className="">
              <Link href="/auth/login">
                <Button className="w-full h-[52px] bg-[#8D4E2A33] text-[#BDE9FF] text-base font-normal tracking-wide">
                Iniciar sesión
                </Button>
              </Link>
            </div>

            <div className="mt-5">
              <Link href="/auth/register">
                <Button className="w-full h-[52px] bg-gradient-to-r from-yellow-950 via-amber-900 to-zinc-600 text-[#BDE9FF] text-base font-normal tracking-wide hover:bg-gradient-to-r hover:from-yellow-950 hover:via-gray-800 hover:to-zinc-600">
                  Registrarme
                </Button>
               </Link>
            </div>
        </Card>
      </div>
    </main>
  );
};

export default Home;
