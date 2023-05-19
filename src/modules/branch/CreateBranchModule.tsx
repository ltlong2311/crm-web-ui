import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CreateBannerModal } from '@components';
import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { branchAPI } from '@api';
import { BranchFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { BranchFormModal, CreateCustomerCategoryModal } from '@pages';

interface IProps {
  dataChange?: number;
  open?: boolean;
  onClose?: () => void;
  onDataChange: (no: number) => void;
}

export const CreateBranchModule = (props: IProps) => {
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
    resolver: yupResolver(BranchFormSchema),
    defaultValues: {
      name: '',
      address: '',
      email: '',
      phone: '',
    },
  });

  const handleCreate = handleSubmit(async (value) => {
    const body = {
      name: value.name,
      address: value.address || 'None',
      phone: value.phone || 'None',
      email: value.email,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await branchAPI.create(body);
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
    <BranchFormModal
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
