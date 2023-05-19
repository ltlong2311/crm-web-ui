import * as yup from 'yup';

export const ChanceFormSchema = yup.object().shape({
  name: yup.string(),
  note: yup.string(),
});
