import styled, { css } from 'styled-components';

interface IProps {
  bgUrl?: string;
  children?: React.ReactNode;
  isCssBg?: boolean;
}

export const AppBackground: React.FC<IProps> = (props) => {
  const { bgUrl, isCssBg, children } = props;
  return (
    <StyledAppBackground $bgUrl={bgUrl} $isCssBg={isCssBg}>
      {!!bgUrl && !isCssBg && <img className="background" src={bgUrl} alt="bg" />}
      <div className="content">{children}</div>
    </StyledAppBackground>
  );
};

const StyledAppBackground = styled.div<{
  $bgUrl?: string;
  $isCssBg?: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  ${({ $isCssBg, $bgUrl }) =>
    $isCssBg &&
    css`
      background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${$bgUrl});
      background-size: cover;
      background-position: top;
      position: relative;
    `}
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .content {
    width: 100%;
    height: 100%;
    /* background-color: (rgba(0, 0, 0, 0.8); */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
`;
