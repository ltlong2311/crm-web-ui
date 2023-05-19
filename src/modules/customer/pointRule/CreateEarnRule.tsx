import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CashbackRuleForm } from '@components';
import { getValueFromDateTimeString, LogApp } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { pointRuleAPI } from '@api';
import { enumCashbackType, enumRuleType, PATH_EARN_POINTS_RULE_LIST } from '@configs';
import { RuleFormSchema } from '@validations';

export const CreateCashbackRuleModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector(selectApp);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    getValues,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RuleFormSchema),
    defaultValues: {
      name: '',
      ruleType: enumRuleType.standard,
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      rewardType: enumCashbackType.cost,
      spent: '',
      rebate: '',
      fullsum: false,
      noEnd: false,
    },
  });

  const handleCreateCashback = handleSubmit(async (value) => {
    LogApp('Submit create cashback', value);
    const body = {
      title: value.name,
      rule_type: value.ruleType,
      reward_type: value.rewardType,
      start_time: getValueFromDateTimeString({ date: value.startDate, time: value.startTime }),
      end_time: getValueFromDateTimeString({ date: value.endDate, time: value.endTime }),
      spent_amount: Number(value.spent),
      rebate_amount: Number(value.rebate),
      fullsum: value.fullsum,
      noend: value.noEnd,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await pointRuleAPI.create(body);
      if (res?.success) {
        toast.success('Create rule successfully!', {
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
  });

  const handleCancel = () => {
    navigate(PATH_EARN_POINTS_RULE_LIST);
  };

  return (
    <CashbackRuleForm
      errors={errors}
      register={register}
      onSubmit={handleCreateCashback}
      setValue={setValue}
      onCancel={handleCancel}
      getValues={getValues}
      watch={watch}
      reset={reset}
      resetField={resetField}
    />
  );
};
