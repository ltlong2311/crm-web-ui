import styled from 'styled-components';

import { VoucherMenuIcon, PageHeaderTitle } from '@components';
import { VoucherDetailsModule } from '@modules';

export const VoucherDetailsPage = () => {
  return (
    <StyledPage className="dashboard-page">
      <PageHeaderTitle
        title="Voucher, khuyến mãi"
        desc="Chi tiết thông tin voucher, khuyến mãi"
        pageIcon={<VoucherMenuIcon color="#fff" size={20} />}
      />
      <VoucherDetailsModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
