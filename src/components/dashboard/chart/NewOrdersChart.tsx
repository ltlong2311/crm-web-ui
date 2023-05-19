import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Area, AreaConfig, G2 } from '@ant-design/charts';

import { enumMemberType, PATH_CUSTOMER, PATH_ORDER } from '@configs';
import { IChartData } from '@interfaces';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';

interface IProps {
  data: IChartData[];
}
export const NewOrdersChart = (props: IProps) => {
  const { data } = props;
  const navigate = useNavigate();

  G2.registerInteraction('hover-cursor', {
    showEnable: [
      { trigger: 'element:mouseenter', action: 'cursor:pointer' },
      { trigger: 'element:mouseleave', action: 'cursor:default' },
    ],
  });

  const config: AreaConfig = {
    data: data,
    xField: 'timePeriod',
    yField: 'value',
    color: '#1DD1A1',
    smooth: true,
    xAxis: {
      range: [0, 1],
      label: {
        autoHide: false,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        autoHide: false,
        autoRotate: false,
      },
      grid: {
        line: {
          style: {
            stroke: APP_COLORS.gray300,
            lineWidth: 1,
            lineDash: [4, 5],
            // strokeOpacity: 0.9,
            cursor: 'pointer',
          },
        },
      },
    },
    meta: {
      timePeriod: {
        alias: 'Time',
      },
      value: {
        alias: 'Tổng',
      },
    },
    line: {
      color: APP_COLORS.lightGreen600,
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:${APP_COLORS.lightGreen50} 0.5:${APP_COLORS.green500} 1:${APP_COLORS.lightGreen900}`,
        lineStyle: {
          stroke: 'black',
        },
      };
    },
    interactions: [{ type: 'hover-cursor' }],
    onReady: (plot: any) => {
      //@ts-ignore
      plot.on('element:click', (...args: any) => {
        LogApp('check click chart', args?.[0]);
        const date = args?.[0]?.data?.data?.timePeriod;
        navigate(`${PATH_ORDER}?date=${date}&m-type=${enumMemberType.ACTIVE}`);
      });
    },
  };
  return (
    <StyledNewCustomerChart className="db-sec__content">
      <Area {...config} />
    </StyledNewCustomerChart>
  );
};
const StyledNewCustomerChart = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
`;
