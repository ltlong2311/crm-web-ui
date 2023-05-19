import { FlexWrap, SharedToggle } from '@components';
import { CompanyInfoModule } from '@modules';
import React from 'react';
import styled from 'styled-components';

export const ThemeSettingPage = () => {
  return (
    <StyledPage className="company-info-page">
      <h3 className="page-title">Giao diện hệ thống</h3>
      <FlexWrap>
        <span>Chế độ nền tối</span>
        <SharedToggle />
      </FlexWrap>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
  /* .page-title {
      font-size: 1.8rem;
      font-weight: 500;
      margin-bottom: 2rem;
    } */
`;
