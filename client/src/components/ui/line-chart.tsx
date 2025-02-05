import { LineChart, Title } from '@tremor/react';

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

type LinealGraphProps = {
  className?: string;
  chartData: {[key: string]: unknown}[];
  categories: string[];
  colors: string[];
};

const SavingsChart = ({ className, chartData, categories, colors }: LinealGraphProps) => {
  return (
    <div className={className}>
      <Title className='text-lightBlue'>Ahorro</Title>
      <LineChart
        data={chartData}
        index="date"
        categories={categories}
        colors={colors}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        showAnimation
      />
    </div>
  );
}

export default SavingsChart;