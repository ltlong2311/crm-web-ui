import {
  Pagination,
  SearchIcon,
  SharedButton,
  SharedTable,
  SharedToggle,
  ShareInput,
  ShareSelectInput,
  TickBox,
} from '@components';
import { MAIN_THEME_DATA, PAGE_SIZE_OPTIONS } from '@configs';
import { Tier } from '@interfaces';
import { LogApp } from '@utils';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import styled from 'styled-components';
interface IProps {
  tiers: TierData;
  tiersChanging: DataType[];
  columns: ColumnsType<DataType>;
  isLevelChanging?: boolean;
  onNavigate: () => void;
  onSearch: (value: string) => void;
  currentPage: number;
  onPageChange: (value: number) => void;
  onChangePageSize: (size: number) => void;
  onShowLevelChangingMopde: () => void;
  onSaveLevelUpdate: () => void;
  onReverseLevel: () => void;
}
export interface TierData {
  count: number;
  limit: number;
  data: DataType[];
}
export interface DataType {
  key: React.Key;
  no: number;
  tierName: string;
  condition: string;
  monthsOfStatus: string;
  mainTier: string;
  statusTier: boolean;
  level: number;
  onEdit: () => void;
  onChangeStatus: (value: boolean) => void;
}

export const TierTable = ({
  tiers,
  tiersChanging,
  columns,
  isLevelChanging,
  onNavigate,
  onSearch,
  currentPage,
  onPageChange,
  onChangePageSize,
  onShowLevelChangingMopde,
  onSaveLevelUpdate,
  onReverseLevel,
}: IProps) => {
  return (
    <StyledTableWrapper>
      <StyledSearchWrapper>
        <div className="input-wrapper">
          <ShareInput
            containerClassName="search-tier__box"
            className="search-tier__input"
            onChange={(e: any) => {
              onSearch(e.target.value);
            }}
            placeholder="Tìm kiếm theo tên"
            prevIcon={<SearchIcon />}
          />
        </div>
        <div className="flex">
          {isLevelChanging ? (
            <>
              <SharedButton
                onClick={onSaveLevelUpdate}
                className="create-tier__button btn-info mr-2"
                text="Save"
                btnStyle="pad"
              />
              <SharedButton
                onClick={onReverseLevel}
                className="create-tier__button btn-secondary mr-2"
                text="Cancel"
                btnStyle="pad"
              />
            </>
          ) : (
            <SharedButton
              onClick={onShowLevelChangingMopde}
              className="create-tier__button btn-primary mr-2"
              text="Change level"
              btnStyle="pad"
            />
          )}
          <SharedButton
            onClick={onNavigate}
            className="create-tier__button"
            backgroundColor={MAIN_THEME_DATA.mainColor}
            text="Add New Tier"
            btnStyle="pad"
          />
        </div>
        {/* <SharedButton
          onClick={onNavigate}
          className="text-button"
          textColor="white"
          backgroundColor={MAIN_THEME_DATA.mainColor}
          text="Create tier"
        /> */}
      </StyledSearchWrapper>
      <SharedTable
        columns={columns?.filter((item: any) => !item?.hidden)}
        dataSource={isLevelChanging ? [...tiersChanging] : [...tiers.data]}
        // key={String(isLevelChanging)}
        // rowKey={String(isLevelChanging)}
      />
      <div className="bottom-pagination">
        <div className="page-size">
          {!isLevelChanging && (
            <>
              <span className="label">Page Size </span>
              <ShareSelectInput
                data={PAGE_SIZE_OPTIONS}
                className="page-size-select"
                defaultValue={tiers?.limit}
                onChange={(value) => {
                  onChangePageSize(Number(value));
                }}
                key={`genderTypeSelect:${tiers?.limit}`}
              />
            </>
          )}
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={tiers.count}
          pageSize={tiers.limit}
          onPageChange={(page: number) => {
            onPageChange(page);
          }}
        />
      </div>
    </StyledTableWrapper>
  );
};
const StyledTableWrapper = styled.div`
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
  .level {
    display: flex;
    align-items: center;
    justify-content: center;
    .level-change {
      /* margin-right: 3rem; */
      .btn {
        box-shadow: none;
      }
    }
  }
`;
const StyledSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 2rem;
  .search-tier__box {
    min-width: 20rem;
    width: fit-content;
    .search-tier__input {
      height: 4.5rem;
    }
  }
  .create-tier__button {
    height: 4.5rem;
    width: fit-content;
  }
  /* .input-wrapper {
    width: 30%;
    margin-right: 2rem;
  }
  .text-button {
    padding: 0.6rem 1.2rem;
  } */
`;
