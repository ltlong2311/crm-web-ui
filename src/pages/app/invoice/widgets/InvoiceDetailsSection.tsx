import styled from 'styled-components';
import {
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import {
  ChevronDownIcon,
  DropdownButton,
  FlexWrap,
  LogoTextIcon,
  OptionDropdown,
  OrderStatus,
  ShareDateSelect,
  SharedButton,
  ShareInput,
} from '@components';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { dateFormat, dateTimeFormat, enumOrderStatus, FULL_DATE_FORMAT } from '@configs';
import moment from 'moment';
import { selectOrder, useAppSelector } from '@redux';
import { InvoiceProductTable } from './InvoiceProductsTable';

interface IProps {
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
}

export const InvoiceDetailsSection = (props: IProps) => {
  const {
    products,
    data,
    errors,
    isEdit,
    selectedImage,
    getValues,
    setValue,
    register,
  } = props;

  LogApp('rule form', errors);
  const { theme } = useTheme();

  const { orderProducts } = useAppSelector(selectOrder);

  return (
    <>
      <OrderActions>
        <div>
          <DropdownButton
            btnBackgroundColor={APP_COLORS.primary}
            sufIcon={<ChevronDownIcon color="#fff" size={18} strokeWidth={3} />}
            text="Tùy chọn"
            className="option-btn"
            dropdownPlacement="bottomRight"
            dropdown={
              <OptionDropdown>
                <div className="option-item">Cập nhật trạng thái</div>
                <div className="option-item">In hoá đơn</div>
                {/* <div className="option-item dangerous">Xóa hoá đơn</div> */}
              </OptionDropdown>
            }
          />
        </div>
      </OrderActions>
      <Section className="invoice__section">
        <div className="head">
          <div className="logo">
            <LogoTextIcon width={130} height={35} color={APP_COLORS.primary} />
          </div>
          <div className="order-status">
            <OrderStatus status={enumOrderStatus.IS_PAID} size="small" noIcon />
          </div>
        </div>
        <DetailsInfo>
          <p className="invoice-id">
            Hoá đơn <span>#{data?.name}</span>
          </p>
          <div className="invoice-info">
            <FlexWrap className="info-row">
              <div className="info-item created-date">
                <p className="invoice-label">Ngày tạo đơn:</p>
                <p className="info-value">
                  <strong>5am, 13/03/2023</strong>
                </p>
              </div>
              <div className="info-item create-to">
                <p className="invoice-label">Ngày giao hàng:</p>
                <p className="info-value"><strong>6pm, 12/04/2023</strong></p>
              </div>
            </FlexWrap>
            <FlexWrap className="info-row">
              <div className="info-item bill-from">
                <p className="invoice-label">Từ:</p>
                <p className="info-value">
                  <strong>Cửa hàng LTL</strong>
                </p>
                <p className="info-value">Trà đá Metropole,56 P. Lý Thái Tổ, Lý Thái Tổ, Hoàn Kiếm, Hà Nội</p>
              </div>
              <div className="info-item bill-to">
                <p className="invoice-label">Đến:</p>
                <p className="info-value">
                  <strong>Khách hàng A</strong>
                </p>
                <p className="info-value">Số 23 Ngõ 11 Văn La, Phường Phú La, Quận Hà Đông, Hà Nội</p>
              </div>
            </FlexWrap>
          </div>
          <div className="bill-products">
            <div className="product-list">
              <InvoiceProductTable data={orderProducts} />
            </div>
          </div>
        </DetailsInfo>
      </Section>
    </>
  );
};

const OrderActions = styled.div`
  margin: 2.3rem 0 2rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

const Section = styled.div`
  width: 100%;
  background: ${(p) => p?.theme?.colors?.bgSection};
  padding: 6.5rem;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1), 0 11px 6px -7px rgba(43, 43, 43, 0.1);
  margin-top: 2.3rem;
  .head {
    /* border-bottom: 1px dashed #dfdfdf; */
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 3.2rem;
    .logo {
    }
    .order-status {
      position: relative;
    }
  }
`;

const DetailsInfo = styled.div`
  width: 100%;
  .invoice-id {
    color: ${APP_COLORS.gray800};
    font-size: 2.6rem;
    font-weight: 700;
    text-align: left;
    margin-bottom: 3.2rem;
    span {
      font-size: 3rem;
      color: ${APP_COLORS.teal600};
    }
  }
  .invoice-label {
    font-size: 1.8rem;
    font-weight: 500;
    color: ${APP_COLORS.gray600};
    margin-bottom: 1rem;
  }
  .invoice-info {
    position: relative;
    width: 80%;
    margin-bottom: 2.6rem;
    .info-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 96px;
      margin-bottom: 3.2rem;
      .info-item{
        flex: 1;
      }
      .info-value{
        color: ${APP_COLORS.teal800};
        font-size: 1.7rem;
        margin-bottom: 4px;
      }
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
    padding: 1.2rem 0;
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
