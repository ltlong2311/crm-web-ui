import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CreateBannerModal } from '@components';
import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { appAPI, categoriesAPI, customerAPI, customerCategoryAPI, settingAPI, userAPI } from '@api';
import {
  MAXIMUM_ITEM_PER_PAGE_NUM,
  PATH_EARN_POINTS_RULE_LIST,
  ROLE_OPTIONS,
  enumGender,
} from '@configs';
import { CustomerFormSchema, UserFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { IImageInfo } from '@interfaces';
import { CreateCustomerFormModal, UserAccountFormModal } from '@pages';

interface IProps {
  open?: boolean;
  dataChange?: number;
  onClose?: () => void;
  onDataChange: (...arg: any) => void;
}

export const CreateCustomerModule = (props: IProps) => {
  const { open, dataChange = 0, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedImage, setSelectedImage] = useState();
  const [customerCategories, setCustomerCategories] = useState();

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
    resolver: yupResolver(CustomerFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      dob: '',
      gender: '',
      address: '',
      taxCode: '',
      image: '',
      classificationIds: [],
      portalCode: '',
      desc: '',
    },
  });

  const handleChangeSelectedImage = (value: any) => {
    setSelectedImage(value);
  };

  const handleAddCustomer = async (value: any, imageUrl?: string) => {
    const body = {
      firstName: ' ',
      lastName: value.name,
      phone: value.phone,
      email: value.email,
      dob: value.dob,
      gender: value.gender || enumGender.OTHER,
      address: value.address || '',
      taxCode: value.taxCode,
      image: imageUrl || '',
      point: 0,
      cashback: 0,
      rate: 0,
      classificationIds: value.classificationIds,
      storeId: [2],
      portalCode: value.portalCode || '',
      desc: value.desc || '',
    };
    try {
      dispatch(setLoading(true));
      const res: any = await customerAPI.create(body);
      if (res?.success) {
        showAppToast('Tạo thành công!', 'success');
        onDataChange();
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
  };

  const getCategoriesData = async () => {
    try {
      const res: any = await customerCategoryAPI.getList({
        page: 1,
        perPage: MAXIMUM_ITEM_PER_PAGE_NUM,
      });
      LogApp('data', res);
      const data = res.data?.items;
      const categoriesOptions = data?.map((item: any) => ({
        label: item?.name || '',
        value: item?.id || '',
      }));
      setCustomerCategories(categoriesOptions);
    } catch (error) {
      LogApp(error);
    } finally {
      //
    }
  };

  const handleCreate = handleSubmit(async (value) => {
    LogApp('Submit create banner', value);
    // if (selectedImage) {
    try {
      if (!selectedImage) handleAddCustomer(value);
      else {
        dispatch(setLoading(true));
        const body = new FormData();
        body.append('image', selectedImage);
        const res: any = await appAPI.uploadImage(body);
        const imageInfo = res.data as IImageInfo;
        // if (!res?.success) {
        handleAddCustomer(value, imageInfo?.link);
        // } else {
        //   throw res?.data;
        // }
      }
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
      LogApp('API CREATE RULE', err);
    } finally {
      dispatch(setLoading(false));
    }
    // } else {
    //   setError('image', { type: 'custom', message: 'Upload image is required' });
    // }
  });

  const handleCancel = () => {
    navigate(PATH_EARN_POINTS_RULE_LIST);
  };

  useEffect(() => {
    dispatch(setLoading(false));
    return () => {
      dispatch(setLoading(false));
    };
  }, []);

  useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <CreateCustomerFormModal
      open={open}
      errors={errors}
      customerCategories={customerCategories}
      register={register}
      onSubmit={handleCreate}
      setValue={setValue}
      onCancel={handleCancel}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
      onChangeImage={handleChangeSelectedImage}
    />
  );
};
