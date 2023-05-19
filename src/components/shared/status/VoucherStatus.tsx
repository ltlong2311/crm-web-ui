import React from 'react';
import { StatusTag } from './StatusTag';
import { enumCampaignStatus, enumVoucherStatus } from '@configs';
import { APP_COLORS } from '@theme';

interface IProps {
  status: enumVoucherStatus;
}

export const VoucherStatus: React.FC<IProps> = (props) => {
  const { status } = props;

  const genBackgroundColor = new Map([
    [enumVoucherStatus.ACTIVE, APP_COLORS.blue300],
    [enumVoucherStatus.BLOCK, APP_COLORS.red300],
  ]);
  const genLabel = new Map([
    [enumVoucherStatus.ACTIVE, 'Hoạt động'],
    [enumVoucherStatus.BLOCK, 'Khóa'],
  ]);
  if (!status) return <></>;
  return (
    <StatusTag label={genLabel.get(status)} backgroundColor={genBackgroundColor.get(status)} />
  );
};
