import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { CreateBannerModal } from '@components';
import { LogApp, showAppToast } from '@utils';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';
import { appAPI, categoriesAPI, customerAPI, customerCategoryAPI, settingAPI, userAPI } from '@api';
import {
  DEFAULT_ANNOUNCEMENT_STATUS,
  DEFAULT_ANNOUNCEMENT_TYPE,
  MAXIMUM_ITEM_PER_PAGE_NUM,
  PATH_EARN_POINTS_RULE_LIST,
  enumGender,
} from '@configs';
import {
  BannerFormSchema,
  CustomerGeneralInfoFormSchema,
  RuleFormSchema,
  UpdateUserFormSchema,
  UserFormSchema,
} from '@validations';
import { useEffect, useState } from 'react';
import { IImageInfo } from '@interfaces';
import { UpdateCustomerInfoFormModal, UserAccountFormModal } from '@pages';

interface IProps {
  info?: any;
  id?: number | string | null;
  open?: boolean;
  dataChange?: number;
  onClose?: () => void;
  onDataChange?: () => void;
}

export const UpdateCustomerInfoModule = (props: IProps) => {
  const { open, id, dataChange = 0, info, onClose, onDataChange } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  LogApp({ userId: id });
  LogApp({ userId2: info });

  const [data, setData] = useState<any>(info);

  const [selectedImage, setSelectedImage] = useState();
  const [customerCategories, setCustomerCategories] = useState();

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
    resolver: yupResolver(CustomerGeneralInfoFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      dob: '',
      gender: '',
      address: '',
      taxCode: '',
      image: '',
      classificationIds: [],
      desc: '',
      portalCode: '',
    },
  });

  LogApp('check id', String(id));

  const changeSelectedImage = (value: any) => {
    clearErrors('image');
    setSelectedImage(value);
  };

  LogApp({ userId3: data });
  const getData = async (id: number | string) => {
    LogApp('infoDataAPI0', data);
    try {
      // dispatch(setLoading(true));
      const res: any = await customerAPI.getOne(id);
      const data = res.data;
      LogApp('infoDataAPI', data);
      setData(data);
    } catch (error) {
      LogApp(error);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  const handleUpdateCustomer = async (value: any, imageUrl?: string) => {
    LogApp('Check 33', String(id));
    if (!id) return;
    LogApp('Check 38');
    const body = {
      firstName: ' ',
      lastName: value.name,
      dob: value.dob,
      gender: value.gender || enumGender.OTHER,
      address: value.address || '',
      image: imageUrl || '',
      point: 0,
      cashback: 0,
      rate: 0,
      classificationIds: value.classificationIds,
      storeId: [2],
      portalCode: value.portalCode,
      desc: value.desc || '',
    };
    try {
      dispatch(setLoading(true));
      const res: any = await customerAPI.update(id, body);
      if (res?.success) {
        showAppToast('Cập nhật thành công!', 'success');
        onDataChange && onDataChange();
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
  };

  const handleUpdate = handleSubmit(async (value) => {
    LogApp('Submit create banner', value);
    // if (selectedImage) {
    try {
      if (!selectedImage) handleUpdateCustomer(value);
      else {
        dispatch(setLoading(true));
        const body = new FormData();
        body.append('image', selectedImage);
        const res: any = await appAPI.uploadImage(body);
        const imageInfo = res.data as IImageInfo;
        // if (!res?.success) {
        handleUpdateCustomer(value, imageInfo?.link);
        // } else {
        //   throw res?.data;
        // }
      }
    } catch (err: any) {
      const error = err?.response?.data;
      showAppToast(`${error?.message}`, 'error');
      LogApp('API CREATE RULE', err);
    } finally {
      dispatch(setLoading(false));
    }
    // } else {
    //   setError('image', { type: 'custom', message: 'Upload image is required' });
    // }
  });

  const getCategoriesData = async () => {
    try {
      dispatch(setLoading(true));
      const res: any = await customerCategoryAPI.getList({
        page: 1,
        perPage: MAXIMUM_ITEM_PER_PAGE_NUM,
      });
      LogApp('data', res);
      const data = res.data?.items;
      const categoriesOptions = data?.map((item: any) => ({
        label: item?.name || '',
        value: item?.id || '',
      }));
      setCustomerCategories(categoriesOptions);
    } catch (error) {
      LogApp(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCancel = () => {
    navigate(PATH_EARN_POINTS_RULE_LIST);
  };

  // useEffect(() => {
  //   if (id) {
  //     getData(id);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (data) {
  //     reset({
  //       name: data?.lastName,
  //       email: data?.email,
  //       phone: data?.phone,
  //       dob: data?.dob,
  //       gender: data?.gender,
  //       address: data?.address,
  //       image: data?.image,
  //       portalCode: data?.portalCode,
  //     });
  //   }
  // }, [data]);

  useEffect(() => {
    if (info) {
      reset({
        name: info?.lastName,
        email: info?.email,
        phone: info?.phone,
        dob: info?.dob,
        gender: info?.gender,
        address: info?.address,
        image: info?.image,
        portalCode: info?.portalCode,
        classificationIds: info?.classifications?.map((val: any) => val?.id),
        desc: info?.desc,
      });
    }
  }, [info]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  LogApp('infoData', data);

  return (
    <UpdateCustomerInfoFormModal
      data={info}
      open={open}
      info={info}
      errors={errors}
      customerCategories={customerCategories}
      register={register}
      onSubmit={handleUpdate}
      setValue={setValue}
      onCancel={handleCancel}
      getValues={getValues}
      watch={watch}
      onClose={onClose}
      onChangeImage={changeSelectedImage}
      isEdit
    />
  );
};
