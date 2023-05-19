import { CustomerMenuIcon, PageHeaderTitle } from '@components';
import { CustomerManagementModule } from '@modules';
import styled from 'styled-components';

export const CustomerManagementPage = () => {
  return (
    <StyledPage className="members-page">
      <PageHeaderTitle
        title="Khách hàng"
        desc="Tổng hợp thông tin các khách hàng doanh nghiệp của bạn"
        pageIcon={<CustomerMenuIcon color="#fff" size={20} />}
      />
      <CustomerManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
