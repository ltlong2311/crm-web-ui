import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

import { CashbackRuleForm } from '@components';
import { selectApp, setLoading, setTableLoading, useAppDispatch, useAppSelector } from '@redux';
import { getValueFromDateTimeString, LogApp } from '@utils';
import { pointRuleAPI } from '@api';
import {
  enumCashbackType,
  enumRuleType,
  PATH_EARN_POINTS_RULE_LIST,
  ruleDateFormat,
  ruleTimeFormat,
} from '@configs';
import { RuleFormSchema } from '@validations';
import { ICashbackRule, IGetOneCashbackRuleRoot, IRule } from '@interfaces';

export const EditCashbackRuleModule = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector(selectApp);
  const { ruleId } = useParams();

  const [rule, setRule] = useState<ICashbackRule>();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({
    // mode: 'onChange',
    resolver: yupResolver(RuleFormSchema),
    defaultValues: useMemo(() => {
      return {
        name: rule?.title,
        ruleType: rule?.rule_type,
        startTime: moment(Number(rule?.start_time)).format(ruleTimeFormat),
        endTime: moment(Number(rule?.end_time)).format(ruleTimeFormat),
        startDate: rule?.start_time
          ? moment(Number(rule?.start_time)).format(ruleDateFormat)
          : undefined,
        endDate: rule?.end_time ? moment(Number(rule?.end_time)).format(ruleDateFormat) : undefined,
        rewardType: rule?.reward_type,
        spent: rule?.spent_amount,
        rebate: rule?.rebate_amount,
        fullsum: rule?.fullsum,
        noEnd: rule?.noend,
      };
    }, [rule]),
  });

  const getRuleData = async (ruleId: string) => {
    try {
      dispatch(setTableLoading(true));
      const res: IGetOneCashbackRuleRoot = await pointRuleAPI.getOneRule(ruleId);
      const rule = res.data as IRule;
      setRule(rule);
    } catch (error) {
      LogApp(error);
    } finally {
      dispatch(setTableLoading(false));
    }
  };

  const handleCreateCashback = handleSubmit(async (value) => {
    LogApp('Submit edit cashback', value);
    if (ruleId) {
      const body = {
        title: value.name,
        rule_type: value.ruleType,
        reward_type: value.rewardType,
        start_time: getValueFromDateTimeString({
          date: value?.startDate,
          time: value.ruleType === enumRuleType.superior ? value.startTime : undefined,
        }),
        end_time: getValueFromDateTimeString({
          date: value?.endDate,
          time: value.ruleType === enumRuleType.superior ? value.endTime : undefined,
        }),
        spent_amount: Number(value.spent),
        rebate_amount: Number(value.rebate),
        fullsum: value.fullsum,
        noend: Boolean(value.noEnd),
      };
      try {
        dispatch(setLoading(true));
        const res: any = await pointRuleAPI.update(ruleId, body);
        if (res?.success) {
          toast.success('Update rule successfully!', {
            position: 'top-right',
            autoClose: 1500,
            closeOnClick: true,
            pauseOnHover: true,
            theme: themeMode,
          });
          navigate(PATH_EARN_POINTS_RULE_LIST);
          reset();
        } else {
          throw res?.data;
        }
      } catch (err: any) {
        const error = err?.response?.data;
        toast.error(`${error?.message}`, {
          position: 'top-right',
          autoClose: 1500,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'colored',
        });
        LogApp('API CREATE RULE', err);
      } finally {
        dispatch(setLoading(false));
      }
    }
  });

  const handleCancel = () => {
    navigate(PATH_EARN_POINTS_RULE_LIST);
  };

  useEffect(() => {
    if (ruleId) {
      getRuleData(ruleId);
    }
  }, [ruleId]);

  useEffect(() => {
    if (rule) {
      reset({
        name: rule?.title,
        ruleType: rule?.rule_type,
        startTime: moment(Number(rule?.start_time)).format(ruleTimeFormat),
        endTime: moment(Number(rule?.end_time)).format(ruleTimeFormat),
        startDate: moment(Number(rule?.start_time)).format(ruleDateFormat),
        endDate: moment(Number(rule?.end_time)).format(ruleDateFormat),
        rewardType: rule?.reward_type,
        spent: rule?.spent_amount,
        rebate: rule?.rebate_amount,
        fullsum: rule?.fullsum,
        noEnd: rule?.noend,
      });
    }
  }, [rule]);

  return (
    <CashbackRuleForm
      data={rule}
      errors={errors}
      register={register}
      onSubmit={handleCreateCashback}
      setValue={setValue}
      isEdit
      getValues={getValues}
      onCancel={handleCancel}
      watch={watch}
      reset={reset}
      resetField={resetField}
    />
  );
};
