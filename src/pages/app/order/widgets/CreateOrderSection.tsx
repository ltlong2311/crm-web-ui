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
  AppSection,
} from '@components';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { Tooltip } from 'antd';
import {
  BranchManagementModule,
  CustomerManagementModule,
  ProductManagementModule,
} from '@modules';
import { useState } from 'react';
import { AddProductTable } from './AddProductTable';
import { dateFormat, dateTimeFormat, enumOrderStatus, FULL_DATE_FORMAT } from '@configs';
import moment from 'moment';
import { selectOrder, useAppSelector } from '@redux';

interface IProps {
  orderPublicId?: string;
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

export const CreateOrderSection = (props: IProps) => {
  const {
    orderPublicId,
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

  const { orderProducts, orderStore, orderCustomer } = useAppSelector(selectOrder);

  const [showProducts, setShowProducts] = useState(false);
  const [showStores, setShowStores] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);

  return (
    <Section className="create-invoice__section">
      <StyledForm>
        <form onSubmit={onSubmit}>
          <AppSection>
            <div className="head">
              <div className="title">
                Đơn hàng <span>#{orderPublicId}</span>
              </div>
            </div>
            <div className="form-section">
              <div className="bill-from">
                <p className="order-label">Từ</p>
                <ShareInput
                  value={orderStore?.name}
                  placeholder="Đơn vị bán hàng"
                  name="name"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  required
                  // register={register}
                  noBorderStyle
                  sufIcon={
                    <Tooltip title="Chọn từ chi nhánh">
                      <SelectInfo onClick={() => setShowStores(true)}>
                        <CompanyIcon size={18} color={APP_COLORS.primary} />
                      </SelectInfo>
                    </Tooltip>
                  }
                  readOnly
                />
                <ShareInput
                  value={orderStore?.email}
                  placeholder="Email"
                  name="email"
                  containerClassName="input-contain"
                  className="input"
                  type="email"
                  required
                  // register={register}
                  noBorderStyle
                  readOnly
                />
                <ShareInput
                  value={orderStore?.phone}
                  placeholder="Số điện thoại"
                  name="phone"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  required
                  errors={errors['description']?.message}
                  // register={register}
                  noBorderStyle
                  readOnly
                />
                <ShareInput
                  // value={'Trà đá vỉa hè, 56 P. Lý Thái Tổ, Lý Thái Tổ, Hoàn Kiếm, Hà Nội'}
                  key={`billingAddress-${orderStore?.address}`}
                  defaultValue={orderStore?.address}
                  placeholder="Địa chỉ"
                  name="billingAddress"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  errors={errors['billingAddress']?.message}
                  register={register}
                  noBorderStyle
                />
              </div>
              <div className="bill-to">
                <p className="order-label">Đến</p>
                <ShareInput
                  value={orderCustomer?.lastName}
                  placeholder="Tên khách hàng"
                  name="customerName"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  required
                  // register={register}
                  noBorderStyle
                  readOnly
                  sufIcon={
                    <Tooltip title="Chọn từ chi nhánh">
                      <SelectInfo onClick={() => setShowCustomers(true)}>
                        <CustomerMenuIcon size={18} color={APP_COLORS.primary} />
                      </SelectInfo>
                    </Tooltip>
                  }
                />
                <ShareInput
                  value={orderCustomer?.email}
                  placeholder="Email khách hàng"
                  name="customerEmail"
                  containerClassName="input-contain"
                  className="input"
                  type="email"
                  required
                  // register={register}
                  noBorderStyle
                  readOnly
                />
                <ShareInput
                  value={orderCustomer?.phone}
                  placeholder="Số điện thoại khách hàng"
                  name="customerPhone"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  required
                  // register={register}
                  noBorderStyle
                  readOnly
                />
                <ShareInput
                  key={`shippingAddress-${orderCustomer?.address}`}
                  defaultValue={orderCustomer?.address}
                  placeholder="Địa chỉ nhận"
                  name="shippingAddress"
                  containerClassName="input-contain"
                  className="input"
                  type="text"
                  errors={errors['shippingAddress']?.message}
                  register={register}
                  noBorderStyle
                />
              </div>
            </div>
            <div className="bill-products">
              {/* <p className="order-label">Sản phẩm</p> */}
              <div className="product-list">
                {!orderProducts?.length ? (
                  <div className="select-products" onClick={() => setShowProducts(true)}>
                    <span className="plus">+</span> Chọn sản phẩm
                  </div>
                ) : (
                  <AddProductTable
                    data={orderProducts}
                    onAddProduct={() => setShowProducts(true)}
                  />
                )}
              </div>
            </div>
            <div className="more-info">
              <p className="order-label">Ngày giao dự kiến</p>
              <ShareDateSelect
                containerClassName="input-contain"
                inputClassName={'time-select from-time-input'}
                placeholder="Chọn ngày"
                showTime
                format={dateFormat}
                onChange={(date, dateString) => {
                  const dateValue = date?.startOf('day')?.valueOf() || 0;
                  setValue('deliveryDate', dateValue);
                }}
                minDate={moment().startOf('day')}
                noBorderStyle
              />
            </div>
            <div className="more-info">
              <p className="order-label">Ghi chú</p>
              <ShareInput
                placeholder="Nhập ghi chú"
                name="note"
                containerClassName="input-contain"
                className="input"
                type="text"
                errors={errors['note']?.message}
                register={register}
                noBorderStyle
              />
            </div>
          </AppSection>
          <div className="bottom-content">
            <div className="form__actions">
              <SharedButton
                typeHtml="submit"
                text={isEdit ? 'Lưu' : 'Tạo đơn hàng'}
                className="create-rule__button"
                backgroundColor={APP_COLORS.primary}
                btnStyle="pad"
                disabled={!orderProducts?.length || !orderCustomer?.id}
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
        isOpenFirst={false}
      >
        <CustomerManagementModule
          isSelectModule
          onCloseSelectModule={() => setShowCustomers(false)}
        />
      </AppModal>
      <AppModal
        open={showStores}
        modalClassName="create-modal high-modal"
        title={'Chọn cửa hàng'}
        onClose={() => setShowStores(false)}
        haveCloseIcon
        headActionStyle
        isOpenFirst={false}
      >
        <BranchManagementModule isSelectModule onCloseSelectModule={() => setShowStores(false)} />
      </AppModal>
      <AppModal
        open={showProducts}
        modalClassName="create-modal high-modal"
        title={'Chọn sản phẩm'}
        onClose={() => setShowProducts(false)}
        haveCloseIcon
        headActionStyle
        isOpenFirst={false}
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
  .order-label {
    font-size: 1.6rem;
    font-weight: 600;
    color: ${APP_COLORS.teal600};
    margin-bottom: 1rem;
  }
  .form-section {
    display: flex;
    flex-direction: row;
    gap: 32px;
    width: 100%;
    margin-bottom: 1.2rem;
    .bill-from {
      flex: 1;
    }
    .bill-to {
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
    margin-bottom: 2rem;
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

const SelectInfo = styled.div`
  cursor: pointer;
`;
