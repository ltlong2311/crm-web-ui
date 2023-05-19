import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { G2, PieConfig } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';

import { TierStatisticResponse } from '@interfaces';
import { LogApp } from '@utils';
import { PATH_CUSTOMER } from '@configs';
interface IProps {
  memberTiers: TierStatisticResponse[];
}
export const MemberTierChart = ({ memberTiers }: IProps) => {
  const navigate = useNavigate();

  G2.registerInteraction('hover-cursor', {
    showEnable: [
      { trigger: 'element:mouseenter', action: 'cursor:pointer' },
      { trigger: 'element:mouseleave', action: 'cursor:default' },
    ],
  });

  const memoConfig: PieConfig = useMemo(() => {
    return {
      appendPadding: 10,
      data: memberTiers,
      angleField: 'total',
      colorField: 'name',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
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
          navigate(`${PATH_CUSTOMER}?tier=${id}&tierName=${name}`);
        });
      },
    };
  }, [memberTiers]);
  LogApp({ memberTiers });

  return <Pie className="tiers-pie_chart" {...memoConfig} />;
};
