import {
  EditBoxIcon,
  Pagination,
  SearchIcon,
  SharedButton,
  SharedTable,
  ShareInput,
  ShareSelectInput,
  TickBox,
} from '@components';
import { MAIN_THEME_DATA, PAGE_SIZE_OPTIONS } from '@configs';
import { ICashbackRule, Tier } from '@interfaces';
import { LogApp } from '@utils';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import styled from 'styled-components';
interface IProps {
  data: ICashbackRule[];
  currentPage: number;
  pagination: {
    count: number;
    maxPage: number;
    limit: number;
  };
  onCreate: () => void;
  onSearch: (value: string) => void;
  onEdit: (id: number | string) => void;
  onPageChange: (value: number) => void;
  onChangePageSize: (size: number) => void;
}
interface DataType {
  key: React.Key;
  no: number;
  cashbackName: string;
  ruleType: string;
  duration: string;
}

export const CashbackRulesSection = (props: IProps) => {
  const {
    data,
    currentPage,
    pagination,
    onCreate,
    onEdit,
    onSearch,
    onPageChange,
    onChangePageSize,
  } = props;

  const columns: ColumnsType<DataType> = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      width: '10%',
      render: (text, record, index) => index + (currentPage - 1) * 10 + 1,
      //  sorter: (a, b) => a.no - b.no
    },
    {
      title: 'Cashback name',
      // dataIndex: 'title',
      // key: 'title',
      width: '20%',
      render: (value: ICashbackRule) => {
        return (
          <div
            onClick={() => onEdit(value?.id)}
            className="flex items-center justify-center text-black app-btn"
          >
            <p className="edit flex items-center mr-3 text-current rule-title">{value?.title}</p>
          </div>
        );
      },
    },
    {
      title: 'Rule type',
      width: '20%',
      render: (value: ICashbackRule) => {
        return <span className="capitalize">{value?.rule_type}</span>;
      },
    },
    { title: 'Duration', dataIndex: 'duration', key: 'duration', width: '30%' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      width: '20%',
      render: (value) => {
        return (
          <StyledEditBtn>
            <SharedButton
              textColor="white"
              // backgroundColor={MAIN_THEME_DATA.mainColor}
              className="edit-btn btn-edit"
              prevIcon={<EditBoxIcon size={16} color="white" />}
              text="Edit"
              onClick={() => onEdit(value?.id)}
            />
          </StyledEditBtn>
        );
      },
    },
  ];

  return (
    <StyledRulesSection>
      <div className="head__actions">
        <ShareInput
          containerClassName="search-rules__box"
          placeholder="Tìm kiếm theo tên"
          className="search-rules__input"
          type="text"
          onChange={(e: any) => {
            // LogApp('Check 123', e);
            onSearch(e.target.value);
          }}
          prevIcon={<SearchIcon />}
        />
        <SharedButton
          onClick={onCreate}
          className="create-rule__button"
          backgroundColor={MAIN_THEME_DATA.mainColor}
          text="Add New Rule"
          btnStyle="pad"
        />
      </div>
      <SharedTable columns={columns} dataSource={data} />
      <div className="bottom-pagination">
        <div className="page-size">
          <span className="label">Page Size </span>
          <ShareSelectInput
            data={PAGE_SIZE_OPTIONS}
            className="page-size-select"
            defaultValue={pagination?.limit}
            onChange={(value) => {
              onChangePageSize(Number(value));
            }}
            key={`genderTypeSelect:${pagination?.limit}`}
          />
        </div>
        <Pagination
          className="pagination pt-2"
          currentPage={currentPage}
          totalCount={pagination.count}
          pageSize={pagination.limit}
          onPageChange={(page: number) => {
            onPageChange(page);
          }}
        />
      </div>
    </StyledRulesSection>
  );
};

const StyledRulesSection = styled.div`
  .head__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: 1rem;
    justify-content: space-between;
    .search-rules__box {
      min-width: 20rem;
      width: fit-content;
      .search-rules__input {
        height: 4.5rem;
      }
    }
    .create-rule__button {
      height: 4.5rem;
      width: fit-content;
    }
  }
  .rule-title {
    margin-bottom: 0;
  }
  .bottom-pagination {
    margin-top: 3.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-size {
      display: flex;
      align-items: center;
      .label {
        display: inline-block;
        white-space: nowrap;
        padding-right: 0.8rem;
      }
    }
  }
`;
const StyledEditBtn = styled.div`
  display: flex;
  justify-content: center;
  .edit-btn {
    padding: 0.8rem 1.8rem;
    width: fit-content;
    align-self: center;
  }
`;
