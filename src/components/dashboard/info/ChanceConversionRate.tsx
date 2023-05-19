import styled from 'styled-components';
import { G2, Gauge, GaugeConfig, Liquid, LiquidConfig } from '@ant-design/charts';
import { CenterBox, CustomerDollarIcon, FlexWrap, IncreaseIcon } from '@components';
import { enumMemberType, PATH_CUSTOMER } from '@configs';
import { ActiveMember, INewCustomers } from '@interfaces';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';
import { useMemo } from 'react';

interface IProps {
  data?: number;
}
export const ChanceConversionRateSection = (props: IProps) => {
  const { data } = props;

  const config: GaugeConfig = {
    percent: 0.768,
    range: {
      color: `l(0) 0:${APP_COLORS.green100} 1:${APP_COLORS.green600}`,
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: false,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '36px',
          color: APP_COLORS.lightGreen800,
        },
        formatter: () => '76.23%',
      },
      content: {
        style: {
          fontSize: '14px',
          lineHeight: '15px',
          color: APP_COLORS.cyan800,
        },
        formatter: () => `Hoàn thành ${36}/${42} cơ hội`,
      },
    },
  };

  return (
    <Wrapper className="db-sec__content chance-conversion">
      <Gauge {...config} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  /* @media (min-width: 1280px) {
    height: calc(100% - 1rem);
  } */
`;
