import React, { useEffect } from 'react';

import { CustomerDashboard } from '@pages';
import { LogApp } from '@utils';

interface IProps {
  data?: any;
}

export const CustomerDashboardModule = (props: IProps) => {
  useEffect(() => {
    LogApp('CustomerDashboard');
  }, []);
  return <CustomerDashboard {...props} />;
};
