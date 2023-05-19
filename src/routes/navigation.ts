export const PATH_HOME = '/';
export const PATH_DASHBOARD = '/dashboard';
export const PATH_CUSTOMER = '/customers';
export const PATH_ORDER = '/order';
export const PATH_CHANCE = '/chance';
export const PATH_INVOICE = '/invoice';
export const PATH_MARKETING = '/marketing';
export const PATH_CATEGORY = '/category';
export const PATH_CAMPAIGN = '/campaigns';
export const PATH_VOUCHER = '/vouchers';
export const PATH_POLICY = '/policy';
export const PATH_BRANCH = '/branch';
export const PATH_SETTING = '/settings';
export const PATH_STAFF = '/staff';
//
export const PATH_SUB_SETTING = 'settings/*';
//auth
export const PATH_SIGN_UP = '/register';
export const PATH_LOGIN = '/login';
export const PATH_FORGOT_PASSWORD = '/forgot-password';
export const PATH_VERIFY_EMAIL = '/verify-email';
export const PATH_RESET_PASSWORD = '/reset-password';
//customer
export const PATH_CUSTOMER_PROFILE = PATH_CUSTOMER + '/details/:id';
export const PATH_CREATE_CUSTOMER = PATH_CUSTOMER + '/create';
export const PATH_EDIT_CUSTOMER_PROFILE = PATH_CUSTOMER + '/update/:id';
//category
export const PATH_CATEGORY_LIST = PATH_CATEGORY + '/list';
export const PATH_PRODUCT = PATH_CATEGORY + '/products';
export const PATH_OTHER_PRODUCT = PATH_CATEGORY + '/other';
//chance
export const PATH_CREATE_CHANCE = PATH_CHANCE + '/create';
export const PATH_CHANCE_DETAIL = PATH_CHANCE + '/details/:id';
//order
export const PATH_ORDER_LIST = PATH_ORDER + '/list';
export const PATH_CREATE_ORDER = PATH_ORDER + '/create';
export const PATH_ORDER_DETAIL = PATH_ORDER + '/details/:id';
//invoice
export const PATH_CREATE_INVOICE = PATH_INVOICE + '/create';
export const PATH_INVOICE_DETAIL = PATH_INVOICE + '/details/:id';
//campaign
export const PATH_CAMPAIGN_LIST = PATH_CAMPAIGN + '/list';
export const PATH_CREATE_CAMPAIGN = PATH_CAMPAIGN + '/create';
export const PATH_CAMPAIGN_DETAILS = PATH_CAMPAIGN + '/details/:id';
export const PATH_CAMPAIGN_SALE = PATH_CAMPAIGN + '/sales';
export const PATH_VOUCHER_LIST = PATH_CAMPAIGN + PATH_VOUCHER + '/list';
export const PATH_CREATE_VOUCHER = PATH_CAMPAIGN + PATH_VOUCHER + '/create';
export const PATH_VOUCHER_DETAILS = PATH_CAMPAIGN + PATH_VOUCHER + '/details/:id';
export const PATH_PROMOTION_POLICY = PATH_CAMPAIGN + '/promotion-policy';
//marketing
export const PATH_ADS = PATH_MARKETING + '/ads';
export const PATH_EMAIL_MARKETING = PATH_MARKETING + '/email';
export const PATH_SMS_MARKETING = PATH_MARKETING + '/email';
export const PATH_BANNER = PATH_MARKETING + '/banner';
export const PATH_CREATE_BANNER = PATH_BANNER + '/create';
export const PATH_EDIT_BANNER = PATH_BANNER + '/update/:id';
//
export const PATH_CUSTOMER_TIERS = PATH_CUSTOMER + '/tiers';
export const PATH_POINTS = PATH_CUSTOMER + '/points';
export const PATH_EARN_POINTS_RULE = PATH_POINTS + '/earn-rules';
export const PATH_EARN_POINTS_RULE_LIST = PATH_EARN_POINTS_RULE + '/list';
export const PATH_CREATE_EARN_POINTS_RULE = PATH_EARN_POINTS_RULE + '/create';
export const PATH_EDIT_EARN_POINTS_RULE = PATH_EARN_POINTS_RULE + '/update/:id';
export const PATH_CREATE_CUSTOMER_TIERS = PATH_CUSTOMER_TIERS + '/create';
export const PATH_EDIT_CUSTOMER_TIERS = PATH_CUSTOMER_TIERS + '/update/:id';
//Branch
export const PATH_STORES = PATH_BRANCH + '/stores';
export const PATH_EDIT_STORE = PATH_STORES + '/update/:id';
//
export const PATH_PAY = '/pay';
//company settings
export const PATH_GENERAL = '/my-company';
export const PATH_USER_PROFILE = '/profile';
//setting
export const PATH_TIER = 'customer/tier';
export const PATH_CUSTOMER_CLASS = 'customer/class';
export const PATH_CUSTOMER_POINT = 'customer/point';
export const PATH_COMPANY_INFO = 'company-info';
export const PATH_ACCOUNT_MANAGEMENT = 'account';
export const PATH_DEPARTMENT_MANAGEMENT = 'department';
export const PATH_SALE_PROCESS = 'sales-process';
export const PATH_SYSTEM_THEME = 'system-theme';

export const PATH_COMPANY_INFO_SETTING = PATH_SETTING + '/company-info';
export const PATH_TIER_SETTING = PATH_SETTING + '/customer/tier';
export const PATH_CUSTOMER_CLASS_SETTING = PATH_SETTING + '/customer/class';
export const PATH_CUSTOMER_POINT_SETTING = PATH_SETTING + '/customer/point';
export const PATH_ACCOUNT_MANAGEMENT_SETTING = PATH_SETTING + '/account';
export const PATH_DEPARTMENT_MANAGEMENT_SETTING = PATH_SETTING + '/department';
export const PATH_SALE_PROCESS_SETTING = PATH_SETTING + '/sales-process';
export const PATH_SYSTEM_THEME_SETTING = PATH_SETTING + '/system-theme';
//error
export const PATH_404 = '/*';
