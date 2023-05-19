import { dashboardAPI } from '@api';
import { ActiveMemberChart, ShareSelectInput } from '@components';
import { ActiveMember, ActiveMemberRoot, IDashboardPayload, TimePayload } from '@interfaces';
import { LogApp } from '@utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface IProps {
  dashboardPayload: IDashboardPayload;
}

export const ActiveMemberChartModule = (props: IProps) => {
  const { dashboardPayload } = props;
  const [activeMembers, setActiveMembers] = useState<ActiveMember[]>([]);

  const getActiveCustomers = async () => {
    const payload: TimePayload = {
      end_time: moment().endOf('day').valueOf(),
      start_time: moment().subtract(6, 'days').startOf('day').valueOf(),
    };
    const res: ActiveMemberRoot = await dashboardAPI.getActiveCustomers(payload);
    setActiveMembers(
      res.data.map((item) => {
        return {
          total: Number(item?.total),
          date: moment(item?.date).format('DD-MM-YYYY'),
          dateValue: moment(item?.date)?.valueOf(),
        };
      }),
    );
  };
  useEffect(() => {
    getActiveCustomers();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between">
        <h4>Active member</h4>
      </div>
      <ActiveMemberChart activeMembers={activeMembers} />
    </>
  );
};
