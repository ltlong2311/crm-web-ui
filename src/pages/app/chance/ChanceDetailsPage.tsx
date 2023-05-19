import styled from 'styled-components';

import { OrderMenuIcon, PageHeaderTitle } from '@components';
import { ChanceDetailsModule } from '@modules';

export const ChanceDetailsPage = () => {
  return (
    <StyledPage className="products-page">
      <PageHeaderTitle
        title="Thông tin cơ hội"
        desc="Chi tiết về thông tin cơ hội bán hàng"
        pageIcon={<OrderMenuIcon color="#fff" size={20} />}
      />
      <ChanceDetailsModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
