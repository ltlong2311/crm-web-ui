import styled from 'styled-components';

import { OrderMenuIcon, PageHeaderTitle } from '@components';
import { CreateOrderModule, OrderDetailsModule, OrderManagementModule } from '@modules';

export const OrderDetailsPage = () => {
  return (
    <StyledPage className="products-page">
      <PageHeaderTitle
        title="Cập nhật đơn hàng"
        desc="Quản lý các vật phẩm hệ thống, khuyến mãi,.. không nằm trong danh mục sản phẩm kinh doanh của bạn"
        pageIcon={<OrderMenuIcon color="#fff" size={20} />}
      />
      <OrderDetailsModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
