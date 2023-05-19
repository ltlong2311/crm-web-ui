import styled from 'styled-components';
import { Col, Row } from 'antd';
import moment from 'moment';
import {
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import {
  ShareDateSelect,
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
import { IRule } from '@interfaces';
import { LogApp } from '@utils';
import { themes, useTheme } from '@theme';

interface IProps {
  data?: IRule;
  isEdit?: boolean;
  errors: Partial<FieldErrorsImpl<any>>;
  watch: UseFormWatch<any>;
  onSubmit?: () => void;
  register: UseFormRegister<any>;
  reset: UseFormReset<any>;
  resetField: UseFormResetField<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  onCancel?: () => void;
}

export const CashbackRuleForm = (props: IProps) => {
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
    reset,
    resetField,
  } = props;

  LogApp('rule form', errors);
  const { theme } = useTheme();

  return (
    <StyledCashbackRuleForm>
      <form onSubmit={onSubmit}>
        <div className="form-section">
          <div className="create-rule__form">
            <StyledRow className="mob-row" gutter={[0, 16]}>
              <Col
                className="gutter-row name-type-col name-type-col-left"
                xs={24}
                md={12}
                lg={12}
                xl={8}
              >
                <ShareInput
                  label="Rule Name"
                  placeholder="Name of cashback rule"
                  name="name"
                  className="input"
                  type="text"
                  required
                  errors={errors['name']?.message}
                  register={register}
                />
              </Col>

              <Col
                className="gutter-row name-type-col name-type-col-right"
                xs={24}
                md={12}
                lg={12}
                xl={8}
              >
                <ShareSelectInput
                  label="Type"
                  data={CASHBACK_RULE_TYPE}
                  onChange={(value) => setValue('ruleType', value)}
                  placeholder="Rule Type"
                  required
                  className="type-select"
                  defaultValue={data?.rule_type || CASHBACK_RULE_TYPE[0].value}
                  key={`typeSelect:${data?.rule_type || CASHBACK_RULE_TYPE[0].value}`} // change key to render input when defaultValue change
                />
              </Col>
            </StyledRow>
            <StyledRow gutter={[0, 16]}>
              <Col className="gutter-row spent-get-col" xs={24} lg={24} xl={16}>
                <div className="cashback-fields__container mob-row">
                  <ShareInput
                    // label="Spent"
                    inputDefaultStyle="preTab"
                    prefix="$"
                    placeholder="Spent"
                    name="spent"
                    className="input"
                    type="number"
                    step={0.01}
                    errors={errors['spent']?.message}
                    register={register}
                  />
                  <span className="cashback-arrow"> &rarr; </span>
                  <ShareInput
                    // label="Get"
                    placeholder="Rebate"
                    name="rebate"
                    className="input rebate-input"
                    type="number"
                    step={0.01}
                    errors={errors['rebate']?.message}
                    register={register}
                  />
                  <ShareSelectInput
                    data={CASHBACK_TYPE}
                    className="type-select reward-type__select"
                    defaultValue={data?.reward_type || CASHBACK_TYPE[0].value}
                    key={`rewardTypeSelect:${data?.reward_type || CASHBACK_TYPE[0].value}`}
                    onChange={(value) => setValue('rewardType', value)}
                  />
                </div>
              </Col>

              {/* select date form */}
              <Col className="gutter-row duration-col" xs={24} lg={24} xl={8}>
                <StyledSubRow gutter={[30, 16]}>
                  {/* <Col className="gutter-row" xs={24} sm={12}>
                <ShareDateSelect
                  minDate={moment().toDate()}
                  placeholder="End Date"
                  // maxDate={moment(new Date()).add(3, 'days').toDate()}
                  // format="DD-MM-YYYY HH:mm:ss"
                  onChange={(date, dateString) => {
                    LogApp({ date, dateString });
                    setValue('endDate', dateString);
                  }}
                  errors={errors['endDate']?.message}
                />
              </Col> */}
                  {watch('noEnd') ? (
                    <Col className="gutter-row" xs={24} sm={12}>
                      <ShareDateSelect
                        // {...register('startDate')}
                        minDate={moment().toDate()}
                        placeholder="Start Date"
                        // maxDate={moment(new Date()).add(3, 'days').toDate()}
                        format={ruleDateFormat}
                        // format="DD-MM-YYYY HH:mm:ss"
                        onChange={(date, dateString) => {
                          LogApp({ date, dateString });
                          setValue('startDate', dateString);
                          setValue('endDate', dateString);
                        }}
                        defaultValue={
                          watch('startDate')
                            ? moment(watch('startDate'), ruleDateFormat)
                            : data?.start_time
                            ? moment(Number(data?.start_time))
                            : undefined
                        }
                        key={`startDateF:${data?.start_time || ''}`}
                        errors={errors['startDate']?.message}
                      />
                    </Col>
                  ) : (
                    <Col className="gutter-row" xs={24}>
                      <ShareRangeDateSelect
                        minDate={
                          !isEdit ? moment().toDate() : moment(Number(data?.start_time)).toDate()
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
                          //Edit form
                          isEdit
                            ? watch('startDate')
                              ? [
                                  moment(watch('startDate'), ruleDateFormat),
                                  moment(watch('endDate'), ruleDateFormat),
                                ]
                              : data?.start_time && data?.end_time
                              ? [moment(Number(data?.start_time)), moment(Number(data?.end_time))]
                              : [undefined, undefined]
                            : //Create form
                            watch('startDate') && watch('endDate') && !watch('noEnd')
                            ? [
                                moment(watch('startDate'), ruleDateFormat),
                                moment(watch('endDate'), ruleDateFormat),
                              ]
                            : // : // : data?.start_time && data?.end_time
                              // ? [moment(Number(data?.start_time)), moment(Number(data?.end_time))]
                              [undefined, undefined]
                        }
                        key={
                          isEdit
                            ? `ruleDuration:${data?.start_time || ''}-${watch('startDate')}-${
                                data?.end_time || ''
                              }-${watch('endDate')}`
                            : `ruleDuration:${data?.start_time || ''}-${
                                data?.end_time || ''
                              }-${watch('noEnd')}`
                        }
                        errors={
                          !watch('startDate')
                            ? errors['startDate']?.message || errors['endDate']?.message
                            : ''
                        }
                      />
                    </Col>
                  )}
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
                      defaultValue={data?.start_time ? moment(Number(data?.start_time)) : undefined}
                      key={`startTime:${data?.start_time + getValues('ruleType') || ''}`}
                      disabled={watch('ruleType') !== enumRuleType.superior}
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
                      defaultValue={data?.end_time ? moment(Number(data?.end_time)) : undefined}
                      key={`endTime:${data?.end_time || ''}`}
                      disabled={watch('ruleType') !== enumRuleType.superior}
                    />
                  </Col>
                </StyledSubRow>
              </Col>
            </StyledRow>
            <div className="forever-field">
              <SharedCheckbox
                className="forever-cb"
                size="2rem"
                id="agreePrivacy"
                name="agreePrivacy"
                type="checkbox"
                defaultChecked={data?.noend ? data.noend : undefined}
                key={`NoEnd:${data?.noend || ''}`}
                onChange={(value: any) => {
                  const checked = value?.target?.checked;
                  // if (checked) resetField('startDate');
                  if (checked) {
                    // if (isEdit)
                    //   reset({
                    //     ...getValues(),
                    //     startDate: moment(Number(data?.start_time)).format(ruleDateFormat),
                    //   });
                    // else
                    //   reset((formValues: any) => ({
                    //     ...formValues,
                    //     startDate: '',
                    //   }));
                  } else {
                    //
                  }
                  setValue('noEnd', value?.target?.checked);
                }}
                text="Forever"
              />
            </div>
            <div className="fullsum-field">
              <SharedCheckbox
                className="fullsum-cb"
                size="2rem"
                id="agreePrivacy"
                name="agreePrivacy"
                type="checkbox"
                defaultChecked={data?.fullsum ? data.fullsum : undefined}
                key={`fullsumChecked:${data?.fullsum || ''}`}
                onChange={(value: any) => {
                  setValue('fullsum', value?.target?.checked);
                }}
                text="Fullsum"
              />
            </div>
            {/* btn */}
          </div>
        </div>
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
    </StyledCashbackRuleForm>
  );
};

const StyledCashbackRuleForm = styled.div`
  width: 100%;
  .form-section {
    position: relative;
    padding: 2rem 2.8rem;
    border-radius: 0.6rem;
    background: ${(p) => p.theme.colors.bgSection};
    box-shadow: 0px 3px 20px #0000000b;
  }
  .create-rule__form {
    padding-top: 2.2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    .shared-input,
    .inner-input,
    .ant-picker,
    input,
    .ant-select-selector {
      @media (min-width: 768px) {
        max-height: 4rem;
        height: 4rem !important;
      }
    }
    .fullsum-field,
    .forever-field {
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
        /* @media (min-width: ${MAT_SM_SCREEN_WIDTH_MIN}) {
          max-width: 8rem;
        } */
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
