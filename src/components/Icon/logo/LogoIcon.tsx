import { AUTH_THEME_COLOR, MAIN_THEME_DATA } from '@configs';
import { ICon } from '@interfaces';

const LogoCircleIcon = (props: ICon) => {
  const { onClick, width = 20, height = 22.5, className, color = '#fff' } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 2000 2250"
      className={className}
      {...props}
    >
      <g transform="matrix(1,0,0,1,0,0)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 320 360"
          data-background-color="#0080ff"
          preserveAspectRatio="xMidYMid meet"
          height={2250}
          width={2000}
        >
          <g id="tight-bounds" transform="matrix(1,0,0,1,0,0)">
            <svg viewBox="0 0 320 360" height={360} width={320}>
              <g>
                <svg />
              </g>
              <g>
                <svg viewBox="0 0 320 360" height={360} width={320}>
                  <g>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M160 42.18c72.417 0 131.943 56.114 137.63 127.014h22.37c-1.137-17.82-5.308-34.882-12.133-51.185-7.962-18.957-19.716-36.398-34.502-50.805-14.787-14.787-31.848-26.161-50.806-34.503-20.095-8.341-40.948-12.891-62.559-12.891-21.611 0-42.464 4.171-62.559 12.512-18.957 7.962-36.398 19.716-50.806 34.503-14.787 14.787-26.161 31.848-34.502 50.805-6.825 16.303-10.995 33.744-12.133 51.185h22.37c5.687-70.521 65.213-126.635 137.63-126.635zM160 318.199c-72.417 0-131.943-56.114-137.63-127.014h-22.37c1.137 17.82 5.308 34.882 12.133 51.185 7.962 18.957 19.716 36.398 34.502 50.805 14.787 14.787 31.848 26.161 50.806 34.503 19.716 8.341 40.569 12.512 62.559 12.512 21.991 0 42.464-4.171 62.559-12.512 18.957-7.962 36.398-19.716 50.806-34.503 14.787-14.787 26.161-31.848 34.502-50.805 6.825-16.303 10.995-33.744 12.133-51.185h-22.37c-5.687 70.9-65.213 127.014-137.63 127.014z"
                      fill={color}
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth={1}
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit={10}
                      strokeDasharray=""
                      strokeDashoffset={0}
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{
                        mixBlendMode: 'normal',
                      }}
                      data-fill-palette-color="tertiary"
                    />
                  </g>
                  <g transform="matrix(1,0,0,1,56,149.4978883153449)">
                    <svg
                      viewBox="0 0 208 61.004223369310175"
                      height={61.004223369310175}
                      width={208}
                    >
                      <g>
                        <svg
                          viewBox="0 0 208 61.004223369310175"
                          height={61.004223369310175}
                          width={208}
                        >
                          <g>
                            <svg
                              viewBox="0 0 208 61.004223369310175"
                              height={61.004223369310175}
                              width={208}
                            >
                              <g>
                                <svg
                                  viewBox="0 0 208 61.004223369310175"
                                  height={61.004223369310175}
                                  width={208}
                                >
                                  <g>
                                    <svg
                                      viewBox="0 0 208 61.004223369310175"
                                      height={61.004223369310175}
                                      width={208}
                                    >
                                      <g>
                                        <svg
                                          viewBox="0 0 208 61.004223369310175"
                                          height={61.004223369310175}
                                          width={208}
                                        >
                                          <g transform="matrix(1,0,0,1,0,0)">
                                            <svg
                                              width={208}
                                              viewBox="-12.5 -31.25 106.55000305175781 31.25"
                                              height={61.004223369310175}
                                              data-palette-color={color}
                                            >
                                              <path
                                                d="M30.6-8L29.2 0 10.2 0 15.7-31.25 25.2-31.25 21.1-8 30.6-8ZM9.1-2.4L8.7-0.15-12.5-2.4 9.1-2.4ZM10.8-12.05L10.4-9.8-10.8-12.05 10.8-12.05ZM11.65-16.85L11.25-14.6-9.95-16.85 11.65-16.85ZM12.5-21.65L12.1-19.4-9.1-21.65 12.5-21.65ZM13.3-26.45L12.95-24.2-8.25-26.45 13.3-26.45ZM9.95-7.25L9.55-5-11.65-7.25 9.95-7.25ZM14.15-31.25L13.75-29-7.4-31.25 14.15-31.25ZM65.35-31.25L63.9-23.25 57-23.25 52.95 0 43.45 0 47.5-23.25 40.65-23.25 42.1-31.25 65.35-31.25ZM42.3-2.4L41.9-0.15 20.7-2.4 42.3-2.4ZM44-12.05L43.6-9.8 22.4-12.05 44-12.05ZM44.85-16.85L44.45-14.6 23.25-16.85 44.85-16.85ZM45.7-21.65L45.3-19.4 24.1-21.65 45.7-21.65ZM43.15-7.25L42.75-5 21.55-7.25 43.15-7.25ZM39.65-26.45L39.3-24.2 18.1-26.45 39.65-26.45ZM40.5-31.25L40.1-29 18.95-31.25 40.5-31.25ZM94.05-8L92.65 0 73.65 0 79.15-31.25 88.65-31.25 84.55-8 94.05-8ZM72.55-2.4L72.15-0.15 50.95-2.4 72.55-2.4ZM74.25-12.05L73.85-9.8 52.65-12.05 74.25-12.05ZM75.1-16.85L74.7-14.6 53.5-16.85 75.1-16.85ZM75.95-21.65L75.55-19.4 54.35-21.65 75.95-21.65ZM76.75-26.45L76.4-24.2 55.2-26.45 76.75-26.45ZM73.4-7.25L73-5 51.8-7.25 73.4-7.25ZM77.6-31.25L77.2-29 56.05-31.25 77.6-31.25Z"
                                                opacity={1}
                                                transform="matrix(1,0,0,1,0,0)"
                                                fill={color}
                                                className="undefined-text-0"
                                                data-fill-palette-color="primary"
                                                id="text-0"
                                              />
                                            </svg>
                                          </g>
                                        </svg>
                                      </g>
                                    </svg>
                                  </g>
                                </svg>
                              </g>
                              <g />
                            </svg>
                          </g>
                        </svg>
                      </g>
                    </svg>
                  </g>
                </svg>
              </g>
              <defs />
            </svg>
            <rect width={320} height={360} fill="none" stroke="none" visibility="hidden" />
          </g>
        </svg>
      </g>
    </svg>
  );
};

