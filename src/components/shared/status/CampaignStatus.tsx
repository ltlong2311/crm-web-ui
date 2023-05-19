import React from 'react';
import { StatusTag } from './StatusTag';
import { enumCampaignStatus } from '@configs';
import { APP_COLORS } from '@theme';

interface IProps {
  status: enumCampaignStatus;
}

export const CampaignStatus: React.FC<IProps> = (props) => {
  const { status } = props;

  const genBackgroundColor = new Map([
    [enumCampaignStatus.DRAFT, APP_COLORS.cyan300],
    [enumCampaignStatus.NOT_ACTIVE, APP_COLORS.green600],
    [enumCampaignStatus.ACTIVE, APP_COLORS.primary],
    [enumCampaignStatus.END, APP_COLORS.teal300],
    [enumCampaignStatus.CANCELED, APP_COLORS.red300],
    [enumCampaignStatus.OVERDUE, APP_COLORS.orange600],
  ]);
  const genLabel = new Map([
    [enumCampaignStatus.DRAFT, 'Nháp'],
    [enumCampaignStatus.NOT_ACTIVE, 'Chưa hoạt động'],
    [enumCampaignStatus.ACTIVE, 'Đang diễn ra'],
    [enumCampaignStatus.END, 'Đã kết thúc'],
    [enumCampaignStatus.CANCELED, 'Hủy bỏ'],
    [enumCampaignStatus.OVERDUE, 'Quá hạn'],
  ]);
  if (!status) return <></>;
  return (
    <StatusTag label={genLabel.get(status)} backgroundColor={genBackgroundColor.get(status)} />
  );
};
