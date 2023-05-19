import {
  enumNavKey,
  enumRuleType,
  enumCashbackType,
  enumStatus,
  enumGender,
  enumPageSize,
  enumMemberType,
  enumDashboardFilterTime,
  enumRole,
} from './enum';
import {
  PATH_BANNER,
  PATH_BRANCH,
  PATH_CAMPAIGN_LIST,
  PATH_CATEGORY_LIST,
  PATH_CHANCE,
  PATH_CUSTOMER,
  PATH_DASHBOARD,
  PATH_EMAIL_MARKETING,
  PATH_INVOICE,
  PATH_ORDER,
  PATH_PRODUCT,
  PATH_SMS_MARKETING,
  PATH_STAFF,
  PATH_VOUCHER_LIST,
} from './../routes/navigation';

export const DEFAULT_LANGUAGE = process.env.REACT_APP_LANGUAGE || 'en';
const ALL_THEMES = 'themes';
const CURRENT_THEME = 'theme';

const SIDEBAR_WIDTH = '250px';
const SIDEBAR_COLLAPSED_WIDTH = '105px';
const SIDEBAR_ICON_SIZE = '24px';
const HEADER_HEIGHT = '56px';
const HEADER_PADDING_TOP = '20px';

const SIDEBAR_DATA = [
  {
    label: 'Tổng quan',
    path: PATH_DASHBOARD,
    pathKey: enumNavKey.DASHBOARD,
  },
  {
    label: 'Khách hàng',
    path: PATH_CUSTOMER,
    pathKey: enumNavKey.CUSTOMERS,
  },
  {
    label: 'Sản phẩm',
    path: PATH_CATEGORY_LIST,
    pathKey: enumNavKey.CATEGORY,
    subItems: [
      {
        label: 'Loại sản phẩm',
        path: PATH_CATEGORY_LIST,
        pathKey: enumNavKey.CATEGORY_LIST,
        subOptions: [],
      },
      {
        label: 'Sản phẩm',
        path: PATH_PRODUCT,
        pathKey: enumNavKey.PRODUCT,
        subOptions: [],
      },
      // {
      //   label: 'Khác',
      //   path: PATH_OTHER_PRODUCT,
      //   pathKey: enumNavKey.CATEGORY_OTHER,
      //   subOptions: [],
      // },
    ],
  },
  {
    label: 'Đơn hàng',
    path: PATH_ORDER,
    pathKey: enumNavKey.ORDER,
  },
  {
    label: 'Cơ hội',
    path: PATH_CHANCE,
    pathKey: enumNavKey.CHANCE,
  },
  {
    label: 'Hóa đơn',
    path: PATH_INVOICE,
    pathKey: enumNavKey.INVOICE,
  },
  {
    label: 'Chiến dịch',
    path: PATH_CAMPAIGN_LIST,
    pathKey: enumNavKey.CAMPAIGN,
    subItems: [
      {
        label: 'Danh sách chiến dịch',
        path: PATH_CAMPAIGN_LIST,
        pathKey: enumNavKey.CAMPAIGN_LIST,
        subOptions: [],
      },
      {
        label: 'Voucher - khuyến mãi',
        path: PATH_VOUCHER_LIST,
        pathKey: enumNavKey.VOUCHER,
        subOptions: [],
      },
      // {
      //   label: 'Chính sách',
      //   path: PATH_PROMOTION_POLICY,
      //   pathKey: enumNavKey.PROMOTION_POLICY,
      //   subOptions: [],
      // },
    ],
  },
  {
    label: 'Marketing',
    path: PATH_BANNER,
    pathKey: enumNavKey.MARKETING,
    subItems: [
      { label: 'Banner', path: PATH_BANNER, pathKey: enumNavKey.BANNER, subOptions: [] },
      // {
      //   label: 'Hình ảnh',
      //   path: PATH_ADS,
      //   pathKey: enumNavKey.ADS,
      //   subOptions: [],
      // },
      {
        label: 'SMS Marketing',
        path: PATH_SMS_MARKETING,
        pathKey: enumNavKey.SMS_MARKETING,
        subOptions: [],
      },
      {
        label: 'Email Marketing',
        path: PATH_EMAIL_MARKETING,
        pathKey: enumNavKey.EMAIL_MARKETING,
        subOptions: [],
      },
      // { label: 'Landing page', path: PATH_DASHBOARD, pathKey: enumNavKey.STORES, subOptions: [] },
    ],
  },
  {
    label: 'Nhân viên',
    path: PATH_STAFF,
    pathKey: enumNavKey.STAFF,
  },
  {
    label: 'Chi nhánh',
    path: PATH_BRANCH,
    pathKey: enumNavKey.BRANCH,
  },
  {
    label: 'Thiết lập',
    path: PATH_BRANCH,
    pathKey: enumNavKey.SETTINGS,
  },
];

