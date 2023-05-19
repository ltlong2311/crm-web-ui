import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { categoriesAPI, customerCategoryAPI, settingAPI } from '@api';
import {
  DEFAULT_ANNOUNCEMENT_STATUS,
  DEFAULT_ANNOUNCEMENT_TYPE,
  PATH_EARN_POINTS_RULE_LIST,
} from '@configs';
import { BannerFormSchema, CustomerCategoryFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { CreateCustomerCategoryModal } from '@pages';

interface IProps {
  open?: boolean;
  id?: number | string;
  dataChange?: number;
  onClose?: () => void;
  onDataChange: (no: number) => void;
}

export const UpdateCustomerCategoryModule = (props: IProps) => {
  const { open, id, dataChange = 0, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<any>();
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
    resolver: yupResolver(CustomerCategoryFormSchema),
    defaultValues: {
      name: '',
      desc: '',
    },
  });

  LogApp('check id', id);

  const getData = async (id: number | string) => {
    try {
      // dispatch(setLoading(true));
      const res: any = await customerCategoryAPI.getOne(id);
      const data = res.data;
      setData(data);
    } catch (error) {
      LogApp(error);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  const handleCreate = handleSubmit(async (value) => {
    if (!id) return;
    const body = {
      name: value.name,
      desc: value.desc || 'None',
    };
    try {
      dispatch(setLoading(true));
      const res: any = await customerCategoryAPI.update(id, body);
      if (res?.success) {
        showAppToast('Cập nhật thành công!', 'success');
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
    if (id) {
      getData(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        desc: data?.desc,
      });
    }
  }, [data]);

  return data ? (
    <CreateCustomerCategoryModal
      open={open}
      errors={errors}
      register={register}
      onSubmit={handleCreate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
      isEdit
    />
  ) : (
    <></>
  );
};
