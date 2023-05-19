import styled from 'styled-components';

import { CampaignMenuIcon, PageHeaderTitle } from '@components';
import { BranchManagementModule, CampaignManagementModule } from '@modules';

export const CampaignManagementPage = () => {
  return (
    <StyledPage className="dashboard-page">
      <PageHeaderTitle
        title="Chiến dịch"
        desc="Thông tin các chiến dịch doanh nghiệp của bạn"
        pageIcon={<CampaignMenuIcon color="#fff" size={20} />}
      />
      <CampaignManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
