import ReactECharts from 'echarts-for-react';

interface LineBarProps {
  dates: string[];
  data: number[];
}

export default function LineChart({ dates, data }: LineBarProps) {
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
          formatter: '{value}',
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
            return value as number;
          },
        },
        data: data,
      },
    ],
  };
  return (
    <div>
      <ReactECharts option={option} />
    </div>
  );
}
