import styled from 'styled-components';

import { OrderMenuIcon, PageHeaderTitle } from '@components';
import { CreateChanceModule, CreateOrderModule, OrderManagementModule } from '@modules';

export const CreateChancePage = () => {
  return (
    <StyledPage className="products-page">
      <PageHeaderTitle
        title="Tạo cơ hội"
        desc="Tạo mới một cơ hội bán hàng"
        pageIcon={<OrderMenuIcon color="#fff" size={20} />}
      />
      <CreateChanceModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
