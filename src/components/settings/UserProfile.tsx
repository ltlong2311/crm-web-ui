import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import styled from 'styled-components';

import { MAIN_THEME_DATA } from '@configs';

interface IProps {
  register: UseFormRegister<FieldValues>;
  registerPass: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  errorsPass: FieldErrors<FieldValues>;
}

export const UserProfileSection = (props: IProps) => {
  const {
    register,
    watch,
    setValue,
    errors,
    registerPass,
    errorsPass,
  } = props;
  const watchNoti = watch('receive_noti');
  return (
    <StyledGeneralSpecialSection>
      <div className="details-profile">

      </div>
    </StyledGeneralSpecialSection>
  );
};

const StyledGeneralSpecialSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  .details-profile {
    width: 100%;
    .ant-tabs-nav {
      padding: 0 3.5rem;
      .ant-tabs-nav-list {
        /* width: 100%; */
      }

      .ant-tabs-tab {
        /* width: 100%; */
        &:hover {
          color: ${MAIN_THEME_DATA.mainColor};
        }

        &.ant-tabs-tab-active .ant-tabs-tab-btn {
          /* color: ${MAIN_THEME_DATA.mainColor}; */
        }
      }
    }
    .ant-tabs-content-holder {
      padding: 0 3.5rem;
    }
  }
  .m-top {
    margin-top: 1rem;
  }
  .m-top-2 {
    margin-top: 2rem;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  .right-form {
    width: 50%;
    margin-left: 2rem;
    .btn-save {
      align-self: center;
      width: fit-content;
      padding: 1rem 2rem;
    }
  }
  .left-form {
    width: 50%;
    .btn-save {
      align-self: center;
      width: fit-content;
      padding: 1rem 2rem;
    }
    .btn-cancel {
      margin-right: 1rem;
      width: fit-content;
      padding: 1rem 2rem;
    }
  }
`;
