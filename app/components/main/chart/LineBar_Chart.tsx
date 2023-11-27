import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import Spinner from '../Spinner';
import numeral from 'numeral';

interface LineBarProps {
  dates: string[];
  cumulative: number[] | string[];
  daily: number[];
  data_1: string;
  data_2: string;
  loading: boolean;
  currency: boolean;
  yAxisScaleLeft?: string;
  yAxisScaleRight?: string;
}

export default function LineBarChart({
  dates,
  cumulative,
  daily,
  data_1,
  data_2,
  loading,
  currency,
  yAxisScaleLeft = 'value',
  yAxisScaleRight = 'value',
}: LineBarProps) {
  const currencyFormat = currency ? '$0.a' : '0.a';
  const tooltipFormat = currency ? '$0.[00]a' : '0.[00]a';

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
    legend: {
      bottom: '0%',
      textStyle: {
        color: '#A2A2A6',
      },
      inactiveColor: '#A2A2A6',
      icon: 'roundRect',
      itemGap: 20,
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
        type: yAxisScaleLeft,
        // logBase is only relevant when type: 'log'
        logBase: 10,
        splitLine: {
          lineStyle: {
            color: '#323237',
          },
        },
        position: 'left',
        axisLabel: {
          formatter: (value: number) => {
            return numeral(value).format(currencyFormat);
          },
        },
      },
      {
        type: yAxisScaleRight,
        logBase: 10,
        splitLine: {
          show: false,
        },
        position: 'right',
        axisLabel: {
          formatter: (value: number) => {
            return numeral(value).format(currencyFormat);
          },
        },
      },
    ],
    series: [
      {
        name: data_1,
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: any) {
            return numeral(value).format(tooltipFormat);
          },
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#673AB7' },
            { offset: 1, color: '#512DA8' },
          ]),
          borderRadius: [2, 2, 0, 0],
        },
        data: daily,
      },
      {
        name: data_2,
        type: 'line',
        showSymbol: false,
        smooth: true,
        yAxisIndex: 1,
        itemStyle: {
          color: '#cdadef',
        },
        tooltip: {
          valueFormatter: function (value: any) {
            return numeral(value).format(tooltipFormat);
          },
        },
        data: cumulative,
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
