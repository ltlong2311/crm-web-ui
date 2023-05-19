import styled from 'styled-components';

import { PageHeaderTitle, StaffMenuIcon } from '@components';
import { BranchManagementModule, StaffManagementModule } from '@modules';

export const StaffManagementPage = () => {
  return (
    <StyledPage className="dashboard-page">
      <PageHeaderTitle
        title="Nhân viên"
        desc="Thông tin các nhân viên của doanh nghiệp của bạn"
        pageIcon={<StaffMenuIcon color="#fff" size={20} />}
      />
      <StaffManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
