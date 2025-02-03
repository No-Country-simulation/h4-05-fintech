import { Card, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import Twitter from "../../assets/twitter.png"
import Linkedin from "../../assets/linkedin.png"
import Instagram from "../../assets/instagram.png"
import FinancePl from "../../assets/financePL.png"
import I from "../../assets/i.png"
import Flecha from "../../assets/flecha.png"
import Ana from "../../assets/ana.png"
import Estrella from "../../assets/estrella.png"
import PerfilLanding from "../../assets/perfilLanding.png"

const LandingPage = () => {

  return (
    <main className=" flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center mt-8" >
          <img
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            className=" flex-3/4 w-[285px] h-[49px] ml-1"
          />
          <img
            src={PerfilLanding}
            alt="perfilLanding"
            className=" flex-1 h-[20px] w-[10px]"

          />
        </div>
        <div className="flex items-center justify-items-center">
          <p className="text-xl text-[#bde9ff] text-center ml-20 font-poppins">Tu futuro financiero <br /> empieza aquí</p>
        </div>
        <div className="flex items-center justify-items-center">
          <p className="text-sm text-[#bde9ff] text-center font-inter ml-10">Inversiones inteligentes personalizadas para <br /> alcanzar tus metas financieras</p>
        </div>
        <Card className="  shadow-lg rounded-xl border-2 border-[#116682]/20 p-4 border-spacing-2 backdrop-blur-[10px] h-[196px] w-[344px] flex-col justify-start gap-4 inline-flex ">
          <div className=" flex justify-center">
            <img className="w-[150px] h-[170px]" src={FinancePl} alt="perfil" />
          </div>
        </Card >
        <Button className="ml-30 px-4 py-2 w-[352px] h-[52px] rounded-xl shadow-xl placeholder-opacity-85 bg-[#F9731633] text-[#BDE9FF] text-base font-openSans tracking-wide">
          Unete a iUPi
        </Button>
        <div className="flex items-center justify-items-center">
          <p className="text-[16px] text-[#bde9ff] text-center ml-20 font-poppins">Tu perfil, tus inversiones.</p>
        </div>
        <div className="flex items-center justify-items-center">
          <p className="text-sm text-[#bde9ff] text-center font-openSans ml-10">Creamos un perfil personalizado basado en tus <br /> objetivos y tolerancia al riesgo</p>
        </div>

        <Card className="shadow-lg rounded-2xl bg-[#81e4fd]/20 border-2 border-[#116682]/20 p-1 border-spacing-4 h-[88px] w-[342px] flex-col justify-start  inline-flex ">
          <div className=" ">
            <CardTitle className="text-[#BDE9FF] text-[16px] font-poppins font-semibold tracking-wide justify-end inline-flex ml-10">
              Análisis personalizado
            </CardTitle>
          </div>
          <div className="flex space-y-2">
            <div className="w-8">
              <img className="h-[16px] w-[18px]  mt-3 ml-2" src={I} alt="casa" />
            </div>
            <div className="flex-1">
              <CardDescription className="text-[#BDE9FF] text-[14px] font-openSans tracking-wide ml-2 justify-end">
                Evaluamos tu perfil para recomendaciones precisas
              </CardDescription>
            </div>
          </div>
        </Card >
        <Card className="shadow-lg rounded-2xl bg-[#81e4fd]/20 border-2 border-[#116682]/20 p-1 border-spacing-4 h-[88px] w-[342px] flex-col justify-start  inline-flex ">
          <div className=" ">
            <CardTitle className="text-[#BDE9FF] text-[16px] font-poppins font-semibold tracking-wide justify-end inline-flex ml-10">
              Gestión de riesgos
            </CardTitle>
          </div>
          <div className="flex space-y-2">
            <div className="w-8">
              <img className="h-[16px] w-[18px]  mt-3 ml-2" src={I} alt="casa" />
            </div>
            <div className="flex-1">
              <CardDescription className="text-[#BDE9FF] text-[14px] font-openSans tracking-wide ml-2 justify-end">
                Proteje tu inversión con estrategias probadas
              </CardDescription>
            </div>
          </div>
        </Card>
        <div className="flex items-center justify-items-center mt-10">
          <p className="text-[16px] text-[#bde9ff] text-normal font-poppins">Invierte con inteligencia</p>
        </div>
        <div className="flex items-center justify-items-center">
          <p className="text-sm text-[#bde9ff] text-normal font-inter">Descubre oportunidades de inversión basadas en datos</p>
        </div>
        <Card className="shadow-lg rounded-2xl bg-[#8BD0EF]/20 border-2 border-[#116682]/20 p-1 border-spacing-4 h-[88px] w-[342px] flex-col justify-start  inline-flex ">
          <div className=" ">
            <CardTitle className="text-[#BDE9FF] text-[16px] font-inter font-semibold tracking-wide justify-end inline-flex ml-10">
              Tecnología
            </CardTitle>
          </div>
          <div className="flex space-y-2">
            <div className="w-64 flex-shrink-0 mt-3">
              <CardDescription className="text-[#BDE9FF] text-[14px] font-inter tracking-wide ml-10 justify-end">
                +15.2% último trimestre
              </CardDescription>
            </div>
            <div className="flex-grow">
              <img className=" h-[16px] w-[18px]  mt-1 ml-5" src={Flecha} alt="casa" />
            </div>
          </div>
        </Card>
        <Card className="shadow-lg rounded-2xl bg-[#8BD0EF]/20 border-2 border-[#116682]/20 p-1 border-spacing-4 h-[88px] w-[342px] flex-col justify-start  inline-flex ">
          <div className=" ">
            <CardTitle className="text-[#BDE9FF] text-[16px] font-inter font-semibold tracking-wide justify-end inline-flex ml-10">
              Energias Renovables
            </CardTitle>
          </div>
          <div className="flex space-y-2">
            <div className="w-64 flex-shrink-0 mt-3">
              <CardDescription className="text-[#BDE9FF] text-[14px] font-inter tracking-wide ml-10 justify-end">
                +8.7% último trimestre
              </CardDescription>
            </div>
            <div className="flex-grow">
              <img className=" h-[16px] w-[18px]  mt-1 ml-5" src={Flecha} alt="casa" />
            </div>
          </div>
        </Card>
        <p className="font-poppins text-center text-[#BDE9FF] text-[16px]">Unete a la comunidad de inversores</p>
        <p className="font-inter text-center text-[#BDE9FF] text-[16px]">Aprende y crece junto a otros inversores</p>
        <p className="font-inter text-center text-[#BDE9FF] text-[16px]">Foros Populares</p>
        <div className="flex">
          <p className=" flex-1 font-inter text-normal text-[#BDE9FF] text-[14px]">Estrategias de Inversion</p>
          <button className=" w-[85px] h-[24px] text-[#BDE9FF] text-[12px] font-inter bg-[#8BD0EF]/40 px-3 py-1">
            324 posts
          </button>
        </div>
        <div className="flex">
          <p className=" flex-1 font-inter text-normal text-[#BDE9FF] text-[14px]">Análisis de Mercado</p>
          <button className=" w-[85px] h-[24px] text-[#BDE9FF] text-[12px] font-inter bg-[#8BD0EF]/40 px-3 py-1">
            156 posts
          </button>
        </div>
        <p className="mt-8 flex-1 font-inter text-normal text-[#BDE9FF] text-[24px]">Lo que dicen nuestros usuarios</p>
        <Card className="  shadow-lg bg-[#8BD0EF]/20 rounded-xl border-[#116682]/20 p-3 border-spacing-4 backdrop-blur-[10px] h-[152px] w-[344px] flex-col justify-start gap-4 inline-flex overflow-hidden group">
          <div className="flex space-y-2 ml-3">
            <img className="h-10 mt-1" src={Ana} alt="ana" />
            <div className="flex flex-col justify-normal ml-4">
              <CardDescription className="text-[#BDE9FF] text-[16px] font-inter tracking-wide ">
                Ana Garcia
              </CardDescription>
              <img className="h-3  w-[84.53px] mt-1" src={Estrella} alt="ana" />
            </div>
          </div>
          <p className="text-[14px] text-[#BDE9FF] font-inter ml-3">La mejor decision para mis inversiones. Las recomendaciones son precisas y el soporte es excelente </p>
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-500 transition-all duration-300 animate-pulse"></div>
        </Card >
        <div className="mt-5">
          <p className="text-[20px] text-[#e3dfff] text-center font-inter">¿Listo para empezar?</p>
        </div>
        <Button
          className="ml-30 px-4 py-2 w-full h-[52px] rounded-[8px] placeholder-opacity-85 bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
        >
          Continuar
        </Button>
        <div>
          <br />
        </div>
        <div className="space-y-6">
          <div className="flex gap-6 justify-center items-center">
            <img src={Twitter} alt="twitter" />
            <img src={Linkedin} alt="linkedin" />
            <img src={Instagram} alt="instagram" />
          </div>
          <div className="las">
            <p className="text-center text-[#BDE9FF] font-inter">© 2025 iUpi. Todos los derechos reservados.</p>
            <p className="text-center text-[#BDE9FF] font-inter">Aviso Legal,   Privacidad,     Términos</p>
          </div>
        </div>
        <br />
      </div >
    </main >
  );
};

export default LandingPage;

