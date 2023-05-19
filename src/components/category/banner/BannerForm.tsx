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
  SharedButton,
  ShareInput,
  ShareRangeDateSelect,
  ShareSelectInput,
  ShareTimeSelect,
} from '@components';
import {
  CASHBACK_TYPE,
  MAIN_THEME_DATA,
  MAT_SM_SCREEN_WIDTH_MIN,
  ruleDateFormat,
  ruleTimeFormat,
} from '@configs';
import { DropdownProps, IBanner } from '@interfaces';
import { LogApp } from '@utils';
import { themes, useTheme } from '@theme';
import { UploadImageModule } from '@modules';
interface IProps {
  data?: IBanner;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  watch: UseFormWatch<any>;
  onSubmit?: () => void;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  onCancel?: () => void;
  changeSelectedImage?: (value: any) => void;
  onChangeTiers?: (value: any) => void;
  tiers: DropdownProps;
  selectedTiers?: number[];
}

export const BannerForm = (props: IProps) => {
  const {
    data,
    errors,
    isEdit,
    getValues,
    onCancel,
    setValue,
    onSubmit,
    register,
    watch,
    changeSelectedImage,
    tiers,
    selectedTiers,
  } = props;

  const { theme } = useTheme();
  return (
    <StyledBannerSection>
      <form onSubmit={onSubmit}>
        <StyledRow gutter={[20, 16]}>
          <Col className="gutter-row name-type-col name-type-col-left" md={24} lg={16} xl={18}>
            <div className="intro-y section-box">
              <div className="box-content border border-slate-200/60 dark:border-darkmode-400 rounded-md">
                <div className="head font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400">
                  <h3 className="box-title">Banner Info</h3>
                </div>
                <div className="form-section">
                  <div className="edit_form main_form">
                    <div className="form-field">
                      <div className="label">
                        <p className="label-text">Name</p>
                      </div>
                      <ShareInput
                        placeholder="Name of cashback rule"
                        name="name"
                        className="input"
                        type="text"
                        required
                        errors={errors['name']?.message}
                        register={register}
                      />
                    </div>
                    <div className="form-field">
                      <div className="label">
                        <p className="label-text">Description</p>
                      </div>
                      <ShareInput
                        placeholder="Name of cashback rule"
                        name="description"
                        className="input"
                        type="text"
                        errors={errors['description']?.message}
                        register={register}
                      />
                    </div>
                    <div className="form-field">
                      <div className="label">
                        <p className="label-text">Redirect link</p>
                        <p className="label-desc">
                          The link is redirected after click on the image
                        </p>
                      </div>
                      <ShareInput
                        placeholder="Link"
                        name="action"
                        className="input"
                        type="text"
                        errors={errors['action']?.message}
                        register={register}
                      />
                    </div>
                    <div className="form-field">
                      <div className="label">
                        <p className="label-text">Tiers</p>
                        {/* <p className="label-desc">Member tiers can see this banner</p> */}
                      </div>
                      {
                        <ShareSelectInput
                          containerClassName="w_full"
                          mode="multiple"
                          data={tiers}
                          className="type-select reward-type__select"
                          placeholder="Select Tiers"
                          name="tier_ids"
                          key={`tier_ids:${data?.tier_ids}`}
                          setValue={setValue}
                          defaultValue={data?.tier_ids}
                        />
                      }
                    </div>

                    <div className="form-field">
                      <div className="label">
                        <p className="label-text">Duration:</p>
                      </div>
                      <div className="right-field">
                        <StyledSubRow gutter={[30, 16]}>
                          <Col className="gutter-row" xs={24}>
                            <ShareRangeDateSelect
                              minDate={
                                !isEdit
                                  ? moment().toDate()
                                  : moment(Number(data?.start_time)).toDate()
                              }
                              placeholder={['Start Date', 'End Date']}
                              // format="DD-MM-YYYY HH:mm:ss"
                              format={ruleDateFormat}
                              onChange={(date, dateString) => {
                                LogApp('rule range date', { date, dateString });
                                setValue('startDate', dateString[0]);
                                setValue('endDate', dateString[1]);
                              }}
                              defaultValue={
                                data?.start_time && data?.end_time
                                  ? [
                                      moment(Number(data?.start_time)),
                                      moment(Number(data?.end_time)),
                                    ]
                                  : [undefined, undefined]
                              }
                              key={`ruleDuration:${data?.start_time || ''}-${data?.end_time || ''}`}
                              errors={
                                !watch('startDate')
                                  ? errors['startDate']?.message || errors['endDate']?.message
                                  : ''
                              }
                            />
                          </Col>
                        </StyledSubRow>
                        <StyledSubRow gutter={[30, 16]}>
                          <Col className="gutter-row" xs={24} sm={12}>
                            <ShareTimeSelect
                              onChange={(time, timeString) => {
                                LogApp({ time, timeString });
                                setValue('startTime', timeString);
                              }}
                              format={ruleTimeFormat}
                              bordered={false}
                              placeholder="Start time"
                              defaultValue={
                                data?.start_time ? moment(Number(data?.start_time)) : undefined
                              }
                              key={`startTime:${data?.start_time + getValues('ruleType') || ''}`}
                              // disabled={watch('ruleType') !== enumRuleType.superior}
                            />
                          </Col>
                          <Col className="gutter-row" xs={24} sm={12}>
                            <ShareTimeSelect
                              onChange={(time, timeString) => {
                                LogApp({ time, timeString });
                                setValue('endTime', timeString);
                              }}
                              format={ruleTimeFormat}
                              bordered={false}
                              placeholder="End time"
                              defaultValue={
                                data?.end_time ? moment(Number(data?.end_time)) : undefined
                              }
                              key={`endTime:${data?.end_time || ''}`}
                              // disabled={watch('ruleType') !== enumRuleType.superior}
                            />
                          </Col>
                        </StyledSubRow>
                      </div>
                    </div>
                    {/* select date form */}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="gutter-row name-type-col name-type-col-right" md={24} lg={8} xl={6}>
            <div className="sticky top-0 right-box">
              <div className="input-container">
                <p className="label">Image</p>
                <UploadImageModule
                  typeUpload="change"
                  defaultUrl={data?.image}
                  onUploadEnd={changeSelectedImage}
                />
              </div>
            </div>
          </Col>
        </StyledRow>

        <div className="bottom-content">
          <div className="form__actions">
            <SharedButton
              text="Cancel"
              className="cancel__btn"
              backgroundColor="transparent"
              textColor={theme?.colors?.button?.text || themes.theme.light.colors.button.text}
              borderColor={theme?.colors?.button?.border || themes.theme.light.colors.button.border}
              btnStyle="pad"
              onClick={onCancel}
            />
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
    </StyledBannerSection>
  );
};

