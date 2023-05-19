import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CreateBannerModal } from '@components';
import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { appAPI, branchAPI } from '@api';
import { BranchFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { CompanyInfoSection } from '@pages';
import { IImageInfo } from '@interfaces';

export const CompanyInfoModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector(selectApp);

  const [selectedImage, setSelectedImage] = useState();

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

  const handleChangeSelectedImage = (value: any) => {
    setSelectedImage(value);
  };

  const handleUpdateCompanyInfo = async (value: any, imageUrl?: string) => {
    const body = {
      name: value.name,
      desc: value.desc,
      cost: value.cost,
      quantity: value.quantity,
      image: imageUrl || '',
      categoryId: value.categoryId || 0,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await branchAPI.update(1, body);
      if (res?.success) {
        showAppToast('Cập nhật thành công!', 'success');
      } else {
        throw res?.data;
      }
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
      LogApp('API CREATE PRODUCT', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmitForm = handleSubmit(async (value) => {
    try {
      if (!selectedImage) handleUpdateCompanyInfo(value);
      else {
        dispatch(setLoading(true));
        const body = new FormData();
        body.append('image', selectedImage);
        const res: any = await appAPI.uploadImage(body);
        const imageInfo = res.data as IImageInfo;
        handleUpdateCompanyInfo(value, imageInfo?.link);
      }
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
      LogApp('API CREATE RULE', err);
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
    <>
      <CompanyInfoSection
        errors={errors}
        register={register}
        onSubmit={handleSubmitForm}
        setValue={setValue}
        getValues={getValues}
        watch={watch}
      />
    </>
  );
};
