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

import { AppModal, SharedButton, ShareInput } from '@components';
import { MAT_SM_SCREEN_WIDTH_MIN } from '@configs';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { UploadImageModule } from '@modules';

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

export const CompanyInfoSection = (props: IProps) => {
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

  return (
    <StyledSection>
      <form onSubmit={onSubmit}>
        <div className="sec-head">
          <h3 className="sec-title">Thông tin doanh nghiệp</h3>
          <SharedButton
            typeHtml="submit"
            text={'Lưu cập nhật'}
            className="create-rule__button"
            backgroundColor={APP_COLORS.primary}
            btnStyle="pad"
          />
        </div>
        <div className="form-section">
          <div className='com-logo'>
          {/* <h3 className="sec-label">Logo</h3> */}
            <UploadImageModule onUploadEnd={changeSelectedImage} typeUpload="change" defaultUrl='' btnUploadText='Thay đổi logo'/>
          </div>
          <div className="create__form">
            <div className="profile-info">
              <h3 className="sec-label">Thông tin chung</h3>
              <ShareInput
                placeholder="Tên doanh nghiệp"
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
                // label="Email đơn vị"
                placeholder="Email làm việc"
                name="email"
                containerClassName="input-contain"
                className="input"
                type="email"
                required
                errors={errors['email']?.message}
                register={register}
                noBorderStyle
              />
              <ShareInput
                // label="Số liên hệ"
                placeholder="Số liên hệ doanh nghiệp"
                name="phone"
                containerClassName="input-contain"
                className="input"
                type="text"
                required
                errors={errors['phone']?.message}
                register={register}
                noBorderStyle
              />
              <ShareInput
                // label="Địa chỉ"
                placeholder="Địa chỉ doanh nghiệp"
                name="address"
                containerClassName="input-contain"
                className="input"
                type="text"
                required
                errors={errors['address']?.message}
                register={register}
                noBorderStyle
              />
              <ShareInput
                // label="Loại hình kinh doanh"
                placeholder="Loại hình kinh doanh của đơn vị"
                name="businessType"
                containerClassName="input-contain"
                className="input"
                type="text"
                errors={errors['businessType']?.message}
                register={register}
                noBorderStyle
              />
            </div>
          </div>
        </div>
      </form>
    </StyledSection>
  );
};

const StyledSection = styled.div`
  width: 100%;
  padding: 2rem 2.8rem 3.2rem;
  border-radius: 0.6rem;
  background: ${(p) => p.theme.colors.bgSection};
  box-shadow: 0px 3px 20px #0000000b;
  .sec-head {
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px dashed #dfdfdf;
    .sec-title {
      font-size: 2.3rem;
      font-weight: 500;
      margin-bottom: 2.6rem;
    }
    .btn {
      padding: 1rem 1.5rem;
    }
  }
  .sec-label {
      font-size: 2rem;
      font-weight: 600;
      color: ${APP_COLORS.teal600};
      margin-bottom: 1.9rem;
    }
  .form-section {
    position: relative;
    display: flex;
    gap: 50px;
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
      flex-direction: row-reverse;
      width: 100%;
      .btn {
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
