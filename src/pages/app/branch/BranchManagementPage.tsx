import styled from 'styled-components';

import { BranchMenuIcon, PageHeaderTitle } from '@components';
import { BranchManagementModule, DashboardModule } from '@modules';

export const BranchManagementPage = () => {
  return (
    <StyledPage className="dashboard-page">
      <PageHeaderTitle
        title="Chi nhánh"
        desc="Thông tin các cửa hàng, chi nhánh của doanh nghiệp"
        pageIcon={<BranchMenuIcon color="#fff" size={20} />}
      />
      <BranchManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
