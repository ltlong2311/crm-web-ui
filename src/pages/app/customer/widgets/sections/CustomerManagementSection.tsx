import React from 'react';
import styled, { css } from 'styled-components';
import { ColumnsType } from 'antd/lib/table';

import {
  AppTag,
  CenterBox,
  DropdownButton,
  EditBoxIcon,
  Pagination,
  PlusIcon,
  PopoverPopup,
  SearchIcon,
  SelectConfirm,
  SharedButton,
  SharedCheckbox,
  SharedTable,
  ShareInput,
  ShareRangeDateSelect,
  ShareSelectInput,
  StyledBottomPagination,
  StyledCustomerCategories,
  TableText,
  Trash,
  ViewIcon,
} from '@components';
import { FilterDataItem, ICustomerInfo, CustomerPayload, Tier, IOption } from '@interfaces';
import { APP_COLORS, useTheme } from '@theme';
import {
  dateFormat,
  dateTimeFormat,
  enumRole,
  enumStatus,
  FILTER_CUSTOMER_TYPE,
  MAIN_THEME_DATA,
  PAGE_SIZE_OPTIONS,
  PATH_CUSTOMER,
  STATUS_TYPE,
} from '@configs';
import moment from 'moment';
import { formatAppDate, LogApp, useUrlQuery } from '@utils';
import { Divider } from 'antd';
import { CreateCustomerModule } from '@modules';
import {
  selectSelectedCustomer,
  setOrderCustomer,
  setSelectedCustomer,
  useAppDispatch,
  useAppSelector,
} from '@redux';

interface IProps {
  isSelectModule?: boolean;
  data: ICustomerInfo[];
  customerCategories?: IOption[];
  tierFilterData?: FilterDataItem[];
  dataChange?: number;
  currentPage: number;
  pagination: {
    totalItems: number;
    totalPages: number;
    perPage: number;
  };
  selectedId?: number | string;
  payload: CustomerPayload;
  showCreateModal?: boolean;
  showUpdateModal?: boolean;
  setPayload?: any;
  onCreate: () => void;
  onSearch: (value: string) => void;
  onViewProfile: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  onEdit: (id: number | string) => void;
  onChangeStatus: (id: number, status: enumStatus) => void;
  onChangeFilter?: (status: string) => void;
  onChangeCategoryFilter?: (status: string) => void;
  onChangeTierFilter: (id: number | string) => void;
  onPageChange: (value: number) => void;
  onChangePageSize: (size: number) => void;
  onCloseCreateModal?: () => void;
  onCloseUpdateModal?: () => void;
  // onChangeBirthdayRangeFrom: (size: number) => void;
  // onChangeBirthdayRangeTo: (size: number) => void;
  onDataChange: (...arg: any) => void;
  onChangeCustomerType: (type: string) => void;
  onApplyFilter?: () => void;
  onResetFilter?: () => void;
  onCloseSelectModule?: () => void;
}

