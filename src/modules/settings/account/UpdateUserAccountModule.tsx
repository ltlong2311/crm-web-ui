import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CreateBannerModal } from '@components';
import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { appAPI, categoriesAPI, settingAPI, userAPI } from '@api';
import {
  DEFAULT_ANNOUNCEMENT_STATUS,
  DEFAULT_ANNOUNCEMENT_TYPE,
  PATH_EARN_POINTS_RULE_LIST,
} from '@configs';
import {
  BannerFormSchema,
  RuleFormSchema,
  UpdateUserFormSchema,
  UserFormSchema,
} from '@validations';
import { useEffect, useState } from 'react';
import { IImageInfo } from '@interfaces';
import { UserAccountFormModal } from '@pages';

interface IProps {
  id?: number | string;
  open?: boolean;
  dataChange?: number;
  onClose?: () => void;
  onDataChange: (no: number) => void;
}

export const UpdateUserAccountModule = (props: IProps) => {
  const { open, id, dataChange = 0, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  LogApp({ userId: id });

  const [data, setData] = useState<any>();

  const [selectedImage, setSelectedImage] = useState();

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
    resolver: yupResolver(UpdateUserFormSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      phone: '',
      email: '',
      role: '',
      storeId: '',
      image: '',
    },
  });

  LogApp('check id', id);

  const changeSelectedImage = (value: any) => {
    clearErrors('image');
    setSelectedImage(value);
  };

  const getData = async (id: number | string) => {
    try {
      // dispatch(setLoading(true));
      const res: any = await userAPI.getOne(id);
      const data = res.data;
      setData(data);
    } catch (error) {
      LogApp(error);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  const handleUpdate = handleSubmit(async (value) => {
    if (!id) return;
    const body = {
      lastName: value.name,
      username: value.username,
      ...(value.password && { password: value.password }),
      phone: value.phone,
      email: value.email,
      role: value.role,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await userAPI.update(id, body);
      if (res?.success) {
        toast.success('Create banner successfully!', {
          position: 'top-right',
          autoClose: 1500,
          closeOnClick: true,
          pauseOnHover: true,
          theme: themeMode,
        });
        onDataChange(dataChange + 1);
        onClose && onClose();
      } else {
        throw res?.data;
      }
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
      LogApp('API CREATE RULE', err);
    } finally {
      dispatch(setLoading(false));
    }
  });

  const handleCancel = () => {
    navigate(PATH_EARN_POINTS_RULE_LIST);
  };

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        name: data?.lastName,
        username: data?.username,
        password: data?.password,
        phone: data?.phone,
        email: data?.email,
        role: data?.role,
        storeId: data?.storeId,
        image: data?.image,
      });
    }
  }, [data]);

  return (
    <UserAccountFormModal
      data={data}
      open={open}
      errors={errors}
      register={register}
      onSubmit={handleUpdate}
      setValue={setValue}
      onCancel={handleCancel}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
      changeSelectedImage={changeSelectedImage}
      isEdit
    />
  );
};
