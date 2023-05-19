import { CustomerMenuIcon, PageHeaderTitle } from '@components';
import { CustomerDetailModule, CustomerManagementModule } from '@modules';
import styled from 'styled-components';

export const CustomerDetailPage = () => {
  return (
    <StyledPage className="customer-page">
      <PageHeaderTitle
        title="Khách hàng"
        desc="Thông tin chi tiết khách hàng"
        pageIcon={<CustomerMenuIcon color="#fff" size={20} />}
      />
      <CustomerDetailModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
