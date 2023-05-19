import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { LogApp, genUID, showAppToast, useUrlQuery } from '@utils';
import { selectApp, selectChance, selectOrder, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { chanceAPI } from '@api';
import { BranchFormSchema, OrderFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { CreateChanceSection, CreateOrderSection } from '@pages';
import { PATH_ORDER_LIST } from '@configs';

interface IProps {
  isCreate?: boolean;
}

export const CreateChanceModule = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const publicId = genUID();

  const { themeMode } = useAppSelector(selectApp);
  const { chanceProducts, chanceCustomer } = useAppSelector(selectChance);

  const [products, setProducts] = useState([]);

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
    resolver: yupResolver(OrderFormSchema),
    defaultValues: {
      name: '',
      shippingAddress: '',
      billingAddress: '',
      deliveryDate: '',
      note: '',
    },
  });

  const handleCreate = handleSubmit(async (value) => {
    const body = {
      orderProducts: chanceProducts?.map((item: any) => ({
        id: item?.id,
        quantity: item?.quantity,
      })),
      name: publicId,
      customerId: chanceCustomer?.id,
      status: 1,
      shippingAddress: value?.shippingAddress || '',
      billingAddress: value?.billingAddress || '',
      deliveryDate: value?.deliveryDate || '',
      note: '',
    };
    try {
      dispatch(setLoading(true));
      const res: any = await chanceAPI.create(body);
      if (res?.success) {
        showAppToast('Tạo thành công!', 'success');
        navigate(PATH_ORDER_LIST);
      } else {
        throw res?.data;
      }
    } catch (err: any) {
      const error = err?.response?.data;
      toast.error(`${error?.message}`, {
        position: 'top-right',
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'colored',
      });
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
    <CreateChanceSection
      publicId={publicId}
      products={products}
      errors={errors}
      register={register}
      onSubmit={handleCreate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
    />
  );
};
