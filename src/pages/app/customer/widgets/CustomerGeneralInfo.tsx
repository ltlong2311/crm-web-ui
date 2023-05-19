import { SharedButton } from '@components';
import { NONE_P } from '@configs';
import { UpdateCustomerInfoModule } from '@modules';
import { APP_COLORS } from '@theme';
import { formatAppDate, formatAppGender, useUrlQuery } from '@utils';
import { Avatar, Divider } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  data?: any;
  onDataChange?: () => void;
}

export const CustomerGeneralInfo = (props: IProps) => {
  const { data, onDataChange } = props;
  const [showEditPopup, setShowEditPopup] = useState(false);
  // const urlQuery = useUrlQuery();
  const { id } = useParams();
  return (
    <StyledGeneralInfo>
      <div className="customer-summary">
        <Avatar
          className="avatar"
          size={100}
          src={data?.image}
          style={
            !data?.image
              ? {
                  backgroundColor: APP_COLORS.primary,
                  verticalAlign: 'middle',
                  fontSize: '2.6rem',
                  textTransform: 'capitalize',
                  fontFamily: 'monospace',
                }
              : {
                  fontSize: '2.6rem',
                  textTransform: 'capitalize',
                  fontFamily: 'monospace',
                }
          }
          // onError={() => false}
        >
          {data?.lastName?.charAt(0)}
        </Avatar>
        <div className="name">{data?.lastName}</div>
        <div className="type-list">
          {data?.classifications?.map((item: any) => (
            <>
              <div key={item?.id} className="badge">
                {item?.name}
              </div>
            </>
          ))}
        </div>
        <div className="summary">
          <div className="summary-item">
            <div className="label">Đơn hàng</div>
            <div className="value">21</div>
          </div>
          <div className="summary-item mh">
            {/* Số giao dịch hiện tại phản ánh chênh lệch số đơn hàng chứa trả phí hoặc bị huỷ, chia nhỏ giao dịch */}
            <div className="label">Giao dịch</div>
            <div className="value">11</div>
          </div>
          <div className="summary-item">
            <div className="label" title="Sản phẩm đã mua">
              Sản phẩm
            </div>
            <div className="value">230</div>
          </div>
        </div>
        <div className="total">
          <div className="total-spending">
            <div className="label" title="Sản phẩm đã mua">
              Tổng chi tiêu
            </div>
            <div className="value">
              <span className="highlight">{data?.spent || 0} đ</span>
            </div>
          </div>
        </div>
      </div>
      <div className="basic-info">
        <div className="head">
          <h5 className="title">Thông tin cơ bản</h5>
          <div onClick={() => setShowEditPopup(true)} className="edit_btn">
            Sửa
          </div>
        </div>
        <Divider dashed />
        <div className="info">
          <div className="item">
            <div className="label">Mã khách hàng</div>
            <div className="value">KH-{data?.id}</div>
          </div>
          <div className="item">
            <div className="label">Địa chỉ</div>
            <div className="value">{data?.address || NONE_P}</div>
            {/* <div className="value">101 Collin Street, Melbourne 3000 VIC Viet Nam</div> */}
          </div>
          <div className="item">
            <div className="label">Ngày sinh</div>
            <div className="value">{data?.dob ? formatAppDate(data.dob) : NONE_P}</div>
          </div>
          <div className="item">
            <div className="label">Giới tính</div>
            <div className="value">{data?.gender ? formatAppGender(data.gender) : NONE_P}</div>
          </div>
          <div className="item">
            <div className="label">Mã bưu điện</div>
            <div className="value">{data?.portalCode || NONE_P}</div>
          </div>
        </div>
      </div>
      <UpdateCustomerInfoModule
        info={data}
        id={id}
        open={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        onDataChange={onDataChange}
      />
    </StyledGeneralInfo>
  );
};

const StyledGeneralInfo = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: #fff;
  padding: 4.875rem 2.925rem;
  width: 100%;
  box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  .customer-summary {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 3.6rem;
    .avatar {
      margin-bottom: 2.3rem;
    }
    .name {
      color: ${APP_COLORS.gray800};
      margin-bottom: 1rem;
      font-size: 1.9rem;
      font-weight: 600;
    }
    .type-list {
      justify-content: center;
      display: inline-flex;
      flex-wrap: wrap;
      margin: -12px 0 0 -12px;
      width: calc(100% + 12px);
      & > * {
        margin: 12px 0 0 12px;
      }
      margin-bottom: 1.8rem;
    }
    .badge {
      border-radius: 2px;
      padding: 0.3rem 0.6rem;
      color: ${APP_COLORS.primary};
      background: ${APP_COLORS.primaryLight};
      display: inline;
      font-size: 1.3rem;
      font-weight: 600;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      margin-bottom: 16px;
      .summary-item {
        position: relative;
        min-width: 8rem;
        max-width: 10rem;
        height: 100%;
        padding: 1rem;
        border: 1px dashed #dfdfdf;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .label {
          color: #a1a5b7;
          font-size: 1.2rem;
          font-weight: 700;
          text-align: center;
        }
        .value {
          max-width: 8rem;
          color: ${APP_COLORS.gray700};
          font-size: 1.8rem;
          font-weight: 600;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .mh {
        margin: 0 1.2rem;
      }
    }
    .total {
      display: flex;
      align-items: center;
      /* margin-bottom: 16px; */
      .total-spending {
        position: relative;
        min-width: 16rem;
        max-width: 20rem;
        padding: 1rem 1.5rem;
        border: 1px dashed #dfdfdf;
        border-radius: 8px;
        .label {
          color: #a1a5b7;
          font-size: 1.2rem;
          font-weight: 700;
          text-align: center;
        }
        .value {
          max-width: 18rem;
          color: ${APP_COLORS.gray700};
          font-size: 1.8rem;
          font-weight: 600;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .highlight {
            color: ${APP_COLORS.highlight};
          }
        }
      }
    }
  }
  .basic-info {
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        color: ${APP_COLORS.gray800};
        font-size: 1.9rem;
        font-weight: 600;
      }
      .edit_btn {
        color: ${APP_COLORS.primary};
        background: ${APP_COLORS.cyanL};
        padding: 0.8rem 1.7rem;
        font-size: 1.3rem;
        font-weight: 700;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background: ${APP_COLORS.primary};
          color: ${APP_COLORS.white};
        }
      }
    }
    .info {
      .item {
        &:not(:last-child) {
          margin-bottom: 16px;
        }
        .label {
          font-size: 1.5rem;
          color: #181c32;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .value {
          font-size: 1.5rem;
          color: ${APP_COLORS.gray600};
          font-weight: 400;
        }
      }
    }
  }
`;
