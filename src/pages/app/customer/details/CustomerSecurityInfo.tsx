import React from 'react';
import { Divider } from 'antd';
import styled, { css } from 'styled-components';

import { APP_COLORS } from '@theme';
import {
  EditIcon,
  FlexActions,
  PenIcon,
  PenOutlineIcon,
  ShareInput,
  SharedButton,
} from '@components';

interface IProps {
  info?: any;
  data?: any;
  showEdit: number;
  onChangeInfo?: (value: any) => void;
  onChangeShowEdit: (key: number) => void;
  onSaveChange?: (saveType: 'email' | 'phone' | 'taxCode') => void;
}

enum enumShowEdit {
  PHONE = 1,
  EMAIL,
  TAX_CODE,
}

export const CustomerSecurityInfo: React.FC<IProps> = (props) => {
  const { data, info, showEdit, onChangeInfo, onChangeShowEdit, onSaveChange } = props;
  return (
    <CustomerSecurityInfoPage>
      <div className="security-info">
        <h3 className="title">Thông tin thiết yếu</h3>
        <div className="content">
          <StyledInfoItem $isEdit={showEdit === enumShowEdit.PHONE} $first>
            <h3 className="label">Số điện thoại</h3>
            {showEdit === enumShowEdit.PHONE ? (
              <EditWrapper>
                <ShareInput
                  placeholder="Số điện thoại mới"
                  name="phone"
                  containerClassName="input-contain"
                  className="input"
                  type="number"
                  required
                  errors={''}
                  onChange={(e: any) => {
                    onChangeInfo &&
                      onChangeInfo({
                        ...info,
                        phone: e?.target?.value,
                      });
                  }}
                  defaultValue={data?.phone}
                  key={`phone${data?.phone}`}
                  noBorderStyle
                />
                <div className="desc">
                  Số điện thoại là thông tin quan trọng để xác định và liên hệ khách hàng, hãy cẩn
                  trọng khi thay đổi!
                </div>
                <FlexActions>
                  <SharedButton
                    onClick={() => {
                      onChangeShowEdit(0);
                      onSaveChange && onSaveChange('phone');
                    }}
                    className="save-button"
                    backgroundColor={APP_COLORS.primary}
                    text="Lưu"
                    btnStyle="pad"
                  />
                  <SharedButton
                    onClick={() => {
                      onChangeInfo &&
                        onChangeInfo({
                          ...info,
                          phone: data?.phone,
                        });
                      onChangeShowEdit(0);
                    }}
                    className="cancel-button"
                    backgroundColor={APP_COLORS.cyanL}
                    textColor={APP_COLORS.cancel600}
                    text="Hủy bỏ"
                    btnStyle="pad"
                  />
                </FlexActions>
              </EditWrapper>
            ) : (
              <>
                <p className="value">{data?.phone}</p>
                <EditButton
                  onClick={() => onChangeShowEdit(enumShowEdit.PHONE)}
                  className="edit-btn"
                >
                  <PenIcon size={18} color={APP_COLORS.gray600} />
                </EditButton>
              </>
            )}
          </StyledInfoItem>
          <StyledInfoItem $isEdit={showEdit === enumShowEdit.EMAIL}>
            <h3 className="label">Email</h3>
            {showEdit === enumShowEdit.EMAIL ? (
              <EditWrapper>
                <ShareInput
                  placeholder="Nhập email mới"
                  name="email"
                  containerClassName="input-contain"
                  className="input"
                  type="email"
                  required
                  errors={''}
                  onChange={(e: any) => {
                    onChangeInfo &&
                      onChangeInfo({
                        ...info,
                        email: e?.target?.value,
                      });
                  }}
                  defaultValue={data?.email}
                  key={`email${data?.email}`}
                  noBorderStyle
                />
                <div className="desc">
                  Lưu ý: Địa chỉ email nên là hợp lệ để việc xác minh được chính xác.
                </div>
                <FlexActions>
                  <SharedButton
                    onClick={() => {
                      onChangeShowEdit(0);
                      onSaveChange && onSaveChange('email');
                    }}
                    className="save-button"
                    backgroundColor={APP_COLORS.primary}
                    text="Lưu"
                    btnStyle="pad"
                  />
                  <SharedButton
                    onClick={() => {
                      onChangeInfo &&
                        onChangeInfo({
                          ...info,
                          email: data?.email,
                        });
                      onChangeShowEdit(0);
                    }}
                    className="cancel-button"
                    backgroundColor={APP_COLORS.cyanL}
                    textColor={APP_COLORS.cancel600}
                    text="Hủy bỏ"
                    btnStyle="pad"
                  />
                </FlexActions>
              </EditWrapper>
            ) : (
              <>
                <p className="value">{info?.email || 'Chưa cập nhật'}</p>
                <EditButton
                  onClick={() => onChangeShowEdit(enumShowEdit.EMAIL)}
                  className="edit-btn"
                >
                  <PenIcon size={18} color={APP_COLORS.gray600} />
                </EditButton>
              </>
            )}
          </StyledInfoItem>
          <StyledInfoItem $isEdit={showEdit === enumShowEdit.TAX_CODE}>
            <h3 className="label">Mã số thuế</h3>
            {showEdit === enumShowEdit.TAX_CODE ? (
              <EditWrapper>
                <ShareInput
                  placeholder="Nhập mã số thuế mới"
                  name="tax-code"
                  containerClassName="input-contain"
                  className="input"
                  type="number"
                  required
                  errors={''}
                  noBorderStyle
                  onChange={(e: any) => {
                    onChangeInfo &&
                      onChangeInfo({
                        ...info,
                        taxCode: e?.target?.value,
                      });
                  }}
                  defaultValue={data?.taxCode}
                  key={`taxCode${data?.taxCode}`}
                />
                <div className="desc">Đảm bảo rằng mã số thuế là chính xác.</div>
                <FlexActions>
                  <SharedButton
                    onClick={() => {
                      onChangeShowEdit(0);
                      onSaveChange && onSaveChange('taxCode');
                    }}
                    className="save-button"
                    backgroundColor={APP_COLORS.primary}
                    text="Lưu"
                    btnStyle="pad"
                  />
                  <SharedButton
                    onClick={() => {
                      onChangeInfo &&
                        onChangeInfo({
                          ...info,
                          taxCode: info?.taxCode,
                        });
                      onChangeShowEdit(0);
                    }}
                    className="cancel-button"
                    backgroundColor={APP_COLORS.cyanL}
                    textColor={APP_COLORS.cancel600}
                    text="Hủy bỏ"
                    btnStyle="pad"
                  />
                </FlexActions>
              </EditWrapper>
            ) : (
              <>
                <p className="value">
                  {data?.taxCode ? data?.taxCode?.slice(0, 3)?.concat('*****') : 'Chưa cập nhật'}
                </p>
                <EditButton
                  onClick={() => onChangeShowEdit(enumShowEdit.TAX_CODE)}
                  className="edit-btn"
                >
                  <PenIcon size={18} color={APP_COLORS.gray600} />
                </EditButton>
              </>
            )}
          </StyledInfoItem>
        </div>
      </div>
    </CustomerSecurityInfoPage>
  );
};

