import styled from 'styled-components';

import { BranchMenuIcon, PageHeaderTitle } from '@components';

export const OtherProductManagementPage = () => {
  return (
    <StyledPage className="products-page">
      <PageHeaderTitle
        title="Vật phẩm khác"
        desc="Quản lý các vật phẩm hệ thống, khuyến mãi,.. không nằm trong danh mục sản phẩm kinh doanh của bạn"
        pageIcon={<BranchMenuIcon color="#fff" size={20} />}
      />
      {/* <ProductManagementModule /> */}
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
