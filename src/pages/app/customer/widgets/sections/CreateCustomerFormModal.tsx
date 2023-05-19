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
import _ from 'lodash';

import {
  AppModal,
  ShareAreaInput,
  ShareDateSelect,
  SharedButton,
  SharedCollapse,
  ShareInput,
  ShareSelectInput,
  UploadImageWrapper,
} from '@components';
import { dateFormat, GENDER_OPTIONS, MAT_SM_SCREEN_WIDTH_MIN } from '@configs';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { UploadImageModule } from '@modules';
import { selectAuth, useAppSelector } from '@redux';

interface IProps {
  data?: any;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  selectedImage?: any;
  storeList?: any;
  customerCategories?: any;
  watch: UseFormWatch<any>;
  onSubmit?: () => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  onCancel?: () => void;
  onClose?: () => void;
  open?: boolean;
  onChangeImage?: (value: any) => void;
}

export const CreateCustomerFormModal = (props: IProps) => {
  const {
    data,
    errors,
    isEdit,
    selectedImage,
    storeList,
    customerCategories,
    open,
    getValues,
    setValue,
    onSubmit,
    register,
    watch,
    onClose,
    onChangeImage,
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
      title={isEdit ? 'Cập nhật khách hàng' : 'Tạo khách hàng'}
      onClose={onClose}
      haveCloseIcon
      headActionStyle
    >
      <StyledCreateForm>
        <form onSubmit={onSubmit}>
          <div className="form-section">
            <div className="create__form">
              {/* <h4 className="form-title">Avatar</h4> */}
              <UploadImageWrapper>
                <p className="label">Hình đại diện</p>
                <UploadImageModule onUploadEnd={onChangeImage} typeUpload="image" />
              </UploadImageWrapper>
              {/* Thông tin cơ bản */}
              <SharedCollapse
                defaultOpen
                header={<h4 className="form-title">Thông tin cơ bản</h4>}
                className="filter-contain mt-2"
                haveDownIcon
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
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    containerClassName="input-contain"
                    className="input"
                    type="text"
                    errors={errors['phone']?.message}
                    register={register}
                    noBorderStyle
                    required
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
                  />
                  <ShareDateSelect
                    label="Ngày sinh"
                    containerClassName="input-contain"
                    inputClassName={'time-select from-time-input'}
                    placeholder="Chọn ngày sinh"
                    format={dateFormat}
                    onChange={(date, dateString) => {
                      const dateValue = date?.startOf('day')?.valueOf() || 0;
                      setValue('dob', dateValue);
                    }}
                    noBorderStyle
                    maxDate={moment()}
                  />
                  <ShareInput
                    label="Địa chỉ"
                    placeholder="Địa chỉ"
                    name="address"
                    containerClassName="input-contain"
                    className="input"
                    type="text"
                    errors={errors['address']?.message}
                    register={register}
                    noBorderStyle
                  />
                  <ShareSelectInput
                    containerClassName="input-contain w_full"
                    label="Giới tính"
                    data={GENDER_OPTIONS}
                    className="type-select reward-type__select"
                    placeholder="Chọn giới tính"
                    name="gender"
                    setValue={setValue}
                    // defaultValue={GENDER_OPTIONS[0].value}
                    noBorderStyle
                  />
                  <ShareSelectInput
                    label="Phân loại khách hàng"
                    containerClassName="input-contain w_full"
                    mode="multiple"
                    data={customerCategories}
                    className="type-select reward-type__select"
                    placeholder="Chọn phân loại"
                    name="classificationIds"
                    key={`classificationIds:${data?.classificationIds}`}
                    setValue={setValue}
                    defaultValue={data?.classificationIds}
                    noBorderStyle
                  />
                  <ShareInput
                    label="Mã bưu điện"
                    placeholder="Nhập mã"
                    name="portalCode"
                    containerClassName="input-contain"
                    className="input"
                    type="text"
                    errors={errors['portalCode']?.message}
                    register={register}
                    noBorderStyle
                  />
                  <ShareInput
                    label="Mã số thuế"
                    placeholder="Nhập mã"
                    name="taxCode"
                    containerClassName="input-contain"
                    className="input"
                    type="text"
                    errors={errors['taxCode']?.message}
                    register={register}
                    noBorderStyle
                  />
                  <ShareAreaInput
                    label="Mô tả khách hàng"
                    placeholder="Nhập mô tả..."
                    name="desc"
                    containerClassName="input-contain"
                    className="input"
                    errors={errors['desc']?.message}
                    register={register}
                    noBorderStyle
                    rows={1}
                  />
                </div>
              </SharedCollapse>
            </div>
          </div>
          <div className="bottom-content">
            <div className="form__actions">
              <SharedButton
                typeHtml="submit"
                text={isEdit ? 'Lưu lại' : 'Thêm mới'}
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
    .custom-coll-head {
      margin: 2.6rem 0 1.5rem;
    }
    .form-title {
      font-size: 1.72rem;
      color: ${(p) => p?.theme?.colors?.subText};
      font-weight: 500;
      /* margin: 2.6rem 0 1.5rem; */
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
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 820px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0;
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
