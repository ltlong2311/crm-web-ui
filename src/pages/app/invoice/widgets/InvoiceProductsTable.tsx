import React from 'react';
import styled from 'styled-components';

import { APP_COLORS } from '@theme';
import {
  CenterBox,
  FlexActions,
  FlexWrap,
  ImageBox,
  ShareInput,
  SharedButton,
  SharedImage,
  SharedTable,
  TableText,
  Trash,
} from '@components';
import { selectOrderProducts, setOrderProducts, useAppDispatch, useAppSelector } from '@redux';
import { calcOrderTotalAmount, formatAppUnit } from '@utils';

interface IProps {
  data?: any;
  onAddProduct?: () => void;
}

export const InvoiceProductTable: React.FC<IProps> = (props) => {
  const { data, onAddProduct } = props;
  const dispatch = useAppDispatch();
  const orderProducts = useAppSelector(selectOrderProducts);

  const columns: any = [
    {
      title: 'Sản phẩm',
      align: 'left',
      width: '25%',
      render: (value: any) => {
        return <TableText className="tb__text">{value?.name}</TableText>;
      },
    },
    {
      title: 'Mã SP',
      width: '15%',
      align: 'right',
      render: (value: any) => {
        return <TableText className="tb__text">SP-{value?.id}</TableText>;
      },
    },
    // {
    //   title: 'Giá',
    //   width: '20%',
    //   align: 'left',
    //   render: (value: any) => {
    //     return <TableText className='tb__text'>{value?.cost}</TableText>;
    //   },
    // },
    {
      title: 'Số lượng',
      width: 'auto',
      render: (value: any) => {
        return <TableText className="tb__text">{value?.quantity}</TableText>;
      },
    },
    {
      title: 'Tổng giá',
      align: 'right',
      render: (value: any) => {
        return (
          <TableText className="tb__text tb-total__value" $strong>
            {formatAppUnit(value?.cost * value?.quantity || 0)} đ
          </TableText>
        );
      },
    },
  ];
  return (
    <Wrapper className="order-products__section">
      <SharedTable columns={columns} dataSource={data} listItemStyle darkRowTheme={false} />
      <FlexWrap className="sub_section">
        <div className="rl-place"></div>
        <div className="order-prod__total">
          <p className="label">Tổng:</p>
          <p className="value">{formatAppUnit(calcOrderTotalAmount(orderProducts))} đ</p>
        </div>
      </FlexWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  .table-wrapper {
    .ant-table-thead > tr > th {
      color: ${APP_COLORS.gray800};
      font-size: 1.6rem;
      border-bottom: 1px solid #dedede;
      padding: 16px 0;
    }
    .ant-table-tbody > tr > td {
      padding: 16px 0;
    }
    .ant-table-tbody > tr {
      &:not(:last-child) {
        & > td {
          border-bottom: none;
        }
      }
    }
    .tb__text {
      font-size: 1.5rem;
    }
    .tb-total__value {
      color: ${APP_COLORS.gray700};
    }
  }
  .sub_section {
    padding: 2rem 0;
    gap: 60px;
    align-items: flex-start;
    .rl-place {
      flex: 6;
      padding-left: 1rem;
    }
    .order-prod__total {
      flex: 4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        font-size: 2rem;
        font-weight: 600;
        color: ${APP_COLORS.teal600};
        margin-bottom: 0;
      }
      .value {
        font-size: 2rem;
        font-weight: 600;
        color: ${APP_COLORS.teal900};
        margin-bottom: 0;
      }
    }
  }
`;
