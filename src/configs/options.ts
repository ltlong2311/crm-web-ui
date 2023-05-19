import {
  enumCampaignStatus,
  enumDashboardFilter,
  enumDashboardLastFilter,
  enumGender,
  enumOrderStatus,
  enumRole,
} from './enum';

export const DASHBOARD_FILTER_OPTIONS = [
  {
    value: enumDashboardFilter.DAY,
    label: '7 ngày qua',
  },
  {
    value: enumDashboardFilter.WEEK,
    label: '4 tuần qua',
  },
  {
    value: enumDashboardFilter.MOTH,
    label: '6 tháng qua',
  },
];

export const DASHBOARD_FILTER_LAST_OPTIONS = [
  {
    value: enumDashboardLastFilter.WEEK,
    label: 'Tuần trước',
  },
  {
    value: enumDashboardLastFilter.MOTH,
    label: 'Tháng trước',
  },
  {
    value: enumDashboardLastFilter.YEAR,
    label: 'Năm trước',
  },
];

export const ROLE_OPTIONS = [
  {
    value: enumRole.S_MANAGER,
    label: 'Quản trị hệ thống',
  },
  {
    value: enumRole.B_MANAGER,
    label: 'Quản lý',
  },
  {
    value: enumRole.STAFF,
    label: 'Nhân viên',
  },
];

export const GENDER_OPTIONS = [
  {
    value: enumGender.MALE,
    label: 'Nam',
  },
  {
    value: enumGender.FEMALE,
    label: 'Nữ',
  },
  {
    value: enumGender.OTHER,
    label: 'Khác',
  },
];

export const ORDER_STATUS_OPTIONS = [
  {
    value: '',
    label: 'Tất cả',
  },
  {
    value: enumOrderStatus.IS_NOT_ACCEPTED,
    label: 'Đơn mới',
  },
  {
    value: enumOrderStatus.IS_NOT_DELIVERED,
    label: 'Chuẩn bị giao hàng',
  },
  {
    value: enumOrderStatus.IS_DELIVERING,
    label: 'Đang giao',
  },
  {
    value: enumOrderStatus.IS_DELIVERED,
    label: 'Đã giao',
  },
  {
    value: enumOrderStatus.IS_CANCELED,
    label: 'Huỷ bỏ',
  },
];

export const INVOICE_STATUS_OPTIONS = [
  {
    value: '',
    label: 'Tất cả',
  },
  {
    value: enumOrderStatus.IS_PAID,
    label: 'Đã thanh toán',
  },
  {
    value: enumOrderStatus.IS_DELIVERED,
    label: 'Chưa thanh toán',
  },
  {
    value: enumOrderStatus.IS_REFUND,
    label: 'Hoàn tiền',
  },
  {
    value: enumOrderStatus.IS_CANCELED,
    label: 'Huỷ bỏ',
  },
];

export const CAMPAIGN_STATUS_OPTIONS = [
  {
    value: '',
    label: 'Tất cả',
  },
  {
    value: enumCampaignStatus.DRAFT,
    label: 'Sắp diễn ra',
  },
  {
    value: enumCampaignStatus.NOT_ACTIVE,
    label: 'Tạm dừng/sắp diễn ra',
  },
  {
    value: enumCampaignStatus.ACTIVE,
    label: 'Đang diễn ra',
  },
  {
    value: enumCampaignStatus.END,
    label: 'Đã kết thúc',
  },
  {
    value: enumCampaignStatus.CANCELED,
    label: 'Đã hủy bỏ',
  },
];
