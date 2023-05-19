import styled from 'styled-components';

import { CategoryListMenuIcon, PageHeaderTitle } from '@components';
import { CategoryManagementModule } from '@modules';

export const CategoryManagementPage = () => {
  return (
    <StyledPage className="dashboard-page">
      <PageHeaderTitle
        title="Loại sản phẩm"
        // desc="Các loại danh mục sản phẩm, bài đăng hình ảnh,... của doanh nghiệp của bạn"
        desc="Danh mục loại sản phẩm của doanh nghiệp của bạn"
        pageIcon={<CategoryListMenuIcon color="#fff" size={20} />}
      />
      <CategoryManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
