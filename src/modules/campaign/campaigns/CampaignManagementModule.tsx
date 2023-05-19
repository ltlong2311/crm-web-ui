import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTimeDuration, LogApp, showAppToast } from '@utils';
import { selectApp, setCurrentPage, setTableLoading, useAppDispatch, useAppSelector } from '@redux';
import { IBanner, IGetBannerParams, IGetAccountListParams } from '@interfaces';
import { branchAPI, categoriesAPI, userAPI } from '@api';
import { PATH_BANNER, PATH_CAMPAIGN, PATH_CREATE_BANNER, PATH_CREATE_CAMPAIGN } from '@configs';
import { BranchManagementSection, CampaignManagementSection, UserAccountList } from '@pages';
import { debounce } from 'lodash';
import _ from 'lodash';

interface IProps {
  isSelectModule?: boolean;
  onCloseSelectModule?: () => void;
}

export const CampaignManagementModule = (props: IProps) => {
  const { isSelectModule } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentPage, themeMode } = useAppSelector(selectApp);
  const [applyFilter, setApplyFilter] = useState<number>(0);
  const [data, setData] = useState<IBanner[]>([]);
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
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | string>();
  const [dataChange, setDataChange] = useState<number>(0);

  const onSearch = debounce((value: string) => {
    LogApp('Check search', value);
    setPayload({ ...payload, search: value.trim(), page: 1 });
  }, 600);

  const onCreate = () => {
    // setShowCreateModal(true);
        navigate(PATH_CREATE_CAMPAIGN);
  };

  const onCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const onCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const onEdit = (id: number | string) => {
    navigate(PATH_CAMPAIGN + `/details/${id}`);
  };

  const onDataChange = (no: number) => {
    setDataChange(no);
  };

  const onDelete = async (id: number | string) => {
    try {
      const res = await branchAPI.delete(id);
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

  const handleApplyFilter = () => {
    setApplyFilter((prev) => prev + 1);
  };

  const handleResetFilter = () => {
    const newPayload = _.omit(payload, ['status', 'fromDate', 'toDate']);
    setPayload(newPayload);
    setApplyFilter(0);
  };

  const getData = useCallback(async () => {
    try {
      dispatch(setTableLoading(true));
      const res: any = await branchAPI.getList(payload);
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
  }, [payload.search, payload.page, payload.perPage, dataChange, applyFilter]);

  useEffect(() => {
    getData();
  }, [payload.search, payload.page, payload.perPage, dataChange, applyFilter]);

  return (
    <CampaignManagementSection
      selectedId={selectedId}
      currentPage={payload.page}
      data={data}
      onSearch={onSearch}
      showCreateModal={showCreateModal}
      showUpdateModal={showUpdateModal}
      pagination={pagination}
      payload={payload}
      setPayload={setPayload}
      onCreate={onCreate}
      onEdit={onEdit}
      onPageChange={handleChangePage}
      updateData={updateNewData}
      onCloseCreateModal={onCloseCreateModal}
      onCloseUpdateModal={onCloseUpdateModal}
      onDataChange={onDataChange}
      dataChange={dataChange}
      onDelete={onDelete}
      onChangePageSize={handleChangePageSize}
      onApplyFilter={handleApplyFilter}
      onResetFilter={handleResetFilter}
      {...props}
    />
  );
};
