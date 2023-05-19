import styled from 'styled-components';

import { enumOverviewCard, enumThemeMode } from '@configs';
import {
  ActiveMemberChartModule,
  ChanceConversionRateModule,
  CreatedChancesChartModule,
  CustomerConversionRateModule,
  NewCreatedCustomersModule,
  NewCustomersChartModule,
  NewOrdersChartModule,
  ProductCategoryChartModule,
  TopCustomersModule,
  TopProductByQuantityModule,
  TopProductBySalesModule,
} from '@modules';
import { setThemeMode, useAppDispatch } from '@redux';
import { useState } from 'react';
import { OverviewCard } from '../widgets/OverviewCard';
import { DashboardGroupSection, FlexWrap } from '@components';
import { Divider } from 'antd';

interface IProps {
  data?: any;
}

export const DashboardSection = (props: IProps) => {
  const { data } = props;
  const [limit, setLimit] = useState(10);
  const dispatch = useAppDispatch();

  const handleChangeTheme = () => {
    dispatch(setThemeMode(enumThemeMode.DARK));
  };

  const handleChangeLight = () => {
    dispatch(setThemeMode(enumThemeMode.LIGHT));
  };
  const onLimitChange = (num: number) => {
    setLimit(num);
  };

  return (
    <StyledDashboardContent>
      <div className="overview-list grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-x-8 gap-y-0">
        <OverviewCard value={'1,283'} cardType={enumOverviewCard.CUSTOMERS} />
        <OverviewCard value={911} cardType={enumOverviewCard.PROFIT} />
        <OverviewCard value={231} cardType={enumOverviewCard.CAMPAIGNS} />
        <OverviewCard value={6592} cardType={enumOverviewCard.PRODUCT_SOLD} />
      </div>
      <FlexWrap className="dash-section-row" $gap={20} $height={385} $align="flex-start">
        <NewCustomersChartModule />
        <NewCreatedCustomersModule />
        <CustomerConversionRateModule />
      </FlexWrap>
      <FlexWrap className="dash-section-row" $gap={20} $height={375} $align="flex-start">
        <CreatedChancesChartModule />
        <ChanceConversionRateModule />
      </FlexWrap>
      <FlexWrap className="dash-section-row" $gap={20} $height={450} $align="flex-start">
        <DashboardGroupSection $flex={2}>
          <TopProductBySalesModule />
          <Divider className="db-group-divider" type="vertical" />
          <TopProductByQuantityModule />
        </DashboardGroupSection>
        <ProductCategoryChartModule />
      </FlexWrap>
      <FlexWrap className="dash-section-row" $gap={20} $height={425} $align="flex-start">
        <NewOrdersChartModule />
        <TopCustomersModule />
      </FlexWrap>
    </StyledDashboardContent>
  );
};

export const StyledDashboardContent = styled.div`
  .overview-list {
    margin-top: 2rem;
  }
  .dash-section-row {
    position: relative;
    margin-bottom: 2.8rem;
  }
`;
