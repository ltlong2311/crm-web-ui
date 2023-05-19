import styled from 'styled-components';
import {
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import {
  AppModal,
  BranchMenuIcon2,
  CompanyIcon,
  CustomerMenuIcon,
  ShareDateSelect,
  SharedButton,
  ShareInput,
  ShareSelectInput,
} from '@components';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { Steps, Tooltip } from 'antd';
import {
  BranchManagementModule,
  CustomerManagementModule,
  ProductManagementModule,
} from '@modules';
import { useState } from 'react';
import {
  dateFormat,
  dateTimeFormat,
  enumOrderStatus,
  FULL_DATE_FORMAT,
  GENDER_OPTIONS,
} from '@configs';
import moment from 'moment';
import { selectChance, selectOrder, useAppSelector } from '@redux';
import { AddChanceProductTable } from './ChanceAddProductTable';
import { useNavigate } from 'react-router-dom';

interface IProps {
  publicId?: string;
  products?: any;
  data?: any;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  selectedImage?: any;
  watch: UseFormWatch<any>;
  onSubmit?: () => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  onCancel?: () => void;
  changeSelectedImage?: (value: any) => void;
}

export const ChanceDetailsSection = (props: IProps) => {
  const {
    publicId,
    products,
    data,
    errors,
    isEdit,
    selectedImage,
    getValues,
    setValue,
    onSubmit,
    register,
    watch,
    changeSelectedImage,
  } = props;

  LogApp('rule form', errors);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { chanceProducts, chanceCustomer } = useAppSelector(selectChance);

  const [showProducts, setShowProducts] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);

  return (
    <Section className="create-invoice__section">
      <StyledForm>
        <form onSubmit={onSubmit}>
          <div className="form__section">
            <div className="head">
              <div className="title">Cơ hội bán hàng</div>
            </div>
            <h3 className="sec-label">Thông tin chung</h3>
            <div className="info-section">
              <div className="left__content">
                <ShareInput
                  label="Khách hàng"
                  defaultValue={chanceCustomer?.name}
                  placeholder="Chọn khách hàng"
                  name="customerName"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  required
                  register={register}
                  noBorderStyle
                  sufIcon={
                    <Tooltip title="Chọn từ danh sách">
                      <SelectInfo onClick={() => setShowCustomers(true)}>
                        <CustomerMenuIcon size={18} color={APP_COLORS.primary} />
                      </SelectInfo>
                    </Tooltip>
                  }
                />
                <ShareInput
                  label="Email liên hệ"
                  defaultValue={chanceCustomer?.email}
                  placeholder="Nhập email"
                  name="customerEmail"
                  containerClassName="input-contain"
                  className="input"
                  type="email"
                  register={register}
                  noBorderStyle
                />
                <ShareInput
                  label="Số liên hệ"
                  defaultValue={chanceCustomer?.phone}
                  placeholder="Nhập số điện thoại"
                  name="customerPhone"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  errors={errors['customerPhone']?.message}
                  register={register}
                  noBorderStyle
                />
                <ShareDateSelect
                  label="Ngày kết thúc(kỳ vọng)"
                  containerClassName="input-contain"
                  inputClassName={'time-select from-time-input'}
                  placeholder="Chọn ngày"
                  showTime
                  format={FULL_DATE_FORMAT}
                  onChange={(date, dateString) => {
                    const dateValue = date?.startOf('day')?.valueOf() || 0;
                    setValue('date', dateValue);
                  }}
                  noBorderStyle
                />
              </div>
              <div className="right__content">
                <ShareInput
                  label="Tên cơ hội"
                  placeholder="Cơ hội bán hàng"
                  name="name"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  required
                  errors={errors['name']?.message}
                  register={register}
                  noBorderStyle
                />
                <ShareSelectInput
                  label="Giai đoạn"
                  containerClassName="input-contain w_full"
                  defaultValue={'Mở đầu'}
                  data={GENDER_OPTIONS}
                  className="type-select reward-type__select"
                  placeholder="Chọn giai đoạn"
                  name="step"
                  setValue={setValue}
                  noBorderStyle
                  readOnly
                />
                <ShareInput
                  label="Tỉ lệ thành công"
                  defaultValue={chanceCustomer?.phone}
                  placeholder="Nhập tỉ lệ"
                  name="successRate"
                  containerClassName="input-contain"
                  className="input"
                  type="number"
                  prefix="%"
                  inputDefaultStyle="preTab"
                  min={0}
                  max={100}
                  step={1}
                  errors={errors['successRate']?.message}
                  register={register}
                  noBorderStyle
                />
              </div>
            </div>
            <h3 className="sec-label">Thông tin bán hàng</h3>
            <div className="bill-products">
              <div className="product-list">
                {!chanceProducts?.length ? (
                  <div className="select-products" onClick={() => setShowProducts(true)}>
                    <span className="plus">+</span> Chọn sản phẩm
                  </div>
                ) : (
                  <AddChanceProductTable
                    data={chanceProducts}
                    onAddProduct={() => setShowProducts(true)}
                  />
                )}
              </div>
            </div>
            <h3 className="sec-label">Tiến độ</h3>
            <div className="progress">
              <Steps
                current={3}
                labelPlacement="vertical"
                status="wait"
                items={[
                  {
                    title: 'Mở đầu',
                    description: '11/2/2013',
                  },
                  {
                    title: 'Khách hàng quan tâm',
                    description: '22/2/2023',
                  },
                  {
                    title: 'Tư vấn - giới thiệu sản phẩm',
                    description: '10/6/2023',
                  },
                  {
                    title: 'Báo giá',
                    // description: '10/6/2023',
                  },
                  {
                    title: 'Thương thảo hợp đồng',
                    // description: '10/6/2023',
                  },
                  {
                    title: 'Kết thúc',
                    // description: '10/6/2023',
                  },
                ]}
              />
            </div>
            <h3 className="sec-label">Ghi chú</h3>
            <ShareInput
              defaultValue={chanceCustomer?.phone}
              placeholder="Nhập ghi chú"
              name="customerPhone"
              containerClassName="input-contain"
              className="input"
              type="text"
              errors={errors['customerPhone']?.message}
              register={register}
              noBorderStyle
            />
            {data?.status === 'completed' && (
              <>
                <h3 className="sec-label">Hoá đơn liên quan</h3>
                <ShareInput
                  placeholder="Mã đơn hàng"
                  name="orderId"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  errors={errors['orderId']?.message}
                  register={register}
                  noBorderStyle
                />
              </>
            )}
            {data?.status === 'failed' && (
              <>
                <h3 className="sec-label">Lý do thất bại</h3>
                <ShareInput
                  placeholder="Nhập lý do"
                  name="failedReason"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  errors={errors['failedReason']?.message}
                  register={register}
                  noBorderStyle
                />
              </>
            )}
          </div>
          <div className="bottom-content">
            <div className="form__actions">
              <SharedButton
                typeHtml="submit"
                text={'Lưu lại'}
                className="create-rule__button"
                backgroundColor={APP_COLORS.primary}
                btnStyle="pad"
                disabled={!products?.length || !chanceCustomer?.id}
              />
              <SharedButton
                text={'Huỷ bỏ'}
                className="create-rule__button"
                textColor={APP_COLORS.gray600}
                backgroundColor={APP_COLORS.whiteD}
                btnStyle="pad"
              />
            </div>
          </div>
        </form>
      </StyledForm>
      {/* select popup */}
      <AppModal
        open={showCustomers}
        modalClassName="create-modal high-modal"
        title={'Chọn khách hàng'}
        onClose={() => setShowCustomers(false)}
        haveCloseIcon
        headActionStyle
      >
        <CustomerManagementModule
          isSelectModule
          onCloseSelectModule={() => setShowCustomers(false)}
        />
      </AppModal>
      <AppModal
        open={showProducts}
        modalClassName="create-modal high-modal"
        title={'Chọn sản phẩm'}
        onClose={() => setShowProducts(false)}
        haveCloseIcon
        headActionStyle
      >
        <ProductManagementModule
          isSelectModule
          onCloseSelectModule={() => setShowProducts(false)}
        />
      </AppModal>
    </Section>
  );
};

