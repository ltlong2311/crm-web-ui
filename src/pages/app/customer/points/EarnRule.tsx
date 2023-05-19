import { CashbackRulesModule } from '@modules';
import styled from 'styled-components';

export const CashbackRulesPage = () => {
  return (
    <StyledCashbackRulesPage className="cashback-rules-page">
      <div className="list-rule__head">
        <h2 className="title">List of cashback rules</h2>
      </div>
      <div className="list-rule__section">
        <CashbackRulesModule />
      </div>
    </StyledCashbackRulesPage>
  );
};

export const StyledCashbackRulesPage = styled.div`
  .list-rule__head {
    margin-bottom: 2rem;
    .title {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }

  .list-rule__section {
    position: relative;
    padding: 2rem 2.8rem;
    border-radius: 0.6rem;
    background: ${(p) => p.theme.colors.bgSection};
    box-shadow: 0px 3px 20px #0000000b;
  }
`;
