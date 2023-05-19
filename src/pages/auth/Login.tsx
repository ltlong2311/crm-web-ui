import styled from 'styled-components';

import { LoginModule } from '@modules';
import { IMAGES } from '@assets';
import { AUTH_THEME_COLOR, MAIN_THEME_DATA, MAT_SM_SCREEN_WIDTH } from '@configs';
import { AppBackground, AuthInfo, LogoCircleIcon } from '@components';
import { opacityHex } from '@theme';

export const LoginPage = () => {
  return (
    <StyledAuth background={IMAGES.bgLogin} className="login-page">
      <div className="container">
        <div className="block grid-cols-2 gap-4 content-block ">
          <AuthInfo
            introTitle={
              <>
                Enter info <br />
                sign in to your account.
              </>
            }
          />
          <div className="h-screen flex py-2 my-10 auth-section">
            <div className="auth-contain flex my-auto mx-auto">
              <div className="intro">
                <img className="intro-image" src={IMAGES.introImage} alt="intro" />
              </div>
              <div className="auth-content bg-white px-5 sm:px-8 py-8 shadow-md w-full sm:w-3/4 lg:w-2/4 xl:w-2/5 auth-box">
                <div className="intro-x mt-2 flex justify-center desc">
                  <LogoCircleIcon width={100} height={112.5} color={AUTH_THEME_COLOR} />
                </div>
                <h2 className="auth-title">Đăng nhập tài khoản</h2>
                <LoginModule />
              </div>
            </div>
          </div>
          {/* END: Login Form */}
        </div>
      </div>
    </StyledAuth>
  );
};

export const StyledAuth = styled.div<{ background?: string }>`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(p) => p?.background && p.background}) no-repeat center;
  /* background: linear-gradient(180deg, ${AUTH_THEME_COLOR}, ${AUTH_THEME_COLOR + opacityHex[80]})
    no-repeat center; */
  background-size: cover;
  background-position: top;
  .content-block {
    overflow: hidden;
  }

  .container {
    height: 100%;
  }

  .auth-section {
    flex-direction: column;
    .heading {
      margin-bottom: 0.8rem;
    }
    .desc {
      margin-bottom: 2.8rem;
    }
    .main-logo {
      margin: 0 auto 0.8rem;
    }
  }
  .auth-contain {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    max-height: 560px;
    box-shadow: rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;
  }
  .auth-content {
    .auth-title {
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
      margin: 4.5rem 0 3.2rem;
    }
  }
  .intro {
    position: relative;
    min-width: 780px;
    height: 100%;
    .intro-image {
      width: 100%;
      height: 100%;
    }
  }
`;