const CustomerSecurityInfoPage = styled.div`
  margin-top: 1.2rem;
  .security-info {
    position: relative;
    width: 100%;
    border-radius: 8px;
    height: fit-content;
    background-color: #fff;
    margin-bottom: 24px;
    box-shadow: 0px 0px 20px 0px rgba(76, 87, 125, 0.02);
    box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
    padding: 3.2rem 2.8rem;
    .title {
      font-size: 2rem;
      font-weight: 600;
      color: ${APP_COLORS.gray800};
      margin-bottom: 3.2rem;
    }
    .desc {
      font-size: 1.5rem;
      font-weight: 400;
      color: ${APP_COLORS.gray600};
      /* margin-bottom: 1.8rem; */
    }
    .content {
    }
  }
  .ant-collapse-header {
    padding: 0 !important;
    align-items: center !important;
  }
  .ant-collapse-item {
    &:last-child {
      margin-bottom: 0 !important;
    }
  }
  .ant-collapse-expand-icon {
    .edit-btn {
      margin-top: 12px !important;
    }
  }
`;

const EditButton = styled.div<{
  $active?: boolean;
}>`
  border-radius: 6px;
  padding: 0.8rem;
  &:hover {
    background-color: ${APP_COLORS.primaryLight};
    svg path {
      fill: ${APP_COLORS.primary};
      stroke-width: 3px;
    }
  }
`;

const StyledInfoItem = styled.div<{
  $first?: boolean;
  $isEdit?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 2.4rem 0;
  .label {
    width: 190px;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${APP_COLORS.gray600};
  }
  .value {
    width: calc(100% - 190px - 3.5rem);
    margin-bottom: 0;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${APP_COLORS.gray600};
  }
  ${(p) =>
    !p?.$first &&
    css`
      border-top: 1px dashed #f4f4f4;
    `}
  ${(p) =>
    p?.$isEdit &&
    css`
      align-items: flex-start;
      .label {
        line-height: 45px;
      }
    `}
`;

const EditWrapper = styled.div`
  .input-contain {
    width: 420px;
    margin-bottom: 16px;
  }
  .desc {
    width: 420px;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${APP_COLORS.gray600};
    margin-bottom: 16px;
  }
`;
