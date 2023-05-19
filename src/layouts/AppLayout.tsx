import { Layout } from 'antd';
import styled, { css } from 'styled-components';

import { ILayout } from '@interfaces';
import { HeaderNodule, InnerAppModule, SidebarModule } from '@modules';
import {
  HEADER_HEIGHT,
  HEADER_PADDING_TOP,
  MAT_SM_SCREEN_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
} from '@configs';
import { selectAuth, selectLayout, useAppSelector } from '@redux';
import { LogApp } from '@utils';

export const AppLayout = (props: ILayout) => {
  const { children } = props;
  const { sidebarCollapsed } = useAppSelector(selectLayout);
  const { accountInfo } = useAppSelector(selectAuth);

  return (
    <StyledAppLayout className="main-layout">
      <HeaderNodule />
      <Layout className="content-layout">
        <SidebarModule />
        <StyledPageInner sidebarCollapsed={sidebarCollapsed}>
          <InnerAppModule {...props}>{children}</InnerAppModule>
        </StyledPageInner>
      </Layout>
    </StyledAppLayout>
  );
};

const StyledAppLayout = styled((props) => <Layout {...props} />)`
  min-height: 100vh;
`;

const StyledPageInner = styled.div<{
  sidebarCollapsed?: boolean;
  backgroundColor?: string;
  backgroundColor2?: string;
}>`
  background-color: ${(p: any) => p?.theme.colors?.bgPage};
  height: auto;
  transition: all 0.3s;
  margin-left: ${(p) => (p.sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)};
  padding: calc(${HEADER_HEIGHT} + 3rem) 2.2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  ${({ sidebarCollapsed }) =>
    sidebarCollapsed
      ? css`
          max-width: calc(100vw - ${SIDEBAR_COLLAPSED_WIDTH});
        `
      : css`
          max-width: calc(100vw - ${SIDEBAR_WIDTH});
        `}
  @media (max-width: ${MAT_SM_SCREEN_WIDTH}) {
    margin-left: ${SIDEBAR_COLLAPSED_WIDTH};
    max-width: calc(100vw - ${SIDEBAR_COLLAPSED_WIDTH});
  }
`;
