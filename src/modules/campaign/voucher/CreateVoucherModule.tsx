import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { campaignAPI, voucherAPI } from '@api';
import { BranchFormSchema, CampaignFormSchema, VoucherFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import {
  BranchFormModal,
  CampaignFormSection,
  CreateCustomerCategoryModal,
  CreateVoucherSection,
} from '@pages';

interface IProps {
  // dataChange?: number;
  open?: boolean;
  // onClose?: () => void;
  // onDataChange: (no: number) => void;
}

export const CreateVoucherModule = (props: IProps) => {
  // const { open, dataChange = 0, onClose, onDataChange } = props;
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
    resolver: yupResolver(VoucherFormSchema),
    defaultValues: {
      name: '',
      startTime: '',
      endTime: '',
      desc: '',
      discountPercent: 0,
      minCostToApply: 0,
      maxNumOfUse: 1,
    },
  });

  const handleCreate = handleSubmit(async (value) => {
    const body = {
      name: value.name,
      startTime: value.startTime || 'None',
      endTime: value.endTime || 'None',
      desc: value.desc,
      discountPercent: value.discountPercent,
      minCostToApply: value.minCostToApply,
      maxNumOfUse: value.maxNumOfUse,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await voucherAPI.create(body);
      if (res?.success) {
        showAppToast('Tạo thành công!', 'success');
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
    <CreateVoucherSection
      // open={open}
      errors={errors}
      register={register}
      onSubmit={handleCreate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      // onClose={onClose}
    />
  );
};
