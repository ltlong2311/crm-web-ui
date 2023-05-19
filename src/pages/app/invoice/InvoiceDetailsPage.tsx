import styled from 'styled-components';

import { OrderMenuIcon, PageHeaderTitle } from '@components';
import { InvoiceDetailsModule } from '@modules';

export const InvoiceDetailsPage = () => {
  return (
    <StyledPage className="products-page">
      <PageHeaderTitle
        title="Chi tiết hoá đơn"
        desc="Thông tin chi tiết về hoá đơn giao dịch với khách hàng"
        pageIcon={<OrderMenuIcon color="#fff" size={20} />}
      />
      <InvoiceDetailsModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