export const CustomerManagementSection = (props: IProps) => {
  const {
    isSelectModule,
    data,
    customerCategories,
    currentPage,
    pagination,
    tierFilterData,
    payload,
    showCreateModal,
    setPayload,
    onSearch,
    onViewProfile,
    onEdit,
    onDelete,
    onChangeStatus,
    onPageChange,
    onChangeFilter,
    onChangeCategoryFilter,
    onChangeTierFilter,
    onChangePageSize,
    onCreate,
    onApplyFilter,
    onResetFilter,
    onCloseCreateModal,
    onChangeCustomerType,
    onDataChange,
    onCloseSelectModule,
  } = props;

  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedCustomer = useAppSelector(selectSelectedCustomer);

  const urlQuery = useUrlQuery();
  const tierNameParam = urlQuery?.get('tierName');
  const filDate = urlQuery?.get('date');

  const columns: ColumnsType<any> = [
    ...(isSelectModule
      ? [
          {
            title: 'Chọn',
            width: 'auto',
            render: (value: any, record: any, index: number) => {
              return (
                <CenterBox className="center">
                  <SharedCheckbox
                    size="2rem"
                    type="checkbox"
                    onChange={(e: any) => {
                      dispatch(setSelectedCustomer(e?.target?.checked ? value : undefined));
                    }}
                    checked={value?.id === selectedCustomer?.id}
                  />
                </CenterBox>
              );
            },
          },
        ]
      : []),
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
      title: 'MKH',
      render: (value) => {
        return <TableText>KH{value?.id}</TableText>;
      },
      width: 'auto',
      align: 'left',
    },
    {
      title: 'Tên',
      align: 'left',
      width: '15%',
      render: (value) => {
        return <TableText>{value?.lastName}</TableText>;
      },
    },
    {
      title: 'Số điện thoại',
      render: (value) => {
        return <TableText>{value?.phone}</TableText>;
      },
      width: '15%',
      align: 'left',
    },
    // {
    //   title: 'Tier',
    //   render: (value) => {
    //     return <span className="tier">{value?.tier?.name ? value.tier.name : ''}</span>;
    //   },
    //   width: '15%',
    // },
    {
      title: 'Email',
      render: (value) => {
        return <TableText>{value?.email}</TableText>;
      },
      width: '15%',
      align: 'left',
    },
    {
      title: 'Ngày sinh',
      render: (value) => {
        return <TableText>{formatAppDate(value?.dob)}</TableText>;
      },
      width: '15%',
      align: 'left',
    },
    {
      title: 'Loại khách hàng',
      render: (value) => {
        return (
          <StyledCustomerCategories>
            {value?.classifications?.map((item: any) => (
              <AppTag label={item?.name} />
            ))}
          </StyledCustomerCategories>
        );
      },
      width: '15%',
    },
    {
      title: 'Chức năng',
      dataIndex: '',
      key: 'x',
      width: '10%',
      render: (value: ICustomerInfo) => {
        return (
          <div className="flex items-center">
            <SharedButton
              textColor="white"
              // backgroundColor={MAIN_THEME_DATA.mainColor}
              className="edit-btn btn-info table-actions-btn mr-3"
              onClick={() => {
                if (isSelectModule) {
                  window.open(PATH_CUSTOMER + `/details/${value?.id}`, '_blank');
                } else {
                  onViewProfile(value?.id);
                }
              }}
            >
              <ViewIcon color={'#fff'} size={16} />
            </SharedButton>
            {!isSelectModule && (
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
            )}
          </div>
        );
      },
    },
  ];

  LogApp('checktier', tierFilterData);
  LogApp('checktier2', payload?.tier_id);

  return (
    <>
      <StyledSection $isSelectModule={isSelectModule}>
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
                    {/* <ShareSelectInput
                      label="Bậc khách hàng"
                      data={tierFilterData || []}
                      onChange={(value) => onChangeTierFilter(value)}
                      placeholder="Bậc thành viên"
                      className="tier-select"
                      containerClassName="filter-option select-filter"
                      // defaultValue={tierFilterData ? tierFilterData?.find((i: any) => i?.value === payload?.tier_id)?.label : undefined}
                      defaultValue={tierNameParam || payload?.tier_id || 'All'}
                      key={`${tierFilterData ? payload?.tier_id : 'def'}-tierM`}
                      noBorderStyle
                    /> */}
                    {/* {JSON.stringify(payload)} */}
                    {!!customerCategories?.length && (
                      <ShareSelectInput
                        label="Loại đối tượng"
                        placeholder="Phân loại khách hàng"
                        data={customerCategories}
                        onChange={(value) =>
                          onChangeCategoryFilter && onChangeCategoryFilter(value)
                        }
                        className="status-select"
                        containerClassName="filter-option select-filter"
                        defaultValue={payload?.classification || 'All'}
                        key={`${payload?.classification}-statusM`}
                        noBorderStyle
                      />
                    )}
                    {/* <div className="time-fil">
                      <div className="filter-right"></div>
                      <ShareRangeDateSelect
                        label="Ngày sinh"
                        placeholder={['Từ ngày', 'Tới ngày']}
                        format={dateFormat}
                        inputClassName="birthday-range-input"
                        onChange={(date, dateString) => {
                          LogApp('rule range date', { date, dateString });
                          // setValue('startDate', dateString[0]);
                          // setValue('endDate', dateString[1]);
                        }}
                        noBorderStyle
                        showTime={false}
                      />
                    </div> */}
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

        <SharedTable
          columns={columns}
          dataSource={data}
          darkRowTheme
          isSelectModule={isSelectModule}
        />
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
            isSelectModule={isSelectModule}
          />
        </StyledBottomPagination>
        {/* Select Confirm */}
        {isSelectModule && (
          <SelectConfirm
            onCancel={() => onCloseSelectModule && onCloseSelectModule()}
            onSubmit={() => {
              dispatch(setOrderCustomer(selectedCustomer));
              onCloseSelectModule && onCloseSelectModule();
            }}
          />
        )}
        {/* Action popup */}
        <CreateCustomerModule
          open={showCreateModal}
          onClose={onCloseCreateModal}
          onDataChange={onDataChange}
        />
      </StyledSection>
    </>
  );
};

const StyledSection = styled.div<{
  $isSelectModule?: boolean;
}>`
  position: relative;
  width: 100%;
  background: ${(p) => p?.theme?.colors?.bgSection};
  padding: 30px 24px 24px;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1), 0 11px 6px -7px rgba(43, 43, 43, 0.1);
  margin-top: 2rem;
  ${({ $isSelectModule }) =>
    $isSelectModule &&
    css`
      box-shadow: none;
      padding: 0;
      margin-top: 0;
    `}
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
