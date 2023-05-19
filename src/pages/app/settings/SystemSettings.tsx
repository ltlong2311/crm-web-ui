import { PageHeaderTitle, SettingMenuIcon, SettingMenuIcon2 } from '@components';
import { SettingsModule } from '@modules';
import { APP_COLORS } from '@theme';
import styled from 'styled-components';

export const SystemSettingsPage = () => {
  return (
    <StyledGeneralPage className="general-page">
      <PageHeaderTitle
        title="Thiết lập chung"
        desc="Thiết lập các cài đặt hệ thống cho doanh nghiệp của bạn"
        pageIcon={<SettingMenuIcon color={APP_COLORS.white} />}
      />
      <SettingsModule />
    </StyledGeneralPage>
  );
};

const StyledGeneralPage = styled.div`
  .page__section {
    position: relative;
    padding: 2rem 2.8rem;
    border-radius: 0.6rem;
    background: ${(p) => p.theme.colors.bgSection};
    box-shadow: 0px 3px 20px #0000000b;
  }
`;
