import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTimeDuration, LogApp, showAppToast } from '@utils';
import { BannerListSection } from '@components';
import { selectApp, setCurrentPage, setTableLoading, useAppDispatch, useAppSelector } from '@redux';
import { IBanner, IGetBannerParams } from '@interfaces';
import { categoriesAPI, tierAPI } from '@api';
import { PATH_BANNER, PATH_CREATE_BANNER } from '@configs';

export const BannerListModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentPage, themeMode } = useAppSelector(selectApp);

  const [data, setData] = useState<IBanner[]>([]);
  const [pagination, setPagination] = useState({
    count: 0,
    maxPage: 1,
    limit: 0,
  });
  const [payload, setPayload] = useState<IGetBannerParams>({
    page: currentPage || 1,
    limit: 10,
    name: '',
  });
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [dataChange, setDataChange] = useState<number>(0);
  LogApp(dataChange, 'atd');

  const onOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const onCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const onDataChange = (no: number) => {
    setDataChange(no);
  };
  const getData = useCallback(async () => {
    try {
      dispatch(setTableLoading(true));
      const res: any = await categoriesAPI.getBanners(payload);
      const data = res.data?.banners;
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
        count: res.data.count,
        maxPage: res.data.maxPage,
        limit: res.data.limit,
      });
    } catch (error) {
      LogApp(error);
    } finally {
      dispatch(setTableLoading(false));
    }
  }, [payload.name, payload.page, payload.limit, dataChange]);

  const onEdit = (id: number | string) => {
    navigate(PATH_BANNER + `/edit/${id}`);
  };
  const onDelete = async (id: number | string) => {
    try {
      await categoriesAPI.deleteBanner(id);
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
    setPayload({ ...payload, limit: size });
  };

  useEffect(() => {
    getData();
  }, [payload.name, payload.page, payload.limit, dataChange]);

  return (
    <BannerListSection
      onEdit={onEdit}
      currentPage={payload.page}
      data={data}
      onCreate={onOpenCreateModal}
      pagination={pagination}
      onPageChange={handleChangePage}
      showCreateModal={showCreateModal}
      updateData={updateNewData}
      onCloseCreateModal={onCloseCreateModal}
      onDataChange={onDataChange}
      dataChange={dataChange}
      onDelete={onDelete}
      onChangePageSize={handleChangePageSize}
    />
  );
};
