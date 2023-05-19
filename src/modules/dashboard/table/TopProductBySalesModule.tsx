import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { dashboardAPI } from '@api';
import {
  CenterBox,
  CustomerConversionRateSection,
  DashboardGroupContent,
  DashboardSection,
  ShareSelectInput,
  TopProductTable,
} from '@components';
import { DASHBOARD_FILTER_LAST_OPTIONS, dateFormat, enumDashboardLastFilter } from '@configs';
import { IDashboardDataPayload, IDashboardPayload } from '@interfaces';
import ReactLoading from 'react-loading';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';

interface IProps {
  allDashboardFilter?: IDashboardPayload;
}

export const TopProductBySalesModule = (props: IProps) => {
  const { allDashboardFilter } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([
    {
      id: 34,
      name: 'Tông lào 2',
      desc: '',
      cost: 8392,
      quantity: 3123,
      image: 'https://i.imgur.com/hQ22p8g.png',
      category: {
        id: 2,
        name: 'Máy tính',
        desc: 'None',
      },
      totalSales: 6921300,
    },
    {
      id: 32,
      name: 'Tông lào',
      desc: '3123',
      cost: 8392,
      quantity: 3123,
      image: 'https://i.imgur.com/ydKQeaH.png',
      category: {
        id: 3,
        name: 'Thiết bị điện tử',
        desc: 'None',
      },
      totalSales: 5632100,
    },
    {
      id: 24,
      name: 'Giày 20',
      desc: '423',
      cost: 123,
      quantity: 2,
      image: 'https://i.imgur.com/agVA1WB.png',
      category: {
        id: 1,
        name: 'Khác',
        desc: 'Sản phẩm khác',
      },
      totalSales: 5132000,
    },
    {
      id: 18,
      name: 'Bóng đèn',
      desc: '3123',
      cost: 123,
      quantity: 2312,
      image: 'https://i.imgur.com/JGUDK4j.jpg',
      category: {
        id: 2,
        name: 'Máy tính',
        desc: 'None',
      },
      totalSales: 3839000,
    },
    {
      id: 22,
      name: 'smart watch',
      desc: '3123',
      cost: 31,
      quantity: 2312,
      image: 'https://i.imgur.com/ukx42f7.png',
      category: {
        id: 2,
        name: 'Máy tính',
        desc: 'None',
      },
      totalSales: 1938600,
    },
  ]);
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
    <DashboardGroupContent $flex={1}>
      <div className="head">
        <div>
          <h3 className="title">
            Top sản phẩm theo <span>Doanh số</span>
          </h3>
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
        <TopProductTable data={data} filterBy="sales" />
      )}
    </DashboardGroupContent>
  );
};
