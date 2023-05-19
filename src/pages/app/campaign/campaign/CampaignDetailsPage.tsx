import styled from 'styled-components';

import { CampaignMenuIcon, PageHeaderTitle } from '@components';
import { CampaignDetailsModule, CampaignManagementModule } from '@modules';

export const CampaignDetailsPage = () => {
  return (
    <StyledPage className="dashboard-page">
      <PageHeaderTitle
        title="Chiến dịch"
        desc="Chi tiết thông tin chiến dịch"
        pageIcon={<CampaignMenuIcon color="#fff" size={20} />}
      />
      <CampaignDetailsModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
