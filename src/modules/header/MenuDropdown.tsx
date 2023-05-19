import { useNavigate } from 'react-router-dom';
import { MenuProps } from 'antd';
import { useRef } from 'react';

import { MenuDropdown } from '@components';
import {
  logout,
  setNavCurrentIsOpenKey,
  setNavCurrentKey,
  setShowHeaderMenu,
  useAppDispatch,
} from '@redux';
import {
  enumNavKey,
  enumHeaderMenuItemKey,
  PATH_BRANCH,
  PATH_GENERAL,
  PATH_POLICY,
  PATH_USER_PROFILE,
  RESET,
  PATH_COMPANY_INFO_SETTING,
} from '@configs';
import { LogApp, useOnClickOutside } from '@utils';

interface IProps {
  any?: any;
}

export const MenuDropdownModule = (props: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseDropdown = () => {
    dispatch(setShowHeaderMenu(false));
    LogApp('ddddd');
  };

  const menuDropdown = useRef<HTMLDivElement>(null);

  const handleSelectMenuItem: MenuProps['onClick'] = (e) => {
    LogApp('selectNav', e);
    const currentKey = Number(e.key);
    switch (currentKey) {
      case enumHeaderMenuItemKey.GENERAL:
        navigate(PATH_COMPANY_INFO_SETTING);
        break;
      case enumHeaderMenuItemKey.PROFILE:
        navigate(PATH_USER_PROFILE);
        break;
      case enumHeaderMenuItemKey.POLICY:
        navigate(PATH_POLICY);
        break;
      case enumHeaderMenuItemKey.LOG_OUT:
        handleLogout();
        break;
      default:
        return;
    }
    dispatch(setNavCurrentKey(undefined));
    dispatch(setNavCurrentIsOpenKey(undefined));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch({ type: RESET });
  };

  return (
    <MenuDropdown
      ref={menuDropdown}
      handleCloseDropdown={handleCloseDropdown}
      handleLogout={handleLogout}
      onSelectMenuItem={handleSelectMenuItem}
    />
  );
};
