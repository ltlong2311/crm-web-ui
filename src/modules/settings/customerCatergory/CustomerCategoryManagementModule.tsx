import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { containsNumbers, getTimeDuration, LogApp, showAppToast } from '@utils';
import { selectApp, setCurrentPage, setTableLoading, useAppDispatch, useAppSelector } from '@redux';
import { IGetAccountListParams } from '@interfaces';
import { categoriesAPI, customerCategoryAPI } from '@api';
import { PATH_BANNER, PATH_CREATE_BANNER } from '@configs';
import { CustomerCategoryListSection, UserAccountList } from '@pages';
import { debounce } from 'lodash';

export const CustomerCategoryManagementModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentPage, themeMode } = useAppSelector(selectApp);

  const [data, setData] = useState<any>([]);
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
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | string>();
  const [dataChange, setDataChange] = useState<number>(0);
  LogApp(dataChange, 'check');

  const onSearch = debounce((value: string) => {
    LogApp('Check search', value);
    let searchValue = value;
    if (containsNumbers(value)) {
      searchValue = value.replace('DH', '');
    }
    setPayload({ ...payload, search: searchValue.trim(), page: 1 });
  }, 600);

  const onOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const onCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const onCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const onEdit = (id: number | string) => {
    setShowUpdateModal(true);
    setSelectedId(id);
  };

  // const onNavigateToCreatePage = () => {
  //   navigate(PATH_CREATE);
  // };

  // const onEdit = (id: number | string) => {
  //   navigate(PATH_CUSTOMER + `/edit/${id}`);
  // }

  const onDelete = async (id: number | string) => {
    try {
      await customerCategoryAPI.delete(id);
      showAppToast('Xóa thành công!', 'success');
      updateNewData();
    } catch (error) {}
  };

  const onDataChange = (no: number) => {
    setDataChange(no);
  };

  const handleChangePage = (page: number) => {
    LogApp('check page', page);
    setPayload({ ...payload, page });
    dispatch(setCurrentPage(Number(page)));
  };

  const updateNewData = () => {
    getData();
  };

  const handleChangePageSize = (size: number) => {
    setPayload({ ...payload, perPage: size });
  };

  const getData = useCallback(async () => {
    try {
      dispatch(setTableLoading(true));
      const res: any = await customerCategoryAPI.getList(payload);
      LogApp('data', res);
      const data = res.data?.items;
      const pagination = res.data?.pagination;
      const list = data.map((item: any, index: number) => {
        return {
          ...item,
          duration: getTimeDuration({
            startTime: item?.start_time,
            endTime: item?.end_time,
          }),
        };
      });
      setData(list);
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

  useEffect(() => {
    getData();
  }, [payload.search, payload.page, payload.perPage, dataChange]);

  return (
    <CustomerCategoryListSection
      selectedId={selectedId}
      currentPage={payload.page}
      data={data}
      dataChange={dataChange}
      onSearch={onSearch}
      showCreateModal={showCreateModal}
      showUpdateModal={showUpdateModal}
      pagination={pagination}
      onCreate={onOpenCreateModal}
      onEdit={onEdit}
      onCloseCreateModal={onCloseCreateModal}
      onCloseUpdateModal={onCloseUpdateModal}
      onPageChange={handleChangePage}
      updateData={updateNewData}
      onDataChange={onDataChange}
      onDelete={onDelete}
      onChangePageSize={handleChangePageSize}
    />
  );
};
