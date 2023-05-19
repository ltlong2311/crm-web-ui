import styled from 'styled-components';
import { ColumnsType } from 'antd/lib/table';

import {
  EditBoxIcon,
  Pagination,
  PopoverPopup,
  SharedButton,
  SharedImage,
  SharedTable,
  ShareSelectInput,
  TickBox,
  Trash,
} from '@components';
import { enumRole, MAIN_THEME_DATA, PAGE_SIZE_OPTIONS } from '@configs';
import { IBanner } from '@interfaces';
import { CreateBannerModule } from '@modules';
import { APP_COLORS } from '@theme';

interface IProps {
  data: any[];
  currentPage: number;
  pagination: {
    count: number;
    maxPage: number;
    limit: number;
  };
  showCreateModal?: boolean;
  dataChange?: number;
  onCreate: () => void;
  onDelete: (id: number | string) => void;
  // onSearch: (value: string) => void;
  onEdit: (id: number | string) => void;
  onPageChange: (value: number) => void;
  updateData: () => void;
  onCloseCreateModal: () => void;
  onDataChange: (no: number) => void;
  onChangePageSize: (size: number) => void;
}

export const BannerListSection = (props: IProps) => {
  const {
    showCreateModal,
    data,
    currentPage,
    pagination,
    dataChange,
    onCreate,
    onDelete,
    onEdit,
    onPageChange,
    onCloseCreateModal,
    onDataChange,
    onChangePageSize,
  } = props;

  const columns: ColumnsType<any> = [
    {
      title: 'No.',
      key: 'no',
      // width: '10%',
      render: (text, record, index) => index + (currentPage - 1) * 10 + 1,
      //  sorter: (a, b) => a.no - b.no
    },
    {
      title: 'Name',
      // width: '20%',
      render: (value: IBanner) => {
        return (
          <div
            onClick={() => onEdit(value?.id)}
            className="flex items-center lg:justify-center text-black app-btn"
          >
            <p className="edit flex items-center mr-3 text-current banner-name">{value?.name}</p>
          </div>
        );
      },
    },
    {
      title: 'Description',
      // width: '20%',
      render: (value: IBanner) => {
        return <span className="banner-desc">{value?.description}</span>;
      },
    },
    { title: 'Duration', dataIndex: 'duration', key: 'duration', width: '20%' },
    {
      title: 'Tiers',
      width: 'auto',
      render: (value: IBanner) => {
        return (
          <span className="tiers-applied">
            {value?.tiers && !!value?.tiers?.length ? (
              value?.tiers?.map(
                (item, index) =>
                  !!item && (
                    <div className="tiers-item">
                      <span className="tiers-name">{item?.name}</span>
                    </div>
                  ),
              )
            ) : (
              <span className="tiers-name">All</span>
            )}
          </span>
        );
      },
    },
    {
      title: 'Image',
      width: '20%',
      render: (value: IBanner) => {
        return (
          <div className="table-box">
            <div className="banner-image">
              {/* <img src={value?.image} title={value?.name} alt="" /> */}
              <SharedImage src={value?.image} canPreview />
            </div>
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      // width: '20%',
      render: (value) => {
        return (
          <div className="flex items-center">
            <div
              onClick={() => onEdit(value?.id)}
              className="flex items-center lg:justify-center text-black table-actions-bt"
            >
              <SharedButton
                textColor="white"
                // backgroundColor={MAIN_THEME_DATA.mainColor}
                className="edit-btn btn-edit table-actions-btn"
                prevIcon={<EditBoxIcon size={16} color="white" />}
                text="Edit"
                onClick={() => onEdit(value?.id)}
              />
            </div>
            <PopoverPopup
              roleDelete={enumRole.S_MANAGER}
              content={
                <StyledConfirmPopup>
                  <h5 className="text-center items-center mb-2 text-current text-base">
                    Thông báo
                  </h5>
                  <p className="text-sm">Bạn có chắc muốn xóa?</p>
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
                prevIcon={<Trash color={'white'} />}
                textColor="white"
                text="Delete"
              />
            </PopoverPopup>
          </div>
        );
      },
    },
  ];

  return (
    <StyledBannerSection>
      <div className="head__actions">
        {/* <ShareInput
          containerClassName="search__box"
          placeholder="Tìm kiếm theo tên"
          className="search__input"
          type="text"
          onChange={(e: any) => {
            // LogApp('Check 123', e);
            onSearch(e.target.value);
          }}
          prevIcon={<SearchIcon />}
        /> */}
        <SharedButton
          onClick={onCreate}
          className="create-button"
          backgroundColor={APP_COLORS.primary}
          text="Add new"
          btnStyle="pad"
        />
      </div>
      <SharedTable columns={columns} dataSource={data} />
      <div className="bottom-pagination">
        <div className="page-size">
          {/* <span className="label">SL</span> */}
          <ShareSelectInput
            data={PAGE_SIZE_OPTIONS}
            className="page-size-select"
            defaultValue={pagination?.limit || 10}
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

      {showCreateModal && (
        <CreateBannerModule
          onClose={onCloseCreateModal}
          dataChange={dataChange}
          onDataChange={onDataChange}
        />
      )}
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
