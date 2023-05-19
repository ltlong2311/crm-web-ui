import styled, { css } from 'styled-components';
import { ColumnsType } from 'antd/lib/table';

import {
  CenterBox,
  DropdownButton,
  EditBoxIcon,
  FilterDropdownContent,
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
  StyledUserInfo,
  TableText,
  Trash,
  ViewIcon,
} from '@components';
import {
  CAMPAIGN_STATUS_OPTIONS,
  dateFormat,
  enumRole,
  MAIN_THEME_DATA,
  PATH_CAMPAIGN,
} from '@configs';
import { CreateBranchModule, UpdateBranchModule, UpdateCustomerCategoryModule } from '@modules';
import { APP_COLORS } from '@theme';
import {
  selectSelectedStore,
  setOrderStore,
  setSelectedStore,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import { formatAppDate, LogApp } from '@utils';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isSelectModule?: boolean;
  data: any[];
  selectedId?: number | string;
  currentPage: number;
  pagination: {
    totalItems: number;
    totalPages: number;
    perPage: number;
  };
  payload?: any;
  showCreateModal?: boolean;
  showUpdateModal?: boolean;
  dataChange?: number;
  setPayload?: any;
  onCreate: () => void;
  onEdit: (id: number | string) => void;
  onDelete: (id: number | string) => void;
  onSearch: (value: string) => void;
  onPageChange: (value: number) => void;
  updateData: () => void;
  onCloseCreateModal: () => void;
  onCloseUpdateModal?: () => void;
  onDataChange: (no: number) => void;
  onChangePageSize: (size: number) => void;
  onCloseSelectModule?: () => void;
  onChangeStatusFilter?: (status: string) => void;
  onApplyFilter?: () => void;
  onResetFilter?: () => void;
}

