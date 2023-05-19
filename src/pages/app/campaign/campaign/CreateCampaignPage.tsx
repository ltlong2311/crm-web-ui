import styled from 'styled-components';

import { CampaignMenuIcon, PageHeaderTitle } from '@components';
import { CampaignManagementModule, CreateCampaignModule } from '@modules';

export const CreateCampaignPage = () => {
  return (
    <StyledPage className="dashboard-page">
      <PageHeaderTitle
        title="Tạo chiến dịch"
        desc="Thêm các chiến dịch"
        pageIcon={<CampaignMenuIcon color="#fff" size={20} />}
      />
      <CreateCampaignModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
