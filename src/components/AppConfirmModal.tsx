import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';

interface IProps {
  title?: string;
  text?: string;
  open?: boolean;
  onClose?: () => void;
  onOK?: (...arg: any) => void;
  onCancel?: () => void;
}

export const AppConfirmModal: React.FC<IProps> = (props) => {
  const { title = 'Xác nhận', text, open = false, onClose, onOK, onCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    onOK && onOK();
    setTimeout(() => {
      onClose && onClose();
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    onCancel && onCancel();
    onClose && onClose();
  };

  return (
    <Wrapper>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <ModalText>{text}</ModalText>
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ModalText = styled.p``;
