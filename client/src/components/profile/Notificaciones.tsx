import { Card, CardDescription, CardTitle } from "../ui/card";
import Interrogacion from "../../assets/interrogacion.svg"
import Relevante from "../../assets/relevantes.svg"
import Aporte from "../../assets/aporte.svg"
import Rendimiento from "../../assets/rendimiento.svg"


const Notificaciones = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="mt-5 w-full max-w-md space-y-6">
        <div className="grid-rows-12">
          <p className="text-[20px] text-[#BDE9FF] font-roboto">Notificaciones</p>
        </div>
        <Card className="border-[#004D64]/20 border-b-[#BDE9FF] rounded-[8px] shadow-none font-roboto text-[#BDE9FF] h-[68px] w-[336] bg-[#004D64]/20 ">
          <div className="flex mt-2">
            <div className="flex-1/3 ml-3 mt-2">
              <img src={Interrogacion} alt="precio" className="w-[32px] h-[31px]" />
            </div>
            <div className="ml-3">
              <CardTitle className="text-[14px]">
                Alerta de precio
              </CardTitle>
              <CardDescription className="text-[12px]">
                Atención las acciones de Apple subieron 2.6%
                <span>¿Quieres vender?</span>
              </CardDescription>
            </div>
          </div>
        </Card>
        <Card className="border-[#004D64]/20 border-b-[#BDE9FF] rounded-[8px] shadow-none font-roboto text-[#BDE9FF] h-[68px] w-[336] bg-[#004D64]/20">
          <div className="flex mt-2">
            <div className="flex-1/3 ml-3 mt-2">
              <img src={Relevante} alt="releante" className="w-[32px] h-[32px]" />
            </div>
            <div className="ml-3">
              <CardTitle className="text-[14px]">
                Noticias Relevantes
              </CardTitle>
              <CardDescription className="text-[12px]">
                ¡Info Clave! El dolar blue subio. ¿Como impacta esto en tus CEDEARS? <br />
              </CardDescription>
            </div>
          </div>
        </Card>
        <Card className=" border-[#004D64]/20 border-b-[#BDE9FF] rounded-[8px] shadow-none font-roboto text-[#BDE9FF] h-[68px] w-[336] bg-[#004D64]/20">
          <div className="flex mt-2">
            <div className="flex-1/3 ml-3 mt-2">
              <img src={Aporte} alt="releante" className="w-[32px] h-[32px]" />
            </div>
            <div className="ml-3">
              <CardTitle className="text-[14px]">
                Recordatorio de aporte
              </CardTitle>
              <CardDescription className="text-[12px]">
                ¡Dale! Es hora de invertir en tu futuro. ¡Aporta a tus ahorros!
              </CardDescription>
            </div>
          </div>
        </Card>
        <Card className=" border-[#004D64]/20 border-b-[#BDE9FF] rounded-[8px] shadow-none font-roboto text-[#BDE9FF] h-[68px] w-[336] bg-[#004D64]/20">
          <div className="flex mt-2">
            <div className="flex-1/3 ml-3 mt-2">
              <img src={Rendimiento} alt="rendimiento" className="w-[32px] h-[32px]" />
            </div>
            <div className="ml-3">
              <CardTitle className="text-[14px]">
                Actualización de rendimiento
              </CardTitle>
              <CardDescription className="text-[12px]">
                ¡Buenas noticias! Tu cartera creció un X% ¡Segui invirtiendo!
              </CardDescription>
            </div>
          </div>
        </Card>

      </div >
    </main >
  )
}

export default Notificaciones;
