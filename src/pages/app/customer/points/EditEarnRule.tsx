import { EditCashbackRuleModule } from '@modules';
import { StyledCashbackRulesPage } from './EarnRule';

export const EditCashbackRulePage = () => {
  return (
    <StyledCashbackRulesPage className="cashback-rules-page">
      <div className="list-rule__head">
        <h2 className="title">Edit Cashback Rule</h2>
      </div>
      <EditCashbackRuleModule />
    </StyledCashbackRulesPage>
  );
};
