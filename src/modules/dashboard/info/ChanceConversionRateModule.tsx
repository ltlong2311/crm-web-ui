import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { dashboardAPI } from '@api';
import {
  CenterBox,
  ChanceConversionRateSection,
  CustomerConversionRateSection,
  DashboardSection,
  ShareSelectInput,
} from '@components';
import { DASHBOARD_FILTER_LAST_OPTIONS, dateFormat, enumDashboardLastFilter } from '@configs';
import { IDashboardDataPayload, IDashboardPayload } from '@interfaces';
import { LogApp } from '@utils';
import ReactLoading from 'react-loading';
import { APP_COLORS } from '@theme';

interface IProps {
  allDashboardFilter?: IDashboardPayload;
}

export const ChanceConversionRateModule = (props: IProps) => {
  const { allDashboardFilter } = props;
  const [data, setData] = useState<any>(0);
  const [loading, setLoading] = useState(false);
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
    <DashboardSection $flex={1}>
      <div className="head">
        <div>
          <h3 className="title">Thực hiện cơ hội</h3>
          <p className="desc">
            Tỉ lệ thực hiện thành công cơ hội, chuyển hóa các cơ hội thành giao dịch với khách hàng
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
      {loading ? (
        <CenterBox className="db-sec__loading">
          <ReactLoading type="bubbles" color={APP_COLORS.cyan300} height={'20%'} width={'20%'} />
        </CenterBox>
      ) : (
        <ChanceConversionRateSection data={data} />
      )}
    </DashboardSection>
  );
};
