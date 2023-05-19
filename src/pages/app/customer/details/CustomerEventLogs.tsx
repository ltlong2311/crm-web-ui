import styled from 'styled-components';

import { APP_COLORS } from '@theme';
import {
  CustomerInvoicesModule,
  CustomerOrdersModule,
  CustomerPaymentHistoryModule,
} from '@modules';

interface IProps {
  selectedId?: number | string;
  data?: any;
}

export const CustomerEventLogs = (props: IProps) => {
  const { selectedId } = props;

  return (
    <StyledSection className="event-logs-page">
      <CustomerPaymentHistoryModule {...props} />
      {/* <CustomerInvoicesModule /> */}
      <CustomerOrdersModule  {...props} />
    </StyledSection>
  );
};

const StyledSection = styled.div``;
