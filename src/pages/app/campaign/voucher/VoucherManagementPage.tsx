import { CustomerMenuIcon, PageHeaderTitle } from '@components';
import { CustomerManagementModule, VoucherManagementModule } from '@modules';
import styled from 'styled-components';

export const VoucherManagementPage = () => {
  return (
    <StyledPage className="members-page">
      <PageHeaderTitle
        title="Khuyến mãi"
        desc="Tổng hợp các voucher và mã khuyến mãi doanh nghiệp của bạn"
        pageIcon={<CustomerMenuIcon color="#fff" size={20} />}
      />
      <VoucherManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
