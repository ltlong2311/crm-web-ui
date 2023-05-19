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
  ROLE_OPTIONS,
} from '@configs';
import { UserFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { IImageInfo } from '@interfaces';
import { UserAccountFormModal } from '@pages';

interface IProps {
  open?: boolean;
  dataChange?: number;
  onClose?: () => void;
  onDataChange: (no: number) => void;
}

export const CreateStaffModule = (props: IProps) => {
  const { open, dataChange = 0, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    resolver: yupResolver(UserFormSchema),
    defaultValues: {
      username: '',
      password: '',
      name: '',
      phone: '',
      email: '',
      role: ROLE_OPTIONS[0].value,
      // storeId: '',
      // image: '',
    },
  });

  const handleCreate = handleSubmit(async (value) => {
    const body = {
      username: value.username,
      password: value.password,
      firstName: ' ',
      lastName: value.name,
      phone: value.phone,
      email: value.email,
      role: value.role || ROLE_OPTIONS[0].value,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await userAPI.create(body);
      if (res?.success) {
        showAppToast('Tạo thành công!', 'success');
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

  const handleCancel = () => {
    navigate(PATH_EARN_POINTS_RULE_LIST);
  };

  useEffect(() => {
    dispatch(setLoading(false));
    return () => {
      dispatch(setLoading(false));
    };
  }, []);

  return (
    <UserAccountFormModal
      open={open}
      errors={errors}
      register={register}
      onSubmit={handleCreate}
      setValue={setValue}
      onCancel={handleCancel}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
    />
  );
};
