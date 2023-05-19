import { MenuProps } from 'antd/lib/menu';
import React from 'react';

import { SettingMenu } from '@components';

export const SettingMenuModule = () => {

  const onSelectMenuItem: MenuProps['onClick'] = (e) => {
    const currentKey = Number(e.key);
    switch (currentKey) {
      default:
        return;
    }
  };

  return <SettingMenu onSelectMenuItem={onSelectMenuItem} />;
};
