import { MAIN_THEME_DATA } from '@configs';
import { ICon } from '@interfaces';

const RevenueDashboardIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 36 36"
      fill={color}
      {...props}
    >
      <path
        className="clr-i-outline clr-i-outline-path-1"
        d="M32 8H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Zm0 6a4.25 4.25 0 0 1-3.9-4H32Zm0 1.62v4.83A5.87 5.87 0 0 0 26.49 26h-17A5.87 5.87 0 0 0 4 20.44V15.6A5.87 5.87 0 0 0 9.51 10h17A5.87 5.87 0 0 0 32 15.6ZM7.9 10A4.25 4.25 0 0 1 4 14v-4ZM4 22.06A4.25 4.25 0 0 1 7.9 26H4ZM28.1 26a4.25 4.25 0 0 1 3.9-3.94V26Z"
      />
      <path
        className="clr-i-outline clr-i-outline-path-2"
        d="M18 10.85c-3.47 0-6.3 3.21-6.3 7.15s2.83 7.15 6.3 7.15 6.3-3.21 6.3-7.15-2.83-7.15-6.3-7.15Zm0 12.69c-2.59 0-4.7-2.49-4.7-5.55s2.11-5.55 4.7-5.55 4.7 2.49 4.7 5.55-2.11 5.56-4.7 5.56Z"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  );
};

export { RevenueDashboardIcon };
