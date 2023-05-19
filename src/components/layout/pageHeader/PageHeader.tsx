import styled from 'styled-components';
import { ReactNode } from 'react';

import { BreadcrumbsModule } from '@modules';
import { APP_COLORS } from '@theme';

interface IProps {
  pageIcon?: ReactNode;
  title: ReactNode | string;
  desc: ReactNode | string;
}

export const PageHeaderTitle = (props: IProps) => {
  const { pageIcon, title, desc } = props;
  return (
    <StyledPageHeader className="head-page">
      <div className="head-title">
        <div className="dashboard-icon">{pageIcon && pageIcon}</div>
        <div className="page-title">
          <h2 className="title">{title}</h2>
          <p className="desc">{desc}</p>
        </div>
      </div>
      <BreadcrumbsModule />
    </StyledPageHeader>
  );
};

const StyledPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .head-title {
    display: flex;
    align-items: cemter;
    .dashboard-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${APP_COLORS.cBlue};
      box-shadow: 0 2px 12px -3px rgb(0 0 0 / 50%);
      width: 4rem;
      height: 4rem;
      border-radius: 5px;
    }
    .page-title {
      margin-left: 2rem;
      .title {
        font-size: 1.83rem;
        font-weight: 600;
        color: ${(p) => p?.theme?.colors?.text};
        margin-bottom: 0.2rem;
      }
      .desc {
        font-size: 1.3rem;
        font-weight: 400;
        color: ${(p) => p?.theme?.colors?.subText};
        /* color: ${APP_COLORS.gray500}; */
      }
    }
  }
`;
