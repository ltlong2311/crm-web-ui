import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { dashboardAPI } from '@api';
import { DashboardSection, NewCreatedCustomerSection, ShareSelectInput } from '@components';
import { DASHBOARD_FILTER_LAST_OPTIONS, dateFormat, enumDashboardLastFilter } from '@configs';
import {
  IDashboardDataPayload,
  IDashboardPayload,
} from '@interfaces';
import { LogApp } from '@utils';

interface IProps {
  allDashboardFilter?: IDashboardPayload;
}

export const NewCreatedCustomersModule = (props: IProps) => {
  const { allDashboardFilter } = props;
  const [data, setData] = useState<number>(0);
  const [payload, setPayload] = useState<IDashboardDataPayload>({
    filter: enumDashboardLastFilter.WEEK,
  });

  const getNewCustomers = async () => {
    const res = await dashboardAPI.getNewCustomers(payload);
    setData(
      res.data.map((item: any) => {
        return {
          timePeriod: Number(item?.total),
          value: moment(item?.date).format(dateFormat),
          // timeValue: moment(item?.date)?.valueOf(),
        };
      })
    );
  };
  useEffect(() => {
    // getNewCustomers();
  }, []);
  return (
    <DashboardSection $flex={1}>
      <div className="head">
        <div>
          <h3 className="title">Khách hàng tiềm năng</h3>
          <p className="desc">Số lượng khách hàng đã tạo mới trên hệ thống</p>
        </div>
        <ShareSelectInput
          data={DASHBOARD_FILTER_LAST_OPTIONS}
          className="chart-filter"
          defaultValue={DASHBOARD_FILTER_LAST_OPTIONS[0]?.value}
          onChange={(value) => {
            setPayload({ ...payload, filter: value });
          }}
          itemSelect
        />
      </div>
      <NewCreatedCustomerSection data={data} />
    </DashboardSection>
  );
};
