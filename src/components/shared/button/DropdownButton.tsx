import React, { memo, useRef, useState } from 'react';
import { SharedButton } from './SharedButton';
import styled, { css } from 'styled-components';
import { FilterDropdown, FilterIcon, SharedDropdown } from '@components';
import { APP_COLORS } from '@theme';
import { useOnClickOutside } from '@utils';
import { Divider } from 'antd';

interface IProps {
  text?: string;
  btnClassName?: string;
  className?: string;
  isFilter?: boolean;
  prevIcon?: React.ReactNode;
  sufIcon?: React.ReactNode;
  btnContent?: React.ReactNode;
  dropdown?: React.ReactNode;
  btnBackgroundColor?: string;
  btnTextColor?: string;
  dropdownPlacement?: 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
  closeDropdownOnSelect?: boolean;
  onApply?: (...arg: any) => void;
  onReset?: (...arg: any) => void;
}

export const DropdownButton: React.FC<IProps> = memo((props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const {
    text,
    className,
    btnClassName,
    isFilter,
    btnContent,
    prevIcon,
    sufIcon,
    btnBackgroundColor,
    btnTextColor,
    dropdown,
    dropdownPlacement,
    closeDropdownOnSelect,
    onApply,
    onReset,
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => {
    setOpenDropdown(false);
  });

  const Dropdown = () => {
    return isFilter ? (
      <FilterDropdown ref={dropdownRef}>
        <div className="dropdown-title">Bộ lọc tùy chọn</div>
        <Divider />
        {dropdown}
        <div className="dropdown-actions">
          <SharedButton
            onClick={() => {
              setOpenDropdown(false);
              onApply && onApply();
            }}
            className="apply-filter-button"
            backgroundColor={APP_COLORS.primary}
            text="Áp dụng"
            btnStyle="pad"
          />
          <SharedButton
            onClick={() => {
              setOpenDropdown(false);
              onReset && onReset();
            }}
            className="cancel-filter-button"
            backgroundColor={APP_COLORS.cyanL}
            textColor={APP_COLORS.cancel600}
            text="Reset"
            btnStyle="pad"
          />
        </div>
      </FilterDropdown>
    ) : (
      <div
        onClick={() => {
          closeDropdownOnSelect && setOpenDropdown(false);
        }}
        ref={dropdownRef}
      >
        {dropdown}
      </div>
    );
  };

  return (
    <SharedDropdown
      dropdown={<Dropdown />}
      overlayClassName="filter__dropdown ignore-onClickOutside"
      open={openDropdown}
      placement={dropdownPlacement}
    >
      <StyledDropdownBtn
        $openDropdown={openDropdown}
        className={`dropdown-contain${className ? ' '.concat(className) : ''}`}
      >
        {isFilter ? (
          <SharedButton
            onClick={() => setOpenDropdown(!openDropdown)}
            className={`dropdown-btn ignore-onClickOutside filter-btn${
              btnClassName ? ' '.concat(btnClassName) : ''
            }`}
            text={'Lọc'}
            prevIcon={<FilterIcon />}
            btnStyle="pad"
          >
            {btnContent}
          </SharedButton>
        ) : (
          <SharedButton
            onClick={() => setOpenDropdown(!openDropdown)}
            className={`dropdown-button ignore-onClickOutside${
              className ? ' '.concat(className) : ''
            }`}
            text={text}
            backgroundColor={btnBackgroundColor}
            textColor={btnTextColor}
            prevIcon={prevIcon}
            sufIcon={sufIcon}
            btnStyle="pad"
          >
            {btnContent}
          </SharedButton>
        )}
      </StyledDropdownBtn>
    </SharedDropdown>
  );
});

const StyledDropdownBtn = styled.div<{ $openDropdown: boolean }>`
  .filter-btn {
    background: #f1faff;
    .text-btn {
      color: ${APP_COLORS.primary};
      font-size: 1.6rem;
      font-weight: 500;
    }
    &:hover {
      opacity: 1;
      background: ${APP_COLORS.primary};
      .text-btn {
        color: #fff;
      }
      .prev-icon {
        svg path {
          fill: #f1faff;
        }
      }
    }
  }
  ${({ $openDropdown }) =>
    $openDropdown &&
    css`
      .filter-btn {
        opacity: 1;
        background: ${APP_COLORS.primary};
        .text-btn {
          color: #fff;
        }
        .prev-icon {
          svg path {
            fill: #f1faff;
          }
        }
      }
    `}
`;
