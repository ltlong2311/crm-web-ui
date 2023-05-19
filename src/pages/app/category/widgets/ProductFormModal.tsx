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
  ShareAreaInput,
  SharedButton,
  ShareInput,
  ShareSelectInput,
  UploadImageWrapper,
} from '@components';
import { MAT_SM_SCREEN_WIDTH_MIN } from '@configs';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { UploadImageModule } from '@modules';
import { IMAGES } from '@assets';

interface IProps {
  data?: any;
  selectedImage?: any;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  storeList?: any;
  categories?: any;
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

export const ProductFormModal = (props: IProps) => {
  const {
    data,
    errors,
    isEdit,
    selectedImage,
    storeList,
    open,
    categories,
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

  return (
    <AppModal
      open={open}
      modalClassName="create-modal high-modal"
      title={isEdit ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
      onClose={onClose}
      haveCloseIcon
      headActionStyle
    >
      <StyledCreateForm>
        <form onSubmit={onSubmit}>
          <div className="form-section">
            <div className="create__form">
              <div className="profile-info">
                <ShareInput
                  label="Sản phẩm"
                  placeholder="Nhập tên sản phẩm"
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
                  label="Giá"
                  placeholder="Nhập mô tả về loại sản phẩm"
                  name="cost"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  errors={errors['cost']?.message}
                  register={register}
                  noBorderStyle
                  required
                />
                <ShareInput
                  label="Số lượng"
                  placeholder="Nhập mô tả về loại sản phẩm"
                  name="quantity"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  errors={errors['quantity']?.message}
                  register={register}
                  noBorderStyle
                  required
                />
                <ShareSelectInput
                  containerClassName="input-contain w_full"
                  label="Phân loại sản phẩm"
                  data={categories && !!categories?.length ? categories : []}
                  className="type-select reward-type__select"
                  placeholder="Chọn loại sản phẩm"
                  name="categoryId"
                  key={`categoryId:${getValues('categoryId')}`}
                  setValue={setValue}
                  defaultValue={isEdit && getValues('categoryId')}
                  errors={errors['categoryId']?.message}
                  noBorderStyle
                  required
                />
                <ShareAreaInput
                  label="Mô tả"
                  placeholder="Nhập mô tả về loại sản phẩm"
                  name="desc"
                  containerClassName="input-contain"
                  className="input"
                  errors={errors['desc']?.message}
                  register={register}
                  noBorderStyle
                  rows={1}
                />
                <UploadImageWrapper>
                  <p className="label">Hình ảnh sản phẩm</p>
                  {isEdit ? (
                    <UploadImageModule
                      key={`${data?.image}`}
                      typeUpload="change"
                      onUploadEnd={onChangeImage}
                      defaultUrl={data?.image || IMAGES.noProduct}
                      previewImageStyle="contain"
                    />
                  ) : (
                    <UploadImageModule onUploadEnd={onChangeImage} />
                  )}
                  {/* {!!errors['image']?.message && (
                    <p className="input-text-error ">{errors['image']?.message}</p>
                  )} */}
                </UploadImageWrapper>
              </div>
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
