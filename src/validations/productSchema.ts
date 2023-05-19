import * as yup from 'yup';

export const ProductFormSchema = yup.object().shape({
  name: yup.string().required('Tên sản phẩm không thể bỏ trống'),
  desc: yup.string(),
  cost: yup.string().required('Giá sản phẩm không thể bỏ trống'),
  quantity: yup.string().required('Số lượng sản phẩm không thể bỏ trống'),
  image: yup.string(),
  categoryId: yup.string().required('Phân loại sản phẩm không thể bỏ trống'),
});
