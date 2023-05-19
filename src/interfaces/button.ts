import { MouseEvent, CSSProperties, ReactNode } from 'react';

export interface IButton {
  className?: string;
  disabled?: boolean;
  btnColor?: string;
  text?: string | JSX.Element | JSX.Element[];
  prevIcon?: ReactNode;
  sufIcon?: ReactNode;
  style?: CSSProperties;
  children?: ReactNode;
  typeHtml?: 'button' | 'submit' | 'reset' | undefined;
  destructive?: boolean;
  textClassName?: string;
  value?: number;
  display?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  textColor?: string;
  btnStyle?: 'basic' | 'rounded' | 'pad' | 'full';
  onClick?: (action?: any) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
}
