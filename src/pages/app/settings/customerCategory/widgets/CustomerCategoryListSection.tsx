import styled from 'styled-components';
import { ColumnsType } from 'antd/lib/table';

import {
  EditBoxIcon,
  EditIcon,
  Pagination,
  Plus,
  PlusIcon,
  PopoverPopup,
  SearchIcon,
  SharedButton,
  SharedTable,
  ShareInput,
  ShareSelectInput,
  StyledBottomPagination,
  StyledUserInfo,
  TableText,
  TickBox,
  Trash,
} from '@components';
import { enumRole, MAIN_THEME_DATA } from '@configs';
import { IUserAccount } from '@interfaces';
import {
  CreateBannerModule,
  CreateCustomerCategoryModule,
  UpdateCustomerCategoryModule,
} from '@modules';
import { APP_COLORS } from '@theme';

interface IProps {
  data: any[];
  currentPage: number;
  selectedId?: number | string;
  pagination: {
    totalItems: number;
    totalPages: number;
    perPage: number;
  };
  showCreateModal?: boolean;
  showUpdateModal?: boolean;
  dataChange?: number;
  onCreate: () => void;
  onEdit: (id: number | string) => void;
  onDelete: (id: number | string) => void;
  onSearch: (value: string) => void;
  onPageChange: (value: number) => void;
  updateData: () => void;
  onCloseCreateModal: () => void;
  onCloseUpdateModal: () => void;
  onDataChange: (no: number) => void;
  onChangePageSize: (size: number) => void;
}

export const CustomerCategoryListSection = (props: IProps) => {
  const {
    showCreateModal,
    showUpdateModal,
    data,
    selectedId,
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

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      key: 'no',
      render: (value, record, index) => {
        return <TableText>{index + (currentPage - 1) * 10 + 1}</TableText>;
      },
      //  sorter: (a, b) => a.no - b.no
    },
    {
      title: 'Loại khách hàng',
      align: 'left',
      render: (value) => {
        return <TableText>{value?.name}</TableText>;
      },
    },
    {
      title: 'Mô tả',
      align: 'left',
      render: (value) => {
        return <TableText>{value?.desc}</TableText>;
      },
    },
    {
      title: 'Chức năng',
      dataIndex: '',
      key: 'x',
      align: 'right',
      // width: '20%',
      render: (value) => {
        return (
          <div className="flex items-center justify-end">
            <div
              onClick={() => onEdit(value?.id)}
              className="flex items-center justify-center text-black table-actions-bt"
            >
              <SharedButton
                className="edit-btn btn-edit table-actions-btn"
                onClick={() => onEdit(value?.id)}
              >
                <EditBoxIcon size={16} />
              </SharedButton>
            </div>
            <PopoverPopup
              roleDelete={enumRole.S_MANAGER}
              content={
                <StyledConfirmPopup>
                  <h5 className="text-center items-center mb-2 text-current text-base">Nhắc nhẹ</h5>
                  <p className="text-sm">Bạn có chắc muốn xóa phân loại khách hàng này?</p>
                </StyledConfirmPopup>
              }
              isHaveConfirmButton
              onConfirm={() => {
                onDelete(value?.id);
              }}
            >
              <SharedButton className="btn-action btn-delete">
                <Trash color={'white'} />
              </SharedButton>
            </PopoverPopup>
          </div>
        );
      },
    },
  ];

  return (
    <StyledBannerSection>
      <div className="head__actions">
        <SharedButton
          onClick={onCreate}
          className="create-button"
          backgroundColor={APP_COLORS.primary}
          text="Thêm mới"
          prevIcon={<PlusIcon size={18} color="#fff" />}
          btnStyle="pad"
        />
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
      {/* Action popup */}
      <CreateCustomerCategoryModule
        open={showCreateModal}
        onClose={onCloseCreateModal}
        dataChange={dataChange}
        onDataChange={onDataChange}
      />
      <UpdateCustomerCategoryModule
        open={showUpdateModal}
        id={selectedId}
        onClose={onCloseUpdateModal}
        dataChange={dataChange}
        onDataChange={onDataChange}
      />
    </StyledBannerSection>
  );
};

const StyledBannerSection = styled.div`
  .head__actions {
    display: flex;
    flex-direction: row-reverse;
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
  max-width: 150px;
  .btn {
    //
  }
`;
