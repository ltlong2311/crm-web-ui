import styled from 'styled-components';

import { BillMenuIcon, PageHeaderTitle } from '@components';
import { InvoiceManagementModule } from '@modules';

export const InvoiceManagementPage = () => {
  return (
    <StyledPage className="invoice-page">
      <PageHeaderTitle
        title="Hóa đơn"
        desc="Tất cả cả hóa đơn doanh nghiệp của bạn"
        pageIcon={<BillMenuIcon color="#fff" size={20} />}
      />
      <InvoiceManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
