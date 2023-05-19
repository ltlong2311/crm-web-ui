import { useTheme } from '@theme';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SharedButton } from './shared';
import { enumRole } from '@configs';
import { selectAuth, useAppSelector } from '@redux';

interface IProps {
  isHaveConfirmButton?: boolean;
  content?: React.ReactNode;
  children?: React.ReactNode;
  trigger?: 'click' | 'hover';
  title?: React.ReactNode;
  placement?: TooltipPlacement;
  overlayClassName?: string;
  allowOpen?: boolean;
  roleDelete?: enumRole;
  onConfirm?: () => void;
}

export const PopoverPopup = (props: IProps) => {
  const {
    content,
    isHaveConfirmButton,
    trigger = 'click',
    title,
    placement,
    children,
    overlayClassName,
    allowOpen = true,
    roleDelete,
    onConfirm,
  } = props;
  const { theme } = useTheme();
  const { accountInfo } = useAppSelector(selectAuth);
  const role = accountInfo?.role;
  const [open, setOpen] = useState<boolean>(false);

  const onHide = () => {
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    allowOpen && setOpen(open);
  };

  if (roleDelete === enumRole.S_MANAGER) {
    if ((role === enumRole.B_MANAGER || role === enumRole.STAFF)) return <></>;
  }
  if (roleDelete === enumRole.B_MANAGER) {
    if (role === enumRole.STAFF) return <></>;
  }

  return (
    <Popover
      open={open}
      trigger={trigger}
      onOpenChange={handleOpenChange}
      title={title}
      placement={placement}
      overlayClassName={overlayClassName}
      content={
        <StyledPopover>
          {content}
          {isHaveConfirmButton && (
            <div className="confirm-buttons mt-2 flex items-center space-x-4">
              <SharedButton
                onClick={onHide}
                className="text-button"
                textColor="white"
                backgroundColor={theme?.colors?.secondary}
                text="Hủy bỏ"
                btnStyle="pad"
              />
              <SharedButton
                onClick={() => {
                  onConfirm && onConfirm();
                  onHide();
                }}
                className="text-button"
                textColor="white"
                backgroundColor={theme?.colors?.info}
                text="Có"
                btnStyle="pad"
              />
            </div>
          )}
        </StyledPopover>
      }
    >
      {children}
    </Popover>
  );
};

const StyledPopover = styled.div`
  .confirm-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      padding: 0.6rem 0.8rem;
      min-width: 6.9rem;
    }
  }
  .sketch-picker {
    background: none !important;
    box-shadow: none !important;
  }
`;
