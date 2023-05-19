import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';

import { UserProfileSection } from '@components';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';

import * as yup from 'yup';
const schema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
});
const passSchema = yup.object({
  password: yup.string().required('Password is required'),
  new_password: yup.string().required('New password is required'),
  conf_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});
export const UserProfileModule = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector(selectApp);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        email: '',
        full_name: '',
        receive_noti: false,
      };
    }, []),
  });
  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPass,
    formState: { errors: errorsPass },
  } = useForm<FieldValues>({
    resolver: yupResolver(passSchema),
    defaultValues: useMemo(() => {
      return {
        password: '',
        new_password: '',
        conf_password: '',
      };
    }, []),
  });

  // const getUserInfo = async () => {
  //   try {
  //     dispatch(setLoading(true));
  //     const res: IGetMerchantInfo = await settingAPI.getUserInfo();
  //   } catch (error: any) {
  //     toast.error(`${error?.response?.data?.message}`, {
  //       position: 'top-right',
  //       autoClose: 2000,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       theme: 'colored',
  //     });
  //     LogApp(error);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };


  useEffect(() => {
    // getUserInfo();
  }, []);

  return (
    <UserProfileSection
      errorsPass={errorsPass}
      registerPass={registerPass}
      errors={errors}
      register={register}
      watch={watch}
      setValue={setValue}
    />
  );
};
