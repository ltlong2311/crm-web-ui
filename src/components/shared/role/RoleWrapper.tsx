import React, { ReactFragment, useState } from 'react';
import styled from 'styled-components';

import { enumRole } from '@configs';
import { selectAuth, useAppSelector } from '@redux';

interface IProps {
  children?: React.ReactNode;
  role?: enumRole;
}

export const RoleWrapper = (props: IProps) => {
  const {
    children,
    role,
  } = props;
  const { accountInfo } = useAppSelector(selectAuth);
  const userRole = accountInfo?.role;

  if (role === enumRole.S_MANAGER) {
    if ((userRole === enumRole.B_MANAGER || userRole === enumRole.STAFF)) return <></>;
  }
  if (role === enumRole.B_MANAGER) {
    if (userRole === enumRole.STAFF) return <></>;
  }

  return (
    <>
      {children}
    </>
  );
};
