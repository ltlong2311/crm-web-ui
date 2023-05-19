import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { debounce } from 'lodash';

import { customerAPI, customerCategoryAPI, tierAPI } from '@api';
import { dateOfBirthFormat, enumMemberType, enumStatus, MAXIMUM_ITEM_PER_PAGE_NUM, PATH_CUSTOMER } from '@configs';
import { FilterDataItem, ICustomerInfo, TierRoot, IGetCustomerParams, IOption } from '@interfaces';
import { LogApp, useUrlQuery } from '@utils';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import {
  selectApp,
  setCurrentPage,
  setLoading,
  setTableLoading,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import _ from 'lodash';
import { CustomerManagementSection } from '@pages';

export const SMSMarketingManagementModule = () => {
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

  const [customers, setCustomer] = useImmer<ICustomerInfo[]>([]);
  const [customerCategories, setCustomerCategories] = useState<IOption[]>();
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    perPage: 0,
  });
  const [payload, setPayload] = useState<IGetCustomerParams>({
    page: currentPage || 1,
    perPage: 10,
    search: '',
  });

  const refChangeBirthdayRange = useRef(0);

  const onSearch = debounce((value: string) => {
    LogApp('Check search', value);
    setPayload({ ...payload, search: value.trim(), page: 1 });
  }, 600);

  const onViewProfile = (id: number | string) => {
    dispatch(setCurrentPage(Number(payload.page)));
    navigate(PATH_CUSTOMER + `/details/${id}`);
  };

  const onEditProfile = (id: number | string) => {
    navigate(PATH_CUSTOMER + `/edit/${id}`);
  };

  const onCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleChangeStatus = async (id: number, status: enumStatus) => {
    try {
      dispatch(setLoading(true));
      await customerAPI.updateStatus(id, { status });
      toast.success(`${status ? 'Deactivate' : 'Reactivate'} member`, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: themeMode,
      });
      setCustomer((draft) => {
        const foundIndex = draft.findIndex((item) => item.id === id);
        draft[foundIndex].status = status ? 'active' : null;
        draft[foundIndex].active = status === enumStatus.ACTIVE ? true : false;
      });
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getCustomer = useCallback(
    async (signal?: AbortSignal) => {
      try {
        dispatch(setTableLoading(true));
        const res: any = await customerAPI.getList({ ...payload, signal });
        const customerList = res.data?.items;
        setCustomer(customerList);
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
    [payload.search, payload.page, payload.perPage, payload.status, applyFilter]
  );

  const getCustomerCategory = async () => {
    try {
      dispatch(setTableLoading(true));
      const res: any = await customerCategoryAPI.getList({
        page: 1,
        perPage: MAXIMUM_ITEM_PER_PAGE_NUM,
      });
      LogApp('data', res);
      const data = res.data?.items;
      setCustomerCategories(data);
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
  };

  const getTiers = useCallback(async (signal?: AbortSignal) => {
    try {
      dispatch(setTableLoading(true));
      const res: TierRoot = await tierAPI.getTiers({
        page: 1,
        num: 10,
        name: '',
        status: enumStatus.NONE,
      });
      const filterData = res?.data?.tiers?.map((item, index) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setTierFilterData([...[{ label: 'All', value: '' }], ...filterData]);
    } catch (error) {
    } finally {
      dispatch(setTableLoading(false));
    }
  }, []);

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
    getCustomer();
  };

  // const handleChangeDateRangeFrom = (time: number) => {
  //   LogApp('birthday from change', payload.start_time);
  //   setPayload({ ...payload, start_time: time ? time : '' });
  // };

  // const handleChangeDateRangeTo = (time: number) => {
  //   setPayload({ ...payload, end_time: time ? time : '' });
  // };

  const handleChangeCustomerCategory = (type: string) => {
    setPayload({ ...payload, customerType: type });
  };

  const handleApplyFilter = () => {
    setApplyFilter((prev) => prev + 1);
  };

  const handleResetFilter = () => {
    // assign the key status to the variable _ indicating it will be unused
    // const { status: _, ...newPayload } = payload;
    // setPayload(newPayload);
    const newPayload = _.omit(payload, ['status', 'tierId']);
    setPayload(newPayload);
    setApplyFilter(0);
  };

  useEffect(() => {
    getCustomer();
  }, [payload.search, payload.page, payload.perPage, applyFilter]);

  useEffect(() => {
    // getTiers();
  }, []);

  useEffect(() => {
    getCustomerCategory();
  }, []);

  return (
    <CustomerManagementSection
      onSearch={onSearch}
      data={customers}
      payload={payload}
      pagination={pagination}
      tierFilterData={tierFilterData}
      currentPage={payload.page}
      showCreateModal={showCreateModal}
      customerCategories={customerCategories}
      onCreate={() => {}}
      onEdit={onEditProfile}
      onViewProfile={onViewProfile}
      onChangeStatus={handleChangeStatus}
      onPageChange={handleChangePage}
      onChangeFilter={handleChangeFilter}
      onChangeTierFilter={handleChangeTierFilter}
      onChangePageSize={handleChangePageSize}
      // onChangeBirthdayRangeFrom={handleChangeDateRangeFrom}
      // onChangeBirthdayRangeTo={handleChangeDateRangeTo}
      onChangeCustomerType={handleChangeCustomerCategory}
      onApplyFilter={handleApplyFilter}
      onResetFilter={handleResetFilter}
      onCloseCreateModal={onCloseCreateModal}
      onDataChange={onDataChange}
    />
  );
};
