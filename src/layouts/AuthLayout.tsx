import { Layout } from 'antd';
import styled from 'styled-components';

import { ILayout } from '@interfaces';

export const AuthLayout = (props: ILayout) => {
  const { children } = props;

  return <StyledAuthLayout className="auth-layout">{children}</StyledAuthLayout>;
};

const StyledAuthLayout = styled((props) => <Layout {...props} />)`
  min-height: 100vh;
`;
