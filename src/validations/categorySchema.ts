import * as yup from 'yup';

export const CategoryFormSchema = yup.object().shape({
  name: yup.string().required('Loại sản phẩm không thể bỏ trống'),
  desc: yup.string(),
});
