import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { LogApp, genUID, showAppToast, useUrlQuery } from '@utils';
import {
  resetOrder,
  resetSelected,
  selectApp,
  selectOrder,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import { branchAPI, orderAPI } from '@api';
import { BranchFormSchema, OrderFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { CreateOrderSection } from '@pages';
import { PATH_ORDER, PATH_ORDER_LIST, enumOrderStatus } from '@configs';

interface IProps {
  isCreate?: boolean;
}

export const CreateOrderModule = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderPublicId = genUID();

  const { themeMode } = useAppSelector(selectApp);
  const { orderProducts, orderStore, orderCustomer } = useAppSelector(selectOrder);

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
      billingAddress: '',
      shippingAddress: '',
      deliveryDate: '',
      note: '',
    },
  });

  const handleCreate = handleSubmit(async (value) => {
    const body = {
      orderProducts: orderProducts?.map((item: any) => ({
        id: item?.id,
        quantity: item?.quantity,
      })),
      name: orderPublicId,
      customerId: orderCustomer?.id,
      status: enumOrderStatus.IS_NOT_ACCEPTED,
      shippingAddress: value?.shippingAddress || orderStore?.address || '',
      billingAddress: value?.billingAddress || orderCustomer?.address || '',
      storeId: orderStore?.id || '',
      ...(value?.deliveryDate && { deliveryDate: value.deliveryDate }),
      note: value?.note,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await orderAPI.create(body);
      if (res?.success) {
        showAppToast('Tạo thành công!', 'success');
        navigate(PATH_ORDER);
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
      dispatch(resetSelected());
      dispatch(resetOrder());
      dispatch(setLoading(false));
    };
  }, []);

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

  return (
    <CreateOrderSection
      orderPublicId={orderPublicId}
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
