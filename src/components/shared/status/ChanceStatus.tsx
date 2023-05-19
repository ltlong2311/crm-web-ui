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

export const ChanceStatus: React.FC<IProps> = (props) => {
  const { status, noIcon, size = 'large' } = props;

  const genBackgroundColor = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, APP_COLORS.blue300],
    [enumOrderStatus.IS_NOT_DELIVERED, APP_COLORS.orange600],
    [enumOrderStatus.IS_DELIVERING, APP_COLORS.yellow600],
  ]);
  const genLabel = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, 'Đơn mới'],
    [enumOrderStatus.IS_NOT_DELIVERED, 'Chuẩn bị giao hàng'],
    [enumOrderStatus.IS_DELIVERING, 'Đang giao hàng'],
  ]);
  const genIconColor = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, APP_COLORS.blue100],
    [enumOrderStatus.IS_NOT_DELIVERED, APP_COLORS.orange100],
    [enumOrderStatus.IS_DELIVERING, APP_COLORS.yellow100],
  ]);
  const genTextColor = new Map([
    [enumOrderStatus.IS_DELIVERED, APP_COLORS.orangeA100],
    [enumOrderStatus.IS_CANCELED, APP_COLORS.highlightRed],
    [enumOrderStatus.IS_PAID, APP_COLORS.lightGreen500],
  ]);
  if (!status) return <></>;
  return (
    <Wrapper $size={size}>
      <StatusTag
        label={genLabel.get(status)}
        prefixIcon={!noIcon && <CircleIcon size={12} color={genIconColor.get(status)} />}
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
    padding: 1rem 1.4rem;
    font-size: 1.6rem;
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
