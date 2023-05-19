import styled from 'styled-components';
import { ColumnsType } from 'antd/lib/table';

import {
  CenterBox,
  EditBoxIcon,
  EditIcon,
  EmptyData,
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
import { enumStatus, MAIN_THEME_DATA } from '@configs';
import { IUserAccount } from '@interfaces';
import { CreateBannerModule, CreateUserAccountModule, UpdateUserAccountModule } from '@modules';
import { APP_COLORS } from '@theme';
import { Avatar } from 'antd';
import { getRandomRightColor, LogApp, randomBasicColor } from '@utils';

interface IProps {
  data: any[];
  selectedId?: number | string;
  currentPage: number;
  pagination: {
    totalItems: number;
    totalPages: number;
    perPage: number;
  };
  dataChange?: number;
  onSearch?: (value: string) => void;
  onPageChange: (value: number) => void;
  updateData?: () => void;
  onDataChange: (no: number) => void;
  onChangePageSize?: (size: number) => void;
}

export const CustomerInvoices = (props: IProps) => {
  const {
    selectedId,
    data,
    currentPage,
    pagination,
    dataChange,
    onSearch,
    onPageChange,
    onChangePageSize,
  } = props;

  const columns: ColumnsType<IUserAccount[]> = [
    {
      title: 'Mã đơn hàng',
      width: '23%',
      align: 'left',
      render: (value) => {
        return (
          <StyledUserInfo>
            <p className="name">{value?.lastName}</p>
          </StyledUserInfo>
        );
      },
    },
    {
      title: 'Sản phẩm',
      align: 'left',
      render: (value) => {
        return <TableText className="banner-desc">{value?.username}</TableText>;
      },
    },
    {
      title: 'Trạng thái',
      align: 'center',
      render: (value) => {
        return (
          <CenterBox>
            <StatusTag status={value?.status} />
          </CenterBox>
        );
      },
    },
    {
      title: 'Tổng giá',
      align: 'center',
      render: (value) => {
        return (
          <CenterBox>
            <StatusTag status={value?.status} />
          </CenterBox>
        );
      },
    },
  ];

  return (
    <div className="event-logs-page">
      <StyledSection>
        <div className="head">
          <h2 className="title">Hóa đơn</h2>
        </div>
        <SharedTable columns={columns} noDataView={<EmptyData />} dataSource={data} listItemStyle />
        <StyledBottomPagination>
          <Pagination
            className="pagination pt-2"
            currentPage={currentPage}
            totalCount={pagination.totalItems}
            pageSize={pagination.perPage}
            onChangePageSize={() => {}}
            onPageChange={(page: number) => {
              onPageChange(page);
            }}
          />
        </StyledBottomPagination>
      </StyledSection>
    </div>
  );
};

const StyledSection = styled.div`
  margin-top: 1.2rem;
  position: relative;
  width: 100%;
  border-radius: 8px;
  height: fit-content;
  background-color: #fff;
  margin-bottom: 24px;
  box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  padding: 2.8rem 2.3rem;
  .head {
    .title {
      font-size: 2rem;
      font-weight: 600;
      color: ${APP_COLORS.gray800};
      margin-bottom: 1.5rem;
    }
    .desc {
      font-size: 1.5rem;
      font-weight: 400;
      color: ${APP_COLORS.gray600};
      /* margin-bottom: 1.8rem; */
    }
  }
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
  .btn-action {
    align-self: center;
    width: fit-content;
    padding: 0.8rem 1.8rem;
  }
  .btn-edit {
    margin: 0rem 1rem;
  }
`;
const StyledConfirmPopup = styled.div`
  .btn {
    //
  }
`;
