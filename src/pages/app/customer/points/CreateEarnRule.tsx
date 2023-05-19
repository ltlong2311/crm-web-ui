import { CreateCashbackRuleModule } from '@modules';
import { StyledCashbackRulesPage } from './EarnRule';

export const CreateCashbackRulePage = () => {
  return (
    <StyledCashbackRulesPage className="cashback-rules-page">
      <div className="list-rule__head">
        <h2 className="title">Create Cashback Rule</h2>
      </div>
      <CreateCashbackRuleModule />
    </StyledCashbackRulesPage>
  );
};
