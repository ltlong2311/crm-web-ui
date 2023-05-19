import * as yup from 'yup';

export const CustomerFormSchema = yup.object().shape({
  name: yup.string().required('Tên khách hàng không thể bỏ trống'),
  phone: yup.string().required('Số điện khách hàng không thể bỏ trống'),
  gender: yup.string().required('Số điện khách hàng không thể bỏ trống'),
  address: yup.string(),
  image: yup.string(),
});

export const CustomerCategoryFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
});

export const CustomerGeneralInfoFormSchema = yup.object().shape({
  name: yup.string().required('Tên khách hàng không thể bỏ trống'),
});
