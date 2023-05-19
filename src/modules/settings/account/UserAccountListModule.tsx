import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTimeDuration, LogApp, showAppToast } from '@utils';
import { selectApp, setCurrentPage, setTableLoading, useAppDispatch, useAppSelector } from '@redux';
import { IBanner, IGetBannerParams, IGetAccountListParams } from '@interfaces';
import { categoriesAPI, userAPI } from '@api';
import { PATH_BANNER, PATH_CREATE_BANNER } from '@configs';
import { UserAccountList } from '@pages';
import { debounce } from 'lodash';

export const UserAccountListModule = () => {
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
  const onOpenUpdateModal = (id: number | string) => {
    setShowUpdateModal(true);
    setSelectedId(id);
  };

  const onCloseCreateModal = () => {
    setShowCreateModal(false);
  };
  const onCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const onDataChange = (no: number) => {
    setDataChange(no);
  };

  // const onEdit = (id: number | string) => {
  //   navigate(PATH_BANNER + `/edit/${id}`);
  // };
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

  useEffect(() => {
    getData();
  }, [payload.search, payload.page, payload.perPage, dataChange]);

  return (
    <UserAccountList
      selectedId={selectedId}
      dataChange={dataChange}
      currentPage={payload.page}
      data={data}
      onSearch={onSearch}
      pagination={pagination}
      showCreateModal={showCreateModal}
      showUpdateModal={showUpdateModal}
      onCreate={onOpenCreateModal}
      onEdit={onOpenUpdateModal}
      onDelete={onDelete}
      updateData={updateNewData}
      onCloseCreateModal={onCloseCreateModal}
      onCloseUpdateModal={onCloseUpdateModal}
      onDataChange={onDataChange}
      onPageChange={handleChangePage}
      onChangePageSize={handleChangePageSize}
    />
  );
};
