import { Divider, Empty } from 'antd';
import React from 'react';
import styled from 'styled-components';

import {
  CopyIcon,
  DecreaseIcon,
  EmptyData,
  GeneralIcon,
  IncreaseIcon,
  OrderBoxIcon,
  OrderMenuIcon,
  ProductBillIcon,
  ProductMenuIcon,
  RebateIcon,
  RebatePointIcon,
  RefundIcon,
  SharedButton,
  SharedImage,
  SpentIcon,
  Text,
} from '@components';
import { APP_COLORS } from '@theme';
import { toast } from 'react-toastify';

interface IProps {
  data?: any;
  interestedProducts?: any;
  lastedOrder?: any;
}

export const CustomerDashboard: React.FC<IProps> = (props) => {
  const { interestedProducts = [1, 2, 3], lastedOrder = { products: [1, 2] } } = props;
  return (
    <CustomerDashboardPage className="customer-dashboard">
      <div className="monthly-report">
        <div className="head">
          <h2 className="title">Báo cáo tháng</h2>
          <p className="desc">Thông tin thống kê tính tới thời điểm hiện này của tháng hiện tại</p>
        </div>
        <Divider />
        <div className="content">
          <div className="summary-item product">
            <div className="top-info">
              <ProductBillIcon color={APP_COLORS.cyan700} size={30} />
              <Text $color={APP_COLORS.cyan700} className="value">
                2311
              </Text>
            </div>
            <div className="bottom-info">
              <div className="label">Sản phẩm đã mua</div>
              <IncreaseIcon />
            </div>
          </div>
          <Divider type="vertical" />
          <div className="summary-item order">
            <div className="top-info">
              <OrderBoxIcon color={APP_COLORS.blue700} size={30} />
              <Text $color={APP_COLORS.blue700} className="value">
                3
              </Text>
            </div>
            <div className="bottom-info">
              <div className="label">Số order</div>
              <IncreaseIcon />
            </div>
          </div>
          <Divider type="vertical" />
          <div className="summary-item covert">
            <div className="top-info">
              <SpentIcon color={APP_COLORS.yellow700} size={28} />
              <Text $color={APP_COLORS.yellow800} className="value">
                129.000
              </Text>
            </div>
            <div className="bottom-info">
              <div className="label">Thanh toán</div>
              <DecreaseIcon />
            </div>
          </div>
          <Divider type="vertical" />
          <div className="summary-item pay">
            <div className="top-info">
              <RebateIcon color={APP_COLORS.orange700} size={30} />
              <Text $color={APP_COLORS.orange800} className="value">
                30.000
              </Text>
            </div>
            <div className="bottom-info">
              <div className="label">Hoàn lại</div>
              <IncreaseIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="general">
        <div className="last-order">
          <div className="head">
            <h2 className="title">Đơn hàng gần nhất</h2>
          </div>
          <div className="content">
            {lastedOrder ? (
              <StyledLastedOrder>
                {lastedOrder?.products?.map((item: any) => (
                  <>
                    <div className="product-id">
                      <div className="label">Mã sản phẩm: </div>
                      <div className="value">SP-094920</div>
                      <span
                        onClick={() => {
                          navigator.clipboard.writeText('DH-094920');
                          toast.success('Copy thành công!', {
                            position: 'top-center',
                            autoClose: 1000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            theme: 'colored',
                          });
                        }}
                        className="copy-icon"
                      >
                        <CopyIcon />
                      </span>
                    </div>
                    <div className="o-product">
                      <div className="image-wrap">
                        <SharedImage
                          className="o-product-image"
                          src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQTlFvvBZYl2QW0ISCOs_NAgGkemnPRJpBh9CdWby7RcBKpPYELmwvUeZFFk-aXhJyoZPGaspod7U8orKbcB43eVxp9v8AiSsj6MZMzKmiHk8ZtqXmin4AxJKUKc2Kv_hQsT0k&usqp=CAc"
                        />
                      </div>
                      <div className="o-product-info">
                        <div className="product-name">CPU Platinum8256 3.80GHz 4C/8TH</div>
                        <div className="prod-cost">
                          Giá: <strong>1.580.000 đ</strong>
                        </div>
                        <div className="prod-type">Phân loại: Thiết bị điện tử</div>
                        <div className="prod-entity">Số lượng: 2</div>
                      </div>
                    </div>
                  </>
                ))}
                <div className="o-info">
                  <div className="head">
                    <div className="order-date">Ngày đặt hàng: 18-03-2023</div>
                    <div className="order-id">
                      <div className="label">Mã đơn: </div>
                      <div className="value">ĐH-231199</div>
                      <span
                        onClick={() => {
                          navigator.clipboard.writeText('DH-094920');
                          toast.success('Copy thành công!', {
                            position: 'top-center',
                            autoClose: 1000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            theme: 'colored',
                          });
                        }}
                        className="copy-icon"
                      >
                        <CopyIcon />
                      </span>
                    </div>
                  </div>
                  <div className="status">Trạng thái: Đã giao</div>
                  <div className="pay-date">Ngày thanh toán: 20-03-2023</div>
                  <div className="total">
                    <div className="t-label">Tổng thu:</div>
                    <div className="t-value">3.802.600 đ</div>
                  </div>
                </div>
              </StyledLastedOrder>
            ) : (
              <EmptyData />
            )}
          </div>
        </div>
        <div className="interested-product-section">
          <div className="head">
            <h2 className="title">Sản phẩm quan tâm</h2>
          </div>
          {interestedProducts?.length ? (
            <>
              <InterestedProductsContain>
                {interestedProducts?.map((item: any) => (
                  <div className="interested-product">
                    <div className="image-wrap">
                      <SharedImage
                        className="product-image"
                        src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQMVBsOs5bp5V8wMakYyaL5hyIt-y4Giv0zRzQfqqV3q-WCB3C1dIKZnvxrt5vUGA&usqp=CAc"
                      />
                    </div>
                    <div className="product-info">
                      <div className="product-name">CPU Platinum8256 3.80GHz 4C/8TH</div>
                      <div className="prod-cost-sell">
                        <div className="cost">123.000.000 đ</div>
                        <div className="sell">Mua 10 lần</div>
                      </div>
                    </div>
                  </div>
                ))}
              </InterestedProductsContain>
            </>
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
    </CustomerDashboardPage>
  );
};

const CustomerDashboardPage = styled.div`
  margin-top: 1.2rem;
  .monthly-report {
    position: relative;
    width: 100%;
    border-radius: 8px;
    height: fit-content;
    background-color: #fff;
    margin-bottom: 24px;
    box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
    box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
    .head {
      padding: 2.3rem 2.8rem 0;
      .title {
        font-size: 2rem;
        font-weight: 600;
        color: ${APP_COLORS.gray800};
        margin-bottom: 1.5rem;
      }
      .desc {
        font-size: 1.5rem;
        font-weight: 400;
        color: ${APP_COLORS.gray600};
        /* margin-bottom: 1.8rem; */
      }
    }
    .content {
      padding: 0 2.8rem 2rem;
      display: flex;
      .summary-item {
        padding: 0 8px;
        flex: 1;
        .top-info {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
          .value {
            font-size: 2.1rem;
            font-weight: 600;
          }
        }
        .bottom-info {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          .label {
            font-size: 1.5rem;
            font-weight: 500;
            color: ${APP_COLORS.gray700};
          }
        }
      }
    }
    .ant-divider-vertical {
      height: auto;
      margin: 0 16px;
      vertical-align: middle;
      border-top: 0;
      border-left: 1px solid rgba(0, 0, 0, 0.101);
    }
  }
  .general {
    width: 100%;
    position: relative;
    .last-order {
      position: relative;
      width: 100%;
      border-radius: 8px;
      height: fit-content;
      background-color: #fff;
      margin-bottom: 24px;
      box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
      padding: 2.3rem 2.8rem;
    }
    .interested-product-section {
      width: 100%;
      border-radius: 8px;
      height: fit-content;
      background-color: #fff;
      margin-bottom: 24px;
      box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
      padding: 2.3rem 2.8rem;
    }
    @media (min-width: 992px) {
      display: flex;
      .last-order {
        position: relative;
        width: 100%;
        border-radius: 8px;
        height: fit-content;
        background-color: #fff;
        margin-bottom: 24px;
        box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
        box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
        padding: 2.3rem 2.8rem;
        .head {
          .title {
            font-size: 2rem;
            font-weight: 600;
            color: ${APP_COLORS.gray800};
            margin-bottom: 1.5rem;
          }
          .desc {
            font-size: 1.5rem;
            font-weight: 400;
            color: ${APP_COLORS.gray600};
            margin-bottom: 1.8rem;
          }
          .content {
            padding: 0 2.8rem;
          }
        }
      }
      .interested-product-section {
        position: relative;
        width: fit-content;
        max-width: 500px;
        border-radius: 8px;
        height: fit-content;
        background-color: #fff;
        margin-left: 2rem;
        margin-bottom: 24px;
        box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
        box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
        padding: 2.3rem 2.8rem;
        .head {
          .title {
            font-size: 2rem;
            font-weight: 600;
            color: ${APP_COLORS.gray800};
            margin-bottom: 1.5rem;
          }
          .desc {
            font-size: 1.5rem;
            font-weight: 400;
            color: ${APP_COLORS.gray600};
            margin-bottom: 1.8rem;
          }
        }
        .content {
          padding: 0 2.8rem 2.3rem;
        }
      }
    }
  }
`;

const InterestedProductsContain = styled.div`
  width: 100%;
  position: relative;
  .interested-product {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1.2rem 0;
    &:not(:first-child) {
      border-top: 1px dashed #dfdfdf;
    }
    .image-wrap {
      width: 50px;
      height: 50px;
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
        .sell {
          font-size: 1.3rem;
          font-weight: 400;
          color: ${APP_COLORS.highlightOv};
        }
      }
    }
  }
`;

const StyledLastedOrder = styled.div`
  width: 100%;
  position: relative;
  .product-id {
    margin-top: 2.4rem;
    font-size: 1.42rem;
    font-weight: 500;
    color: ${APP_COLORS.gray600};
    display: flex;
    align-items: center;
    .value {
      color: ${APP_COLORS.gray700};
      margin: 0 0.3rem 0 0.6rem;
      font-weight: 600;
    }
    .copy-icon {
      cursor: pointer;
      margin-top: -0.5rem;
      &:hover {
        svg path {
          fill: ${APP_COLORS.primary};
        }
      }
    }
  }
  .o-product {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1.6rem 0;
    border-bottom: 1px dashed #dfdfdf;
    .image-wrap {
      position: relative;
      width: 150px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .o-product-info {
      width: calc(100% - 150px - 2.6rem);
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 2.6rem;
      .product-name {
        font-size: 1.8rem;
        font-weight: 600;
        color: ${APP_COLORS.gray800};
      }
      .prod-cost {
        font-size: 1.3rem;
        font-weight: 400;
        color: ${APP_COLORS.gray700};
        strong {
          font-weight: 700;
          color: ${APP_COLORS.highlightRed};
        }
      }
      .prod-type {
        font-size: 1.3rem;
        font-weight: 400;
        color: ${APP_COLORS.gray700};
      }
      .prod-entity {
        font-size: 1.3rem;
        font-weight: 400;
        color: ${APP_COLORS.gray700};
      }
    }
  }
  .o-info {
    margin: 16px 0;
    padding: 16px;
    background-color: ${APP_COLORS.primaryLight};
    .head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      .order-date {
        font-weight: 500;
        color: ${APP_COLORS.gray600};
      }
      .order-id {
        font-size: 1.5rem;
        font-weight: 500;
        color: ${APP_COLORS.gray600};
        display: flex;
        align-items: center;
        .value {
          color: ${APP_COLORS.gray700};
          margin: 0 0.3rem 0 0.6rem;
          font-weight: 700;
        }
        .copy-icon {
          cursor: pointer;
          margin-top: -0.5rem;
          &:hover {
            svg path {
              fill: ${APP_COLORS.primary};
            }
          }
        }
      }
    }
    .status {
      margin-bottom: 8px;
      font-weight: 500;
      color: ${APP_COLORS.gray600};
    }
    .pay-date {
      margin-bottom: 8px;
      font-weight: 500;
      color: ${APP_COLORS.gray600};
    }
    .total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .t-label {
        font-size: 1.6rem;
        font-weight: 700;
      }
      .t-value {
        font-size: 1.7rem;
        font-weight: 700;
        color: ${APP_COLORS.highlightRed};
      }
    }
  }
`;
