import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Column, ColumnConfig, G2 } from '@ant-design/charts';

import { ActiveMember, INewCustomers } from '@interfaces';
import { APP_COLORS } from '@theme';
import { enumMemberType, PATH_CUSTOMER } from '@configs';
import { LogApp, formatAppUnit } from '@utils';
import moment from 'moment';

interface IProps {
  data: INewCustomers[];
}
export const NewCustomerChart = (props: IProps) => {
  const { data } = props;
  const navigate = useNavigate();

  G2.registerInteraction('hover-cursor', {
    showEnable: [
      { trigger: 'element:mouseenter', action: 'cursor:pointer' },
      { trigger: 'element:mouseleave', action: 'cursor:default' },
    ],
  });

  const config: ColumnConfig = {
    data: data,
    xField: 'timePeriod',
    yField: 'value',
    // color: ({ timePeriod }) => {
    // if (timePeriod === moment()) {
    //   return APP_COLORS.blue500;
    // }
    // return 'l(270) 0:#feb798 1:#fe9365';
    // },
    xAxis: {
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
            cursor: 'pointer',
          },
        },
      },
    },
    label: {
      position: 'top', // 'top', 'bottom', 'middle',
      style: {
        fill: APP_COLORS.teal600,
        opacity: 0.6,
      },
      //@ts-ignore
      content: (originData) => {
        const val = formatAppUnit(originData?.value);
        return val;
      },
    },
    meta: {
      timePeriod: {
        alias: 'Time',
      },
      value: {
        alias: 'Khách hàng',
      },
    },
    color: 'l(270) 0:#feb798 1:#fe9365',
    interactions: [{ type: 'hover-cursor' }],
    onReady: (plot: any) => {
      //@ts-ignore
      plot.on('element:click', (...args: any) => {
        LogApp('check click chart', args?.[0]);
        const date = args?.[0]?.data?.data?.timePeriod;
        navigate(`${PATH_CUSTOMER}?date=${date}&m-type=${enumMemberType.ACTIVE}`);
      });
    },
  };
  return (
    <StyledNewCustomerChart className="db-sec__content">
      <Column {...config} />
    </StyledNewCustomerChart>
  );
};
const StyledNewCustomerChart = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
`;