const StyledBannerSection = styled.div`
  .ant-select-selector {
    padding: 0rem 0.4rem !important;
  }
  width: 100%;
  .form-section {
    position: relative;
    padding: 3.2rem 0 0;
    border-radius: 0.6rem;
    background: ${(p) => p.theme.colors.bgSection};
  }

  .section-box {
    background: ${(p) => p.theme.colors.bgSection};
    border-radius: 0.6rem;
    padding: 1.6rem 2.2rem;
    box-shadow: 0px 3px 20px #0000000b;
    .box-content {
      padding: 2.6rem;
      .head {
        padding-bottom: 2.3rem;
        .box-title {
          font-size: 1.6rem;
        }
      }
      .main_form {
        display: flex;
        flex-direction: column;
        width: 100%;
        .form-field {
          display: flex;
          flex-direction: column;
          margin-bottom: 2.6rem;
          &:last-child {
            margin-bottom: 0;
          }
          .right-field {
            width: 100%;
          }
          .label {
            margin-right: 2.6rem;
            .label-text {
              font-size: 1.4rem;
              font-weight: 500;
              margin-bottom: 0.6rem;
              color: ${({ theme }: any) => theme?.colors?.text};
            }
            .label-desc {
              font-size: 1.3rem;
              font-weight: 400;
              color: ${({ theme }: any) => theme?.colors?.secondary};
            }
          }
          .value-text {
            font-size: 1.4rem;
            font-weight: 500;
            color: ${({ theme }: any) => theme?.colors?.secondary};
          }
          @media (min-width: 1280px) {
            flex-direction: row;
            align-items: flex-start;
            .label {
              width: 43%;
            }
          }
        }

        .cannot-changed-field {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .shared-input {
          margin-bottom: 0.8rem;
        }
        .inner-input,
        .ant-picker,
        input,
        .ant-select-selector {
          @media (min-width: 768px) {
            height: 4rem;
          }
        }
      }
    }
  }
  .edit_form {
    padding: 0 0 1.2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* .shared-input,
    .inner-input,
    .ant-picker,
    input,
    .ant-select-selector {
      @media (min-width: 768px) {
        max-height: 4rem;
        height: 4rem !important;
      }
    } */

    .shared-input,
    .ant-select {
      margin-bottom: 2rem;
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

  .right-box {
    background: ${(p) => p.theme.colors.bgSection};
    border-radius: 0.6rem;
    padding: 2rem 2.2rem;
    box-shadow: 0px 3px 20px #0000000b;

    .label {
      display: flex;
      align-items: center;
      margin-bottom: 0.8rem;
      font-size: 1.6rem;
      font-weight: 500;
    }

    .upload__image {
      width: 100%;
      height: auto;
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
        width: calc((100% - 2rem) / 2);
        &:first-child {
          margin-right: 2rem;
        }
      }
      @media (min-width: 1280px) {
        display: flex;
        width: 100%;
        align-items: center;
        max-width: 23rem;
      }

      @media (max-width: 820px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0;
        .btn {
          width: 100%;
          &:first-child {
            margin-right: 0;
            margin-bottom: 1rem;
          }
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
