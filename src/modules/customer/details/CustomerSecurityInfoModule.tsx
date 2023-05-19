import { customerAPI } from '@api';
import { CustomerSecurityInfo } from '@pages';
import { setLoading, useAppDispatch } from '@redux';
import { LogApp, showAppToast } from '@utils';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface IProps {
  data?: any;
  updateData?: () => void;
}

export const CustomerSecurityInfoModule = (props: IProps) => {
  const { data, updateData } = props;

  const dispatch = useAppDispatch();

  const [showEdit, setShowEdit] = useState(0);
  const [info, setInfo] = useState({
    email: data?.email,
    phone: data?.phone,
    taxCode: data?.taxCode,
  });
  const onChangeShowEdit = (key: number) => {
    setShowEdit(key);
  };
  const onChangeInfo = (value: any) => {
    setInfo(value);
  };
  const handleSaveChange = async (saveType: 'email' | 'phone' | 'taxCode') => {
    if (!data?.id) return;
    const body = {
      ...(saveType === 'email' && { email: info?.email }),
      ...(saveType === 'phone' && { phone: info?.phone }),
      ...(saveType === 'taxCode' && { taxCode: info?.taxCode }),
    };
    try {
      dispatch(setLoading(true));
      const res: any = await customerAPI.update(data.id, body);
      if (res?.success) {
        showAppToast('Cập nhật thành công!', 'success');
        updateData && updateData();
      } else {
        throw res?.data;
      }
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
      LogApp('API CREATE CUSTOMER', err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    LogApp('CustomerSecurityInfo');
  }, []);
  return (
    <CustomerSecurityInfo
      info={info}
      data={data}
      onChangeInfo={onChangeInfo}
      showEdit={showEdit}
      onChangeShowEdit={onChangeShowEdit}
      onSaveChange={handleSaveChange}
    />
  );
};
