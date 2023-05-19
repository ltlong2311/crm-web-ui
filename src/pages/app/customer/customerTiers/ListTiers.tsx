import { SharedButton, SharedTable, SharedToggle, ShareInput, TickBox } from '@components';
import { MAIN_THEME_DATA } from '@configs';
import { TierTableModule } from '@modules';
import { Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import React from 'react';
import styled from 'styled-components';

export const MembershipTiersPage = () => {
  return (
    <StyledMembershipTiersPage>
      <div className="list-tier__head">
        <h2 className="title">List of tiers</h2>
      </div>
      <div className="list-tier__section">
        <TierTableModule />
      </div>
    </StyledMembershipTiersPage>
  );
};
const StyledMembershipTiersPage = styled.div`
  .list-tier__head {
    margin-bottom: 2rem;
    .title {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }

  .list-tier__section {
    position: relative;
    padding: 2rem 2.8rem;
    border-radius: 0.6rem;
    background: ${(p) => p.theme.colors.bgSection};
    box-shadow: 0px 3px 20px #0000000b;
  }
`;
