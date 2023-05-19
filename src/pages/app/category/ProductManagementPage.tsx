import styled from 'styled-components';

import { PageHeaderTitle, ProductIcon } from '@components';
import { ProductManagementModule } from '@modules';

export const ProductManagementPage = () => {
  return (
    <StyledPage className="products-page">
      <PageHeaderTitle
        title="Sản phẩm"
        desc="Tất cả thông tin quản lý sản phẩm doanh nghiệp của bạn"
        pageIcon={<ProductIcon color="#fff" size={20} />}
      />
      <ProductManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
