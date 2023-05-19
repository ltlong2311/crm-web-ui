import { APP_COLORS } from '@theme';
import React from 'react';
import styled from 'styled-components';
import { SharedButton } from '../shared';

interface IProps {
  disabledSubmit?: boolean;
  onSubmit?: (...arg: any) => void;
  onCancel?: (...arg: any) => void;
}

export const SelectConfirm = (props: IProps) => {
  const { disabledSubmit, onSubmit, onCancel } = props;
  return (
    <Wrapper>
      {!!onCancel && (
        <SharedButton
          onClick={onSubmit}
          className="cancel-select"
          backgroundColor={APP_COLORS.cyanL}
          textColor={APP_COLORS.cancel600}
          text="Hủy bỏ"
          btnStyle="pad"
        />
      )}
      {!!onSubmit && (
        <SharedButton
          onClick={onSubmit}
          className="submit-select"
          textColor="white"
          backgroundColor={APP_COLORS.primary}
          text="Đồng ý"
          btnStyle="pad"
          disabled={disabledSubmit}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 2rem;
  border-top: 1px solid ${APP_COLORS.gray300};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1.8rem 0 0;
  gap: 12px;
  .btn {
    padding: 0.9rem 1.1rem;
  }
`;
