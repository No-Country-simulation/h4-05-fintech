import { Button, Card } from "@tremor/react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Modal } from "../ui/modal";

const SharesPage = () => {
  const [_searchItem, setSearchItem] = useState<string>("")
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  const [showRiskModal, setShowRiskModal] = useState<boolean>(false);
  const [showRequirementsModal, setShowRequirementsModal] = useState<boolean>(false);

  const handleSearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchItem(e.target.value);
  }

  const handleShowDescriptionModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDescriptionModal(true);
  }

  const handleShowRiskModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowRiskModal(true);
  }

  const handleShowRequirementsModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowRequirementsModal(true);
  }

  return (
    <>
      <div className="flex flex-col justify-start space-y-4 lg:max-w-md row-span-12 mb-28">
        <Input
          id="search"
          onChange={handleSearchItem}
          placeholder="Buscar acción"
          isSearchItem={true}
          className="rounded-xl bg-customGray text-lightBlue placeholder:text-lightBlue focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
        />
        <Card className="w-full flex flex-col justify-center items-start space-y-5 bg-darkBlue font-semibold text-lightBlue">
          <h1>Información detallada</h1>
          <div className="flex flex-col space-y-3 justify-center items-start">
            <Button 
              className="inline-flex justify-center items-center bg-transparent focus:bg-transparent text-lightBlue border-none -mx-4"
              onClick={handleShowDescriptionModal}
            >
              <p className="font-semibold">Descripción</p>
            </Button>
            <Button 
              className="inline-flex justify-center items-center bg-transparent focus:bg-transparent text-lightBlue border-none -mx-4"
              onClick={handleShowRiskModal}
            >
              <p className="font-semibold">Riesgos asociados</p>
            </Button>
            <Button 
              className="inline-flex justify-center items-center bg-transparent focus:bg-transparent text-lightBlue border-none -mx-4"
              onClick={handleShowRequirementsModal}
            >
              <p className="font-semibold">Requisitos para invertir</p>
            </Button>
            <Button className="inline-flex justify-center items-center bg-transparent text-lightBlue border-none -mx-4">
              <p className="font-semibold">Recomendaciones</p>
            </Button>
          </div>
        </Card>
      </div>

      <Modal className="flex justify-center items-end" showModal={showDescriptionModal} onCloseModal={() => setShowDescriptionModal(false)}>
        <div className="w-[350px] bg-darkBlue rounded-xl flex flex-col justify-start space-y-4 lg:max-w-md row-span-12 px-4 py-6">
          <h1 className="text-lightBlue text-center font-semibold">Portafolio de inversión</h1>
          <h1 className="text-lightBlue font-semibold">Información detallada</h1>
          <ul className="text-lightBlue text-justify space-y-2 ml-4 list-disc">
            <li>
              Las acciones representan una parte del capital social de una empresa. Al comprar acciones, te conviertes en accionista y tienes derecho a una parte de las ganancias y activos de la empresa. El valor de las acciones puede subir o bajar según la situación de la empresa y las condiciones del mercado.
            </li>
            <li>
              Ejemplo: Comprar acciones de una empresa tecnológica como Apple te convierte en accionista de esa empresa. Si Apple tiene éxito y sus acciones suben de valor, tus acciones también aumentarán de valor.
            </li>
          </ul>
        </div>
      </Modal>

      <Modal className="flex justify-center items-end" showModal={showRiskModal} onCloseModal={() => setShowRiskModal(false)}>
        <div className="w-[350px] bg-darkBlue rounded-xl flex flex-col justify-start space-y-4 lg:max-w-md row-span-12 px-4 py-6">
          <h1 className="text-lightBlue text-center font-semibold">Riesgos asociados</h1>
          <h1 className="text-lightBlue font-semibold">Información detallada</h1>
          <ul className="text-lightBlue text-justify space-y-2 ml-4 list-disc">
            <li>
              Nivel de riesgo: Las acciones se consideran una inversión de riesgo moderado a alto.
            </li>
            <li>
              Consideraciones: El precio de las acciones puede ser volátil y puedes perder parte o la totalidad de tu inversión. Sin embargo, a largo plazo, las acciones también tienen el potencial de ofrecer mayores rendimientos que otras inversiones más conservadoras.
            </li>
          </ul>
        </div>
      </Modal>

      <Modal className="flex justify-center items-end" showModal={showRequirementsModal} onCloseModal={() => setShowRequirementsModal(false)}>
        <div className="w-[350px] bg-darkBlue rounded-xl flex flex-col justify-start space-y-4 lg:max-w-md row-span-12 px-4 py-6">
          <h1 className="text-lightBlue text-center font-semibold">Requisitos para invertir</h1>
          <h1 className="text-lightBlue font-semibold">Información detallada</h1>
          <ul className="text-lightBlue text-justify space-y-2 ml-4 list-disc">
            <li>
              Condiciones: Necesitas una cuenta en un bróker o una sociedad de bolsa habilitada para operar en el mercado de valores.
            </li>
            <li>
              Cantidades mínimas: La cantidad mínima para invertir en acciones varía según el bróker y la acción específica. Algunas acciones pueden ser muy accesibles, mientras que otras requieren una inversión mayor.
            </li>
          </ul>
        </div>
      </Modal>
    </>
  )
}

export default SharesPage;