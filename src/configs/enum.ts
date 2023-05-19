export enum enumEnum {
  ENUM = 'ENUM',
}

export enum enumSizeIcon {
  DESKTOP = 58,
  TABLET = 40,
  DEFAULT = 78,
}

export enum enumBreakPoint {
  DESKTOP = 1280,
  TABLET = 1024,
  _2k = 2048,
  _3k = 38,
}

export enum enumPagination {
  _1 = 1,
  _2 = 2,
  _3 = 3,
  _4 = 4,
}

export const pagesIntroduction: enumPagination[] = [
  enumPagination._1,
  enumPagination._2,
  enumPagination._3,
  enumPagination._4,
];

export enum enumThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum enumOrderDate {
  Y_M_D = 'year/month/day',
  D_M_Y = 'day/month/year',
  D_Y_M = 'day/year/month',
  M_D_Y = 'month/day/year',
  M_Y_D = 'month/year/day',
  Y_D_M = 'year/day/month',
}

export enum enumBtnStyle {
  BASIC = 'basic',
  ROUNDED = 'rounded',
  ICON = 'icon',
}

export enum enumRuleType {
  standard = 'standard',
  superior = 'superior',
  birthday = 'birthday',
}

export enum enumCashbackType {
  cost = 'cashback',
  percent = 'percentage',
}

export enum enumNavKey {
  DASHBOARD = 1,
  CUSTOMERS,
  CUSTOMER_TIERS,
  CASHBACK_RULES,
  CATEGORY,
  CATEGORY_LIST,
  PRODUCT,
  CATEGORY_OTHER,
  ORDER,
  CAMPAIGN,
  CAMPAIGN_LIST,
  VOUCHER,
  PROMOTION_POLICY,
  CHANCE,
  INVOICE,
  BUSINESS,
  MARKETING,
  BANNER,
  ADS,
  SMS_MARKETING,
  EMAIL_MARKETING,
  STAFF,
  BRANCH,
  GROUP,
  SETTINGS,
  STORES,
}

export enum enumMainNavKey {
  DASHBOARD = enumNavKey.DASHBOARD,
  CUSTOMERS = enumNavKey.CUSTOMERS,
  CATEGORY = enumNavKey.CATEGORY,
  ORDER = enumNavKey.ORDER,
  CHANCE = enumNavKey.CHANCE,
  INVOICE = enumNavKey.INVOICE,
  STAFF = enumNavKey.STAFF,
  CAMPAIGN = enumNavKey.CAMPAIGN,
  MARKETING = enumNavKey.MARKETING,
  BRANCH = enumNavKey.BRANCH,
  SETTINGS = enumNavKey.SETTINGS,
  STORES = enumNavKey.STORES,
}

export enum enumStatus {
  ACTIVE = 1,
  INACTIVE,
  NONE,
}

export enum enumMemberType {
  ACTIVE = 'active',
  NEW_CUSTOMER = 'new',
}

export enum enumHeaderMenuItemKey {
  GENERAL = 1,
  PROFILE,
  POLICY,
  BRANCH,
  LOG_OUT,
}

export enum enumSettingMenuItemKey {
  COMPANY_INFO,
  CUSTOMER_HIERARCHY,
  CUSTOMER_CLASS,
  CUSTOMER_POINTS,
  ACCOUNT_MANAGEMENT,
  DEPARTMENT_MANAGEMENT,
  ACCESS_LOG,
  SALES_PROCESS,
  SYSTEM_THEMES,
}

export enum enumUploadType {
  BUTTON = 1,
  IMAGE,
}

export enum enumGender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum enumPageSize {
  LIMIT_10 = 10,
  LIMIT_20 = 20,
  LIMIT_50 = 50,
}

export enum enumBirthday {
  BIRTHDAY = 'birthday',
}

export enum enumSimulatorBy {
  BY_TOTAL_AMOUNT = 1,
  BY_PRODUCT,
}

export enum enumDashboardFilterTime {
  ALL_DAYS = 'all-days',
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  LAST_7_DAYS = 7,
  LAST_14_DAYS = 14,
  LAST_21_DAYS = 21,
  LAST_28_DAYS = 28,
  LAST_60_DAYS = 60,
  CUSTOM = 'custom',
}

export enum enumOverviewCard {
  CUSTOMERS = 1,
  PROFIT,
  CAMPAIGNS,
  PRODUCT_SOLD,
}

export enum enumRole {
  STAFF = 'STAFF',
  S_MANAGER = 'S_MANAGER',
  B_MANAGER = 'B_MANAGER',
  ADMIN = 'ADMIN',
}

export enum enumRoleLabel {
  STAFF = 'Nhân viên',
  S_MANAGER = 'Quản trị hệ thống',
  B_MANAGER = 'Quản lý',
  ADMIN = 'Owner',
}
export enum enumOrderStatus {
  IS_NOT_ACCEPTED = 'IS_NOT_ACCEPTED',
  IS_NOT_DELIVERED = 'IS_NOT_DELIVERED',
  IS_DELIVERING = 'IS_DELIVERING',
  IS_DELIVERED = 'IS_DELIVERED', // đã giao, chưa thanh toán
  IS_CANCELED = 'IS_CANCELED', // huỷ khi chưa nhận chưa thanh toán
  IS_PAID = 'IS_PAID', // đã thanh toán
  IS_REFUND = 'IS_REFUND', // huỷ khi đã thanh toán
}

export enum enumChanceStatus {
  IN_PROGRESS = 'not-accepted',
  COMPLETED = 'not-delivered',
  FAILED = 'delivering',
}

export enum enumCampaignStatus {
  DRAFT = 'DRAFT',
  NOT_ACTIVE = 'not-active', //tạm dừng hoặc sắp diễn ra
  ACTIVE = 'active',
  END = 'end',
  CANCELED = 'canceled',
  OVERDUE = 'overdue',
}

export enum enumVoucherStatus {
  BLOCK = 'block',
  ACTIVE = 'active',
}

// * Filter ago: 7 ngay qua/ 4 tuan qua/ 6 thang qua
export enum enumDashboardFilter {
  DAY = 1,
  WEEK,
  MOTH,
}

// * Filter last: tuan truoc/ thang truoc/ 5 truoc
export enum enumDashboardLastFilter {
  WEEK = 1,
  MOTH,
  YEAR,
}
