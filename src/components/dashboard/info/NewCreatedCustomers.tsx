import styled from 'styled-components';

import { CenterBox, CustomerDollarIcon, FlexWrap, IncreaseIcon } from '@components';
import { APP_COLORS } from '@theme';

interface IProps {
  data?: any;
}
export const NewCreatedCustomerSection = (props: IProps) => {
  const { data } = props;

  return (
    <Wrapper className="db-sec__content created-customer">
      <FlexWrap>
        <CustomerDollarIcon size={100} />
      </FlexWrap>
      <div>
        <div className="content">
          <p className="label">Tổng số đã tạo</p>
          <FlexWrap $justifyContent="space-between">
            <p className="value">
              113 <span>khách hàng</span>
            </p>
            <FlexWrap $gap={2} className="rate-change">
              <IncreaseIcon />
              <span className="rate-value">+13,23%</span>
            </FlexWrap>
          </FlexWrap>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .content {
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.8rem;
    .label {
      color: ${APP_COLORS.teal700};
      font-weight: 600;
      font-size: 1.9rem;
      margin-bottom: 0.9rem;
    }
    .value {
      font-size: 2.3rem;
      font-weight: 600;
      color: ${APP_COLORS.orange900};
      margin-bottom: 0;
      span {
        font-weight: 400;
        color: ${APP_COLORS.teal600};
        font-size: 1.5rem;
      }
    }
  }
  .rate-change {
    .rate-value {
      color: ${APP_COLORS.lightGreen500};
      font-weight: 600;
    }
  }
`;
