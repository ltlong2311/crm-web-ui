import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { branchAPI, campaignAPI } from '@api';

import { BranchFormSchema, CampaignFormSchema } from '@validations';
import { useEffect, useState } from 'react';
import { BranchFormModal, CampaignDetailsSection, CampaignFormSection } from '@pages';

interface IProps {
  campaignId?: number | string;
}

export const CampaignDetailsModule = (props: IProps) => {
  const { campaignId } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [data, setData] = useState<any>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
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
    resolver: yupResolver(CampaignFormSchema),
    defaultValues: {
      name: '',
      startTime: '',
      endTime: '',
      desc: '',
    },
  });

  LogApp('check id', id);

  const getData = async (id: number | string) => {
    try {
      // dispatch(setLoading(true));
      const res: any = await campaignAPI.getOne(id);
      const data = res.data;
      setData(data);
    } catch (error) {
      LogApp(error);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  const handleUpdate = handleSubmit(async (value) => {
    if (!id) return;
    const body = {
      name: value.name,
      startTime: value.startTime,
      endTime: value.endTime,
      desc: value.desc,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await campaignAPI.update(id, body);
      if (res?.success) {
        showAppToast('Cập nhật thành công!', 'success');
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

  const handleUpdateStatus = async (value: any) => {
    if (!id) return;
    const body = {
      status: value,
    };
    try {
      dispatch(setLoading(true));
      const res: any = await campaignAPI.update(id, body);
      if (res?.success) {
        showAppToast('Cập nhật thành công!', 'success');
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
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await campaignAPI.delete(id);
      showAppToast('Xóa thành công!', 'success');
      getData(id);
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
    }
  };

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        startTime: data?.startTime,
        endTime: data?.endTime,
        desc: data?.desc,
      });
    }
  }, [data]);

  return (
    <CampaignDetailsSection
      data={data}
      errors={errors}
      showDeleteConfirm={showDeleteConfirm}
      setShowDeleteConfirm={setShowDeleteConfirm}
      register={register}
      onSubmit={handleUpdate}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
      onUpdateStatus={handleUpdateStatus}
      onDelete={handleDelete}
      isEdit
    />
  );
};
