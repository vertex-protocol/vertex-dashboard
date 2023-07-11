import ReactECharts from 'echarts-for-react';
import numeral from 'numeral';
import Spinner from '../Spinner';

interface LineBarProps {
  dates: string[];
  data: number[];
  loading: boolean;
}

export default function LineChart({ dates, data, loading }: LineBarProps) {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#2A2A2F',
      borderWidth: 2,
      borderColor: '#323237',
      textStyle: {
        color: '#A2A2A6',
      },
      axisPointer: {
        lineStyle: {
          color: '#A2A2A6',
        },
      },
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '12%',
      top: '2%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: dates,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#323237',
          },
        },
        axisLabel: {
          formatter: (value: number) => {
            return numeral(value).format('0.0000%');
          },
        },
      },
    ],
    series: [
      {
        name: 'Cumulative',
        type: 'line',
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: '#cdadef',
        },
        tooltip: {
          valueFormatter: function (value: any) {
            return numeral(value).format('0.00000%');
          },
        },
        data: data,
      },
    ],
  };
  return (
    <>
      {loading ? (
        <Spinner className="h-64" />
      ) : (
        <ReactECharts option={option} />
      )}
    </>
  );
}
