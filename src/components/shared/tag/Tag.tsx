import React, { ReactNode } from 'react';
import { Tag } from 'antd';
import styled, { css } from 'styled-components';

import { enumStatus } from '@configs';
import { APP_COLORS } from '@theme';

interface IProps {
  label?: string;
  backgroundColor?: string;
  prefixIcon?: ReactNode;
}

export const AppTag: React.FC<IProps> = (props) => {
  const { label, backgroundColor, prefixIcon } = props;

  return (
    <StyledTag className="app-tag" $backgroundColor={backgroundColor}>
      {prefixIcon && <div className="pre-icon">{prefixIcon}</div>}
      {label}
    </StyledTag>
  );
};

const StyledTag = styled.div<{
  $backgroundColor?: string;
  $textColor?: string;
}>`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 1.25rem;
  color: ${APP_COLORS.blue500};
  border: 1px solid ${APP_COLORS.gray300};
  font-weight: 500;
  margin: 0.25rem;
  background-color: ${APP_COLORS.primaryLight};
  clear: both;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  .pre-icon {
    margin-right: 0.5rem;
  }
  ${({ $textColor }) =>
    $textColor &&
    css`
      color: ${$textColor};
    `}
  ${({ $backgroundColor }) =>
    $backgroundColor &&
    css`
      background-color: ${$backgroundColor};
    `}
`;
