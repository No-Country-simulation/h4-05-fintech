import { Button } from "@tremor/react";
import { Card } from "../ui/card";
import HistoryGraph from "../ui/line-chart"
import { useState } from "react";
import { Modal } from "../ui/modal";

const chartData = [
  {
    date: 'Ene',
    Ingresos: 800,
    Ahorro: 10,
    Gastos: 250,
  },
  {
    date: 'Feb',
    Ingresos: 600,
    Ahorro: 100,
    Gastos: 400,
  },
  {
    date: 'Mar',
    Ingresos: 850,
    Ahorro: 120,
    Gastos: 900,
  },
  {
    date: 'Abr',
    Ingresos: 550,
    Ahorro: 50,
    Gastos: 500,
  },
  {
    date: 'May',
    Ingresos: 750,
    Ahorro: 200,
    Gastos: 1000,
  },
  {
    date: 'Jun',
    Ingresos: 600,
    Ahorro: 100,
    Gastos: 200,
  },
];

const SavingsPage = () => {
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);

  const handleShowPortfolioModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowProfileModal(true);
  }

  const handleShowTransferModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowTransferModal(true);
  }

  return (
    <>
      <div className="flex flex-col justify-center space-y-4 lg:max-w-md row-span-12 mb-28">
        <div className="flex justify-center items-center">
          <Button 
            className="flex justify-center items-center bg-rusty text-lightOrange border-none rounded-xl w-[40%]"
            onClick={handleShowPortfolioModal}
          >
            <div className="flex flex-col space-y-2 justify-center items-center px-6 py-2">
              <p className="font-semibold">Portafolio</p>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M11.3 14.4H1.7V21.6C1.7 22.2365 1.95286 22.847 2.40294 23.2971C2.85303 23.7471 3.46348 24 4.1 24H20.9C21.5365 24 22.147 23.7471 22.5971 23.2971C23.0471 22.847 23.3 22.2365 23.3 21.6V14.4H13.7V16.8H11.3V14.4ZM11.3 13.2H0.5V6C0.5 4.68 1.58 3.6 2.9 3.6H7.7V2.4C7.7 1.76348 7.95286 1.15303 8.40294 0.702944C8.85303 0.252856 9.46348 0 10.1 0L14.9 0C15.5365 0 16.147 0.252856 16.5971 0.702944C17.0471 1.15303 17.3 1.76348 17.3 2.4V3.6H22.1C22.7365 3.6 23.347 3.85286 23.7971 4.30294C24.2471 4.75303 24.5 5.36348 24.5 6V13.2H13.7V10.8H11.3V13.2ZM14.9 3.6V2.4H10.1V3.6H14.9Z" fill="#FFDBCA"/>
              </svg>
            </div>
          </Button>
        </div>
        <div className="flex space-x-2 justify-center items-center mb-3">
          <Card className="w-full rounded-xl bg-darkBlue text-lightBlue p-3 border-none">
            <div className="flex justify-start items-center space-x-3">
              <p className="font-semibold">Ingresos</p>
            </div>
            <p className="font-semibold text-[24px]">$0</p>
          </Card>
          <Card className="w-full rounded-xl bg-rusty text-lightOrange p-3 border-none">
            <div className="flex justify-start items-center space-x-3">
              <p className="font-semibold">Gastos</p>
            </div>
            <p className="font-semibold text-[24px]">$0</p>
          </Card>
        </div>
        <div className="flex space-x-2 justify-center items-center">
          <Card className="w-full rounded-xl bg-darkBlue text-lightBlue p-3 border-none">
            <div className="flex justify-start items-center space-x-3">
              <p className="font-semibold">Disponible</p>
            </div>
            <p className="font-semibold text-[24px]">0%</p>
          </Card>
          <Card className="w-full rounded-xl bg-darkBlue text-lightBlue p-3 border-none">
            <div className="flex justify-start items-center space-x-3">
              <p className="font-semibold">Ahorros</p>
            </div>
            <p className="font-semibold text-[24px]">$0</p>
          </Card>
        </div>
        <HistoryGraph
          categories={['Ahorro', 'Ingresos', 'Gastos']}
          colors={['orange', 'sky-200', 'red']}
          chartData={chartData} 
          className="flex flex-col justify-center items-center h-60 -ml-4" 
        />
        <Button 
          className="w-full px-4 py-3 rounded-xl border-none bg-rusty text-lightBlue text-base font-normal tracking-wide"
          onClick={handleShowTransferModal}
        >
          Transferir
        </Button>
      </div>

      <Modal className="flex justify-center items-center" showModal={showProfileModal} onCloseModal={() => setShowProfileModal(false)} >
        <div className="w-[350px] bg-darkBlue rounded-xl flex flex-col justify-start space-y-4 lg:max-w-md row-span-12 px-4 py-12">
          <Card className="bg-darkBlue text-lightBlue px-4 py-2 border-none rounded-xl text-center">
            <p>Portafolio de inversión</p>
          </Card>
          <Card className="rounded-xl bg-[rgba(143,82,55,0.63)] text-[rgb(255,195,169)] p-3 border-none mb-3">
            <p className="font-semibold text-center">Ahorros disponibles</p>
            <p className="font-bold text-[24px] text-center">0%</p>
          </Card>
          <div className="flex space-x-2 justify-center items-center mb-3">
            <Card className="w-full rounded-xl bg-[rgba(143,82,55,0.63)] text-[rgb(255,195,169)] p-3 border-none">
              <div className="flex justify-start items-center space-x-3">
                <p className="font-semibold">Acciones</p>
              </div>
              <p className="font-semibold text-[24px]">0%</p>
            </Card>
            <Card className="w-full rounded-xl bg-[rgba(17,102,130,0.2)] text-[#BDE9FF] p-3 border-none">
              <div className="flex justify-start items-center space-x-3">
                <p className="font-semibold">Bonos</p>
              </div>
              <p className="font-semibold text-[24px]">0%</p>
            </Card>
          </div>
          <div className="flex space-x-2 justify-center items-center">
            <Card className="w-full rounded-xl bg-[rgba(17,102,130,0.2)] text-[#BDE9FF] p-3 border-none">
              <div className="flex justify-start items-center space-x-3">
                <p className="font-semibold">Cedears</p>
              </div>
              <p className="font-semibold text-[24px]">0%</p>
            </Card>
            <Card className="w-full rounded-xl bg-[rgba(17,102,130,0.2)] text-[#BDE9FF] p-3 border-none">
              <div className="flex justify-start items-center space-x-3">
                <p className="font-semibold">ETFs</p>
              </div>
              <p className="font-semibold text-[24px]">0%</p>
            </Card>
          </div>
        </div>
      </Modal>

      <Modal className="flex justify-center items-end" showModal={showTransferModal} onCloseModal={() => setShowTransferModal(false)}>
        <div className="w-[350px] space-y-8 bg-darkBlue rounded-xl flex flex-col justify-center items-center px-4 py-12">
          <Button className="w-full px-4 py-3 rounded-xl border-none bg-darkBlue text-lightBlue text-base font-normal tracking-wide">
            Depositar
          </Button>
          <Button className="w-full px-4 py-3 rounded-xl border-none bg-rusty text-lightBlue text-base font-normal tracking-wide">
            Transferir
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default SavingsPage;