import React from 'react';
import { StatusTag } from './StatusTag';
import { enumOrderStatus } from '@configs';
import { APP_COLORS } from '@theme';

interface IProps {
  status: enumOrderStatus;
}

export const OrderStatusTag: React.FC<IProps> = (props) => {
  const { status } = props;

  const genBackgroundColor = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, APP_COLORS.blue300],
    [enumOrderStatus.IS_NOT_DELIVERED, APP_COLORS.orange600],
    [enumOrderStatus.IS_DELIVERING, APP_COLORS.yellow600],
    [enumOrderStatus.IS_DELIVERED, APP_COLORS.green300],
  ]);
  const genLabel = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, 'Đơn mới'],
    [enumOrderStatus.IS_NOT_DELIVERED, 'Đã xác nhận'],
    [enumOrderStatus.IS_DELIVERING, 'Đang giao dịch'],
    [enumOrderStatus.IS_DELIVERED, 'Hoàn thành'],
  ]);
  const genIcon = new Map([
    [enumOrderStatus.IS_NOT_ACCEPTED, ''],
    [enumOrderStatus.IS_NOT_DELIVERED, ''],
    [enumOrderStatus.IS_DELIVERING, ''],
    [enumOrderStatus.IS_DELIVERED, ''],
  ]);
  if (!status) return <></>;
  return (
    <StatusTag
      label={genLabel.get(status)}
      // prefixIcon={genIcon.get(status)}
      backgroundColor={genBackgroundColor.get(status)}
    />
  );
};
