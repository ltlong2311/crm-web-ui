import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTimeDuration, LogApp, showAppToast } from '@utils';
import { selectApp, setCurrentPage, setTableLoading, useAppDispatch, useAppSelector } from '@redux';
import { IBanner, IGetAccountListParams } from '@interfaces';
import { userAPI } from '@api';
import { PATH_CREATE_BANNER } from '@configs';
import { debounce } from 'lodash';
import { CustomerEventLogs, CustomerInvoices } from '@pages';

interface IProps {
  id?: string | number;
}

export const CustomerInvoicesModule = (props: IProps) => {
  const { id } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentPage, themeMode } = useAppSelector(selectApp);

  const [data, setData] = useState<IBanner[]>([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    perPage: 0,
  });
  const [payload, setPayload] = useState<IGetAccountListParams>({
    page: currentPage || 1,
    perPage: 10,
    search: '',
  });
  const [dataChange, setDataChange] = useState<number>(0);

  const onSearch = debounce((value: string) => {
    LogApp('Check search', value);
    setPayload({ ...payload, search: value.trim(), page: 1 });
  }, 600);

  const onDataChange = (no: number) => {
    setDataChange(no);
  };

  const getData = useCallback(async () => {
    try {
      dispatch(setTableLoading(true));
      const res: any = await userAPI.getAccountList(payload);
      LogApp('data', res);
      const data = res.data?.items;
      const pagination = res.data?.pagination;
      const listBanners = data.map((item: IBanner, index: number) => {
        return {
          ...item,
          duration: getTimeDuration({
            startTime: item?.start_time,
            endTime: item?.end_time,
          }),
        };
      }) as IBanner[];
      setData(listBanners);
      setPagination({
        totalItems: pagination.totalItems,
        totalPages: pagination.totalPages,
        perPage: pagination.perPage,
      });
    } catch (error) {
      LogApp(error);
    } finally {
      dispatch(setTableLoading(false));
    }
  }, [payload.search, payload.page, payload.perPage, dataChange]);

  const onDelete = async (id: number | string) => {
    try {
      const res = await userAPI.delete(id);
      showAppToast('Xóa thành công!', 'success');
      getData();
    } catch (error) {}
  };

  const handleChangePage = (page: number) => {
    LogApp('check page', page);
    setPayload({ ...payload, page });
    dispatch(setCurrentPage(Number(page)));
  };

  useEffect(() => {
    getData();
  }, [payload.search, payload.page, payload.perPage, dataChange]);
  return (
    <CustomerInvoices
      currentPage={payload.page}
      data={data}
      onSearch={onSearch}
      pagination={pagination}
      onPageChange={handleChangePage}
      onDataChange={onDataChange}
      dataChange={dataChange}
    />
  );
};
