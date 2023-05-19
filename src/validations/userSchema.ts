import * as yup from 'yup';

export const UserFormSchema = yup.object().shape({
  username: yup.string().required('username không thể bỏ trống'),
  password: yup.string().required('mật khẩu không thể bỏ trống'),
  confirmPassword: yup.string().required('Xác nhận mật khẩu không thể bỏ trống'),
  name: yup.string().required('Tên người dùng không thể bỏ trống'),
  phone: yup.string().required('Số điện thoại không thể bỏ trống'),
  email: yup.string().required('Email không thể bỏ trống'),
});

export const UpdateUserFormSchema = yup.object().shape({
  username: yup.string().required('username không thể bỏ trống'),
  // password: yup.string().required('mật khẩu không thể bỏ trống'),
  name: yup.string().required('Tên người dùng không thể bỏ trống'),
  phone: yup.string().required('Số điện thoại không thể bỏ trống'),
  email: yup.string().required('Email không thể bỏ trống'),
});


export const UpdateStaffFormSchema = yup.object().shape({
  name: yup.string().required('Tên người dùng không thể bỏ trống'),
  phone: yup.string().required('Số điện thoại không thể bỏ trống'),
  email: yup.string().required('Email không thể bỏ trống'),
});