export const CampaignManagementSection = (props: IProps) => {
  const {
    isSelectModule,
    selectedId,
    showCreateModal,
    showUpdateModal,
    data,
    payload,
    currentPage,
    pagination,
    dataChange,
    setPayload,
    onCreate,
    onDelete,
    onEdit,
    onSearch,
    onPageChange,
    onCloseCreateModal,
    onCloseUpdateModal,
    onDataChange,
    onChangePageSize,
    onCloseSelectModule,
    onApplyFilter,
    onResetFilter,
    onChangeStatusFilter,
  } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedStore = useAppSelector(selectSelectedStore);

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
                      dispatch(setSelectedStore(e?.target?.checked ? value : undefined));
                    }}
                    checked={value?.id === selectedStore?.id}
                  />
                </CenterBox>
              );
            },
          },
        ]
      : []),
    {
      title: 'No.',
      key: 'no',
      render: (value, record, index) => {
        return <TableText>{index + (currentPage - 1) * 10 + 1}</TableText>;
      },
      width: '120px',
      //  sorter: (a, b) => a.no - b.no
    },
    {
      title: 'Chiến dịch',
      align: 'left',
      width: '20%',
      render: (value) => {
        return <TableText>{value?.name}</TableText>;
      },
    },
    {
      title: 'Người tạo',
      align: 'left',
      width: '23%',
      render: (value) => {
        return (
          <TableText>
            {value?.creator.name}
            <div>Ngày tạo: {value?.creator.createdAt}</div>
          </TableText>
        );
      },
    },
    // {
    //   title: 'Thời gian bắt đầu',
    //   align: 'center',
    //   width: '150px',
    //   render: (value) => {
    //     return <TableText>{formatAppDate(value?.startTime)}</TableText>;
    //   },
    // },
    // {
    //   title: 'Thời gian kết thúc',
    //   align: 'center',
    //   width: '150px',
    //   render: (value) => {
    //     return <TableText>{formatAppDate(value?.endTime)}</TableText>;
    //   },
    // },
    {
      title: 'Trạng thái',
      align: 'center',
      width: '15%',
      render: (value) => {
        return <TableText>CN-{value?.id}</TableText>;
      },
    },
    {
      title: 'Số cơ hội mới',
      align: 'center',
      width: '12%',
      render: (value) => {
        return <TableText>{value?.creator.name}</TableText>;
      },
    },
    {
      title: 'Tổng số khách',
      align: 'center',
      width: '12%',
      render: (value) => {
        return <TableText>{value?.creator.name}</TableText>;
      },
    },
    {
      title: 'Chức năng',
      dataIndex: '',
      key: 'x',
      align: 'center',
      width: '15%',
      render: (value) => {
        return (
          <div className="flex items-center justify-end">
            <div
              onClick={() => onEdit(value?.id)}
              className="flex items-center justify-center text-black table-actions-bt"
            >
              <SharedButton
                textColor="white"
                className="edit-btn btn-info table-actions-btn mr-3"
                onClick={() => {
                  if (isSelectModule) {
                    window.open(PATH_CAMPAIGN + `/details/${value?.id}`, '_blank');
                  } else {
                    navigate(PATH_CAMPAIGN + `/details/${value?.id}`);
                  }
                }}
              >
                <ViewIcon color={'#fff'} size={16} />
              </SharedButton>
            </div>
            <PopoverPopup
              roleDelete={enumRole.S_MANAGER}
              content={
                <StyledConfirmPopup>
                  <h5 className="text-center items-center mb-2 text-current text-base">Alert</h5>
                  <p className="text-sm">Bạn có chắc muốn xóa cửa hàng/chi nhánh này?</p>
                </StyledConfirmPopup>
              }
              isHaveConfirmButton
              onConfirm={() => {
                onDelete(value?.id);
              }}
            >
              <SharedButton
                className="btn-action btn-delete"
                backgroundColor={MAIN_THEME_DATA.mainColor}
              >
                <Trash color={'white'} />
              </SharedButton>
            </PopoverPopup>
          </div>
        );
      },
    },
  ];

  return (
    <StyledSection $isSelectModule={isSelectModule}>
      <div className="head__actions">
        <div className="search-fil">
          <ShareInput
            containerClassName="search__box"
            placeholder="Tìm kiếm theo tên"
            className="search__input"
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
                <FilterDropdownContent className="dropdown-content">
                  <ShareSelectInput
                    label="Trạng thái"
                    placeholder="Chọn trạng thái"
                    data={CAMPAIGN_STATUS_OPTIONS}
                    onChange={(value) => onChangeStatusFilter && onChangeStatusFilter(value)}
                    className="status-select"
                    containerClassName="filter-option select-filter"
                    defaultValue={payload?.status || 'Tất cả'}
                    key={`${payload?.status}-statusM`}
                    noBorderStyle
                  />
                  <div className="time-fil">
                    <div className="filter-right"></div>
                    <ShareRangeDateSelect
                      label="Thời gian"
                      placeholder={['Từ ngày', 'Đến ngày']}
                      format={dateFormat}
                      inputClassName="campaign-range-input"
                      defaultValue={[
                        payload?.fromDate && moment(payload?.fromDate),
                        payload?.toDate && moment(payload?.toDate),
                      ]}
                      onChange={(date: [any, any] | null, dateString) => {
                        LogApp('order date range', { date, dateString });
                        LogApp('order date range 2', date?.[0]?.valueOf());
                        setPayload({
                          ...payload,
                          fromDate: date?.[0]?.valueOf(),
                          toDate: date?.[1]?.valueOf(),
                        });
                      }}
                      noBorderStyle
                      showTime={false}
                    />
                  </div>
                </FilterDropdownContent>
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
      </div>
      <SharedTable columns={columns} dataSource={data} darkRowTheme />
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
            dispatch(setOrderStore(selectedStore));
            onCloseSelectModule && onCloseSelectModule();
          }}
        />
      )}
      {/* Action popup */}
      <CreateBranchModule
        open={showCreateModal}
        onClose={onCloseCreateModal}
        dataChange={dataChange}
        onDataChange={onDataChange}
      />
      <UpdateBranchModule
        open={showUpdateModal}
        id={selectedId}
        onClose={onCloseUpdateModal}
        dataChange={dataChange}
        onDataChange={onDataChange}
      />
    </StyledSection>
  );
};

const StyledSection = styled.div<{
  $isSelectModule?: boolean;
}>`
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
  .head__actions {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-bottom: 2.6rem;
    justify-content: space-between;
    .search-fil {
      width: 100%;
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
        .table-filter-btn {
          margin-right: 0.6rem;
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
    .create-button {
      font-size: 1.6rem;
    }
    .search__box {
      min-width: 20rem;
      width: fit-content;
      .search__input {
        height: 4.5rem;
      }
    }
    .create-button {
      height: 4.5rem;
      width: fit-content;
    }
  }
  .table-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .banner-image {
    /* width: 9.6rem;
    height: 9.6rem; */
    padding: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    .ant-image-img,
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .ant-image-placeholder {
      position: relative;
    }
  }
  .tiers-applied {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .tiers-item {
      padding: 0.3rem 0.6rem;
      background-color: ${(p) => p?.theme?.colors?.info};
      border-radius: 0.6rem;
      margin: 0.5rem 0.3rem;
      .tiers-name {
        font-size: 1.2rem;
        font-weight: 500;
        color: ${(p) => p?.theme?.colors?.textLight};
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
  .ant-table-cell:nth-child(5) {
    //applied tier column
    max-width: 16rem;
  }
  .btn-action {
    align-self: center;
    width: fit-content;
    padding: 0.8rem 1.8rem;
  }
  .btn-edit {
    margin: 0rem 1rem;
  }

  .banner-name {
    margin-bottom: 0;
    font-size: 1.3rem;
    /* font-weight: 500; */
  }
`;
const StyledConfirmPopup = styled.div`
  max-width: 18rem;
  .btn {
    //
  }
`;
