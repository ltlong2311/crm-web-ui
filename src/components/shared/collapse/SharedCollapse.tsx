import { memo, ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Divider } from 'antd';
import { SharedButton } from '../button';
import { ChevronDownIcon } from '../../Icon';

interface IProps {
  className?: string;
  children?: string | JSX.Element | JSX.Element[];
  header?: string | JSX.Element | JSX.Element[];
  defaultOpen?: boolean;
  isDividerHeader?: boolean;
  haveDownIcon?: boolean;
  contentExpectIncHeight?: number; // chieu cao du kien co the tang them cua collapse content
}

export const SharedCollapse = memo((props: IProps) => {
  const { className, children, header, defaultOpen = false, contentExpectIncHeight = 0, isDividerHeader, haveDownIcon } = props;

  const [showCollapse, setShowCollapse] = useState<boolean>(defaultOpen);
  const [height, setHeight] = useState(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    setHeight(ref?.current?.clientHeight);
  }, []);

  return (
    <StyledCollapse className={className} $showCollapse={showCollapse} $haveDownIcon={haveDownIcon}>
      <div className="coll-head">
        {isDividerHeader ? (
          <Divider orientation="left" orientationMargin={0} plain>
            <SharedButton
              onClick={() => setShowCollapse(!showCollapse)}
              className="filters-btn"
              prevIcon={
                <ChevronDownIcon
                  color="#ccc"
                  strokeWidth={2}
                  size={18}
                  className="filters-show__icon"
                />
              }
              text={header}
            />
          </Divider>
        ) : (
          <div className="custom-coll-head" onClick={() => setShowCollapse(!showCollapse)}>
            {header}
            {haveDownIcon && (
              <ChevronDownIcon
                color="#ccc"
                strokeWidth={3}
                size={22}
                className="filters-show__icon"
              />
            )}
          </div>
        )}
      </div>
      <StyledCollapseContent $showCollapse={showCollapse} $height={height} $expectIncreaseHeight={contentExpectIncHeight}>
        <div ref={ref}>{children}</div>
      </StyledCollapseContent>
    </StyledCollapse>
  );
});

const StyledCollapse = styled.div<{
  disabled?: boolean;
  $showCollapse?: boolean;
  $haveDownIcon?: boolean;
}>`
  .coll-head {
    width: 100%;
  }
  .filters-btn {
    .text-btn {
      font-size: 1.42rem;
      font-weight: 400;
      color: ${(p) => (p?.$showCollapse ? p.theme?.colors?.button?.text : p.theme?.colors?.active)};
    }
    .filters-show__icon {
      transition: all 0.3s;
      transform: rotate(-90deg);
      ${(p) =>
        p.$showCollapse &&
        css`
          transform: rotate(0deg);
        `}
    }
  }
  .custom-coll-head {
    width: 100%;
    ${(p) =>
      p.$haveDownIcon &&
      css`
        display: flex;
        align-items: center;
        .filters-show__icon {
          margin-left: 0.3rem;
          transition: all 0.5s ease-out;
          transform: rotate(0deg);
          ${p.$showCollapse &&
          css`
            transform: rotate(-180deg);
          `}
        }
      `}
  }
`;

const StyledCollapseContent = styled.div<{
  $showCollapse?: boolean;
  $height?: number;
  $expectIncreaseHeight: number;
}>`
  width: 100%;
  position: relative;
  overflow: hidden;
  max-height: ${(p) => (p.$showCollapse ? `${p?.$height ? p.$height + p.$expectIncreaseHeight : 0}px` : '0px')};
  transition: max-height 0.2s ease-out;
`;
