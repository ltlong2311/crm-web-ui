import styled from 'styled-components';
import { ColumnsType } from 'antd/lib/table';

import {
  CenterBox,
  EditBoxIcon,
  EditIcon,
  Pagination,
  Plus,
  PlusIcon,
  PopoverPopup,
  SearchIcon,
  SharedButton,
  SharedImage,
  SharedTable,
  ShareInput,
  ShareSelectInput,
  StatusTag,
  StyledBottomPagination,
  StyledUserInfo,
  TableText,
  TickBox,
  Trash,
} from '@components';
import { enumRole, enumStatus, MAIN_THEME_DATA } from '@configs';
import { IUserAccount } from '@interfaces';
import {
  CreateBannerModule,
  CreateUserAccountModule,
  UpdateStaffModule,
  UpdateUserAccountModule,
} from '@modules';
import { APP_COLORS } from '@theme';
import { Avatar } from 'antd';
import { getRandomRightColor, LogApp, randomBasicColor } from '@utils';
import { selectAuth, useAppSelector } from '@redux';

interface IProps {
  data: any[];
  selectedId?: number | string;
  currentPage: number;
  pagination: {
    totalItems: number;
    totalPages: number;
    perPage: number;
  };
  showCreateModal?: boolean;
  showUpdateModal?: boolean;
  dataChange?: number;
  onCreate: () => void;
  onDelete: (id: number | string) => void;
  onSearch: (value: string) => void;
  onEdit: (id: number | string) => void;
  onPageChange: (value: number) => void;
  updateData: () => void;
  onCloseCreateModal: () => void;
  onCloseUpdateModal?: () => void;
  onDataChange: (no: number) => void;
  onChangePageSize: (size: number) => void;
}

export const StaffManagementSection = (props: IProps) => {
  const {
    selectedId,
    showCreateModal,
    showUpdateModal,
    data,
    currentPage,
    pagination,
    dataChange,
    onCreate,
    onDelete,
    onEdit,
    onSearch,
    onPageChange,
    onCloseCreateModal,
    onCloseUpdateModal,
    onDataChange,
    onChangePageSize,
  } = props;

  const { accountInfo } = useAppSelector(selectAuth);

  LogApp({ accountInfo });

  const columns: ColumnsType<IUserAccount[]> = [
    // {
    //   title: 'No.',
    //   key: 'no',
    //   render: (text, record, index) => index + (currentPage - 1) * 10 + 1,
    //   //  sorter: (a, b) => a.no - b.no
    // },
    {
      title: 'Nhân viên',
      width: '23%',
      align: 'left',
      render: (value) => {
        return (
          <StyledUserInfo onClick={() => onEdit(value?.id)} className="user-account">
            <Avatar className="user-avatar" style={{ backgroundColor: getRandomRightColor() }}>
              {Array.from(value?.lastName)[0]}
            </Avatar>
            <div className="account-info">
              <p className="name">{value?.lastName}</p>
            </div>
          </StyledUserInfo>
        );
      },
    },
    {
      title: 'Số điện thoại',
      align: 'left',
      render: (value) => {
        return <TableText className="banner-desc">{value?.phone}</TableText>;
      },
    },
    {
      title: 'Email',
      align: 'left',
      render: (value) => {
        return <TableText className="banner-desc">{value?.email}</TableText>;
      },
    },
    {
      title: 'Bộ phận',
      align: 'left',
      render: (value) => {
        return <TableText className="banner-desc">{value?.deparment || '---'}</TableText>;
      },
    },
    {
      title: 'Chức năng',
      dataIndex: '',
      key: 'x',
      align: 'right',
      width: '15%',
      render: (value) => {
        return (
          <div className="flex items-center justify-end">
            <div
              onClick={() => onEdit(value?.id)}
              className="flex items-center justify-center text-black table-actions-bt"
            >
              <SharedButton
                className="edit-btn btn-edit table-actions-btn"
                backgroundColor={MAIN_THEME_DATA.mainColor}
                onClick={() => onEdit(value?.id)}
              >
                <EditBoxIcon size={16} color="white" />
              </SharedButton>
            </div>
            {(accountInfo?.role === enumRole.ADMIN || accountInfo?.role === enumRole.S_MANAGER) && (
              <PopoverPopup
              roleDelete={enumRole.S_MANAGER}
                content={
                  <StyledConfirmPopup>
                    <h5 className="text-center items-center mb-2 text-current text-base">
                      Xác nhận
                    </h5>
                    <p className="text-sm">Bạn có chắc muốn xóa nhân viên này?</p>
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
            )}
          </div>
        );
      },
    },
  ];

  return (
    <StyledSection>
      <div className="head__actions">
        {/* <SharedButton
          onClick={onCreate}
          className="create-button"
          backgroundColor={APP_COLORS.primary}
          text="Thêm mới"
          prevIcon={<PlusIcon size={18} color="#fff" />}
          btnStyle="pad"
        /> */}
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
      </div>
      <SharedTable columns={columns} dataSource={data} listItemStyle />
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
      <UpdateStaffModule
        id={selectedId}
        open={showUpdateModal}
        dataChange={dataChange}
        onClose={onCloseUpdateModal}
        onDataChange={onDataChange}
      />
    </StyledSection>
  );
};

const StyledSection = styled.div`
  width: 100%;
  background: ${(p) => p?.theme?.colors?.bgSection};
  padding: 20px 24px;
  .head__actions {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    justify-content: space-between;
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
  .btn {
    //
  }
`;
