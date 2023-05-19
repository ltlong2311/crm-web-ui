import styled, { css } from 'styled-components';

import {
  CampaignMenuIcon,
  CoinIcon,
  CustomerMenuIcon,
  ProductBillIcon,
  ProductIcon,
  SpentIcon,
} from '@components';
import {
  PATH_CAMPAIGN,
  PATH_CUSTOMER,
  PATH_DASHBOARD,
  PATH_PRODUCT,
  enumOverviewCard,
} from '@configs';
import { APP_COLORS } from '@theme';

interface IProps {
  cardType: enumOverviewCard;
  value?: number | string;
  percentIncrease?: number | string;
  path?: string;
  onClick?: (...arg: any) => void;
}

export const OverviewCard = (props: IProps) => {
  const { cardType, value, percentIncrease, path, onClick } = props;

  const genCardInfo = (cardType: any) => {
    switch (cardType) {
      case enumOverviewCard.CUSTOMERS:
        return {
          title: 'Khách hàng',
          path: PATH_CUSTOMER,
          icon: <CustomerMenuIcon color={'#fe9365'} />,
        };
      case enumOverviewCard.PROFIT:
        return {
          title: 'Doanh thu',
          path: PATH_DASHBOARD,
          icon: <CoinIcon size={22} color={'#0ac282'} />,
        };
      case enumOverviewCard.CAMPAIGNS:
        return {
          title: 'Chiến dịch',
          path: PATH_CAMPAIGN,
          icon: <CampaignMenuIcon color={'#ff5370'} />,
        };
      case enumOverviewCard.PRODUCT_SOLD:
        return {
          title: 'Sản phẩm đã bán',
          path: PATH_PRODUCT,
          icon: <ProductIcon size={22} color={'#01a9ac'} />,
        };
      default:
        break;
    }
  };

  const cardInfo = genCardInfo(cardType);

  return (
    <StyledOverviewCard href={path || cardInfo?.path} $cardType={cardType}>
      <div className="info-card">
        <div className="left">
          <h5 className="title">{cardInfo?.title}</h5>
          <p className="value">{value || ''}</p>
        </div>
        <div className="card-icon">{cardInfo?.icon}</div>
      </div>
      <div className="sub-info">
        <p className="inc-percent">
          <span className="inc-value">+ {percentIncrease || 0}%</span> so với bình quân tháng trước
        </p>
      </div>
    </StyledOverviewCard>
  );
};

const StyledOverviewCard = styled.a<{
  $cardType: enumOverviewCard;
}>`
  position: relative;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%);
  border: none;
  margin-bottom: 30px;
  cursor: pointer;
  &:hover {
    opacity: 0.96;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    scale: 1.005;
  }
  ${(p) =>
    p?.$cardType === enumOverviewCard.CUSTOMERS &&
    css`
      background: linear-gradient(to right, #fe9365, #feb798);
    `}
  ${(p) =>
    p?.$cardType === enumOverviewCard.PROFIT &&
    css`
      background: linear-gradient(to right, #0ac282, #0df3a3);
    `}
  ${(p) =>
    p?.$cardType === enumOverviewCard.CAMPAIGNS &&
    css`
      background: linear-gradient(to right, #ff5370, #fe909d);
    `}
    ${(p) =>
    p?.$cardType === enumOverviewCard.PRODUCT_SOLD &&
    css`
      background: linear-gradient(to right, #01a9ac, #01dbdf);
    `}
  .info-card {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 3rem;
    .left {
      .title {
        font-size: 1.6rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: ${APP_COLORS.white};
      }
      .value {
        font-size: 2.4rem;
        font-weight: 700;
        color: ${APP_COLORS.white};
        margin-bottom: 0;
      }
    }
    .card-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;
      background-color: ${APP_COLORS.white};
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
  }
  .sub-info {
    .inc-percent {
      font-size: 1.2rem;
      font-weight: 400;
      color: ${APP_COLORS.whiteM};
      margin-bottom: 0;
      .inc-value {
        font-size: 1.5rem;
        font-weight: 400;
        color: ${APP_COLORS.white};
        margin-bottom: 0;
      }
    }
  }
`;
