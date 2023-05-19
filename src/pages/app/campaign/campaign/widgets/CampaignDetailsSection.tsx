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
  ShareInput,
  AppSection,
  ShareDateSelect,
  ShareSelectInput,
  DropdownButton,
  ChevronDownIcon,
  OptionDropdown,
  DetailActions,
  DetailsItem,
  CampaignStatus,
  AppConfirmModal,
  ShareAreaInput,
} from '@components';
import {
  MAT_SM_SCREEN_WIDTH_MIN,
  ORDER_STATUS_OPTIONS,
  appDateTimeFormat,
  dateFormat,
  enumCampaignStatus,
} from '@configs';
import { LogApp } from '@utils';
import { APP_COLORS, themes, useTheme } from '@theme';
import { UploadImageModule } from '@modules';

interface IProps {
  data?: any;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  selectedImage?: any;
  storeList?: any;
  open?: boolean;
  showDeleteConfirm?: boolean;
  setShowDeleteConfirm?: any;
  watch: UseFormWatch<any>;
  onSubmit?: () => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  onCancel?: () => void;
  onClose?: () => void;
  changeSelectedImage?: (value: any) => void;
  onDelete?: () => void;
  onUpdateStatus?: (value: any) => void;
}

export const CampaignDetailsSection = (props: IProps) => {
  const {
    data,
    errors,
    isEdit,
    selectedImage,
    storeList,
    open,
    showDeleteConfirm,
    setShowDeleteConfirm,
    getValues,
    setValue,
    onSubmit,
    register,
    watch,
    onClose,
    changeSelectedImage,
    onDelete,
    onUpdateStatus,
  } = props;

  LogApp('rule form', errors);
  const { theme } = useTheme();

  const diffCampaignTime = moment(data?.endTime).diff(moment());

  return (
    <Wrapper>
      <DetailActions>
        <div>
          <DropdownButton
            btnBackgroundColor={APP_COLORS.primary}
            sufIcon={<ChevronDownIcon color="#fff" size={18} strokeWidth={3} />}
            text="Tùy chọn"
            className="option-btn"
            dropdownPlacement="bottomRight"
            closeDropdownOnSelect
            dropdown={
              <OptionDropdown>
                <div
                  onClick={() => onUpdateStatus && onUpdateStatus(enumCampaignStatus.ACTIVE)}
                  className="option-item"
                >
                  Khởi chạy chiến dịch
                </div>
                <div
                  onClick={() => onUpdateStatus && onUpdateStatus(enumCampaignStatus.NOT_ACTIVE)}
                  className="option-item"
                >
                  Tạm dừng chiến dịch
                </div>
                <div
                  onClick={() => onUpdateStatus && onUpdateStatus(enumCampaignStatus.END)}
                  className="option-item"
                >
                  Đóng chiến dịch
                </div>
                <div
                  onClick={() => onUpdateStatus && onUpdateStatus(enumCampaignStatus.CANCELED)}
                  className="option-item"
                >
                  Hủy chiến dịch
                </div>
                <div onClick={() => setShowDeleteConfirm(true)} className="option-item dangerous">
                  Xóa chiến dịch
                </div>
              </OptionDropdown>
            }
          />
        </div>
      </DetailActions>
      <form onSubmit={onSubmit}>
        <AppSection className="create-invoice__section">
          <div className="head">
            <div className="title">{'Thông tin chiến dịch'}</div>
          </div>
          <StyledCreateForm>
            <div className="form-section">
              <div className="create__form">
                <div className="profile-info">
                  <ShareInput
                    label="Tên chiến dịch"
                    placeholder="Nhập tên"
                    name="name"
                    containerClassName="input-contain"
                    className="input"
                    type="text"
                    required
                    errors={errors['name']?.message}
                    register={register}
                    noBorderStyle
                  />
                  <ShareDateSelect
                    label="Thời điểm bắt đầu"
                    containerClassName="input-contain"
                    inputClassName={'time-select from-time-input'}
                    placeholder="Chọn ngày"
                    showTime
                    format={appDateTimeFormat}
                    onChange={(date, dateString) => {
                      const dateValue = date?.valueOf() || 0;
                      setValue('startTime', dateValue);
                    }}
                    key={`startTime-${data?.startTime}`}
                    defaultValue={data?.startTime && moment(Number(data.startTime))}
                    minDate={moment().startOf('day')}
                    noBorderStyle
                    required
                  />
                  <ShareDateSelect
                    label="Thời điểm kết thúc"
                    containerClassName="input-contain"
                    inputClassName={'time-select from-time-input'}
                    placeholder="Chọn ngày"
                    showTime
                    format={appDateTimeFormat}
                    onChange={(date, dateString) => {
                      const dateValue = date?.valueOf() || 0;
                      setValue('endTime', dateValue);
                    }}
                    key={`endTime-${data?.endTime}`}
                    defaultValue={data?.endTime && moment(Number(data.endTime))}
                    minDate={moment().startOf('day')}
                    noBorderStyle
                    required
                  />
                  <ShareAreaInput
                    label="Mô tả"
                    placeholder="Nhập mô tả..."
                    name="desc"
                    containerClassName="input-contain"
                    className="input"
                    errors={errors['desc']?.message}
                    register={register}
                    noBorderStyle
                    rows={2}
                  />
                  <DetailsItem>
                    <label className="label">Trạng thái:</label>
                    <CampaignStatus
                      status={
                        diffCampaignTime < 0
                          ? enumCampaignStatus.OVERDUE
                          : data?.status || enumCampaignStatus.NOT_ACTIVE
                      }
                    />
                  </DetailsItem>
                </div>
              </div>
            </div>
          </StyledCreateForm>
        </AppSection>
        <div className="bottom-content">
          <div className="form__actions">
            <SharedButton
              typeHtml="submit"
              text={isEdit ? 'Cập nhật' : 'Thêm mới'}
              className="create-rule__button"
              backgroundColor={APP_COLORS.primary}
              btnStyle="pad"
            />
          </div>
        </div>
      </form>
      <AppConfirmModal
        text="Thao tác này sẽ không thể hoàn tác! Xác nhận muốn xóa chiến dịch này?"
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onOK={onDelete}
      />
    </Wrapper>
  );
};

const StyledCreateForm = styled.div`
  width: 100%;
  .form-section {
    position: relative;
    border-radius: 0.6rem;
    width: 100%;
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
`;

const Wrapper = styled.div`
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
