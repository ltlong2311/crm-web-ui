import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import { dashboardAPI } from '@api';
import {
  Box,
  CenterBox,
  DashboardSection,
  FlexWrap,
  NewCustomerChart,
  ProductCategoryChart,
  ShareSelectInput,
} from '@components';
import { DASHBOARD_FILTER_OPTIONS, dateFormat, enumDashboardFilter } from '@configs';
import { IDashboardDataPayload, IDashboardPayload, IProductCategoryChartData } from '@interfaces';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';
interface IProps {
  allDashboardFilter?: IDashboardPayload;
}

export const ProductCategoryChartModule = (props: IProps) => {
  const { allDashboardFilter } = props;
  const [payload, setPayload] = useState<IDashboardDataPayload>({
    filter: enumDashboardFilter.DAY,
  });
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IProductCategoryChartData[]>([
    {
      type: 'Bàn là',
      value: 6,
    },
    {
      type: 'Quạt cháy',
      value: 13,
    },
    {
      type: 'Máy bơm',
      value: 5,
    },
    {
      type: 'Ti vi',
      value: 23,
    },
    {
      type: 'Tủ lạnh',
      value: 15,
    },
    {
      type: 'Nồi cơm',
      value: 5,
      isCurrent: true,
    },
    {
      type: 'Lồng bàn',
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
    <DashboardSection $flex={1}>
      <div className="head">
        <Box>
          <FlexWrap $justifyContent="space-between">
            <h3 className="title">Phân loại hàng đầu</h3>
            <ShareSelectInput
              data={DASHBOARD_FILTER_OPTIONS}
              className="chart-filter"
              defaultValue={DASHBOARD_FILTER_OPTIONS[0]?.value}
              onChange={(value) => {
                setPayload({ ...payload, filter: value });
              }}
              itemSelect
            />
          </FlexWrap>
          <p className="desc">Các phân loại sản phẩm có mức tiêu thụ tốt nhất</p>
        </Box>
      </div>
      {loading ? (
        <CenterBox className="db-sec__loading">
          <ReactLoading type="cylon" color={APP_COLORS.cyan300} height={'20%'} width={'20%'} />
        </CenterBox>
      ) : (
        <ProductCategoryChart data={data} />
      )}
    </DashboardSection>
  );
};
