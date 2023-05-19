import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import { dashboardAPI } from '@api';
import {
  CenterBox,
  CreatedChancesChart,
  DashboardSection,
  NewCustomerChart,
  ShareSelectInput,
} from '@components';
import { DASHBOARD_FILTER_OPTIONS, dateFormat, enumDashboardFilter } from '@configs';
import { IDashboardDataPayload, IDashboardPayload, INewCustomers } from '@interfaces';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';
interface IProps {
  allDashboardFilter?: IDashboardPayload;
}

export const CreatedChancesChartModule = (props: IProps) => {
  const { allDashboardFilter } = props;
  const [payload, setPayload] = useState<IDashboardDataPayload>({
    filter: enumDashboardFilter.DAY,
  });
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<INewCustomers[]>([
    {
      timePeriod: '27/03',
      value: 6,
    },
    {
      timePeriod: '28/03',
      value: 13,
    },
    {
      timePeriod: '29/03',
      value: 5,
    },
    {
      timePeriod: '30/03',
      value: 23,
    },
    {
      timePeriod: '31/03',
      value: 15,
    },
    {
      timePeriod: '01/04',
      value: 5,
      isCurrent: true,
    },
    {
      timePeriod: '02/04',
      value: 5,
      isCurrent: true,
    },
  ]);

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
    <DashboardSection $flex={2}>
      <div className="head">
        <h3 className="title">Cơ hội mới</h3>
        <ShareSelectInput
          data={DASHBOARD_FILTER_OPTIONS}
          className="chart-filter"
          defaultValue={DASHBOARD_FILTER_OPTIONS[0]?.value}
          onChange={(value) => {
            setPayload({ ...payload, filter: value });
          }}
          noBorderStyle
        />
      </div>
      {loading ? (
        <CenterBox className="db-sec__loading">
          <ReactLoading type="cylon" color={APP_COLORS.cyan300} height={'20%'} width={'20%'} />
        </CenterBox>
      ) : (
        <CreatedChancesChart data={data} />
      )}
    </DashboardSection>
  );
};
