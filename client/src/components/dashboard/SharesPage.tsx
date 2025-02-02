import { Button } from "@tremor/react";
import { Card } from "../ui/card";
import HistoryGraph from "../ui/line-chart"

const chartData = [
  {
    date: 'Ene',
    Ahorro: 10,
    Objetivo: 120
  },
  {
    date: 'Feb',
    Ahorro: 100,
    Objetivo: 100
  },
  {
    date: 'Mar',
    Ahorro: 120,
    Objetivo: 50
  },
  {
    date: 'Abr',
    Ahorro: 50,
    Objetivo: 60
  },
  {
    date: 'May',
    Ahorro: 200,
    Objetivo: 300
  },
  {
    date: 'Jun',
    Ahorro: 100,
    Objetivo: 175
  },
];

const SharesPage = () => {
  return (
    <div className="flex flex-col justify-start space-y-4 lg:max-w-md row-span-12 mb-28">
      <Card className="w-full rounded-xl bg-[rgba(143,82,55,0.63)] text-[rgb(255,195,169)] p-3 border-none mb-3">
        <p className="font-semibold text-center">Ahorros disponibles</p>
        <p className="font-bold text-[24px]">0%</p>
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
      <HistoryGraph
        categories={['Objetivo', 'Ahorro']}
        colors={['sky-200', 'orange']}
        chartData={chartData} 
        className="flex flex-col justify-center items-center h-60 -ml-4" 
      />
      <Button className="w-full px-4 py-3 rounded-xl border-none bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
        Depositar
      </Button>
    </div>
  )
}

export default SharesPage;