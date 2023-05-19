import styled from 'styled-components';

import { OrderMenuIcon, PageHeaderTitle } from '@components';
import { CreateOrderModule, OrderManagementModule } from '@modules';

export const CreateOrderPage = () => {
  return (
    <StyledPage className="order-page">
      <PageHeaderTitle
        title="Tạo đơn hàng"
        desc="Quản lý các vật phẩm hệ thống, khuyến mãi,.. không nằm trong danh mục sản phẩm kinh doanh của bạn"
        pageIcon={<OrderMenuIcon color="#fff" size={20} />}
      />
      <CreateOrderModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
