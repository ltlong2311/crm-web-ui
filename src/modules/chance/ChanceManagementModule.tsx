import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { debounce } from 'lodash';

import { chanceAPI, customerAPI, tierAPI } from '@api';
import { dateOfBirthFormat, enumMemberType, enumStatus, PATH_CHANCE, PATH_CREATE_CHANCE, PATH_CUSTOMER } from '@configs';
import {
  FilterDataItem,
  ICustomerInfo,
  TierRoot,
} from '@interfaces';
import { LogApp, useUrlQuery } from '@utils';
import {
  selectApp,
  setCurrentPage,
  setLoading,
  setTableLoading,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import _ from 'lodash';
import { ChanceManagementSection } from '@pages';

export const ChanceManagementModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { themeMode, currentPage } = useAppSelector(selectApp);

  const [tierFilterData, setTierFilterData] = useState<FilterDataItem[]>();
  const [applyFilter, setApplyFilter] = useState<number>(0);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const urlQuery = useUrlQuery();
  const filDate = urlQuery?.get('date');
  const filMemberType = urlQuery?.get('m-type');

  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    perPage: 0,
  });
  const [payload, setPayload] = useState<any>({
    page: currentPage || 1,
    perPage: 10,
    search: '',
  });

  const refChangeBirthdayRange = useRef(0);

  const onSearch = debounce((value: string) => {
    LogApp('Check search', value);
    setPayload({ ...payload, search: value.trim(), page: 1 });
  }, 600);

  const onCreate = () => {
    navigate(PATH_CREATE_CHANCE);
  };

  const onViewDetails = (id: number | string) => {
    dispatch(setCurrentPage(Number(payload.page)));
    navigate(PATH_CHANCE + `/details/${id}`);
  };

  const onEditProfile = (id: number | string) => {
    navigate(PATH_CHANCE + `/edit/${id}`);
  };

  const onCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const getData = useCallback(
    async (signal?: AbortSignal) => {
      try {
        dispatch(setTableLoading(true));
        const res: any = await chanceAPI.getList({ ...payload, signal });
        const customerList = res.data?.items;
        setData(customerList);
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
    },
    [
      payload.search,
      payload.page,
      payload.perPage,
      payload.status,
      applyFilter,
    ]
  );

  const handleChangePage = (page: number) => {
    LogApp('check page', page);
    setPayload({ ...payload, page });
    dispatch(setCurrentPage(Number(page)));
  };

  const handleChangeFilter = (status: string) => {
    setPayload({ ...payload, status });
  };

  const handleChangeTierFilter = (tierId: number | string) => {
    setPayload({ ...payload, tierId });
  };

  const handleChangePageSize = (size: number) => {
    setPayload({ ...payload, perPage: size });
  };

  const onDataChange = () => {
    getData();
  };

  const handleDateRangeFrom = (time: number) => {
    LogApp('birthday from change', payload.start_time);
    setPayload({ ...payload, start_time: time ? time : '' });
  };

  const handleDateRangeTo = (time: number) => {
    setPayload({ ...payload, end_time: time ? time : '' });
  };

  const handleChangeCustomerCategory = (type: string) => {
    setPayload({ ...payload, customerType: type });
  };

  const handleApplyFilter = () => {
    setApplyFilter((prev) => prev + 1);
  };

  const handleResetFilter = () => {
    // assign the key status to the variable _ indicating it will be unused
    const newPayload = _.omit(payload, ['status', 'tierId']);
    setPayload(newPayload);
    setApplyFilter(0);
  };

  useEffect(() => {
    getData();
  }, [
    payload.search,
    payload.page,
    payload.perPage,
    applyFilter,
  ]);

  useEffect(() => {
    // getTiers();
  }, []);

  return (
    <ChanceManagementSection
      onSearch={onSearch}
      data={data}
      payload={payload}
      pagination={pagination}
      tierFilterData={tierFilterData}
      currentPage={payload.page}
      showCreateModal={showCreateModal}
      onCreate={onCreate}
      onEdit={onEditProfile}
      onViewDetails={onViewDetails}
      onPageChange={handleChangePage}
      onChangeFilter={handleChangeFilter}
      onChangeTierFilter={handleChangeTierFilter}
      onChangePageSize={handleChangePageSize}
      // onChangeRangeFrom={handleChangeDateRangeFrom}
      // onChangeRangeTo={handleChangeDateRangeTo}
      onChangeCustomerType={handleChangeCustomerCategory}
      onApplyFilter={handleApplyFilter}
      onResetFilter={handleResetFilter}
      onCloseCreateModal={onCloseCreateModal}
      onDataChange={onDataChange}
    />
  );
};
