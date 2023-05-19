import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CreateBannerModal } from '@components';
import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { branchAPI, categoriesAPI } from '@api';
import { BranchFormSchema, CategoryFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { BranchFormModal, CategoryFormModal, CreateCustomerCategoryModal } from '@pages';
import { NONE_VALUE } from '@configs';

interface IProps {
  dataChange?: number;
  open?: boolean;
  onClose?: () => void;
  onDataChange: (no: number) => void;
}

export const CreateCategoryModule = (props: IProps) => {
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
    resolver: yupResolver(CategoryFormSchema),
    defaultValues: {
      name: '',
      desc: '',
    },
  });

  const handleCreate = handleSubmit(async (value) => {
    const body = {
      name: value.name,
      desc: value.desc || NONE_VALUE,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await categoriesAPI.create(body);
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
    <CategoryFormModal
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
