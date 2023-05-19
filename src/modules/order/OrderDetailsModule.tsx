import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { LogApp, showAppToast, useUrlQuery } from '@utils';
import {
  resetOrder,
  resetSelected,
  selectApp,
  selectOrder,
  setLoading,
  setOrderCustomer,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import { branchAPI, orderAPI } from '@api';
import { BranchFormSchema, OrderFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { OrderDetailsSection } from '@pages';
import { PATH_ORDER_LIST } from '@configs';
import { IOrderDetails } from '@interfaces';

interface IProps {
  isCreate?: boolean;
}

export const OrderDetailsModule = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector(selectApp);

  const { orderProducts, orderStore, orderCustomer } = useAppSelector(selectOrder);

  const [products, setProducts] = useState([]);
  const [data, setData] = useState<IOrderDetails>();

  const { id } = useParams();

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
      billingAddress: '',
      shippingAddress: '',
      deliveryDate: 0,
      note: '',
    },
  });

  const handleUpdate = handleSubmit(async (value) => {
    const body = {
      orderProducts: orderProducts?.map((item: any) => ({
        id: item?.id,
        quantity: item?.quantity,
      })),
      customerId: orderCustomer?.id,
      shippingAddress: value?.shippingAddress || orderStore?.address || '',
      billingAddress: value?.billingAddress || orderCustomer?.address || '',
      storeId: orderStore?.id || '',
      ...(value?.deliveryDate && { deliveryDate: value.deliveryDate }),
      note: value?.note,
    };
    try {
      if (!id) return;
      dispatch(setLoading(true));
      const res: any = await orderAPI.update(id, body);
      if (res?.success) {
        showAppToast('Cập nhật thành công!', 'success');
        navigate(PATH_ORDER_LIST);
      } else {
        throw res?.data;
      }
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
      LogApp('API UPDATE ORDER', err);
    } finally {
      dispatch(setLoading(false));
    }
  });

  const getOrder = async (id: number | string) => {
    try {
      dispatch(setLoading(true));
      const res: any = await orderAPI.getOne(id);
      const data = res?.data as IOrderDetails;
      setData(data);
      dispatch(setOrderCustomer(data?.customer));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(false));
    return () => {
      dispatch(resetSelected());
      dispatch(resetOrder());
      dispatch(setLoading(false));
    };
  }, []);

  useEffect(() => {
    if (id) getOrder(id);
  }, [id]);

  useEffect(() => {
    if (orderStore?.address) {
      setValue('billingAddress', orderStore.address);
    }
  }, [orderStore?.address]);

  useEffect(() => {
    if (orderCustomer?.address) {
      setValue('shippingAddress', orderCustomer.address);
    }
  }, [orderCustomer?.address]);

  useEffect(() => {
    if (data) {
      reset({
        billingAddress: data?.billingAddress,
        shippingAddress: data?.shippingAddress,
        deliveryDate: data?.deliveryDate,
        note: data?.note,
      });
    }
  }, [data]);

  return (
    <OrderDetailsSection
      data={data}
      errors={errors}
      register={register}
      onSubmit={handleUpdate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
    />
  );
};
