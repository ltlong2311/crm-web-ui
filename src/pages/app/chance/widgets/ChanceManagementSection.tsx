import React from 'react';
import styled from 'styled-components';
import { ColumnsType } from 'antd/lib/table';

import {
  DropdownButton,
  EditBoxIcon,
  Pagination,
  PlusIcon,
  PopoverPopup,
  SearchIcon,
  SharedButton,
  SharedTable,
  ShareInput,
  ShareRangeDateSelect,
  ShareSelectInput,
  StyledBottomPagination,
  TableText,
  ViewIcon,
  Trash,
} from '@components';
import { FilterDataItem, Tier } from '@interfaces';
import { APP_COLORS, useTheme } from '@theme';
import {
  dateFormat,
  dateTimeFormat,
  enumRole,
  enumStatus,
  MAIN_THEME_DATA,
  PAGE_SIZE_OPTIONS,
  STATUS_TYPE,
} from '@configs';
import moment from 'moment';
import { formatAppDate, LogApp, useUrlQuery } from '@utils';
import { Divider } from 'antd';
import { CreateChanceModule, CreateCustomerModule } from '@modules';

interface IProps {
  data: any[];
  tierFilterData?: FilterDataItem[];
  dataChange?: number;
  currentPage: number;
  pagination: {
    totalItems: number;
    totalPages: number;
    perPage: number;
  };
  selectedId?: number | string;
  payload: any;
  showCreateModal?: boolean;
  showUpdateModal?: boolean;
  onCreate: () => void;
  onSearch: (value: string) => void;
  onViewDetails: (id: number | string) => void;
  onEdit: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  onChangeFilter: (status: string) => void;
  onChangeTierFilter: (id: number | string) => void;
  onPageChange: (value: number) => void;
  onChangePageSize: (size: number) => void;
  onCloseCreateModal?: () => void;
  onCloseUpdateModal?: () => void;
  // onChangeDateRange: (size: number) => void;
  // onChangeBirthdayRangeTo: (size: number) => void;
  onDataChange: (...arg: any) => void;
  onChangeCustomerType: (type: string) => void;
  onApplyFilter?: () => void;
  onResetFilter?: () => void;
}

