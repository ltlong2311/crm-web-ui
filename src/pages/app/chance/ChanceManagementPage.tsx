import styled from 'styled-components';

import { ChanceMenuIcon, PageHeaderTitle } from '@components';
import { ChanceManagementModule } from '@modules';

export const ChanceManagementPage = () => {
  return (
    <StyledPage className="chance-page">
      <PageHeaderTitle
        title="Cơ hội"
        desc="Các cơ hội kinh doanh tìm kiếm khách hàng của bạn"
        pageIcon={<ChanceMenuIcon color="#fff" size={20} />}
      />
      <ChanceManagementModule />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
`;
