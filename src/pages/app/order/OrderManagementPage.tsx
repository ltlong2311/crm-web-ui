import styled from 'styled-components';

import { OrderMenuIcon, PageHeaderTitle } from '@components';
import { OrderManagementModule } from '@modules';

export const OrderManagementPage = () => {
  return (
    <StyledPage className="products-page">
      <PageHeaderTitle
        title="Đơn hàng"
        desc="Quản lý các vật phẩm hệ thống, khuyến mãi,.. không nằm trong danh mục sản phẩm kinh doanh của bạn"
        pageIcon={<OrderMenuIcon color="#fff" size={20} />}
      />
      <OrderManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
