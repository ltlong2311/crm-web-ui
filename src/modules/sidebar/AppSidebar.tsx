import { memo, useEffect, useState } from 'react';
import { MenuProps, Tooltip } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { NavMenuIcon, Sidebar } from '@components';
import {
  selectApp,
  selectAuth,
  selectLayout,
  setCurrentPage,
  setNavCurrentIsOpenKey,
  setNavCurrentKey,
  setSidebarCollapsed,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import {
  enumMainNavKey,
  enumNavKey,
  INITIAL_PAGE,
  MAT_SM_SCREEN_WIDTH,
  PATH_ADS,
  PATH_BANNER,
  PATH_BRANCH,
  PATH_CAMPAIGN_LIST,
  PATH_CATEGORY,
  PATH_CATEGORY_LIST,
  PATH_OTHER_PRODUCT,
  PATH_CHANCE,
  PATH_CUSTOMER,
  PATH_CUSTOMER_TIERS,
  PATH_DASHBOARD,
  PATH_EARN_POINTS_RULE_LIST,
  PATH_EMAIL_MARKETING,
  PATH_INVOICE,
  PATH_MARKETING,
  PATH_ORDER,
  PATH_PRODUCT,
  PATH_PROMOTION_POLICY,
  PATH_SETTING,
  PATH_SMS_MARKETING,
  PATH_STORES,
  PATH_VOUCHER,
  SIDEBAR_DATA,
  STAFF_SIDEBAR_DATA,
  PATH_STAFF,
  enumRole,
} from '@configs';
import { LogApp, useForceUpdate, useMediaQuery } from '@utils';
import { Link } from 'react-router-dom';

export const SidebarModule = memo(() => {
  const { themeMode } = useAppSelector(selectApp);
  const { sidebarCollapsed, navCurrentKey } = useAppSelector(selectLayout);
  const { accountInfo } = useAppSelector(selectAuth);
  const userRole = accountInfo?.role;

  const sidebarData = (userRole === enumRole.ADMIN || userRole === enumRole.S_MANAGER) ? SIDEBAR_DATA : STAFF_SIDEBAR_DATA;
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const forceUpdate = useForceUpdate();

  const isSMScreen = useMediaQuery(`(max-width:${MAT_SM_SCREEN_WIDTH})`);

  const [openKeys, setOpenKeys] = useState<Array<string>>([]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((item) => openKeys.indexOf(item) === -1);
    // if (rootSubmenuKeys?.indexOf(latestOpenKey!) === -1) {
    // setOpenKeys(keys);
    // } else {
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    // }
  };

  const handleChangeCollapsed = (value: boolean) => {
    dispatch(setSidebarCollapsed(value));
  };

  const navbarItems: MenuProps['items'] = sidebarData.map((item, _) => {
    return {
      key: item.pathKey,
      icon: (
        <Tooltip placement="right" title={item?.label}>
          <NavMenuIcon pathKey={item.pathKey} path={item.path} className="menu__icon" />
        </Tooltip>
      ),
      label: (
        <Link to={item?.path} className="app-menu-title">
          {item?.label}
        </Link>
      ),
      children: item?.subItems?.length
        ? item?.subItems?.map((subItem, _) => {
            return {
              key: subItem?.pathKey,
              label: (
                <Link
                  to={subItem?.path}
                  className="app-submenu-title"
                >
                  {subItem?.label}
                </Link>
              ),
              icon: (
                <Tooltip placement="right" title={subItem?.label}>
                  <NavMenuIcon pathKey={subItem?.pathKey} path={subItem.path} className="sub-menu__icon" size={20} isSubMenu />
                </Tooltip>
              ),
              children: subItem?.subOptions?.length
                ? item?.subItems?.map((option, _) => {
                    return {
                      key: option?.pathKey,
                      label: (
                        <Link to={option?.path} target="_blank" className="app-tSubmenu-title">
                          {option?.label}
                        </Link>
                      ),
                      icon: (
                        <Tooltip title={option?.label}>
                          <NavMenuIcon
                            pathKey={option?.pathKey}
                            path={option?.path}
                            className="sub-option__icon"
                            size={20}
                            isSubMenu
                          />
                        </Tooltip>
                      ),
                    };
                  })
                : undefined,
            };
          })
        : undefined,
    };
  });

  const handleSelectMenuItem: MenuProps['onClick'] = (e) => {
    LogApp('selectNav', e);
    const currentKey = Number(e.key);
    switch (currentKey) {
      case enumNavKey.DASHBOARD:
        dispatch(setNavCurrentIsOpenKey(enumMainNavKey.DASHBOARD));
        break;
      case enumNavKey.CATEGORY_LIST:
        dispatch(setNavCurrentIsOpenKey(enumMainNavKey.CATEGORY));
        dispatch(setCurrentPage(INITIAL_PAGE));
        break;
      case enumNavKey.PRODUCT:
        dispatch(setNavCurrentIsOpenKey(enumMainNavKey.CATEGORY));
        dispatch(setCurrentPage(INITIAL_PAGE));
        break;
      case enumNavKey.STAFF:
        dispatch(setNavCurrentIsOpenKey(enumMainNavKey.STAFF));
        break;
      case enumNavKey.CUSTOMERS:
        dispatch(setNavCurrentIsOpenKey(enumMainNavKey.CUSTOMERS));
        dispatch(setCurrentPage(INITIAL_PAGE));
        break;
      case enumNavKey.SETTINGS:
        navigate(PATH_SETTING);
        break;
      default:
        return;
    }
    // dispatch(setNavCurrentKey(currentKey));
  };

  useEffect(() => {
    switch (true) {
      case pathname?.includes(PATH_DASHBOARD):
        dispatch(setNavCurrentKey(enumNavKey.DASHBOARD));
        break;
      case pathname?.includes(PATH_CUSTOMER):
        dispatch(setNavCurrentKey(enumNavKey.CUSTOMERS));
        break;
      case pathname?.includes(PATH_CATEGORY_LIST):
        dispatch(setNavCurrentKey(enumNavKey.CATEGORY_LIST));
        break;
      case pathname?.includes(PATH_PRODUCT):
        dispatch(setNavCurrentKey(enumNavKey.PRODUCT));
        break;
      case pathname?.includes(PATH_OTHER_PRODUCT):
        dispatch(setNavCurrentKey(enumNavKey.CATEGORY_OTHER));
        break;
      case pathname?.includes(PATH_ORDER):
        dispatch(setNavCurrentKey(enumNavKey.ORDER));
        break;
      case pathname?.includes(PATH_CHANCE):
        dispatch(setNavCurrentKey(enumNavKey.CHANCE));
        break;
      case pathname?.includes(PATH_INVOICE):
        dispatch(setNavCurrentKey(enumNavKey.INVOICE));
        break;
      case pathname?.includes(PATH_CAMPAIGN_LIST):
        dispatch(setNavCurrentKey(enumNavKey.CAMPAIGN_LIST));
        break;
      case pathname?.includes(PATH_VOUCHER):
        dispatch(setNavCurrentKey(enumNavKey.VOUCHER));
        break;
      case pathname?.includes(PATH_PROMOTION_POLICY):
        dispatch(setNavCurrentKey(enumNavKey.PROMOTION_POLICY));
        break;
      case pathname?.includes(PATH_MARKETING):
        dispatch(setNavCurrentKey(enumNavKey.MARKETING));
        break;
      case pathname?.includes(PATH_BANNER):
        dispatch(setNavCurrentKey(enumNavKey.BANNER));
        break;
      case pathname?.includes(PATH_ADS):
        dispatch(setNavCurrentKey(enumNavKey.ADS));
        break;
      case pathname?.includes(PATH_SMS_MARKETING):
        dispatch(setNavCurrentKey(enumNavKey.SMS_MARKETING));
        break;
      case pathname?.includes(PATH_EMAIL_MARKETING):
        dispatch(setNavCurrentKey(enumNavKey.EMAIL_MARKETING));
        break;
      case pathname?.includes(PATH_BRANCH):
        dispatch(setNavCurrentKey(enumNavKey.BRANCH));
        break;
      case pathname?.includes(PATH_STAFF):
        dispatch(setNavCurrentKey(enumNavKey.STAFF));
        break;
      case pathname?.includes(PATH_SETTING):
        dispatch(setNavCurrentKey(enumNavKey.SETTINGS));
        break;
      default:
        dispatch(setNavCurrentKey(undefined));
        dispatch(setNavCurrentIsOpenKey(undefined));
        return;
    }
  }, [pathname]);

  return (
    <Sidebar
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      isSMScreen={isSMScreen}
      collapsed={sidebarCollapsed}
      onChangeCollapsed={handleChangeCollapsed}
      themeMode={themeMode}
      navbarItems={navbarItems}
      onSelectMenuItem={handleSelectMenuItem}
    />
  );
});
