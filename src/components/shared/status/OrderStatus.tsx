import React from 'react';
import { StatusTag } from './StatusTag';
import { enumOrderStatus } from '@configs';
import styled, { css } from 'styled-components';
import { APP_COLORS } from '@theme';
import { CircleIcon } from '@components';

interface IProps {
  status: enumOrderStatus;
  noIcon?: boolean;
  size?: 'large' | 'small';
}

export const OrderStatus: React.FC<IProps> = (props) => {
  const { status, noIcon, size = 'large' } = props;

  const genBackgroundColor = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, APP_COLORS.blue300],
    [enumOrderStatus.IS_NOT_DELIVERED, APP_COLORS.orange600],
    [enumOrderStatus.IS_DELIVERING, APP_COLORS.yellow600],
    [enumOrderStatus.IS_DELIVERED, APP_COLORS.green300],
    [enumOrderStatus.IS_CANCELED, APP_COLORS.red600],
    [enumOrderStatus.IS_PAID, APP_COLORS.lightGreen50],
    [enumOrderStatus.IS_REFUND, APP_COLORS.orange100],
  ]);
  const genLabel = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, 'Đơn mới'],
    [enumOrderStatus.IS_NOT_DELIVERED, 'Đã xác nhận'],
    [enumOrderStatus.IS_DELIVERING, 'Đang giao dịch'],
    [enumOrderStatus.IS_DELIVERED, 'Hoàn thành'],
    [enumOrderStatus.IS_CANCELED, 'Huỷ bỏ'],
    [enumOrderStatus.IS_PAID, 'Đã thanh toán'],
    [enumOrderStatus.IS_REFUND, 'Hoàn trả'],
  ]);
  const genIconColor = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, APP_COLORS.blue100],
    [enumOrderStatus.IS_NOT_DELIVERED, APP_COLORS.orange100],
    [enumOrderStatus.IS_DELIVERING, APP_COLORS.yellow100],
    [enumOrderStatus.IS_DELIVERED, APP_COLORS.lightGreen100],
    [enumOrderStatus.IS_CANCELED, APP_COLORS.gray300],
  ]);
  const genTextColor = new Map([
    [enumOrderStatus.IS_PAID, APP_COLORS.lightGreen500],
    [enumOrderStatus.IS_REFUND, APP_COLORS.red300],
  ]);
  if (!status) return <></>;
  return (
    <Wrapper $size={size}>
      <StatusTag
        label={genLabel.get(status)}
        prefixIcon={
          !noIcon &&
          status === enumOrderStatus.IS_NOT_ACCEPTED && (
            <CircleIcon size={12} color={genIconColor.get(status)} />
          )
        }
        backgroundColor={genBackgroundColor.get(status)}
        textColor={genTextColor.get(status)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  $size?: 'large' | 'small';
}>`
  width: fit-content;
  .ant-tag {
    padding: 0.8rem 1.3rem;
    font-size: 1.5rem;
    font-weight: 700;
    .pre-icon {
      margin-right: 0.8rem;
    }
    ${({ $size }) =>
      $size === 'small' &&
      css`
        padding: 0.6rem 1rem;
        font-size: 1.4rem;
        border-radius: 6px;
      `}
  }
`;
