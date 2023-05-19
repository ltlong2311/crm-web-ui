import { memo, ReactNode, useCallback } from 'react';
import { DatePicker } from 'antd';
import styled, { css } from 'styled-components';
import moment, { Moment } from 'moment';
import { Input } from 'antd';

import { LogApp } from '@utils';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { TextAreaProps } from 'antd/lib/input';

interface IProps extends TextAreaProps {
  type?: 'week' | 'month' | 'quarter' | 'year';
  defaultValue?: any;
  label?: string;
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  maxDate?: any;
  minDate?: any;
  disabled?: boolean;
  status?: 'error' | 'warning';
  popupClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  allowClear?: boolean;
  bordered?: boolean;
  open?: boolean;
  nextIcon?: ReactNode;
  prevIcon?: ReactNode;
  suffixIcon?: ReactNode;
  inputReadOnly?: boolean;
  placeholder?: string;
  required?: boolean;
  noBorderStyle?: boolean;
  value?: any;
  name?: string;
  rows?: number;
  cols?: number;
  register?: UseFormRegister<any>;
  onChange?: (e: any) => void;
}

export const ShareAreaInput = memo((props: IProps) => {
  const { TextArea } = Input;
  //page props
  const {
    type,
    label,
    errors,
    maxDate,
    minDate,
    value,
    defaultValue,
    disabled,
    status,
    popupClassName,
    containerClassName,
    inputClassName,
    allowClear = true,
    bordered,
    open,
    nextIcon,
    prevIcon,
    name,
    inputReadOnly = false,
    placeholder,
    required,
    noBorderStyle,
    rows,
    cols,
    register,
    onChange,
  } = props;

  const disabledDate = useCallback((current: any) => {
    if (minDate && maxDate) {
      return (
        current &&
        (current.valueOf() <= minDate || current.valueOf() > moment(maxDate).add(1, 'day').toDate())
      );
    }
    if (minDate) {
      return current && current <= minDate;
    }
    if (maxDate) {
      return current && current > moment(maxDate).add(1, 'day').toDate();
    }
  }, []);

  return (
    <Wrapper className={containerClassName} $noBorderStyle={noBorderStyle}>
      {label && (
        <label className="input__label" htmlFor={label}>
          {label}
          {required && <span className="required"> *</span>}:
        </label>
      )}
      {/* <TextArea
        className={inputClassName ? `app-area-input ${inputClassName}` : 'app-area-input'}
        onChange={onChange}
      /> */}
      <textarea
        className={inputClassName ? `app-area-input ${inputClassName}` : 'app-area-input'}
        placeholder={placeholder}
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        onChange={onChange}
        {...(register && name && register(name))}
      >
        {/* {defaultValue}123 */}
      </textarea>
      {!!errors && <p className="input-text-error">{errors}</p>}
    </Wrapper>
  );
});

const Wrapper = styled.div<{
  $noBorderStyle?: boolean;
}>`
  .input__label {
    display: inline-block;
    margin-bottom: 0.8rem;
    color: inherit;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 20px;
    text-align: center;
    color: #303030;
    .required {
      color: #d42a1c;
      font-weight: bold;
    }
    ${(p) =>
      p?.$noBorderStyle &&
      css`
        color: #303030;
        font-weight: 500;
        font-size: 1.5rem;
      `}
  }
  .input-text-error {
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: red;
    font-size: 1.2rem;
    position: relative;

    /* top: -0.2rem; */
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
  }
  .app-area-input {
    width: 100%;
    border: 1px solid ${(p) => p?.theme?.colors?.input?.border ?? '#b6b6b6'};
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
      var(--tw-shadow);
    border-radius: 0.6rem;
    /* height: 5rem; */
    color: #495057;
    font-size: 1.3rem;
    padding: 0.6rem 1.2rem;
    ${(p) =>
      p?.$noBorderStyle &&
      css`
        /* height: 4.5rem; */
        border: none;
        background: #f9f9f9 !important;
        font-size: 1.4rem;
        font-weight: 500;
        outline: none;
      `}
  }
`;
