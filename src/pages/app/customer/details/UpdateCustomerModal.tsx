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
  ShareDateSelect,
  SharedButton,
  ShareInput,
  ShareSelectInput,
  UploadImageWrapper,
} from '@components';
import { dateFormat, GENDER_OPTIONS, MAT_SM_SCREEN_WIDTH_MIN, ruleDateFormat } from '@configs';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { UploadImageModule } from '@modules';
import _ from 'lodash';

interface IProps {
  info?: any;
  data?: any;
  customerCategories?: any;
  selectedImage?: any;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  storeList?: any;
  open?: boolean;
  watch: UseFormWatch<any>;
  onSubmit?: () => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  onCancel?: () => void;
  onClose?: () => void;
  onChangeImage?: (value: any) => void;
}

export const UpdateCustomerInfoFormModal = (props: IProps) => {
  const {
    info,
    data,
    errors,
    isEdit,
    selectedImage,
    customerCategories,
    storeList,
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

  const classificationsIds = data?.classifications?.map((val: any) => val?.id);

  return (
    <AppModal
      open={open}
      modalClassName="create-modal high-modal"
      title={isEdit ? 'Cập nhật thông tin khách hàng' : 'Tạo thông tin'}
      onClose={onClose}
      haveCloseIcon
      headActionStyle
    >
      <StyledCreateForm>
        <form onSubmit={onSubmit}>
          <div className="form-section">
            <div className="create__form">
              <UploadImageWrapper className="upload-wrap">
                <UploadImageModule
                  onUploadEnd={onChangeImage}
                  typeUpload="image"
                  defaultUrl={data?.image}
                />
                <p className="desc-upload">*Chọn vào hình ảnh để cập nhật ảnh đại diện</p>
              </UploadImageWrapper>
              <div className="profile-info">
                {/* <h4 className="form-title">Thông tin cơ bản</h4> */}
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
                <ShareDateSelect
                  label="Ngày sinh"
                  containerClassName="input-contain"
                  inputClassName={'time-select from-time-input'}
                  placeholder="Chọn ngày"
                  format={dateFormat}
                  onChange={(date, dateString) => {
                    const dateValue = date?.startOf('day')?.valueOf() || 0;
                    setValue('dob', dateValue);
                  }}
                  defaultValue={watch('dob') ? moment(Number(watch('dob'))) : undefined}
                  key={`birth:${data?.dob || ''}`}
                  noBorderStyle
                />
                <ShareSelectInput
                  containerClassName="input-contain w_full"
                  label="Giới tính"
                  data={GENDER_OPTIONS}
                  className="type-select reward-type__select"
                  placeholder="Chọn giới tính"
                  name="gender"
                  key={`gender:${data?.gender}`}
                  setValue={setValue}
                  defaultValue={data?.gender}
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
                  key={`classificationIds:${classificationsIds}`}
                  setValue={setValue}
                  defaultValue={classificationsIds}
                  noBorderStyle
                />
                <ShareInput
                  label="Mã bưu điện"
                  placeholder="Nhập mã bưu điện"
                  name="portalCode"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  errors={errors['portalCode']?.message}
                  register={register}
                  noBorderStyle
                />
              </div>
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
      font-size: 1.86rem;
      color: ${APP_COLORS.gray600};
      font-weight: 500;
      margin: 1rem 0 2.5rem;
    }
    .upload-wrap {
      margin-bottom: 1rem;
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
      width: 100%;
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
