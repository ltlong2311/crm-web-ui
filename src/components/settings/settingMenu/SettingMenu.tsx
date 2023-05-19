import { enumSettingMenuItemKey, PATH_ACCOUNT_MANAGEMENT, PATH_COMPANY_INFO, PATH_COMPANY_INFO_SETTING, PATH_CUSTOMER_CLASS, PATH_CUSTOMER_POINT, PATH_DEPARTMENT_MANAGEMENT_SETTING, PATH_SALE_PROCESS, PATH_SYSTEM_THEME_SETTING, PATH_TIER } from '@configs';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router-dom';

interface IProps {
  onSelectMenuItem?: (value: any) => void;
}

export const SettingMenu = (props: IProps) => {
  const { onSelectMenuItem } = props;
  return (
    <Menu
      onClick={onSelectMenuItem}
      items={[
        {
          label: <span className="menu-group-label">Doanh nghiệp</span>,
          key: 'company',
          type: 'group',
          children: [
            {
              key: enumSettingMenuItemKey.COMPANY_INFO,
              label: <Link to={PATH_COMPANY_INFO}>Doanh nghiệp</Link>,
            },
          ],
        },
        {
          label: <span className="menu-group-label">Khách hàng</span>,
          key: 'customer',
          type: 'group',
          children: [
            {
              key: enumSettingMenuItemKey.CUSTOMER_HIERARCHY,
              label: <Link to={PATH_TIER}>Phân bậc khách hàng</Link>,
            },
            {
              key: enumSettingMenuItemKey.CUSTOMER_CLASS,
              label: <Link to={PATH_CUSTOMER_CLASS}>Phân loại khách hàng</Link>,
            },
            // {
            //   key: enumSettingMenuItemKey.CUSTOMER_POINTS,
            //   label: <Link to={PATH_CUSTOMER_POINT}>Quy tắc tích điểm</Link>,
            // },
          ],
        },
        {
          label: <span className="menu-group-label">Tài khoản nhân viên</span>,
          key: 'user account',
          type: 'group',
          children: [
            {
              key: enumSettingMenuItemKey.ACCOUNT_MANAGEMENT,
              label: <Link to={PATH_ACCOUNT_MANAGEMENT}>Quản lý tài khoản</Link>,
            },
            {
              key: enumSettingMenuItemKey.DEPARTMENT_MANAGEMENT,
              label: <Link to={PATH_DEPARTMENT_MANAGEMENT_SETTING}>Phòng ban</Link>,
            },
            // {
            //   key: enumSettingMenuItemKey.ACCESS_LOG,
            //   label: <Link to="access-log">Nhật ký truy cập</Link>,
            // },
          ],
        },
        {
          label: <span className="menu-group-label">Tùy chỉnh</span>,
          key: 'custom-setting',
          type: 'group',
          children: [
            // {
            //   key: enumSettingMenuItemKey.SALES_PROCESS,
            //   label: <Link to={PATH_SALE_PROCESS}>Quy trình bán hàng</Link>,
            // },
            {
              key: enumSettingMenuItemKey.SYSTEM_THEMES,
              label: <Link to={PATH_SYSTEM_THEME_SETTING}>Giao diện hệ thống</Link>,
            },
          ],
        },
      ]}
    />
  );
};
