import { MAIN_THEME_DATA, PATH_DASHBOARD } from '@configs';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import errorUrl from './../../assets/images/404.svg';
export const PageError404 = () => {
  //page hook
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Styled404 $bg={MAIN_THEME_DATA.mainColor}>
      <div className="container">
        <Result status="404" title="404 Not found!" />;
      </div>
    </Styled404>
  );
};
const Styled404 = styled.div<{ $bg: string }>`
  /* background-color: ${(p) => p.theme.colors.bgSection} ; */
  background-color: #c0e8f8;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .error-page img {
    width: 450px;
  }
  .btn {
    cursor: pointer;
    border-radius: 0.375rem;
    border-width: 1px;
  }
`;
