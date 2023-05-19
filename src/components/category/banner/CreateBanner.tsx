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
  ruleDateFormat,
  ruleTimeFormat,
} from '@configs';
import { ICashbackRule, IRule } from '@interfaces';
import { LogApp } from '@utils';
import { themes, useTheme } from '@theme';
import { UploadImageModule } from '@modules';

interface IProps {
  data?: IRule;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  selectedImage?: any;
  watch: UseFormWatch<any>;
  onSubmit?: () => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  onCancel?: () => void;
  onClose?: () => void;
  changeSelectedImage?: (value: any) => void;
}

export const CreateBannerModal = (props: IProps) => {
  const {
    data,
    errors,
    isEdit,
    selectedImage,
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
    <AppModal
      modalClassName="create-modal high-modal"
      title="Create banner"
      onClose={onClose}
      haveCloseIcon
      open
    >
      <StyledCreateBannerForm>
        <form onSubmit={onSubmit}>
          <div className="form-section">
            <div className="create__form">
              <ShareInput
                label="Name"
                placeholder="Banner name"
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
                label="Description"
                placeholder="Banner description"
                name="description"
                containerClassName="input-contain"
                className="input"
                type="text"
                errors={errors['description']?.message}
                register={register}
                noBorderStyle
              />
              <div className="input-container">
                <p className="label">Upload image</p>
                <UploadImageModule onUploadEnd={changeSelectedImage} />
                {!!errors['image']?.message && (
                  <p className="input-text-error ">{errors['image']?.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="bottom-content">
            <div className="form__actions">
              <SharedButton
                typeHtml="submit"
                text={isEdit ? 'Save' : 'Create'}
                className="create-rule__button"
                backgroundColor={MAIN_THEME_DATA.mainColor}
                btnStyle="pad"
              />
            </div>
          </div>
        </form>
      </StyledCreateBannerForm>
    </AppModal>
  );
};

const StyledCreateBannerForm = styled.div`
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
