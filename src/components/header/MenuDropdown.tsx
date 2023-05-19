import { forwardRef, useRef } from 'react';
import { Divider, Menu } from 'antd';
import styled from 'styled-components';

import { enumHeaderMenuItemKey, enumThemeMode, MAIN_THEME_DATA } from '@configs';
import { selectAuth, useAppSelector } from '@redux';
import { useNavigate } from 'react-router-dom';

import { LogApp, useOnClickOutside } from '@utils';

interface IMenuDropdownProps {
  handleLogout?: () => void;
  handleCloseDropdown: () => void;
  onSelectMenuItem?: (value: any) => void;
}

export const MenuDropdown = forwardRef(
  (props: IMenuDropdownProps, ref?: React.Ref<HTMLDivElement>) => {
    const { accountInfo } = useAppSelector(selectAuth);

    const { handleLogout, handleCloseDropdown, onSelectMenuItem } = props;

    const navigate = useNavigate();
    const menuDropdown = useRef<HTMLDivElement>(null);

    useOnClickOutside(
      menuDropdown,
      () => {
        handleCloseDropdown();
      },
      'ignoreOutSide-MenuDropdown'
    );

    return (
      <StyledMenuDropdown className="dropdown-menu" $appTheme={MAIN_THEME_DATA.mainColor}>
        <div ref={menuDropdown}>
          <Menu
            onClick={onSelectMenuItem}
            items={[
              {
                key: enumHeaderMenuItemKey.GENERAL,
                label: <span>Thông tin doanh nghiệp</span>,
                // icon: <CompanyIcon size={15} />,
              },
              {
                key: enumHeaderMenuItemKey.BRANCH,
                label: <span>Cập nhật tài khoản</span>,
                // icon: <AccountIcon size={15} />,
                disabled: false,
              },
              {
                key: enumHeaderMenuItemKey.POLICY,
                label: <span>Chính sách</span>,
                // icon: <PolicyIcon size={15} />,
              },
              {
                key: enumHeaderMenuItemKey.LOG_OUT,
                label: <span>Đăng xuất</span>,
                // icon: <LogoutIcon size={15} />,
                // disabled: true,
              },
            ]}
          />
        </div>
      </StyledMenuDropdown>
    );
  }
);

export const StyledMenuDropdown = styled((props) => <div {...props} />)<{
  size?: string;
  $appTheme?: string;
}>`
  width: 100%;
  height: 100%;
  background: ${(p: any) =>
    p.theme_mode === enumThemeMode.DARK ? p.$appTheme : p?.theme.colors?.header?.background};
  color: ${(p: any) => p?.theme.colors?.header?.text};
  padding: 0.8rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 1rem;
  &::after {
    // layout
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    right: 0.9rem; 
    top: 0.3rem;
    border: 0.75rem solid transparent;
    border-top: none;
    border-bottom-color: #ffffff;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
  .heading {
    padding: 0.8rem;
    .name {
      font-weight: 500;
      font-size: 1.4rem;
    }
    .email,
    .brand {
      font-weight: 400;
      font-size: 1.2rem;
    }
  }
  .ant-dropdown-menu {
    /* background: ${(p: any) =>
      p.theme_mode === enumThemeMode.DARK ? p?.theme.colors?.header?.background : p.$appTheme}; */
    background: transparent;
    box-shadow: none;
  }
  .ant-dropdown-menu-item,
  .ant-dropdown-menu-submenu-title {
    color: ${(p: any) => p?.theme.colors?.header?.text};
  }

  .ant-dropdown-menu-item-disabled:hover,
  .ant-dropdown-menu-item:hover,
  .ant-dropdown-menu-submenu-title-disabled:hover {
    background-color: rgb(255 255 255 / 0.05);
    border-radius: 0.6rem;
  }

  .menu-dropdown_divider {
    margin: 1rem 0;
    border-top: 1px solid ${(p: any) => p?.theme.colors?.header?.text};
    opacity: 0.3;
  }

  .logout {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-radius: 0.6rem;
    span {
      margin-left: 0.8rem;
      font-size: 1.4rem;
      font-weight: 400;
    }
    &:hover {
      cursor: pointer;
      background-color: rgb(255 255 255 / 0.05);
    }
  }
`;
