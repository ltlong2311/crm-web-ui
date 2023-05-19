import * as yup from 'yup';

export const BranchFormSchema = yup.object().shape({
  name: yup.string().required('Tên chi nhánh không thể bỏ trống'),
  address: yup.string().required('Địa chỉ không thể bỏ trống'),
  email: yup.string().required('Email đơn vị không thể bỏ trống'),
  phone: yup.string().required('Số liên hệ không thể bỏ trống'),
  // businessType: yup.string(),
});
