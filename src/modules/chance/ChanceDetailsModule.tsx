import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { LogApp, showAppToast, useUrlQuery } from '@utils';
import { selectApp, selectOrder, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { branchAPI, orderAPI } from '@api';
import { BranchFormSchema, OrderFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { ChanceDetailsSection, InvoiceDetailsSection, OrderDetailsSection } from '@pages';
import { PATH_ORDER_LIST } from '@configs';

interface IProps {
  isCreate?: boolean;
}

export const ChanceDetailsModule = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector(selectApp);

  const { orderProducts, orderStore, orderCustomer } = useAppSelector(selectOrder);

  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

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
      address: '',
      email: '',
      phone: '',
    },
  });

  const handleUpdate = handleSubmit(async (value) => {
    const body = {
      orderProducts: orderProducts?.map((item:any) => ({
        id: item?.id,
        quantity: item?.quantity,
      })),
      name: value.name,
      customerId: orderCustomer?.id,
      status: 1,
    };
    try {
      if(!id) return;
      dispatch(setLoading(true));
      const res: any = await branchAPI.update(id, body);
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
      const data = res?.data;
      setData(data);
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(false));
    return () => {
      dispatch(setLoading(false));
    };
  }, []);

  useEffect(() => {
    if (id) getOrder(id);
  }, [id]);

  return (
    <ChanceDetailsSection
      products={products}
      errors={errors}
      register={register}
      onSubmit={handleUpdate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
    />
  );
};
