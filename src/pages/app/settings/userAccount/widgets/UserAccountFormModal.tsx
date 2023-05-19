import styled from 'styled-components';
import { Col, Row } from 'antd';
import moment from 'moment';
import {
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import {
  AppModal,
  SharedButton,
  SharedCheckbox,
  SharedCollapse,
  ShareInput,
  ShareRangeDateSelect,
  ShareSelectInput,
  ShareTimeSelect,
  TickBox,
} from '@components';
import {
  CASHBACK_RULE_TYPE,
  CASHBACK_TYPE,
  enumRuleType,
  MAIN_THEME_DATA,
  MAT_SM_SCREEN_WIDTH_MIN,
  ROLE_OPTIONS,
  ruleDateFormat,
  ruleTimeFormat,
} from '@configs';
import { ICashbackRule, IRule } from '@interfaces';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { UploadImageModule } from '@modules';
import { selectAuth, useAppSelector } from '@redux';
import _ from 'lodash';

interface IProps {
  data?: any;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  selectedImage?: any;
  storeList?: any;
  watch: UseFormWatch<any>;
  onSubmit?: () => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  onCancel?: () => void;
  onClose?: () => void;
  open?: boolean;
  changeSelectedImage?: (value: any) => void;
}

export const UserAccountFormModal = (props: IProps) => {
  const {
    data,
    errors,
    isEdit,
    selectedImage,
    storeList,
    open,
    getValues,
    setValue,
    onSubmit,
    register,
    watch,
    onClose,
    changeSelectedImage,
  } = props;

  LogApp('rule form', errors);
  const { theme } = useTheme();
  const auth = useAppSelector(selectAuth);
  const { accountInfo } = auth;

  LogApp({ accountInfo });

  return (
    <AppModal
      open={open}
      modalClassName="create-modal high-modal"
      title={isEdit ? 'Cập nhật tài khoản người dùng' : 'Tạo tài khoản người dùng'}
      onClose={onClose}
      haveCloseIcon
      headActionStyle
    >
      <StyledCreateForm>
        <form onSubmit={onSubmit}>
          <div className="form-section">
            <div className="create__form">
              {/* <h4 className="form-title">Thông tin tài khoản</h4> */}
              <ShareInput
                label="Username"
                placeholder="Nhập tài khoản"
                name="username"
                containerClassName="input-contain"
                className="input"
                type="text"
                required
                errors={errors['username']?.message}
                register={register}
                noBorderStyle
              />
              {!isEdit && (
                <ShareInput
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  containerClassName="input-contain"
                  className="input"
                  type="password"
                  errors={errors['password']?.message}
                  register={register}
                  noBorderStyle
                  required
                />
              )}
              {!isEdit && (
                <ShareInput
                  label="Nhập lại mật khẩu"
                  placeholder="Nhập lại mật khẩu tài khoản"
                  name="confirmPassword"
                  containerClassName="input-contain"
                  className="input"
                  type="password"
                  errors={errors['description']?.message}
                  register={register}
                  noBorderStyle
                  required
                />
              )}
              {/* Thông tin cơ bản */}
              <SharedCollapse
                defaultOpen
                header={<h4 className="form-title">Thông tin cơ bản</h4>}
                className="filter-contain"
                haveDownIcon
                contentExpectIncHeight={150}
              >
                <div className="profile-info">
                  <ShareInput
                    label="Họ tên"
                    placeholder="Tên người dùng"
                    name="name"
                    containerClassName="input-contain"
                    className="input"
                    type="text"
                    required
                    errors={errors['name']?.message}
                    register={register}
                    noBorderStyle
                  />
                  <ShareInput
                    label="Email"
                    placeholder="Nhập e-mail"
                    name="email"
                    containerClassName="input-contain"
                    className="input"
                    type="email"
                    errors={errors['email']?.message}
                    register={register}
                    noBorderStyle
                    required
                  />
                  <ShareSelectInput
                    containerClassName="input-contain w_full"
                    label="Quyền"
                    // mode="multiple"
                    data={ROLE_OPTIONS}
                    className="type-select reward-type__select"
                    placeholder="Select Tiers"
                    name="role"
                    key={`role:${data?.role}`}
                    setValue={setValue}
                    defaultValue={data?.role || ROLE_OPTIONS[0].value}
                    noBorderStyle
                    required
                  />
                  <ShareInput
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    containerClassName="input-contain"
                    className="input"
                    type="text"
                    errors={errors['description']?.message}
                    register={register}
                    noBorderStyle
                    required
                  />
                  {/* <ShareSelectInput
                label="Chi nhánh"
                containerClassName=".input-contain w_full"
                data={storeList}
                className="type-select reward-type__select"
                placeholder="Select Tiers"
                name="role"
                key={`role:${data?.storeId}`}
                setValue={setValue}
                defaultValue={data?.storeId}
              /> */}
                </div>
              </SharedCollapse>
            </div>
          </div>
          <div className="bottom-content">
            <div className="form__actions">
              <SharedButton
                typeHtml="submit"
                text={isEdit ? 'Lưu' : 'Thêm mới'}
                className="create-rule__button"
                backgroundColor={APP_COLORS.primary}
                btnStyle="pad"
              />
            </div>
          </div>
        </form>
      </StyledCreateForm>
    </AppModal>
  );
};

const StyledCreateForm = styled.div`
  width: 100%;
  .form-section {
    position: relative;
    border-radius: 0.6rem;
    min-width: 50rem;
    max-width: 50rem;
    width: 55%;
  }
  .create__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    .form-title {
      font-size: 1.72rem;
      color: ${(p) => p?.theme?.colors?.subText};
      font-weight: 500;
      margin: 2rem 0 1.5rem;
    }
    .profile-info {
      padding: 0 0.3rem 0.8rem;
    }
    .input-contain {
      margin-bottom: 2rem;
    }
    .fullsum-field {
      margin-bottom: 4.2rem;
    }

    .cashback-fields__container {
      display: flex;
      align-items: center;

      .rebate-input {
        border-radius: 0.6rem 0 0 0.6rem !important;
        z-index: 1;
        position: relative;
      }
      .cashback-arrow {
        margin: 0 1.5rem;
      }
      .reward-type__select {
        max-width: 5.6rem;
        .ant-select-selector {
          border-radius: 0 0.6rem 0.6rem 0 !important;
          border-left-color: transparent !important;
          &:focus,
          &:focus-within,
          &:focus-visible {
            outline: none !important;
          }
        }
      }
    }

    @media (min-width: 768px) {
      .name-type-col-left {
        padding-right: 5rem;
      }
      .mob-row {
        margin-bottom: 3.2rem;
      }
    }

    @media (min-width: 1200px) {
      .name-type-col {
        max-width: calc((100% * 2 / 3 - 11.2rem) / 2);
      }
      .name-type-col-left {
        padding-right: 0;
        margin-right: 4.2rem;
      }
      .spent-get-col {
        padding-right: 1.5rem;
      }
      .duration-col {
        padding-left: 1.5rem;
      }
    }
  }
  .bottom-content {
    width: 100%;
    display: flex;
    margin-top: 3rem;
    align-items: center;
    justify-content: center;
    .form__actions {
      display: flex;
      .btn {
      }
      @media (min-width: 1280px) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }

      @media (max-width: 820px) {
        display: flex;
        /* flex-direction: column; */
        /* align-items: center; */
        /* width: 100%; */
        /* padding: 0; */
        .btn {
          width: 100%;
        }
      }
    }
  }
`;

const StyledRow = styled((props) => <Row {...props} />)`
  margin-bottom: 1.4rem;
  @media (min-width: ${MAT_SM_SCREEN_WIDTH_MIN}) {
    margin-bottom: 4.2rem;
    &:first-child {
      margin-bottom: 5.6rem;
    }
  }
  width: 100%;
`;

const StyledSubRow = styled((props) => <Row {...props} />)`
  align-items: center;
  margin-bottom: 2rem;
`;
