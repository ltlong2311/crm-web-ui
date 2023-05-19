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
import { LogApp, calcOrderTotalAmount, formatAppUnit } from '@utils';
import _, { debounce } from 'lodash';

interface IProps {
  data?: any;
  onAddProduct?: () => void;
}

export const AddChanceProductTable: React.FC<IProps> = (props) => {
  const { data, onAddProduct } = props;
  const dispatch = useAppDispatch();
  const orderProducts = useAppSelector(selectOrderProducts);

  const columns: any = [
    {
      title: 'Sản phẩm',
      align: 'left',
      width: '25%',
      render: (value: any) => {
        return (
          <FlexWrap>
            <ImageBox $size={50}>
              <SharedImage src={value?.image} canPreview />
            </ImageBox>
            <TableText>{value?.name}</TableText>
          </FlexWrap>
        );
      },
    },
    {
      title: 'Mã SP',
      width: '15%',
      align: 'left',
      render: (value: any) => {
        return <TableText>SP-{value?.id}</TableText>;
      },
    },
    {
      title: 'Giá',
      width: '20%',
      align: 'left',
      render: (value: any) => {
        return <TableText>{value?.cost}</TableText>;
      },
    },
    {
      title: 'Số lượng',
      width: '100px',
      render: (value: any) => {
        return (
          <TableText>
            <ShareInput
              defaultValue={value?.quantity}
              name="quantity"
              className="quantity-input"
              min={1}
              step={1}
              type="number"
              onChange={debounce((e: any) => {
                const productList: any = _.cloneDeep(orderProducts);
                const currentProductIndex = productList?.findIndex(
                  (element: any) => element?.id === value?.id
                );
                if (currentProductIndex === -1) return;
                productList[currentProductIndex].quantity = e?.target?.value;
                LogApp('CHECK P02', productList);
                dispatch(setOrderProducts(productList));
              }, 500)}
            />
          </TableText>
        );
      },
    },
    {
      title: 'Tổng giá',
      align: 'center',
      render: (value: any) => {
        return <TableText>{value?.cost * value?.quantity}</TableText>;
      },
    },
    {
      title: 'Chức năng',
      align: 'center',
      width: '120px',
      render: (value: any) => {
        return (
          <CenterBox>
            <SharedButton
              className="btn-action"
              onClick={() => {
                const newOrderProducts = orderProducts?.filter(
                  (item: any) => item?.id !== value?.id
                );
                dispatch(setOrderProducts(newOrderProducts));
              }}
            >
              <Trash color={APP_COLORS.gray600} />
            </SharedButton>
          </CenterBox>
        );
      },
    },
  ];
  return (
    <Wrapper className="order-products__section">
      <SharedTable columns={columns} dataSource={data} listItemStyle darkRowTheme={false} />
      <FlexWrap className="sub_section">
        <div className="add-products" onClick={onAddProduct}>
          <span className="plus">+</span> Thêm sản phẩm
        </div>
        <div className="order-prod__total">
          <p className="label">Tổng:</p>
          <p className="value">{formatAppUnit(calcOrderTotalAmount(orderProducts) || 0)}đ</p>
        </div>
      </FlexWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  .quantity-input {
    input {
      text-align: center;
      padding: 0.6rem 0.8rem;
    }
  }
  .sub_section {
    padding: 2rem 0;
    gap: 60px;
    align-items: flex-start;
    .add-products {
      flex: 6;
      padding-left: 1rem;
      color: ${APP_COLORS.primary};
      font-size: 1.4rem;
      font-weight: 600;
      color: ${APP_COLORS.primary};
      cursor: pointer;
      .plus {
        font-size: 1.6rem;
      }
    }
    .order-prod__total {
      flex: 4;
      padding-right: 1.8rem;
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
