import styled, { css } from 'styled-components';
import { ColumnsType } from 'antd/lib/table';

import {
  CenterBox,
  EditBoxIcon,
  ImageBox,
  Pagination,
  PlusIcon,
  PopoverPopup,
  RoleWrapper,
  SearchIcon,
  SelectConfirm,
  SharedButton,
  SharedCheckbox,
  SharedImage,
  SharedTable,
  ShareInput,
  StyledBottomPagination,
  StyledUserInfo,
  TableText,
  Trash,
} from '@components';
import { DOT, enumRole, MAIN_THEME_DATA } from '@configs';
import {
  CreateCategoryModule,
  CreateProductModule,
  UpdateCategoryModule,
  UpdateProductModule,
} from '@modules';
import { APP_COLORS } from '@theme';
import {
  selectOrderProducts,
  selectSelectedProduct,
  selectSelectedProducts,
  setOrderProducts,
  setSelectedProduct,
  setSelectedProducts,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import { IMAGES } from '@assets';
import { formatAppUnit, LogApp } from '@utils';
import _ from 'lodash';

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
  onCloseUpdateModal?: () => void;
  onDataChange: (...arg: any) => void;
  onChangePageSize: (size: number) => void;
  onCloseSelectModule?: () => void;
}

export const ProductManagementSection = (props: IProps) => {
  const {
    isSelectModule,
    selectedId,
    showCreateModal,
    showUpdateModal,
    data,
    currentPage,
    pagination,
    dataChange,
    updateData,
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
  } = props;

  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(selectSelectedProducts) || [];
  const orderProducts = useAppSelector(selectOrderProducts);

  LogApp({ selectedProducts });

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
                      LogApp('checked', String(e?.target?.checked));
                      if (e?.target?.checked) {
                        // dispatch(setSelectedProduct(e?.target?.checked ? value : undefined));
                        // dispatch(setSelectedProducts([...selectedProducts, value]));
                        dispatch(
                          setSelectedProducts([...selectedProducts, { ...value, quantity: 1 }])
                        );
                      } else {
                        // * C1:  Prevent remove item already have quantity
                        //
                        // * C2:  Remove item already have quantity
                        const products: any = selectedProducts?.filter(
                          (item: any) => item?.id !== value?.id
                        );
                        dispatch(setSelectedProducts(products));
                      }
                    }}
                    // checked={value?.id === selectedProduct?.id}
                    checked={selectedProducts?.some((item: any) => item?.id === value?.id)}
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
      width: isSelectModule ? 'auto' : '100px',
      //  sorter: (a, b) => a.no - b.no
    },
    {
      title: 'Hình ảnh',
      align: 'center',
      width: isSelectModule ? 'auto' : '15%',
      render: (value) => {
        return (
          <CenterBox>
            <ImageBox $size={isSelectModule ? 65 : 150}>
              <SharedImage src={value?.image || IMAGES.noProduct} canPreview />
            </ImageBox>
          </CenterBox>
        );
      },
    },
    {
      title: 'Sản phẩm',
      align: 'left',
      width: '15%',
      render: (value) => {
        return <TableText>{value?.name}</TableText>;
      },
    },
    {
      title: 'Mã SP',
      align: 'left',
      width: isSelectModule ? '15%' : 'auto',
      render: (value) => {
        return <TableText>SP-{value?.id}</TableText>;
      },
    },
    {
      title: 'Số lượng',
      align: 'center',
      width: 'auto',
      render: (value) => {
        return <TableText>{value?.quantity}</TableText>;
      },
    },
    {
      title: 'Giá',
      align: 'center',
      width: isSelectModule ? '250px' : 'auto',
      render: (value) => {
        return <TableText>{formatAppUnit(value?.cost, DOT)}</TableText>;
      },
    },
    {
      title: 'Phân loại',
      align: 'center',
      width: '15%',
      render: (value) => {
        return <TableText>{value?.category?.name}</TableText>;
      },
    },
    {
      title: 'Chức năng',
      dataIndex: '',
      key: 'Actions',
      align: 'right',
      width: '15%',
      render: (value) => {
        return (
          <div className="flex items-center justify-end">
            <RoleWrapper role={enumRole.B_MANAGER}>
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
            </RoleWrapper>

            {!isSelectModule && (
              <PopoverPopup
                roleDelete={enumRole.S_MANAGER}
                content={
                  <StyledConfirmPopup>
                    <h5 className="text-center items-center mb-2 text-current text-base">Alert</h5>
                    <p className="text-sm">Bạn có chắc muốn xóa loại sản phẩm này?</p>
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
    <StyledSection $isSelectModule={isSelectModule}>
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
      <SharedTable
        columns={
          // isSelectModule
          //   ? _.filter(columns, (current) => {
          //       return current?.key !== 'Actions';
          //     })
          //   : columns
          columns
        }
        dataSource={data}
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
      {isSelectModule && (
        <SelectConfirm
          onCancel={onCloseSelectModule}
          onSubmit={() => {
            onCloseSelectModule && onCloseSelectModule();
            // if (!selectedProduct) return;
            // const newProduct = { ...selectedProduct, quantity: 1 };
            // dispatch(setOrderProducts([...orderProducts, newProduct]));
            // * C1:  Prevent remove item already have quantity
            // dispatch(setOrderProducts(selectedProducts));
            // * C2:  Remove item already have quantity
            const selectedIds = selectedProducts?.map((item: any) => item?.id) as number[];
            const oldIds = orderProducts?.map((item: any) => item?.id) as number[];
            // ? items not change
            const noChangeItems = orderProducts?.filter((item: any) =>
              selectedIds?.includes(item?.id)
            );
            // ? items new
            const newItems =
              selectedProducts?.filter((item: any) => !oldIds.includes(item?.id)) || [];
            // ? items remove (not focus)
            // const removeItems = orderProducts?.filter((item: any) => !selectedIds.includes(item?.id));
            const newOderProducts = noChangeItems?.concat(newItems);
            dispatch(setOrderProducts(newOderProducts));
          }}
          // disabledSubmit={!selectedProduct}
        />
      )}
      {/* Action popup */}
      <CreateProductModule
        open={showCreateModal}
        onClose={onCloseCreateModal}
        dataChange={dataChange}
        onDataChange={updateData}
      />
      <UpdateProductModule
        open={showUpdateModal}
        id={selectedId}
        onClose={onCloseUpdateModal}
        dataChange={dataChange}
        onDataChange={updateData}
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
    padding: 0.6rem 0.8rem;
  }
`;