const STAFF_SIDEBAR_DATA = [
  {
    label: 'Tổng quan',
    path: PATH_DASHBOARD,
    pathKey: enumNavKey.DASHBOARD,
  },
  {
    label: 'Khách hàng',
    path: PATH_CUSTOMER,
    pathKey: enumNavKey.CUSTOMERS,
  },
  {
    label: 'Sản phẩm',
    path: PATH_CATEGORY_LIST,
    pathKey: enumNavKey.CATEGORY,
    subItems: [
      {
        label: 'Loại sản phẩm',
        path: PATH_CATEGORY_LIST,
        pathKey: enumNavKey.CATEGORY_LIST,
        subOptions: [],
      },
      {
        label: 'Sản phẩm',
        path: PATH_PRODUCT,
        pathKey: enumNavKey.PRODUCT,
        subOptions: [],
      },
    ],
  },
  {
    label: 'Đơn hàng',
    path: PATH_ORDER,
    pathKey: enumNavKey.ORDER,
  },
  {
    label: 'Cơ hội',
    path: PATH_CHANCE,
    pathKey: enumNavKey.CHANCE,
  },
  {
    label: 'Chiến dịch',
    path: PATH_CAMPAIGN_LIST,
    pathKey: enumNavKey.CAMPAIGN,
    subItems: [
      {
        label: 'Danh sách chiến dịch',
        path: PATH_CAMPAIGN_LIST,
        pathKey: enumNavKey.CAMPAIGN_LIST,
        subOptions: [],
      },
      {
        label: 'Voucher - khuyến mãi',
        path: PATH_VOUCHER_LIST,
        pathKey: enumNavKey.VOUCHER,
        subOptions: [],
      },
    ],
  },
  {
    label: 'Marketing',
    path: PATH_BANNER,
    pathKey: enumNavKey.MARKETING,
    subItems: [
      { label: 'Banner', path: PATH_BANNER, pathKey: enumNavKey.BANNER, subOptions: [] },
      {
        label: 'SMS Marketing',
        path: PATH_SMS_MARKETING,
        pathKey: enumNavKey.SMS_MARKETING,
        subOptions: [],
      },
      {
        label: 'Email Marketing',
        path: PATH_EMAIL_MARKETING,
        pathKey: enumNavKey.EMAIL_MARKETING,
        subOptions: [],
      },
      // { label: 'Landing page', path: PATH_DASHBOARD, pathKey: enumNavKey.STORES, subOptions: [] },
    ],
  },
];

const AUTH_THEME_COLOR = '#2596be';

const MAIN_THEME_DATA = {
  // mainColor: '#404e67',
  mainColor: '#263544',
};

const MAT_SM_SCREEN_WIDTH = '1279px';
const MAT_SM_SCREEN_WIDTH_MIN = '1280px';

const RESET = 'RESET';

const CASHBACK_RULE_TYPE = [
  {
    value: enumRuleType.standard,
    label: 'Standard Cashback Rule',
  },
  {
    value: enumRuleType.superior,
    label: 'Superior Cashback Rule',
  },
];

const CASHBACK_TYPE = [
  {
    value: enumCashbackType.cost,
    label: '$',
  },
  {
    value: enumCashbackType.percent,
    label: '%',
  },
];

const STATUS_TYPE = [
  {
    value: enumStatus.ACTIVE,
    label: 'Active',
  },
  {
    value: enumStatus.INACTIVE,
    label: 'Inactive',
  },
  {
    value: enumStatus.NONE,
    label: 'All',
  },
];

const GENDER_TYPE = [
  {
    value: enumGender.MALE,
    label: 'Male',
  },
  {
    value: enumGender.FEMALE,
    label: 'Female',
  },
];
export const TOP_FILTER = [
  {
    value: 10,
    label: 'Top 10',
  },
  {
    value: 20,
    label: 'Top 20',
  },
  {
    value: 50,
    label: 'Top 50',
  },
];

const PAGE_SIZE_OPTIONS = [
  {
    value: enumPageSize.LIMIT_10,
    label: '10',
  },
  {
    value: enumPageSize.LIMIT_20,
    label: '20',
  },
  {
    value: enumPageSize.LIMIT_50,
    label: '50',
  },
];

const FILTER_CUSTOMER_TYPE = [
  {
    value: enumMemberType.ACTIVE,
    label: 'Active members',
  },
  {
    value: enumMemberType.NEW_CUSTOMER,
    label: 'New members',
  },
];

const DASHBOARD_FILTER_TIME = [
  {
    value: enumDashboardFilterTime.ALL_DAYS,
    label: 'All days',
  },
  {
    value: enumDashboardFilterTime.TODAY,
    label: 'Today',
  },
  {
    value: enumDashboardFilterTime.YESTERDAY,
    label: 'Yesterday',
  },
  {
    value: enumDashboardFilterTime.LAST_7_DAYS,
    label: 'Last 7 days',
  },
  {
    value: enumDashboardFilterTime.LAST_14_DAYS,
    label: 'Last 14 days',
  },
  {
    value: enumDashboardFilterTime.LAST_21_DAYS,
    label: 'Last 21 days',
  },
  {
    value: enumDashboardFilterTime.LAST_28_DAYS,
    label: 'Last 28 days',
  },
  {
    value: enumDashboardFilterTime.LAST_60_DAYS,
    label: 'Last 60 days',
  },
  {
    value: enumDashboardFilterTime.CUSTOM,
    label: 'Custom date',
  },
];

