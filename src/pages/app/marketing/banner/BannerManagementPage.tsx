import styled from 'styled-components';

import { BannerMenuIcon, PageHeaderTitle } from '@components';
import { BannerManagementModule } from '@modules';

export const BannerManagementPage = () => {
  return (
    <StyledPage className="banner-page">
      <PageHeaderTitle
        title="Banner"
        desc="Các banner hình ảnh của doanh nghiệp của bạn"
        pageIcon={<BannerMenuIcon color="#fff" size={20} />}
      />
      <BannerManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
