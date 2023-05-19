import { FlexWrap, SharedImage } from '@components';
import { APP_COLORS } from '@theme';
import { formatAppUnit } from '@utils';
import styled from 'styled-components';

interface IProps {
  data?: any;
  filterBy?: 'sales' | 'quantity';
}
export const TopProductTable = (props: IProps) => {
  const { data, filterBy } = props;

  if (filterBy === 'sales') {
    return (
      <Wrapper className="db-sec__content top-product by-sales">
        <TopProductsList>
          {data?.map((item: any) => (
            <FlexWrap $justifyContent="space-between">
              <div className="top-product">
                <div className="image-wrap">
                  <SharedImage className="product-image" src={item?.image} />
                </div>
                <div className="product-info">
                  <div className="product-name">{item?.name}</div>
                  <div className="prod-cost-sell">
                    <div className="cost">{formatAppUnit(item?.cost)}đ</div>
                  </div>
                </div>
              </div>
              <div className="total">{formatAppUnit(item?.totalSales)}đ</div>
            </FlexWrap>
          ))}
        </TopProductsList>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="db-sec__content top-product by-volume">
      <TopProductsList>
        {data?.map((item: any) => (
          <FlexWrap $justifyContent="space-between">
            <div className="top-product">
              <div className="image-wrap">
                <SharedImage className="product-image" src={item?.image} />
              </div>
              <div className="product-info">
                <div className="product-name">{item?.name}</div>
                <div className="prod-cost-sell">
                  <div className="cost">{formatAppUnit(item?.cost)}đ</div>
                </div>
              </div>
            </div>
            <div className="total">{formatAppUnit(item?.totalVolume)}</div>
          </FlexWrap>
        ))}
      </TopProductsList>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100%;
`;

const TopProductsList = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .top-product {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    &:not(:first-child) {
      border-top: 1px dashed #dfdfdf;
    }
    .image-wrap {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      position: relative;
      overflow: hidden;
      background: #e6e6e6;
      .image-contain {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          object-fit: contain;
        }
      }
    }
    .product-info {
      margin-left: 1.8rem;
      .product-name {
        font-size: 1.4rem;
        font-weight: 600;
        color: ${APP_COLORS.gray700};
        margin-bottom: 0.5rem;
      }
      .prod-cost-sell {
        /* display: flex; */
        .cost {
          font-size: 1.3rem;
          font-weight: 400;
          color: ${APP_COLORS.gray700};
          margin-bottom: 0.5rem;
        }
      }
    }
  }
  .total {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${APP_COLORS.gray600};
  }
`;
