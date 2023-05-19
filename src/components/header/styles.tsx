import styled from 'styled-components';
import { Layout } from 'antd';

import {
  enumThemeMode,
  HEADER_HEIGHT,
  MAT_SM_SCREEN_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
} from '@configs';

const { Header } = Layout;

export const StyledHeader = styled((props) => <Header {...props} />)<{
  app_theme?: string;
  theme_mode?: enumThemeMode;
  $collapsed?: boolean;
}>`
  transition: 0.2s;
  top: 0;
  left: ${(p) => (p.$collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)};
  height: ${HEADER_HEIGHT};
  position: fixed;
  padding: 0;
  width: 100%;
  z-index: 100;
  align-items: center;
  background: ${(p: any) => p?.theme.colors?.header?.background};
  @media (max-width: ${MAT_SM_SCREEN_WIDTH}) {
    left: ${SIDEBAR_COLLAPSED_WIDTH};
  }
  @media (min-width: 768px) {
    display: block;
  }

  .header-container {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
  }

  .header-logo {
    position: relative;
    width: ${(p) => (p.$collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)};
    max-width: ${(p) => (p.$collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)};
    min-width: ${(p) => (p.$collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)};
    @media (max-width: ${MAT_SM_SCREEN_WIDTH}) {
      width: ${SIDEBAR_COLLAPSED_WIDTH};
      max-width: ${SIDEBAR_COLLAPSED_WIDTH};
      min-width: ${SIDEBAR_COLLAPSED_WIDTH};
    }
    height: 100%;
    background: ${(p: any) =>
      p.theme_mode === enumThemeMode.DARK ? p?.theme.colors?.header?.background : p.app_theme};
    /* width: ${SIDEBAR_WIDTH}; */
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: ${(p) => (p.$collapsed ? 'center' : 'flex-start')};
    box-shadow: 0 0 11px rgb(0 0 0 / 13%);
    @media (max-width: ${MAT_SM_SCREEN_WIDTH}) {
      justify-content: center;
    }
    .head {
      display: flex;
      align-items: center;
      .title {
        font-size: 1.9rem;
        font-weight: 2rem;
        color: ${(p: any) => p?.theme.colors?.header?.text};
      }
    }
  }
  .header-divider {
    position: relative;
    height: calc(${HEADER_HEIGHT} - 1rem * 2);
    margin: 0;
    border-left: 1px solid rgb(255 255 255 / 0.3);
  }
  .header-right {
    position: relative;
    padding: 2rem 0;
    height: 100%;
    width: calc(100vw - ${(p) => (p.$collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)});
    @media (max-width: ${MAT_SM_SCREEN_WIDTH}) {
      width: calc(100vw - ${SIDEBAR_COLLAPSED_WIDTH});
    }

    background: ${(p: any) => p?.theme.colors?.header?.background};
    box-shadow: 0 0 11px rgb(0 0 0 / 13%);
    .header-content {
      width: 100%;
      height: 100%;
      padding: 0 2.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .app-breadcrumb-item:not(:last-child) .app-breadcrumb-link a {
        color: ${(p) => p?.theme.colors?.header?.text};
      }
      .app-breadcrumb-separator {
        color: ${(p) => p?.theme.colors?.header?.subText};
      }
      .app-breadcrumb-item:last-child .app-breadcrumb-link a {
        color: ${(p) => p?.theme.colors?.header?.subText};
      }
    }
    .right-content {
      .user-avatar {
        display: flex;
        align-items: center;
        .user-name {
          font-size: 1.3rem;
          font-weight: 400;
          margin: 0 1rem 0;
          line-height: 12px;
        }
      }
    }
  }
`;
