import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { G2, Pie, PieConfig } from '@ant-design/charts';

import { PATH_PRODUCT } from '@configs';
import { IProductCategoryChartData } from '@interfaces';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';

interface IProps {
  data: IProductCategoryChartData[];
}
export const ProductCategoryChart = (props: IProps) => {
  const { data } = props;
  const navigate = useNavigate();

  G2.registerInteraction('hover-cursor', {
    showEnable: [
      { trigger: 'element:mouseenter', action: 'cursor:pointer' },
      { trigger: 'element:mouseleave', action: 'cursor:default' },
    ],
  });

  const config: PieConfig = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 13,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
      {
        type: 'legend-highlight',
      },
      {
        type: 'element-single-selected',
      },
      { type: 'hover-cursor' },
    ],
    legend: {
      itemName: {
        style: {
          fontSize: 15,
        },
      },
      position: 'right-top',
      layout: 'vertical',
    },
    onReady: (plot) => {
      //@ts-ignore
      plot.on('element:click', (...args: any) => {
        LogApp(args?.[0]);
        const id = args?.[0]?.data?.data?.id;
        const name = args?.[0]?.data?.data?.name;
        navigate(`${PATH_PRODUCT}?category=${id}&categoryName=${name}`);
      });
    },
  };
  return (
    <StyledNewCustomerChart className="db-sec__content">
      <Pie {...config} />
    </StyledNewCustomerChart>
  );
};
const StyledNewCustomerChart = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
`;
