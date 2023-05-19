import React, { CSSProperties, forwardRef, useState } from 'react';

import { IHandleBlur, IHandleChange } from '@interfaces';
import { StyleInputContainer } from './style';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';
import { LogApp } from '@utils';
import { HideIcon, ViewIcon } from '../../Icon/baseIcon';

interface IInputProps {
  inputType?: 'default' | 'primary' | 'search';
  sizeSearch?: 'small';
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  step?: number;
  name?: string;
  label?: string;
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  className?: string;
  placeholder?: string;
  placeholderColor?: string;
  containerClassName?: string;
  value?: string | number;
  defaultValue?: string | number;
  touched?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: 'off' | 'on';
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  inputDefaultStyle?: 'preTab' | 'postTab';
  containerRef?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement>;
  onClick?: () => void;
  onSearch?: () => void;
  onBlur?: IHandleBlur;
  onChange?: IHandleChange | any;
  // onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  register?: UseFormRegister<any>;
  prefix?: string;
  suffix?: string;
  prevIcon?: JSX.Element | JSX.Element[];
  sufIcon?: JSX.Element | JSX.Element[];
  maxLength?: number;
  min?: number;
  max?: number;
  haveShowPassIcon?: boolean;
  noBorderStyle?: boolean;
  haveErrorPosition?: boolean;
}
export const ShareInput = forwardRef((props: IInputProps, ref?: React.Ref<HTMLInputElement>) => {
  const {
    inputType,
    sizeSearch,
    type,
    name,
    label,
    errors,
    className,
    placeholder,
    placeholderColor,
    containerClassName,
    value,
    defaultValue,
    touched,
    disabled,
    readOnly,
    required,
    autoFocus,
    autoComplete,
    style,
    inputStyle,
    containerRef,
    register,
    onBlur,
    onPressEnter,
    onChange,
    prefix,
    suffix,
    prevIcon,
    sufIcon,
    inputDefaultStyle,
    maxLength,
    min,
    max,
    step,
    haveShowPassIcon,
    noBorderStyle,
    haveErrorPosition,
  } = props;

  const [isShowSecureText, setIsShowSecureText] = useState<boolean>(false);
  return (
    <StyleInputContainer
      className={containerClassName ? `${containerClassName} shared-input` : 'shared-input'}
      style={style}
      ref={containerRef}
      placeholderColor={placeholderColor}
      inputType={inputType}
      sizeSearch={sizeSearch}
      $inputDefaultStyle={inputDefaultStyle}
      $haveRightIcon={haveShowPassIcon || !!sufIcon}
      $noBorderStyle={noBorderStyle}
    >
      {label && (
        <label className="input__label" htmlFor={name || label}>
          {label}
          {required && <span className="required"> *</span>}:
        </label>
      )}
      <div className={className ? `inner-input ${className}` : 'inner-input'} tabIndex={2}>
        {!!prefix?.length && <span className="prefix">{prefix}</span>}
        {!!prevIcon && <div className="prev-icon">{prevIcon}</div>}
        <input
          className="r-input"
          ref={ref}
          id={name}
          name={name}
          value={value}
          type={isShowSecureText ? 'text' : type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          style={{ ...inputStyle }}
          autoFocus={autoFocus}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onPressEnter}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          {...(register && name && register(name))}
        />
        {!!suffix?.length && <span className="suffix">{suffix}</span>}
        {!!sufIcon && <div className="suf-icon"> {sufIcon}</div>}
        {type === 'password' && haveShowPassIcon && (
          <div
            className="suf-icon sh-pass"
            onClick={() => {
              setIsShowSecureText((prv) => !prv);
            }}
          >
            {isShowSecureText ? <HideIcon size={20} /> : <ViewIcon size={20} />}
          </div>
        )}
      </div>
      {haveErrorPosition ? (
        <p className="input-text-error">{errors || ' '}</p>
      ) : (
        !!errors && <p className="input-text-error">{errors}</p>
      )}
    </StyleInputContainer>
  );
});