const Section = styled.div`
  width: 100%;
  .head {
    padding-bottom: 32px;
    margin-bottom: 30px;
    .title {
      color: ${APP_COLORS.gray800};
      font-size: 3.2rem;
      font-weight: 700;
      text-align: center;
      span {
        font-size: 3rem;
        color: ${APP_COLORS.teal600};
      }
    }
    border-bottom: 1px dashed #dfdfdf;
  }
`;

const StyledForm = styled.div`
  width: 100%;
  .form__section {
    background: ${(p) => p?.theme?.colors?.bgSection};
    padding: 39px;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1), 0 11px 6px -7px rgba(43, 43, 43, 0.1);
    margin-top: 2.3rem;
  }
  .sec-label {
    font-size: 2rem;
    font-weight: 600;
    color: ${APP_COLORS.teal700};
    margin-bottom: 1.9rem;
  }
  .info-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 32px;
    margin-bottom: 2.1rem;

    .left__content {
      flex: 1;
    }
    .right__content {
      flex: 1;
    }
    .form-title {
      font-size: 1.72rem;
      color: ${(p) => p?.theme?.colors?.subText};
      font-weight: 500;
      margin: 2rem 0 1.5rem;
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
  .bill-products {
    margin-bottom: 3rem;
    .product-list {
      .select-products {
        border: 1px dashed ${APP_COLORS.blue50};
        text-align: center;
        border-radius: 8px;
        background: ${APP_COLORS.gray100};
        padding: 1.6rem;
        font-size: 1.3rem;
        font-weight: 600;
        color: ${APP_COLORS.primary};
        cursor: pointer;
        .plus {
          font-size: 1.6rem;
        }
      }
    }
  }
  .progress {
    margin-bottom: 1.6rem;
  }
  .more-info {
    margin-bottom: 1.6rem;
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
      gap: 10px;
      .btn {
        padding: 1.5rem 2.8rem;
        font-size: 1.6rem;
        box-shadow: none;
      }
    }
  }
`;

const SelectInfo = styled.div`
  cursor: pointer;
`;
