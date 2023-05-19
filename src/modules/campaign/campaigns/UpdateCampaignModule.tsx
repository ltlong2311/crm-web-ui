import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { branchAPI} from '@api';

import { BranchFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { BranchFormModal, CampaignFormSection } from '@pages';

interface IProps {
  open?: boolean;
  id?: number | string;
  dataChange?: number;
  onClose?: () => void;
  onDataChange: (no: number) => void;
}

export const UpdateCampaignModule = (props: IProps) => {
  const { open, id, dataChange = 0, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<any>();
  const { themeMode } = useAppSelector(selectApp);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(BranchFormSchema),
    defaultValues: {
      name: '',
      address: '',
      email: '',
      phone: '',
      businessType: '',
    },
  });

  LogApp('check id', id);

  const getData = async (id: number | string) => {
    try {
      // dispatch(setLoading(true));
      const res: any = await branchAPI.getOne(id);
      const data = res.data;
      setData(data);
    } catch (error) {
      LogApp(error);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  const handleCreate = handleSubmit(async (value) => {
    if (!id) return;
    const body = {
      name: value.name,
      address: value.address || 'None',
      phone: value.phone || 'None',
      email: value.email,
      businessType: value.businessType,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await branchAPI.update(id, body);
      if (res?.success) {
        showAppToast('Cập nhật thành công!', 'success');
        onDataChange(dataChange + 1);
        onClose && onClose();
      } else {
        throw res?.data;
      }
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
      LogApp('API CREATE CUSTOMER', err);
    } finally {
      dispatch(setLoading(false));
    }
  });

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        address: data?.address,
        email: data?.email,
        phone: data?.phone,
        businessType: data?.businessType,
      });
    }
  }, [data]);

  return data ? (
    <CampaignFormSection
      open={open}
      errors={errors}
      register={register}
      onSubmit={handleCreate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
      isEdit
    />
  ) : (
    <></>
  );
};
