import { Menu, MenuProps } from 'antd';
import React, { forwardRef, memo, useState } from 'react';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

import {
  enumMainNavKey,
  enumNavKey,
  enumThemeMode,
  MAIN_THEME_DATA,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
} from '@configs';
import { StyledSidebar } from './style';
import { selectLayout, useAppSelector } from '@redux';
import { LogApp } from '@utils';
import { LogoEssentialsIcon, LogoTextIcon } from '../Icon';

interface IProps {
  isSMScreen?: boolean;
  themeMode?: enumThemeMode;
  collapsed?: boolean;
  navbarItems?: ItemType[];
  openKeys: Array<string>;
  onOpenChange: MenuProps['onOpenChange'];
  onChangeCollapsed?: (value: boolean) => void;
  onSelectMenuItem?: (value: any) => void;
}

export const Sidebar = memo(
  forwardRef((props: IProps, ref?: React.Ref<any>) => {
    const {
      themeMode,
      collapsed,
      navbarItems,
      isSMScreen,
      openKeys,
      onOpenChange,
      onChangeCollapsed,
      onSelectMenuItem,
    } = props;

    const { navCurrentKey, navCurrentIsOpenKey } = useAppSelector(selectLayout);

    LogApp(navCurrentKey, navCurrentIsOpenKey);
    return (
      <StyledSidebar
        width={isSMScreen || collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}
        // collapsed={collapsed}
        onCollapse={onChangeCollapsed}
        className="Sidebar"
        $themeMode={themeMode}
        $appTheme={MAIN_THEME_DATA.mainColor}
        $collapsed={collapsed}
        $isSMScreen={isSMScreen}
        // collapsible
      >
        <div className="sb-head">
          <div className="head">
            {collapsed || isSMScreen ? <LogoEssentialsIcon /> : <LogoTextIcon />}
          </div>
        </div>
        <div className='menu-content'>
          <Menu
            onClick={onSelectMenuItem}
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[`${navCurrentKey}`]}
            defaultSelectedKeys={[`${navCurrentIsOpenKey}`, `${navCurrentKey}`]}
            defaultOpenKeys={[`${navCurrentIsOpenKey}`]}
            style={{ height: '100%', borderRight: 0 }}
            items={navbarItems}
          />
        </div>
      </StyledSidebar>
    );
  })
);
