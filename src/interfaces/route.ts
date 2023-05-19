import { enumRole } from "@configs";

export interface IRoute {
  path?: string;
  page: any;
  layout?: any;
  haveSidebar?: boolean;
  breadcrumbs?: boolean;
  auth?: boolean;
  role?: enumRole;
}

export interface ILayout extends IRoute {
  children?: string | JSX.Element | JSX.Element[];
}

export interface INestedRoute extends IRoute {
  subPath?: string;
}
