import { Button } from "@tremor/react";
import { Card } from "../ui/card";
import HistoryGraph from "../ui/line-chart"

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
  return (
    <div className="flex flex-col justify-start space-y-4 lg:max-w-md row-span-12 mb-28">
      <div className="flex space-x-2 justify-center items-center mb-3">
        <Card className="w-full rounded-xl bg-[rgba(17,102,130,0.2)] text-[#BDE9FF] p-3 border-none">
          <div className="flex justify-start items-center space-x-3">
            <p className="font-semibold">Ingresos</p>
          </div>
          <p className="font-semibold text-[24px]">$0</p>
        </Card>
        <Card className="w-full rounded-xl bg-[rgba(143,82,55,0.63)] text-[rgb(255,195,169)] p-3 border-none">
          <div className="flex justify-start items-center space-x-3">
            <p className="font-semibold">Gastos</p>
          </div>
          <p className="font-semibold text-[24px]">$0</p>
        </Card>
      </div>
      <div className="flex space-x-2 justify-center items-center">
        <Card className="w-full rounded-xl bg-[rgba(17,102,130,0.2)] text-[#BDE9FF] p-3 border-none">
          <div className="flex justify-start items-center space-x-3">
            <p className="font-semibold">Disponible</p>
          </div>
          <p className="font-semibold text-[24px]">0%</p>
        </Card>
        <Card className="w-full rounded-xl bg-[rgba(17,102,130,0.2)] text-[#BDE9FF] p-3 border-none">
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
      <Button className="w-full px-4 py-3 rounded-xl border-none bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
        Transferir
      </Button>
    </div>
  )
}

export default SavingsPage;