const LogoVGIcon = (props: ICon) => {
  const { onClick, width = 66.4, height = 25, className, color = '#fff' } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 356.12052 132.29044668230875"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      {...props}
    >
      <g>
        <path
          d="M0 132.29v-132.29h356.121v132.29z"
          fill="transparent"
          stroke="transparent"
          strokeWidth={0}
          rx="0%"
          data-fill-palette-color="tertiary"
        />
        <path
          d="M3.283 129.007v-125.724h349.554v125.724z"
          fill={color}
          stroke="transparent"
          strokeWidth={0}
          rx="0%"
          data-fill-palette-color="quaternary"
        />
        <path
          d="M9.85 122.441v-112.591h336.421v112.591z"
          fill="#fff"
          stroke="transparent"
          strokeWidth={0}
          data-fill-palette-color="tertiary"
        />
      </g>
      <g transform="matrix(1,0,0,1,19.69974,19.69974)">
        <svg
          viewBox="0 0 316.72104 92.89096668230877"
          height={92.89096668230877}
          width={316.72104}
          {...props}
        >
          <g>
            <svg
              viewBox="0 0 316.72104 92.89096668230877"
              height={92.89096668230877}
              width={316.72104}
              {...props}
            >
              <g transform="matrix(1,0,0,1,0,0)">
                <svg
                  width={316.72104}
                  viewBox="-12.5 -31.25 106.55000305175781 31.25"
                  height={92.89096668230877}
                  data-palette-color={color}
                  {...props}
                >
                  <path
                    d="M30.6-8L29.2 0 10.2 0 15.7-31.25 25.2-31.25 21.1-8 30.6-8ZM9.1-2.4L8.7-0.15-12.5-2.4 9.1-2.4ZM10.8-12.05L10.4-9.8-10.8-12.05 10.8-12.05ZM11.65-16.85L11.25-14.6-9.95-16.85 11.65-16.85ZM12.5-21.65L12.1-19.4-9.1-21.65 12.5-21.65ZM13.3-26.45L12.95-24.2-8.25-26.45 13.3-26.45ZM9.95-7.25L9.55-5-11.65-7.25 9.95-7.25ZM14.15-31.25L13.75-29-7.4-31.25 14.15-31.25ZM65.35-31.25L63.9-23.25 57-23.25 52.95 0 43.45 0 47.5-23.25 40.65-23.25 42.1-31.25 65.35-31.25ZM42.3-2.4L41.9-0.15 20.7-2.4 42.3-2.4ZM44-12.05L43.6-9.8 22.4-12.05 44-12.05ZM44.85-16.85L44.45-14.6 23.25-16.85 44.85-16.85ZM45.7-21.65L45.3-19.4 24.1-21.65 45.7-21.65ZM43.15-7.25L42.75-5 21.55-7.25 43.15-7.25ZM39.65-26.45L39.3-24.2 18.1-26.45 39.65-26.45ZM40.5-31.25L40.1-29 18.95-31.25 40.5-31.25ZM94.05-8L92.65 0 73.65 0 79.15-31.25 88.65-31.25 84.55-8 94.05-8ZM72.55-2.4L72.15-0.15 50.95-2.4 72.55-2.4ZM74.25-12.05L73.85-9.8 52.65-12.05 74.25-12.05ZM75.1-16.85L74.7-14.6 53.5-16.85 75.1-16.85ZM75.95-21.65L75.55-19.4 54.35-21.65 75.95-21.65ZM76.75-26.45L76.4-24.2 55.2-26.45 76.75-26.45ZM73.4-7.25L73-5 51.8-7.25 73.4-7.25ZM77.6-31.25L77.2-29 56.05-31.25 77.6-31.25Z"
                    opacity={1}
                    transform="matrix(1,0,0,1,0,0)"
                    fill={color}
                    className="undefined-text-0"
                    data-fill-palette-color="quaternary"
                    id="text-0"
                  />
                </svg>
              </g>
            </svg>
          </g>
        </svg>
      </g>
    </svg>
  );
};

