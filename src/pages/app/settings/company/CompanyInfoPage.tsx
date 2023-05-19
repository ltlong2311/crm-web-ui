import { CompanyInfoModule } from '@modules';
import React from 'react';
import styled from 'styled-components';

export const CompanyInfoPage = () => {
  return (
    <StyledPage className="company-info-page">
      {/* <h3 className='page-title'>Thông tin doanh nghiệp</h3> */}
      <CompanyInfoModule />
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
