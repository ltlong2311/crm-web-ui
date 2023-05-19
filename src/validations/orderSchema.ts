import * as yup from 'yup';

export const OrderFormSchema = yup.object().shape({
  name: yup.string(),
  shippingAddress: yup.string(),
  billingAddress: yup.string(),
  note: yup.string(),
});
