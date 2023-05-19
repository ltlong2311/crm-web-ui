import styled from 'styled-components';

import { PageHeaderTitle, VoucherMenuIcon } from '@components';
import { CreateVoucherModule } from '@modules';

export const CreateVoucherPage = () => {
  return (
    <StyledPage className="dashboard-page">
      <PageHeaderTitle
        title="Tạo voucher, khuyến mãi"
        desc="Thêm các voucher, khuyến mãi"
        pageIcon={<VoucherMenuIcon color="#fff" size={20} />}
      />
      <CreateVoucherModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
