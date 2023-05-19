import { MAIN_THEME_DATA } from '@configs';
import { selectApp, useAppSelector } from '@redux';
import { APP_COLORS } from '@theme';
import { LogApp } from '@utils';
import { Empty, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
interface ITableProps {
  columns: ColumnsType<any>;
  dataSource: any;
  pagination?: false | TablePaginationConfig;
  key?: number | string;
  rowKey?: string;
  noTableHeader?: boolean;
  listItemStyle?: boolean;
  noDataView?: ReactNode;
  darkRowTheme?: boolean;
  isSelectModule?: boolean;
}
export const SharedTable = ({
  columns,
  dataSource,
  pagination = false,
  darkRowTheme,
  key,
  rowKey,
  listItemStyle,
  noDataView,
  isSelectModule,
}: ITableProps) => {
  const { tableLoading } = useAppSelector(selectApp);
  LogApp({ darkRowTheme });
  return (
    <StyledTableWrapper
      className="table-wrapper"
      $appTheme={MAIN_THEME_DATA.mainColor}
      $listItemStyle={listItemStyle}
      $darkRowTheme={darkRowTheme}
      $isSelectModule={isSelectModule}
    >
      <Table
        key={key}
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        loading={tableLoading}
        locale={{ emptyText: noDataView ? noDataView : <Empty /> }}
        rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
      />
    </StyledTableWrapper>
  );
};
const StyledTableWrapper = styled.div<{
  $appTheme: string;
  $listItemStyle?: boolean;
  $darkRowTheme?: boolean;
  $isSelectModule?: boolean;
}>`
  .ant-pagination-item-active a {
    border-color: ${(p) => p.$appTheme};
  }
  .ant-pagination-item-active {
    font-weight: 500;
    background: #fff;
    border-color: ${(p) => p.$appTheme};
  }
  .ant-table-thead {
    background: #f9f9f9;
    & > tr {
      border-radius: 0.8rem;
      overflow: hidden;
    }
  }
  .ant-table-thead > tr > th {
    position: relative;
    color: #a1a5b7;
    font-size: 1.3rem;
    font-weight: 500;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
    padding: 13px;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s;
    text-align: center;
  }

  .table-row-light {
    background-color: ${({ theme }: any) => theme?.colors?.table?.rowLight};
  }
  .table-row-dark {
    background-color: ${({ theme, $darkRowTheme }: any) =>
      $darkRowTheme ? theme?.colors?.table?.rowDark : theme?.colors?.table?.rowLight};
  }

  ${({ $isSelectModule }) =>
    $isSelectModule &&
    css`
      min-height: 15vh;
      overflow: auto;
      max-height: calc(80vh - 25rem);
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        background-color: #fafafa;
      }
      &::-webkit-scrollbar {
        cursor: pointer;
        width: 5px;
        background-color: #f5f5f5;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 12px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #c7c7c7;
      }
    `}

  ${(p) =>
    p?.$listItemStyle &&
    css`
      .ant-table-thead {
        background: ${APP_COLORS.transparent};
        .ant-table-cell:before {
          width: 0 !important;
        }
        & > tr > th {
          background: ${APP_COLORS.transparent};
        }
      }
      .table-row-dark {
        background-color: ${({ theme, $darkRowTheme }: any) =>
          $darkRowTheme ? '#fafaff' : theme?.colors?.table?.rowLight};
      }
    `}
`;