const LogoTextIcon = (props: ICon) => {
  const { onClick, width = 85.24, height = 25, className, color = '#fff' } = props;
  return (
    <svg
      viewBox="-12.5 -31.25 106.55 31.25"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    >
      <path
        d="m30.6-8-1.4 8h-19l5.5-31.25h9.5L21.1-8h9.5ZM9.1-2.4 8.7-.15-12.5-2.4H9.1Zm1.7-9.65-.4 2.25-21.2-2.25h21.6Zm.85-4.8-.4 2.25-21.2-2.25h21.6Zm.85-4.8-.4 2.25-21.2-2.25h21.6Zm.8-4.8-.35 2.25-21.2-2.25H13.3ZM9.95-7.25 9.55-5l-21.2-2.25h21.6Zm4.2-24-.4 2.25-21.15-2.25h21.55Zm51.2 0-1.45 8H57L52.95 0h-9.5l4.05-23.25h-6.85l1.45-8h23.25ZM42.3-2.4l-.4 2.25L20.7-2.4h21.6Zm1.7-9.65-.4 2.25-21.2-2.25H44Zm.85-4.8-.4 2.25-21.2-2.25h21.6Zm.85-4.8-.4 2.25-21.2-2.25h21.6Zm-2.55 14.4L42.75-5l-21.2-2.25h21.6Zm-3.5-19.2-.35 2.25-21.2-2.25h21.55Zm.85-4.8L40.1-29l-21.15-2.25H40.5ZM94.05-8l-1.4 8h-19l5.5-31.25h9.5L84.55-8h9.5Zm-21.5 5.6-.4 2.25-21.2-2.25h21.6Zm1.7-9.65-.4 2.25-21.2-2.25h21.6Zm.85-4.8-.4 2.25-21.2-2.25h21.6Zm.85-4.8-.4 2.25-21.2-2.25h21.6Zm.8-4.8-.35 2.25-21.2-2.25h21.55ZM73.4-7.25 73-5 51.8-7.25h21.6Zm4.2-24L77.2-29l-21.15-2.25H77.6Z"
        fill={color}
        data-fill-palette-color="quaternary"
      />
    </svg>
  );
};

const LogoEssentialsIcon = (props: ICon) => {
  const { onClick, width = 21.74, height = 30, className, color = '#fff' } = props;
  return (
    <svg
      viewBox="-12.5 -33.85 38.1 31.25" 
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      data-palette-color={color}
      {...props}
    >
      <path
        d="m30.6-8-1.4 8h-19l5.5-31.25h9.5L21.1-8h9.5ZM9.1-2.4 8.7-.15-12.5-2.4H9.1Zm1.7-9.65-.4 2.25-21.2-2.25h21.6Zm.85-4.8-.4 2.25-21.2-2.25h21.6Zm.85-4.8-.4 2.25-21.2-2.25h21.6Zm.8-4.8-.35 2.25-21.2-2.25H13.3ZM9.95-7.25 9.55-5l-21.2-2.25h21.6Zm4.2-24-.4 2.25-21.15-2.25h21.55Z"
        fill={color}
        className="undefined-text-0"
        data-fill-palette-color="primary"
      />
    </svg>
  );
};

export { LogoCircleIcon, LogoVGIcon, LogoTextIcon, LogoEssentialsIcon };
