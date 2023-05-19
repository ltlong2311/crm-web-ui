import styled from 'styled-components';

import { PageHeaderTitle } from '@components';
import { BannerListModule, UserAccountListModule } from '@modules';

export const AccountManagementPage = () => {
  return (
    <StyledAccountManagementPage className="account-page">
      <div className="page__section">
        <UserAccountListModule />
      </div>
    </StyledAccountManagementPage>
  );
};

const StyledAccountManagementPage = styled.div`
  .page__head {
    margin-bottom: 2rem;
    .title {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }

  .page__section {
    position: relative;
    padding: 2rem 2.8rem;
    border-radius: 0.6rem;
    background: ${(p) => p.theme.colors.bgSection};
    box-shadow: 0px 3px 20px #0000000b;
  }
`;
