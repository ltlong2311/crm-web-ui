import styled from 'styled-components';
import { G2, Liquid, LiquidConfig } from '@ant-design/charts';
import { CenterBox, CustomerDollarIcon, FlexWrap, IncreaseIcon } from '@components';
import { enumMemberType, PATH_CUSTOMER } from '@configs';
import { ActiveMember, INewCustomers } from '@interfaces';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';
import { useMemo } from 'react';

interface IProps {
  data?: number;
}
export const CustomerConversionRateSection = (props: IProps) => {
  const { data } = props;

  const config: LiquidConfig = {
    percent: 0.65,
    shape: 'circle',
    outline: {
      border: 4,
      distance: 6,
      style: {
        stroke: '#FFC100',
        strokeOpacity: 0.65,
      },
    },
    wave: {
      length: 128,
    },
    // pattern: {
    // type: 'line',
    // },
    theme: {
      styleSheet: {
        brandColor: '#FAAD14',
      },
    },
  };

  return (
    <Wrapper className="db-sec__content customer-conversion">
      <Liquid {...config} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
`;
