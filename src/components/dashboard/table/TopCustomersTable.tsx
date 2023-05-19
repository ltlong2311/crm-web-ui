import { IMAGES } from '@assets';
import {
  AppTag,
  FlexWrap,
  SharedImage,
  SharedTable,
  StyledCustomerCategories,
  StyledUserInfo,
  TableText,
} from '@components';
import { APP_COLORS } from '@theme';
import { formatAppUnit, getRandomRightColor } from '@utils';
import { Avatar } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';

interface IProps {
  data?: any;
}
export const TopCustomersTable = (props: IProps) => {
  const { data } = props;

  const columns: ColumnsType<any[]> = [
    {
      title: 'Top',
      key: 'no',
      align: 'left',
      width: '50px',
      render: (text, record, index) => {
        return <TableText>{index + 1}</TableText>;
      },
    },
    {
      title: 'Khách hàng',
      width: '50%',
      align: 'left',
      render: (value) => {
        return (
          <StyledUserInfo className="user-account">
            <Avatar
              src={IMAGES.customerImage}
              className="user-avatar"
              // style={{ backgroundColor: getRandomRightColor() }}
            ></Avatar>
            <div className="account-info">
              <p className="name">{value?.lastName}</p>
              <p className="email">{value?.email}</p>
            </div>
          </StyledUserInfo>
        );
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
      title: 'Tổng chi tiêu',
      render: (value) => {
        return <TableText>{formatAppUnit(value?.totalSpent || 0)}đ</TableText>;
      },
      width: 'auto',
      align: 'right',
    },
  ];

  return (
    <Wrapper className="db-sec__content top-product by-volume">
      <SharedTable columns={columns} dataSource={data} listItemStyle />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  .ant-table-cell {
    padding: 0.6rem 0.2rem !important;
  }

  &:hover {
    overflow: auto;
  }

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar * {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar * {
      background: #a909096c;
      padding-right: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #d0d0d0d2;
      border-radius: 3px;
    }
  }
`;
