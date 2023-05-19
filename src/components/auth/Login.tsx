import { BaseSyntheticEvent, memo } from 'react';
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

import { SharedButton, ShareInput } from '@components';
import { StyledLoginSection } from './loginStyle';
import { ILoginFields } from '@interfaces';
import { AUTH_THEME_COLOR } from '@configs';
import { themes, useTheme } from '@theme';

interface IProps {
  redirectToForgot?: () => void;
  redirectToSignUp?: () => void;
  register: UseFormRegister<FieldValues>;
  errors: Partial<FieldErrorsImpl<any>>;
  handleLogin: (e?: BaseSyntheticEvent<ILoginFields, any, any> | undefined) => Promise<void>;
}

export const LoginForm = memo((props: IProps) => {
  const { errors, redirectToForgot, register, handleLogin, redirectToSignUp } = props;

  const { theme } = useTheme();

  return (
    <StyledLoginSection className="login__section">
      {/* @ts-ignore */}
      <form onSubmit={handleLogin} className="login-form">
        {/* <div className="login-wrap"> */}
        <ShareInput
          placeholder="Username"
          name="username"
          className="input"
          type="text"
          errors={errors['username']?.message}
          register={register}
          haveErrorPosition
        />
        <ShareInput
          placeholder="Mật khẩu"
          name="password"
          className="input"
          type="password"
          errors={errors['password']?.message}
          register={register}
          haveShowPassIcon
          haveErrorPosition
        />
        <div className="forgot-password">
          <p className='redirect-btn forgot-text' onClick={redirectToForgot}>
            Quên mật khẩu?
          </p>
        </div>
        <div className="actions">
          <SharedButton
            typeHtml="submit"
            text="Đăng nhập"
            className="submit__btn login-btn"
            backgroundColor={AUTH_THEME_COLOR}
            btnStyle="pad"
          />
        </div>
        {/* </div> */}
      </form>
    </StyledLoginSection>
  );
});
