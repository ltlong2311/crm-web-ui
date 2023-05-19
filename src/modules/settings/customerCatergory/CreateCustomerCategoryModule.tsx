import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CreateBannerModal } from '@components';
import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { categoriesAPI, customerCategoryAPI, settingAPI } from '@api';
import {
  DEFAULT_ANNOUNCEMENT_STATUS,
  DEFAULT_ANNOUNCEMENT_TYPE,
  PATH_EARN_POINTS_RULE_LIST,
} from '@configs';
import { BannerFormSchema, CustomerCategoryFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { CreateCustomerCategoryModal } from '@pages';

interface IProps {
  dataChange?: number;
  open?: boolean;
  onClose?: () => void;
  onDataChange: (no: number) => void;
}

export const CreateCustomerCategoryModule = (props: IProps) => {
  const { open, dataChange = 0, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector(selectApp);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(CustomerCategoryFormSchema),
    defaultValues: {
      name: '',
      desc: '',
    },
  });

  const handleCreate = handleSubmit(async (value) => {
    const body = {
      name: value.name,
      desc: value.desc || 'None',
    };
    try {
      dispatch(setLoading(true));
      const res: any = await customerCategoryAPI.create(body);
      if (res?.success) {
        showAppToast('Tạo thành công!', 'success');
        onDataChange(dataChange + 1);
        onClose && onClose();
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
  });

  useEffect(() => {
    dispatch(setLoading(false));
    return () => {
      dispatch(setLoading(false));
    };
  }, []);

  return (
    <CreateCustomerCategoryModal
      open={open}
      errors={errors}
      register={register}
      onSubmit={handleCreate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
    />
  );
};
