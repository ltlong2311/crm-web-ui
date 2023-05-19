import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTimeDuration, LogApp, showAppToast } from '@utils';
import { selectApp, setCurrentPage, setTableLoading, useAppDispatch, useAppSelector } from '@redux';
import { IBanner, IGetAccountListParams, IGetListParams } from '@interfaces';
import { productAPI } from '@api';
import { PATH_CREATE_BANNER } from '@configs';
import { CategoryManagementSection, ProductManagementSection, UserAccountList } from '@pages';
import { debounce } from 'lodash';

export const AdsManagementModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentPage, themeMode } = useAppSelector(selectApp);

  const [data, setData] = useState<IBanner[]>([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    perPage: 0,
  });
  const [payload, setPayload] = useState<IGetListParams>({
    page: currentPage || 1,
    perPage: 10,
    search: '',
  });
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | string>();
  const [dataChange, setDataChange] = useState<number>(0);

  const onSearch = debounce((value: string) => {
    LogApp('Check search', value);
    setPayload({ ...payload, search: value.trim(), page: 1 });
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

  const onDataChange = (no: number) => {
    setDataChange(no);
  };

  const onDelete = async (id: number | string) => {
    try {
      const res = await productAPI.delete(id);
      showAppToast('Xóa thành công!', 'success');
      updateNewData();
    } catch (error) {}
  };

  const onNavigateToCreatePage = () => {
    navigate(PATH_CREATE_BANNER);
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
      const res: any = await productAPI.getList(payload);
      LogApp('data', res);
      const data = res.data?.items;
      const pagination = res.data?.pagination;
      setData(data);
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
    <ProductManagementSection
      selectedId={selectedId}
      currentPage={payload.page}
      data={data}
      onSearch={onSearch}
      onCreate={onOpenCreateModal}
      onEdit={onEdit}
      pagination={pagination}
      onPageChange={handleChangePage}
      showCreateModal={showCreateModal}
      showUpdateModal={showUpdateModal}
      updateData={updateNewData}
      onCloseCreateModal={onCloseCreateModal}
      onCloseUpdateModal={onCloseUpdateModal}
      onDataChange={onDataChange}
      dataChange={dataChange}
      onDelete={onDelete}
      onChangePageSize={handleChangePageSize}
    />
  );
};