const OPENING_TYPE = {
  ALL: 1,
  CUSTOM: 2,
};
const DAYS = {
  MON: 'monday',
  TUE: 'tuesday',
  WED: 'wednesday',
  THU: 'thursday',
  FRI: 'friday',
  SAT: 'saturday',
  SUN: 'sunday',
};
const DEFAULT_OPENING_HOUR = {
  [DAYS.MON]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.TUE]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.WED]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.THU]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.FRI]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.SAT]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: false,
  },
  [DAYS.SUN]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: false,
  },
};
export const DEFAULT_WELCOMED_BENEFITS_VALUE = {
  CASHBACK: 'cashback',
  POINTS: 'point',
  COUPONS: 'coupon',
  FREE_ITEMS: 'item',
};
const DEFAULT_WELCOMED_BENEFITS = [
  { value: DEFAULT_WELCOMED_BENEFITS_VALUE.CASHBACK, label: 'Cashback', disabled: false },
  { value: DEFAULT_WELCOMED_BENEFITS_VALUE.POINTS, label: 'Points', disabled: false },
  { value: DEFAULT_WELCOMED_BENEFITS_VALUE.COUPONS, label: 'Coupons', disabled: false },
  { value: DEFAULT_WELCOMED_BENEFITS_VALUE.FREE_ITEMS, label: 'Free items', disabled: false },
];
export const ruleDateFormat = 'DD-MM-YYYY';
export const ruleTimeFormat = 'HH:mm:ss';
export const dateOfBirthFormat = 'DD/MM/YYYY';
export const dateTimeFormat = 'DD-MM-YYYY HH:mm:ss';
export const appDateTimeFormat = 'DD-MM-YYYY HH:mm';
export const dateFormat = 'DD/MM/YYYY';
export const dateDashFormat = 'DD-MM-YYYY';

export const RESEND_OTP_COUNTDOWN_TIME = 60; //seconds
export const CUSTOMER_LINK = 'https://ltl-member.com/';
export const INITIAL_PAGE = 1;
export const DEFAULT_ANNOUNCEMENT_TYPE = 'redirect';
export const DEFAULT_ANNOUNCEMENT_STATUS = true;
export const MAXIMUM_IMAGE_SIZE = 1000000; //bytes - 1 MB
export const MAXIMUM_LIMIT = 1000000; //bytes - 1 MB

export const PREV_DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT = 'DD-MM-YYYY';
export const WEEKDAY_DATE_FORMAT = 'dddd, MMMM D, YYYY';
export const TEXT_MONTH_DATE_FORMAT = 'MMM D, YYYY';
export const FULL_DATE_FORMAT = 'h:mm A - DD/MM/YYYY';
// export const FULL_DATE_FORMAT = 'h:mm A - ddd, DD/MM/YYYY';

export const PREV_HOUR_FORMAT = 'HH-mm-ss';
export const HOUR_FORMAT = 'hh:mm A';
export const HOUR_FORMAT_CHAT_MESSAGE = 'HH:mm';
export const MAXIMUM_ITEM_PER_PAGE_NUM = 50;
export const NONE_VALUE = 'None';
export const EMPTY_VALUE = 'Trống';
export const NOT_HAVE = 'Chưa có';
export const NONE_DATA = 'Chưa có dữ diệu';
export const NULL = 'Trống';
export const NONE_P = '---';

export const DOT = '.';
export const COMMA = ',';

export const MAP_BOX_DEV_KEY = '***';
export {
  ALL_THEMES,
  MAIN_THEME_DATA,
  CURRENT_THEME,
  HEADER_HEIGHT,
  SIDEBAR_WIDTH,
  SIDEBAR_DATA,
  STAFF_SIDEBAR_DATA,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_ICON_SIZE,
  AUTH_THEME_COLOR,
  HEADER_PADDING_TOP,
  MAT_SM_SCREEN_WIDTH,
  MAT_SM_SCREEN_WIDTH_MIN,
  RESET,
  CASHBACK_TYPE,
  CASHBACK_RULE_TYPE,
  STATUS_TYPE,
  GENDER_TYPE,
  PAGE_SIZE_OPTIONS,
  FILTER_CUSTOMER_TYPE,
  OPENING_TYPE,
  DEFAULT_OPENING_HOUR,
  DAYS,
  DEFAULT_WELCOMED_BENEFITS,
  DASHBOARD_FILTER_TIME,
};