export const ChanceManagementSection = (props: IProps) => {
  const {
    data,
    currentPage,
    pagination,
    tierFilterData,
    payload,
    showCreateModal,
    onSearch,
    onViewDetails,
    onEdit,
    onDelete,
    onPageChange,
    onChangeFilter,
    onChangeTierFilter,
    onChangePageSize,
    onCreate,
    onApplyFilter,
    onResetFilter,
    onCloseCreateModal,
    onChangeCustomerType,
    onDataChange,
  } = props;

  const { theme } = useTheme();

  const urlQuery = useUrlQuery();
  const tierNameParam = urlQuery?.get('tierName');
  const filDate = urlQuery?.get('date');

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      width: '5%',
      render: (value, record, index) => {
        return <TableText>{index + (currentPage - 1) * 10 + 1}</TableText>;
      },
    },
    {
      title: 'Cơ hội',
      render: (value) => {
        return <TableText>KH{value?.name}</TableText>;
      },
      width: '15%',
    },
    {
      title: 'Khách hàng',
      align: 'left',
      width: '15%',
      render: (value) => {
        return <TableText>{'User A'}</TableText>;
      },
    },
    {
      title: 'Sản phẩm',
      render: (value) => {
        return <TableText>{'Sản phẩm'}</TableText>;
      },
      width: '15%',
    },
    {
      title: 'Người thực hiện',
      render: (value) => {
        return <TableText>{value?.phone}</TableText>;
      },
      width: '15%',
    },
    {
      title: 'Ngày tạo',
      render: (value) => {
        return <TableText>{value?.classification?.name}</TableText>;
      },
      width: '15%',
    },
    {
      title: 'Trạng thái',
      render: (value) => {
        return <TableText>{value?.status}</TableText>;
      },
      width: '15%',
    },
    {
      title: 'Chức năng',
      dataIndex: '',
      key: 'x',
      width: '10%',
      render: (value: any) => {
        return (
          <div className="flex items-center">
            {/* View */}
            <SharedButton
              textColor="white"
              // backgroundColor={MAIN_THEME_DATA.mainColor}
              className="edit-btn btn-info table-actions-btn mr-3"
              onClick={() => onViewDetails(value?.id)}
            >
              <ViewIcon color={'#fff'} size={16} />
            </SharedButton>
            {/* Edit */}
            <SharedButton
              textColor="white"
              // backgroundColor={MAIN_THEME_DATA.mainColor}
              className="edit-btn btn-edit table-actions-btn mr-3"
              onClick={() => onEdit(value?.id)}
            >
              <EditBoxIcon size={16} color="white" />
            </SharedButton>
            {/* Delete */}
            <PopoverPopup
              roleDelete={enumRole.S_MANAGER}
              content={
                <StyledConfirmPopup>
                  <h5 className="text-center items-center mb-2 text-current text-base">Alert</h5>
                  <p className="text-sm">Bạn có chắc muốn xóa?</p>
                </StyledConfirmPopup>
              }
              isHaveConfirmButton
              onConfirm={() => {
                onDelete && onDelete(value?.id);
              }}
            >
              <SharedButton
                className="delete-btn btn-action table-actions-btn btn-delete"
                backgroundColor={MAIN_THEME_DATA.mainColor}
              >
                <Trash color="#fff" />
              </SharedButton>
            </PopoverPopup>
          </div>
        );
      },
    },
  ];

  LogApp('checktier', tierFilterData);
  LogApp('checktier2', payload?.tier_id);

  return (
    <StyledSection>
      <div className="head-actions">
        <div className="search-fil">
          <ShareInput
            containerClassName="search-rules__box"
            placeholder="Tìm kiếm theo tên, email,..."
            className="search-rules__input"
            type="text"
            onChange={(e: any) => {
              onSearch(e.target.value);
            }}
            prevIcon={<SearchIcon />}
          />
          <div className="head-right">
            <DropdownButton
              isFilter
              onApply={onApplyFilter}
              onReset={onResetFilter}
              className="table-filter-btn"
              dropdownPlacement="bottomRight"
              dropdown={
                <div className="dropdown-content">
                  <ShareSelectInput
                    label="Loại đối tượng"
                    placeholder="Phân loại khách hàng"
                    data={STATUS_TYPE}
                    onChange={(value) => onChangeFilter(value)}
                    className="status-select"
                    containerClassName="filter-option select-filter"
                    defaultValue={payload?.status || 'All'}
                    key={`${payload?.status}-statusM`}
                    noBorderStyle
                  />
                  <div className="time-fil">
                    <div className="filter-right"></div>
                    <ShareRangeDateSelect
                      placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                      format={dateFormat}
                      inputClassName="chance-range-input"
                      onChange={(date, dateString) => {
                        LogApp('rule range date', { date, dateString });
                        // setValue('startDate', dateString[0]);
                        // setValue('endDate', dateString[1]);
                      }}
                    />
                  </div>
                </div>
              }
            />
            <SharedButton
              onClick={onCreate}
              className="create-button"
              backgroundColor={APP_COLORS.primary}
              text="Thêm mới"
              prevIcon={<PlusIcon size={18} color="#fff" />}
              btnStyle="pad"
            />
          </div>
        </div>
        {/* <SharedCollapse header={'Hiển thị'} className="filter-contain" isDividerHeader>
          <div>Lựa chọn các cột sẽ hiển thị trên bảng</div>
        </SharedCollapse> */}
      </div>

      <SharedTable columns={columns} dataSource={data} />
      <StyledBottomPagination>
        <Pagination
          className="pagination pt-2"
          currentPage={currentPage}
          totalCount={pagination.totalItems}
          pageSize={pagination.perPage}
          onChangePageSize={onChangePageSize}
          onPageChange={(page: number) => {
            onPageChange(page);
          }}
        />
      </StyledBottomPagination>
    </StyledSection>
  );
};

const StyledSection = styled.div`
  width: 100%;
  background: ${(p) => p?.theme?.colors?.bgSection};
  padding: 30px 24px 24px;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1), 0 11px 6px -7px rgba(43, 43, 43, 0.1);
  margin-top: 2rem;
  .head-actions {
    .create-button {
      font-size: 1.6rem;
    }
    .table-filter-btn {
      margin-right: 0.9rem;
    }
    .search-fil {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 2.6rem;
      margin-top: 1rem;
      justify-content: space-between;
      .search-rules__box {
        min-width: 30rem;
        width: fit-content;
        .search-rules__input {
          height: 4.5rem;
        }
      }
      .head-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .status-select {
          /* margin-right: 1.2rem; */
        }
      }
      .create-rule__button {
        height: 4.5rem;
        width: fit-content;
      }
    }
    .filter-contain {
      margin-bottom: 1.8rem;
    }
    .time-fil {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
      .time-select {
        height: 3.5rem;
        min-width: 25rem;
      }
      .from-time {
        margin-right: 5rem;
      }
      .to-time {
        margin-right: 5rem;
      }
    }
    .filter-right {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .filters-btn {
      .text-btn {
        /* color: ${(p) => p.theme?.colors?.button?.text}; */
      }
    }
    .filter-box {
      .app-select__label {
        min-width: 15.3rem;
      }
      .select-filter {
        .label {
          margin-bottom: 0;
        }
      }
    }
    .ant-select {
      width: 100%;
      min-width: 10rem;
      max-width: 15rem;
      .ant-select-selector {
        height: 3.5rem;
      }
    }
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

const StyledConfirmPopup = styled.div`
  .btn {
    //
    /* max-width: 5rem; */
  }
`;
