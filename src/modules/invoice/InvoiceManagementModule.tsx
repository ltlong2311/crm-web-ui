import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { debounce } from 'lodash';

import { customerAPI, orderAPI, tierAPI } from '@api';
import {
  dateOfBirthFormat,
  enumMemberType,
  enumStatus,
  PATH_CREATE_ORDER,
  PATH_CUSTOMER,
  PATH_INVOICE,
  PATH_ORDER,
} from '@configs';
import { FilterDataItem, ICustomerInfo, TierRoot } from '@interfaces';
import { LogApp, containsNumbers, useUrlQuery } from '@utils';
import {
  selectApp,
  setCurrentPage,
  setLoading,
  setTableLoading,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import _ from 'lodash';
import { OrderManagementSection } from '@pages';

export const InvoiceManagementModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { themeMode, currentPage } = useAppSelector(selectApp);

  const [tierFilterData, setTierFilterData] = useState<FilterDataItem[]>();
  const [applyFilter, setApplyFilter] = useState<number>(0);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const urlQuery = useUrlQuery();
  const tierIdParams = urlQuery?.get('tier');
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
    let searchValue = value;
    if (containsNumbers(value)) {
      // check case search id
      searchValue = value.replace('DH', '');
    }
    setPayload({ ...payload, search: searchValue.trim(), page: 1 });
  }, 600);

  const onViewDetails = (id: number | string) => {
    dispatch(setCurrentPage(Number(payload.page)));
    navigate(PATH_INVOICE + `/details/${id}`);
  };

  const onEditProfile = (id: number | string) => {
    navigate(PATH_INVOICE + `/edit/${id}`);
  };

  const onCreate = () => {
    navigate(PATH_CREATE_ORDER);
  };

  const onCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleChangePage = (page: number) => {
    LogApp('check page', page);
    setPayload({ ...payload, page });
    dispatch(setCurrentPage(Number(page)));
  };

  const handleChangeStatusFilter = (status: string) => {
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

  const handleDateRangeFrom = (time: any) => {
    LogApp('order from change', time);
    setPayload({ ...payload, fromDate: time ? time : '' });
  };

  const handleDateRangeTo = (time: any) => {
    LogApp('order to change', time);
    setPayload({ ...payload, toDate: time ? time : '' });
  };

  const handleChangeCustomerCategory = (type: string) => {
    setPayload({ ...payload, customerType: type });
  };

  const handleApplyFilter = () => {
    setApplyFilter((prev) => prev + 1);
  };

  const handleResetFilter = () => {
    const newPayload = _.omit(payload, ['status', 'fromDate', 'toDate']);
    setPayload(newPayload);
    setApplyFilter(0);
  };

  const getData = useCallback(
    async (signal?: AbortSignal) => {
      try {
        dispatch(setTableLoading(true));
        const res: any = await orderAPI.getList({ ...payload, signal });
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
    [payload.search, payload.page, payload.perPage, payload.status, applyFilter],
  );

  useEffect(() => {
    getData();
  }, [payload.search, payload.page, payload.perPage, applyFilter]);

  useEffect(() => {
    // getTiers();
  }, []);

  return (
    <OrderManagementSection
      onSearch={onSearch}
      data={data}
      payload={payload}
      pagination={pagination}
      tierFilterData={tierFilterData}
      currentPage={payload.page}
      showCreateModal={showCreateModal}
      setPayload={setPayload}
      onCreate={onCreate}
      onEdit={onEditProfile}
      onViewDetails={onViewDetails}
      onPageChange={handleChangePage}
      onChangeStatusFilter={handleChangeStatusFilter}
      onChangePageSize={handleChangePageSize}
      onChangeCustomerType={handleChangeCustomerCategory}
      onApplyFilter={handleApplyFilter}
      onResetFilter={handleResetFilter}
      onCloseCreateModal={onCloseCreateModal}
      onDataChange={onDataChange}
    />
  );
};
