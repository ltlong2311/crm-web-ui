import { DashboardMenuIcon, PageHeaderTitle } from '@components';
import { BreadcrumbsModule, DashboardModule } from '@modules';
import { APP_COLORS } from '@theme';
import React, { useEffect } from 'react';

import styled from 'styled-components';

export const DashboardPage = () => {
  return (
    <StyledDashboardPage className="dashboard-page">
      <PageHeaderTitle
        title="Tổng quan"
        desc="Thông tin tổng quan về doanh nghiệp của bạn"
        pageIcon={<DashboardMenuIcon color="#fff" size={20} />}
      />
      <DashboardModule />
    </StyledDashboardPage>
  );
};

const StyledDashboardPage = styled.div`
  position: relative;
`;
