import { INestedRoute, IRoute } from '@interfaces';
import { DefaultLayout } from '@layouts';
import { SettingMenuModule } from '@modules';
import { DashboardPage } from '@pages';
import { settingRoutes } from '@routes';
import { Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  isEdit?: boolean;
}

export const SettingsSection = (props: IProps) => {
  const { isEdit } = props;

  return (
    <StyledSettingsSection>
      <div className="left-menu">
        <SettingMenuModule />
        {/* * header: Doanh nghiệp
          + Thông tin doanh nghiệp
        * header: Khách hàng
          + Phân bậc khách hàng: list bậc + button bật tắt phân bậc
          + Phân loại khách hàng: Theo độ tuổi, ngành nghề,... tùy thuộc vào mục đích của doanh nghiệp
          + Tính năng tích điểm: Dành cho khách hàng mua hàng trực tiếp
              Quy đổi chung
              Nếu cấp bậc được mở sẽ có   
        * header: Tài khoản nhân viên
          + Quản lý người dùng: email, tên, phòng ban, quyền (mặc định 1 trong 3: Quản trị hệ thống, quản lí, nhân viên kinh doanh), trạng thái
          + Quản lý phòng ban: Danh sách các phòng
        * header: Tùy chỉnh
          + Quy trình bán hàng, .... */}
      </div>
      <div className="setting-content">
        {/* <Outlet /> */}
        <Routes>
          {/* <Route path="sales-process" element={<DashboardPage />} /> */}
          {settingRoutes.map((route: INestedRoute, index: number) => {
            const Page = route.page;
            const Layout = route.layout || DefaultLayout;
            // if (route.auth) return;
            return (
              <Route
                key={index}
                path={route.subPath}
                element={
                  <Layout {...route}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <Outlet />
      </div>
    </StyledSettingsSection>
  );
};

const StyledSettingsSection = styled.div`
  display: flex;
  align-items: flex-start;
  .left-menu {
    height: 100%;
    margin-right: 2rem;
    width: 250px;
    .ant-menu {
      width: 100%;
      padding: 1.2rem 0.6rem 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
      .ant-menu-item-group-title {
        padding: 8px 16px;
      }
      .menu-group-label {
        padding: 0;
        color: rgba(0, 0, 0, 0.45);
        font-size: 1.3rem;
        line-height: 1.5715;
        transition: all 0.3s;
        font-weight: 600;
      }
      .ant-menu-title-content {
        font-size: 1.3rem;
        font-weight: 400;
      }
    }
  }
  .setting-content {
    width: 100%;
    /* height: calc(100vh - 200px); */
    border-radius: 0.5rem;
    /* background-color: #fff; */
    /* box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 2px; */
  }
`;
