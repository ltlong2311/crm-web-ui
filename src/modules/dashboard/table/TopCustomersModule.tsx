import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { dashboardAPI } from '@api';
import {
  CenterBox,
  CustomerConversionRateSection,
  DashboardGroupContent,
  DashboardSection,
  ShareSelectInput,
  TopCustomersTable,
  TopProductTable,
} from '@components';
import {
  DASHBOARD_FILTER_LAST_OPTIONS,
  dateFormat,
  enumDashboardLastFilter,
  topMostSpentCustomersData,
} from '@configs';
import { IDashboardDataPayload, IDashboardPayload } from '@interfaces';
import ReactLoading from 'react-loading';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';

interface IProps {
  allDashboardFilter?: IDashboardPayload;
}

export const TopCustomersModule = (props: IProps) => {
  const { allDashboardFilter } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(topMostSpentCustomersData);

  const [payload, setPayload] = useState<IDashboardDataPayload>({
    filter: enumDashboardLastFilter.WEEK,
  });

  const getData = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      LogApp(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getData();
  }, [payload?.filter]);

  return (
    <DashboardSection $flex={2} $tableSection>
      <div className="head">
        <div>
          <h3 className="title">Khách hàng nổi bật</h3>
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
      {loading ? (
        <CenterBox className="db-sec__loading">
          <ReactLoading type="bubbles" color={APP_COLORS.cyan300} height={'20%'} width={'20%'} />
        </CenterBox>
      ) : (
        <TopCustomersTable data={data} />
      )}
    </DashboardSection>
  );
};
