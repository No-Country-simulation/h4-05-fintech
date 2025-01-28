import { Link, useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { IUpdateProfileData } from "@/interfaces/profile.interfaces";

const StartPage = () => {
  const navigate = useNavigate();

  const data = sessionStorage.getItem('profile') as unknown as IUpdateProfileData;

  const defaultValues: IUpdateProfileData = {
    name: data.name ?? '',
    lastname: data.lastname ?? '',
    age: data.age ?? 0,
    occupation: data.occupation ?? '',
    image: data.image ?? '',
    itemsSaved: [],
  }

  const startProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/profile/names', { state: { data: defaultValues, started: true }});
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="justify-items-center grid-rows-12 mt-[1rem] ">
          <img 
          src="https://res.cloudinary.com/dm20y1ica/image/upload/v1737673944/bank2_1_rhi4ww.svg"
          alt="bank"
          className="w-[244px] h-[244px]"
          />
        </div>
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            className="w-[341px] h-[49px]"
          />
        </div>
        <Card className= "flex flex-col shadow-none border-none">
          <div className=" justify-end grid-rows-12">
            <p className="text-[#88D0EF] text-center">Para ofrecerte un servicio bien personalizado y que te sirva de verdad, nos gustaría saber un poco más sobre vos. ¿Qué te parece si arrancamos con algunas preguntas?</p>
          </div>

          <div className="mt-[8rem]">
            <Link to="/nombre">
              <Button
                className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
                onClick={startProfile}
              >
                Comencemos
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  )
}

export default StartPage;
