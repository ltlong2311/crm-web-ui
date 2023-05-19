import React from 'react';
import { Empty } from 'antd';

import { PrimaryEmptyIcon } from '../Icon';

interface IProps {
  height?: number;
  desc?: string;
}

export const EmptyData = (props: IProps) => {
  const { desc } = props;
  return (
    <Empty
      image={<PrimaryEmptyIcon />}
      imageStyle={{ height: 60 }}
      description={<span>{desc || 'Chưa có dữ liệu'}</span>}
    />
  );
};
