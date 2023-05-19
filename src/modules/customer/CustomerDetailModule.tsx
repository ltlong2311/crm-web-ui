import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { customerAPI, tierAPI } from '@api';
import { LogApp, showAppToast, useUrlQuery } from '@utils';
import { selectApp, setTableLoading, useAppDispatch, useAppSelector } from '@redux';
import { CustomerDetailSection } from '@pages';

export const CustomerDetailModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { themeMode, currentPage } = useAppSelector(selectApp);

  const [customer, setCustomerInfo] = useState<any>();
  const { id } = useParams();

  const getCustomerInfo = async (id: number | string) => {
    try {
      dispatch(setTableLoading(true));
      const res: any = await customerAPI.getOne(id);
      const data = res?.data;
      setCustomerInfo(data);
    } catch (error) {
    } finally {
      dispatch(setTableLoading(false));
    }
  };

  const onDelete = async () => {
    if (!id) return;
    try {
      const res = await customerAPI.delete(id);
      showAppToast('Xóa thành công!', 'success');
      updateData();
    } catch (error) {}
  };

  const updateData = () => {
    if (id) getCustomerInfo(id);
  };

  useEffect(() => {
    if (id) getCustomerInfo(id);
  }, [id]);

  return <CustomerDetailSection data={customer} updateData={updateData} />;
};
