import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { appAPI, categoriesAPI, productAPI } from '@api';

import { ProductFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { ProductFormModal } from '@pages';
import { MAXIMUM_ITEM_PER_PAGE_NUM, NONE_VALUE } from '@configs';
import { IImageInfo } from '@interfaces';

interface IProps {
  open?: boolean;
  id?: number | string;
  dataChange?: number;
  onClose?: () => void;
  onDataChange: (...arg: any) => void;
}

export const UpdateProductModule = (props: IProps) => {
  const { open, id, dataChange = 0, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<any>();
  const [selectedImage, setSelectedImage] = useState();
  const [categories, setCategories] = useState();
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

  LogApp('check id', id);

  const handleChangeSelectedImage = (value: any) => {
    setSelectedImage(value);
  };

  const getData = async (id: number | string) => {
    try {
      // dispatch(setLoading(true));
      const res: any = await productAPI.getOne(id);
      const data = res.data;
      setData(data);
      // setSelectedImage(data?.image);
    } catch (error) {
      LogApp(error);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  const handleUpdateProduct = async (value: any, imageUrl?: string) => {
    const body = {
      name: value.name,
      desc: value.desc,
      cost: value.cost,
      quantity: value.quantity,
      ...(imageUrl && { image: imageUrl }),
      categoryId: value.categoryId || 0,
    };
    try {
      dispatch(setLoading(true));
      if (!id) return;
      const res: any = await productAPI.update(id, body);
      if (res?.success) {
        onDataChange();
        setData({ ...data, ...(imageUrl && { image: imageUrl }) }); // * Thay đổi trường image ở hiện tại nếu image thay đổi
        showAppToast('Cập nhật thành công!', 'success');
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

  const handleSubmitForm = handleSubmit(async (value) => {
    try {
      if (!selectedImage) handleUpdateProduct(value);
      else {
        dispatch(setLoading(true));
        const body = new FormData();
        body.append('image', selectedImage);
        const res: any = await appAPI.uploadImage(body);
        const imageInfo = res.data as IImageInfo;
        handleUpdateProduct(value, imageInfo?.link);
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

  // * Note: truyền open làm params để gọi lại api lấy thông tin chi tiết khi mở update modal (fix lỗi ảnh không cập nhật mới)
  // * Tuy nhiên nếu tối ưu performance vẫn có thể sử dụng cách cập nhật image trong giá trị state để thay thế
  // useEffect(() => {
  //   if (id && open) {
  //     getData(id);
  //   }
  // }, [id, open]);

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        desc: data?.desc,
        cost: data?.cost,
        quantity: data?.quantity,
        image: data?.image || '',
        categoryId: data?.category?.id || 0,
      });
    }
  }, [data]);

  if (!open && !data) return <></>;

  return (
    <ProductFormModal
      open={open}
      data={data}
      errors={errors}
      register={register}
      onSubmit={handleSubmitForm}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
      onChangeImage={handleChangeSelectedImage}
      categories={categories}
      isEdit
    />
  );
};
