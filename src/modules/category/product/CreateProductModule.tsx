import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CreateBannerModal } from '@components';
import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { appAPI, categoriesAPI, productAPI } from '@api';
import { ProductFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { CategoryFormModal, ProductFormModal } from '@pages';
import { MAXIMUM_ITEM_PER_PAGE_NUM, NONE_VALUE } from '@configs';
import { IImageInfo } from '@interfaces';

interface IProps {
  dataChange?: number;
  open?: boolean;
  onClose?: () => void;
  onDataChange: (...arg: any) => void;
}

export const CreateProductModule = (props: IProps) => {
  const { open, dataChange = 0, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector(selectApp);
  const [selectedImage, setSelectedImage] = useState();
  const [categories, setCategories] = useState();

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
    resolver: yupResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      desc: '',
      cost: '',
      quantity: '',
      image: '',
      categoryId: '',
    },
  });

  const handleChangeSelectedImage = (value: any) => {
    setSelectedImage(value);
  };

  const handleAddProduct = async (value: any, imageUrl?: string) => {
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
      const res: any = await productAPI.create(body);
      if (res?.success) {
        showAppToast('Tạo thành công!', 'success');
        onDataChange();
        reset();
        setSelectedImage(undefined);
        onClose && onClose();
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

  const handleCreate = handleSubmit(async (value) => {
    LogApp('Submit create banner', value);
    try {
      if (!selectedImage) handleAddProduct(value);
      else {
        dispatch(setLoading(true));
        const body = new FormData();
        body.append('image', selectedImage);
        const res: any = await appAPI.uploadImage(body);
        const imageInfo = res.data as IImageInfo;
        // if (!res?.success) {
        handleAddProduct(value, imageInfo?.link);
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
  });

  const getCategoriesData = async () => {
    try {
      const res: any = await categoriesAPI.getList({
        page: 1,
        perPage: MAXIMUM_ITEM_PER_PAGE_NUM,
      });
      LogApp('data', res);
      const data = res.data?.items;
      const categoriesOptions = data?.map((item: any) => ({
        label: item?.name || '',
        value: item?.id || '',
      }));
      setCategories(categoriesOptions);
    } catch (error) {
      LogApp(error);
    } finally {
      //
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  useEffect(() => {
    dispatch(setLoading(false));
    return () => {
      dispatch(setLoading(false));
    };
  }, []);

  return (
    <ProductFormModal
      open={open}
      errors={errors}
      selectedImage={selectedImage}
      categories={categories}
      register={register}
      onSubmit={handleCreate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
      onChangeImage={handleChangeSelectedImage}
    />
  );
};
