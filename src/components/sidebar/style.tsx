import styled, { css } from 'styled-components';
import { Layout } from 'antd';

import {
  enumThemeMode,
  HEADER_HEIGHT,
  HEADER_PADDING_TOP,
  MAIN_THEME_DATA,
  MAT_SM_SCREEN_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_ICON_SIZE,
  SIDEBAR_WIDTH,
} from '@configs';
import { opacityHex } from '@theme';

const { Sider } = Layout;

export const StyledSidebar = styled((props) => <Sider {...props} />)<{
  $appTheme?: string;
  $themeMode?: enumThemeMode;
  $collapsed?: boolean;
  $isSMScreen?: boolean;
}>`
  position: fixed;
  left: 0;
  /* top: ${HEADER_HEIGHT}; */
  top: 0;
  /* height: calc(100vh - ${HEADER_HEIGHT}); */
  height: 100vh;
  z-index: 9;
  background: ${MAIN_THEME_DATA.mainColor};
  /* padding: calc(${HEADER_HEIGHT} + ${HEADER_PADDING_TOP} + 0.1rem) 2rem; */
  transition: 0.2s;
  svg.menu__icon {
    opacity: 0.75;
  }
  .sb-head {
    position: relative;
    width: 100%;
    height: ${HEADER_HEIGHT};
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
  .menu-content {
    height: calc(100vh - ${HEADER_HEIGHT});
    padding-bottom: 2rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar * {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
    &:hover {
      &::-webkit-scrollbar {
        width: 3px;
      }
      &::-webkit-scrollbar * {
        background: #a909096c;
        padding-right: 2px;
      }
      &::-webkit-scrollbar-thumb {
        background: #d0d0d0d2;
        border-radius: 3px;
      }
    }
  }

  .ant-menu-root {
    ${(p) =>
      p.$collapsed
        ? css`
            padding: 1.6rem 1.6rem 1.2rem;
            .ant-menu-title-content {
              display: none;
            }
            .ant-menu-item,
            .ant-menu-submenu-title {
              padding-left: 0 !important;
              .menu__icon,
              .sub-menu__icon {
                margin: 0 auto;
              }
            }
          `
        : css`
            padding: 1.6rem 0.5rem 1.2rem;
            .ant-menu-sub {
              .ant-menu-title-content {
                .app-submenu-title {
                  // css này sẽ đè mất lớp phủ giả của thẻ a, khiến không thể bấm vào thành phần và phải bấm vào chữ
                  /* &::before {
                    content: '>';
                    position: relative !important;
                    font-size: 1.2rem;
                    margin-right: 0.5rem;
                  } */
                }
              }
            }
            .ant-menu-item,
            .ant-menu-submenu-title {
              padding-left: 1.6rem !important;
            }
            .ant-menu-sub .ant-menu-item {
              padding-left: 1.1rem !important;
            }
            .sub-menu__icon {
              display: none;
            }
          `}
    @media (max-width: 1279px) {
      .ant-menu-title-content {
        display: none;
      }
      .ant-menu-item,
      .ant-menu-submenu-title {
        padding-left: 0 !important;
        .menu__icon,
        .sub-menu__icon {
          margin: 0 auto;
          display: block;
        }
      }
    }
    & > .ant-menu-submenu-title {
      width: 100%;
      &:hover {
        background-color: ${'#f1f5f9' + opacityHex[5]};
        box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      }
    }
    .ant-menu-item-selected {
      border-radius: 0.4rem;
      background-color: ${'#f1f5f9' + opacityHex[35]};
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    }
    & > .ant-menu-item-selected {
      border-radius: 0.4rem;
      background-color: ${'#f1f5f9' + opacityHex[35]}!important;
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      & > .ant-menu-title-content {
      }
    }
    .ant-menu-submenu > .ant-menu-item-selected {
      border-radius: 0.4rem;
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      .ant-menu-title-content {
        .app-submenu-title {
          color: ${(p) => p.theme?.colors?.sidebar?.active};
        }
      }
      .ant-menu-title-content {
        border-radius: 0.4rem;
        .app-submenu-title {
          color: ${(p) => p.theme?.colors?.sidebar?.text + opacityHex[85]};
        }
      }
    }
    .ant-menu-submenu-active > .ant-menu-submenu-title {
      border-radius: 0.4rem;
      background-color: ${'#f1f5f9' + opacityHex[5]};
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      .ant-menu-title-content {
        border-radius: 0.4rem;
        .app-submenu-title {
          color: ${(p) => p.theme?.colors?.sidebar?.text};
        }
      }
    }
    & > .ant-menu-item-active {
      background-color: ${'#f1f5f9' + opacityHex[5]};
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      border-radius: 0.4rem;
    }
    .ant-menu-item {
      width: 100%;
    }
  }

  .ant-menu-submenu-selected {
    & > .ant-menu-submenu-title {
      width: 100%;
      background-color: ${'#f1f5f9' + opacityHex[35]}!important;
      color: ${(p) => p.theme?.colors?.sidebar?.active}!important;
      /* background-color: #e6f7ff; */
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      border-radius: 0.4rem;
      &:hover {
        background-color: ${'#f1f5f9' + opacityHex[5]};
        box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
      }
    }
    & > .ant-menu-sub {
      /* border-radius: 0 0 0.4rem 0.4rem; */
      border-radius: 0;
      margin-bottom: 0.2rem;
    }
  }

  .ant-menu-submenu-open {
    & > .ant-menu-submenu-title {
      border-radius: 0.4rem 0.4rem 0 0;
    }
  }

  .ant-menu-item:hover
  /* .ant-menu-light .ant-menu-submenu-title:focus,
  .ant-menu-inline .ant-menu-item:focus  */ {
    .ant-menu-title-content {
      .app-menu-title {
        color: ${(p) => p.theme?.colors?.sidebar?.active};
      }
    }
  }

  .ant-menu-item,
  .ant-menu-inline.ant-menu-root .ant-menu-submenu-title {
    padding: 2.8rem 0;
  }

  .ant-menu-submenu-title {
    /* ${(p) =>
      p.$collapsed &&
      css` */
        border-radius: 0.4rem;
        margin-top: 0.6rem;
      /* `}  */
  }

  .ant-layout-sider-children,
  .ant-menu {
    background: ${MAIN_THEME_DATA.mainColor};
  }
  .ant-menu-item,
  /* .ant-menu-inline .ant-menu-submenu, */
  .ant-menu-inline .ant-menu-submenu-title,
  .ant-menu-inline .ant-menu-item {
    .ant-menu-title-content {
      .app-menu-title {
        font-size: 1.3rem;
        color: ${(p) => p.theme?.colors?.sidebar?.text};
        font-weight: 400;
      }
      .app-submenu-title {
        color: ${(p) => p.theme?.colors?.sidebar?.text};
        font-size: 1.32rem;
      }
    }
    &:not(:last-child) {
      /* margin-bottom: 0.6rem; */
    }
  }

  .ant-menu-inline .ant-menu-submenu-title {
    /* margin-bottom: 0.6rem; */
  }

  .ant-menu-light .ant-menu-submenu-title:hover,


  /* .ant-menu-submenu-open .ant-menu-submenu-title {
       background-color: ${'#f1f5f9' + opacityHex[5]};
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  } */

  .ant-menu-inline .ant-menu-item:after {
    border: none;
  }

  .ant-menu.ant-menu-inline-collapsed > .ant-menu-item,
  .ant-menu.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0 calc(50% - ${SIDEBAR_ICON_SIZE} / 2);
  }

  .ant-layout-sider-trigger {
    /* display: none; */
    left: 0;
    background: ${(p: any) =>
      p.$themeMode === enumThemeMode.DARK
        ? p?.theme.colors?.sidebar?.background
        : p.$appTheme.mainColor};
  }

  .ant-menu .ant-menu-item-selected {
    /* background-color: ${'#f1f5f9' + opacityHex[12]};
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px; */

    .ant-menu-item-icon {
      path {
        /* fill: ${(p) => p.theme?.colors?.active}; */
        /* stroke: ${(p) => p.theme?.colors?.active}; */
      }
    }
  }

  .ant-menu-sub {
    /* background-color: #f1f5f98d; */
    background-color: ${'#f1f5f9' + opacityHex[5]};
    padding: 0.4rem;
    /* margin-bottom: 0.4rem; */
    position: relative;
    overflow: hidden;
    /* border-left: 4px solid ${(p) => p.theme?.colors?.sidebar?.active + opacityHex[85]}; */
    /* border-left: 4px solid ${(p) => p.theme?.colors?.primary + opacityHex[85]}; */
    .ant-menu-item {
      /* padding-left: ${(p) => (p.$collapsed ? '0 !important' : '1rem !important')}; */
      padding-left: 0 !important;
      @media (max-width: ${MAT_SM_SCREEN_WIDTH}) {
        padding-left: 0 !important;
      }

      &:after {
        /* border-right: 3px solid
          ${(p: any) =>
          p.$themeMode === enumThemeMode.DARK
            ? p?.theme.colors?.sidebar?.active
            : p.$appTheme + opacityHex[65]}; */
        /* border-right: 3px solid ${(p: any) => p?.theme.colors?.sidebar?.active}; */
      }
    }

    .ant-menu-item-selected {
      border-radius: unset;
      background-color: transparent;
      box-shadow: none;
      border-left: 4px solid ${(p) => p.theme?.colors?.sidebar?.active + opacityHex[85]};
      .ant-menu-title-content {
        /* font-weight: 500 !important; */
        .app-menu-title {
          color: ${(p) => p.theme?.colors?.sidebar?.active}!important;
        }
        .app-submenu-title {
          color: ${(p) => p.theme?.colors?.sidebar?.active}!important;
        }
      }
      .ant-menu-item-icon {
        path {
          /* fill: ${(p) => p.theme?.colors?.sidebar?.active}; */
          /* stroke: ${(p) => p.theme?.colors?.sidebar?.active}; */
        }
      }
    }
  }

  .ant-menu-submenu-arrow,
  .ant-menu-submenu-expand-icon {
    color: #fff;
  }

  .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow,
  .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-expand-icon {
    color: #fff;
  }

  .ant-menu-item-active {
    .ant-menu-title-content {
      .app-menu-title {
        color: ${(p) => p.theme?.colors?.sidebar?.textActive}!important;
      }
    }
  }
  .ant-menu-sub {
    .ant-menu-item-active {
      .ant-menu-title-content {
        .app-submenu-title {
          color: ${(p) => p.theme?.colors?.sidebar?.active}!important;
          font-weight: 400 !important;
        }
      }
    }
  }

  .ant-menu-item .ant-menu-item-icon + span,
  .ant-menu-submenu-title .ant-menu-item-icon + span {
    @media (max-width: ${MAT_SM_SCREEN_WIDTH}) {
      margin-left: 2.2rem;
    }
    ${(p) =>
      p.$collapsed &&
      css`
        margin-left: 2.2rem;
      `}
  }

  .ant-menu-submenu-arrow {
    @media (max-width: calc(${MAT_SM_SCREEN_WIDTH})) {
      display: none;
    }
    ${(p) =>
      (p.$collapsed || p?.$isSMScreen) &&
      css`
        display: none;
      `}
  }

  .ant-menu-submenu-open.ant-menu-submenu-selected {
    & > .ant-menu-submenu-title {
      border-radius: 0.4rem 0.4rem 0 0 !important;
      color: ${(p) => p.theme?.colors?.sidebar?.textActive}!important;
      .ant-menu-title-content {
        .app-submenu-title {
          color: ${(p) => p.theme?.colors?.sidebar?.textActive}!important;
        }
      }
    }
  }

  .ant-menu-item-selected {
    & > .ant-menu-title-content {
      .app-menu-title {
        color: ${(p) => p.theme?.colors?.sidebar?.textActive}!important;
      }
    }
  }

  .ant-menu-item:active,
  .ant-menu-submenu-title:active {
    background: transparent;
  }
`;
