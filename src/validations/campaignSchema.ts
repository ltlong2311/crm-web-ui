import * as yup from 'yup';

export const CampaignFormSchema = yup.object().shape({
  name: yup.string().required('Tên chiến dịch không thể bỏ trống'),
  startTime: yup.string().required('Thời gian bắt đầu không thể bỏ trống'),
  endTime: yup.string().required('Thời gian kết thúc không thể bỏ trống'),
});

export const VoucherFormSchema = yup.object().shape({
  name: yup.string().required('Mã khuyến mãi không thể bỏ trống'),
  startTime: yup.string().required('Thời gian bắt đầu không thể bỏ trống'),
  endTime: yup.string().required('Thời gian kết thúc không thể bỏ trống'),
  discountPercent: yup.string().required('Thời gian kết thúc không thể bỏ trống'),
  minCostToApply: yup.string().required('Thời gian kết thúc không thể bỏ trống'),
  maxNumOfUse: yup.string().required('Thời gian kết thúc không thể bỏ trống'),
});
