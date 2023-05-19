import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { PATH_DASHBOARD, PATH_FORGOT_PASSWORD, PATH_SIGN_UP } from '@configs';
import { LogApp } from '@utils';
import { LoginForm } from '@components';
import {
  selectApp,
  setAccessToken,
  setAccountInfo,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import { authAPI } from '@api';
import { ILoginResFields } from '@interfaces';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const LoginModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector(selectApp);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRedirectToForgot = () => {
    navigate(PATH_FORGOT_PASSWORD);
  };

  const handleRedirectToSignUp = () => {
    navigate(PATH_SIGN_UP);
  };

  const handleLogin = handleSubmit(async (data) => {
    LogApp('Submit Login', data);
    const body = {
      username: data.username,
      password: data.password,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await authAPI.login(body);
      LogApp('login res', res);
      const data = res.data as ILoginResFields;
      reset({ username: '', password: '' });
      if (res?.success) {
        data && dispatch(setAccountInfo(data));
        data?.token && dispatch(setAccessToken(data?.token));
        navigate(PATH_DASHBOARD);
        toast(`Welcome to LTL CRM, ${data?.firstName} ${data?.lastName}!`, {
          position: 'top-right',
          autoClose: 2000,
          pauseOnHover: true,
          theme: 'colored',
          type: 'info',
        });
      } else {
        setError('password', { type: 'custom', message: 'The email or password is incorrect' });
      }
    } catch (err: any) {
      // reset({ username: '', password: '' });
      setError('password', { type: 'custom', message: 'The email or password is incorrect' });
      LogApp('API Login', err);
    } finally {
      dispatch(setLoading(false));
    }
  });

  return (
    <LoginForm
      register={register}
      redirectToForgot={handleRedirectToForgot}
      redirectToSignUp={handleRedirectToSignUp}
      errors={errors}
      handleLogin={handleLogin}
    />
  );
};
