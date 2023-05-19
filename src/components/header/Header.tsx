import React from 'react';

import Avatar from 'antd/lib/avatar/avatar';

import { MAIN_THEME_DATA, MAT_SM_SCREEN_WIDTH, enumThemeMode } from '@configs';
import { MenuHambugerIcon, MenuUnfoldOutlined } from '../Icon';
import { MenuDropdownModule } from '@modules';
import { SharedDropdown } from '../shared';
import { StyledHeader } from './styles';
import { selectAuth, useAppSelector } from '@redux';
import { useMediaQuery } from '@utils';

interface IProps {
  openMenuDropdown?: boolean;
  themeMode?: enumThemeMode;
  collapsed: boolean;
  showMenuDropdown?: boolean;
  changeCollapsed: (value: boolean) => void;
  handleToggleDropdown: () => void;
}

export const Header: React.FC<IProps> = (props) => {
  const { themeMode, collapsed, showMenuDropdown, changeCollapsed, handleToggleDropdown } = props;
  const isSMScreen = useMediaQuery(`(max-width:${MAT_SM_SCREEN_WIDTH})`);

  const { accountInfo } = useAppSelector(selectAuth);

  return (
    <StyledHeader
      className="header"
      theme_mode={themeMode}
      app_theme={MAIN_THEME_DATA.mainColor}
      $collapsed={collapsed}
    >
      <div className="header-container">
        {/* <div className="header-logo">
          <div className="head">
            {(collapsed || isSMScreen) ? <LogoEssentialsIcon /> : <LogoTextIcon />}
          </div>
        </div> */}
        {/* <Divider className="header-divider" type="vertical" /> */}
        <div className="header-right">
          <div className="header-content">
            <div className="header-collapse-btn app-btn">
              {!isSMScreen ? (
                React.createElement(collapsed ? MenuUnfoldOutlined : MenuHambugerIcon, {
                  className: 'trigger',
                  color: MAIN_THEME_DATA.mainColor,
                  onClick: () => changeCollapsed(!collapsed),
                })
              ) : (
                <div></div>
              )}
            </div>
            <div className="right-content">
              <div
                className="app-btn settings-btn ignoreOutSide-MenuDropdown"
                onClick={handleToggleDropdown}
              >
                <SharedDropdown
                  dropdown={<MenuDropdownModule />}
                  overlayClassName="header-menu__dropdown ignoreOutSide-MenuDropdown"
                  open={showMenuDropdown}
                >
                  <div className="user-avatar">
                    <Avatar src={<img src={'https://i.imgur.com/EMUqFcE.jpg'} alt="avatar" />} />
                    <p className="user-name">
                      {accountInfo?.firstName} {accountInfo?.lastName}
                    </p>
                  </div>
                </SharedDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};
