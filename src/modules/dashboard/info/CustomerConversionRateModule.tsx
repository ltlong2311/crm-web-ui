import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { dashboardAPI } from '@api';
import { CustomerConversionRateSection, DashboardSection, ShareSelectInput } from '@components';
import { DASHBOARD_FILTER_LAST_OPTIONS, dateFormat, enumDashboardLastFilter } from '@configs';
import { IDashboardDataPayload, IDashboardPayload } from '@interfaces';

interface IProps {
  allDashboardFilter?: IDashboardPayload;
}

export const CustomerConversionRateModule = (props: IProps) => {
  const { allDashboardFilter } = props;
  const [data, setData] = useState<any>(0);
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
      }),
    );
  };

  useEffect(() => {
    getNewCustomers();
  }, [payload]);

  return (
    <DashboardSection $flex={1}>
      <div className="head">
        <div>
          <h3 className="title">Chuyển đổi khách hàng</h3>
          <p className="desc">
            Tỉ lệ chuyển đổi khách hàng tiềm năng thành khách hàng thực sự của doanh nghiệp
          </p>
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
      <CustomerConversionRateSection data={data} />
    </DashboardSection>
  );
};
