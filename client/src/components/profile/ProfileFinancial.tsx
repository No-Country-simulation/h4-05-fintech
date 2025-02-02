import { Card, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import Image from "../../assets/div.png"
import Casa from "../../assets/casa.svg"
import Educacion from "../../assets/educacion.svg"
import Ahorros from "../../assets/ahorros.svg"
import Barra from "../../assets/barra.png"
import Cuadro from "../../assets/cuadro.png"
import Foco from "../../assets/foco.png"
import Sello from "../../assets/sello.png"
import PerfiLanding from "../../assets/perfilLanding.png"

const ProfileFinancial = () => {

  return (
    <main className=" flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center mt-8" >
          <img
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            className="w-[341px] h-[49px]"
          />
        </div>
        <Card className="  shadow-lg rounded-xl border-2 border-[#116682]/20 p-4 border-spacing-4 backdrop-blur-[10px] h-[164px] w-[344px] flex-col justify-start gap-4 inline-flex ">
          <div className=" flex justify-between">
            <CardTitle className="text-[#BDE9FF] text-base font-normal tracking-wide justify-center gap-[125.50px] inline-flex">
              <p className="w-20 h-6 text-xl font-semibold leading-tight">Tu perfil</p>
            </CardTitle>
            <button className="border-gray-200 rounded-xl bg-[#004d64] text-[#bde9ff] text-sm px-3 py-1">
              Completado
            </button>
          </div>
          <div className="flex space-y-2">
            <img className="h-10 mt-3" src={Image} alt="perfil" />
            <div className="flex flex-col justify-normal ml-3">
              <CardDescription className="flex-1 text-[#BDE9FF] text-base font-normal tracking-wide">
                Juan Pérez
              </CardDescription>
              <p className="flex-1 text-sm text-[#e3dfff]">Perfil Inicial</p>
            </div>
          </div>
        </Card >
        <Card className="  shadow-lg rounded-xl border-2 border-[#116682]/20 p-4 border-spacing-4 backdrop-blur-[10px] h-[196px] w-[344px] flex-col justify-start gap-4 inline-flex ">
          <div className=" ">
            <CardTitle className="text-[#BDE9FF] text-xl font-semibold tracking-wide justify-center gap-[125.50px] inline-flex">
              Objetivos Financieros
            </CardTitle>
          </div>
          <div className="flex space-y-2">
            <div className="w-8">
              <img className="h-[16px] w-[18px]  mt-3" src={Casa} alt="casa" />
              <img className="h-[16px] w-[18px]  mt-4" src={Educacion} alt="educacion" />
              <img className="h-[16px] w-[18px]  mt-4" src={Ahorros} alt="ahorros" />
            </div>
            <div className="flex-1">
              <CardDescription className="text-[#BDE9FF] text-base font-normal tracking-wide">
                Comprar una casa
              </CardDescription>
              <CardDescription className="text-[#BDE9FF] text-base font-normal tracking-wide mt-3">
                Ahorrar para educación
              </CardDescription>
              <CardDescription className="text-[#BDE9FF] text-base font-normal tracking-wide mt-2">
                Fondo de emergencia
              </CardDescription>
            </div>
          </div>
        </Card >
        <Card className="  shadow-lg rounded-xl border-2 border-[#116682]/20 p-4 border-spacing-4 backdrop-blur-[10px] h-[136px] w-[344px] flex-col justify-start gap-4 inline-flex ">
          <div className=" ">
            <CardTitle className="text-[#BDE9FF] text-xl font-semibold tracking-wide justify-center gap-[125.50px] inline-flex">
              Nivel de Conocimiento
            </CardTitle>
          </div>
          <div className="">
            <img className="w-[310px] h-[8px] mt-3" src={Barra} alt="perfil" />
            <div className="">
              <CardDescription className="text-[#BDE9FF] text-base font-normal tracking-wide mt-3">
                Intermedio
              </CardDescription>
            </div>
          </div>
        </Card >
        <Card className="  shadow-lg rounded-xl border-2 border-[#116682]/20 p-4 border-spacing-4 backdrop-blur-[10px] h-[128px] w-[344px] flex-col justify-start gap-4 inline-flex ">
          <div className="">
            <CardTitle className="text-[#BDE9FF] text-xl font-semibold tracking-wide justify-center gap-[125.50px] inline-flex">
              Perfil de Riesgo
            </CardTitle>
          </div>
          <div className="flex justify-between">
            <button className=" rounded-xl bg-[#f97316] text-[#bde9ff] text-sm px-1 py-1">
              Moderado
            </button>
            <img className="h-[20px] mt-[20px]" src={Cuadro} alt="cuadro" />
          </div>
        </Card >
        <Card className="  shadow-lg rounded-xl border-2 border-[#116682]/20 p-4 border-spacing-4 backdrop-blur-[10px] h-[152px] w-[344px] flex-col justify-start gap-4 inline-flex ">
          <div className=" flex justify-between">
            <CardTitle className="text-[#BDE9FF] text-xl font-semibold tracking-wide justify-center gap-[125.50px] inline-flex">
              Recomendaciones
            </CardTitle>
          </div>
          <div className="flex space-y-2">
            <div className="w-8">
              <img className="h-[16px] w-[16px] mt-3" src={Foco} alt="foco" />
              <img className="h-[16px] w-[16px] mt-12" src={Sello} alt="sello" />
            </div>
            <div className="flex-1">
              <CardDescription className="text-[#BDE9FF] text-base font-normal tracking-wide">
                Diversifica tu portafolio
              </CardDescription>
              <p className="text-sm text-[#e3dfff]">Considera invertir en diferentes tipos de activos</p>
              <CardDescription className="text-[#BDE9FF] text-base font-normal tracking-wide">
                Proteje tus inversiones
              </CardDescription>
              <p className="text-sm text-[#e3dfff]">Manten un balance entre riesgo y seguridad</p>
            </div>
          </div>
        </Card >
        <Button
          className="ml-30 px-4 py-2 w-full h-[52px] placeholder-opacity-85 bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
        >
          Continuar
        </Button>
        <div>
          <br />
        </div>
      </div >
    </main >
  )
}

export default ProfileFinancial;
