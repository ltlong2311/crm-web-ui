import React from 'react';
import styled from 'styled-components';

import { CustomerGeneralInfo } from '../CustomerGeneralInfo';
import { Divider, Tabs } from 'antd';
import { ChevronDownIcon, DropdownButton, OptionDropdown } from '@components';
import { APP_COLORS } from '@theme';
import { CustomerDashboardModule, CustomerSecurityInfoModule } from '@modules';
import { CustomerEventLogs } from '../../details';

interface IProps {
  data?: any;
  onDelete?: () => void;
  updateData?: () => void;
}

export const CustomerDetailSection = (props: IProps) => {
  const { data, onDelete, updateData } = props;
  return (
    <StyledCustomerDetailsSection>
      <div className="general-info">
        <CustomerGeneralInfo data={data} onDataChange={updateData} />
      </div>
      <div className="detail-info">
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={{
            right: (
              <DropdownButton
                btnBackgroundColor={APP_COLORS.primary}
                sufIcon={<ChevronDownIcon color="#fff" size={18} strokeWidth={3} />}
                text="Tùy chọn"
                className="option-btn"
                dropdownPlacement="bottomRight"
                dropdown={
                  <OptionDropdown>
                    <div className="label">BÁN HÀNG</div>
                    <div className="option-item">Tạo cơ hội</div>
                    <div className="option-item">Tạo đơn hàng</div>
                    {/* <div className="option-item">Tạo lịch làm việc</div> */}
                    <Divider />
                    <div className="label">QUẢN LÝ</div>
                    <div className="option-item dangerous">Xóa khách hàng</div>
                  </OptionDropdown>
                }
              />
            ),
          }}
        >
          <Tabs.TabPane tab="Tổng quan" key="1">
            <CustomerDashboardModule data={data} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thông tin" key="2">
            <CustomerSecurityInfoModule data={data} updateData={updateData} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hoạt động" key="3">
            <CustomerEventLogs data={data} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </StyledCustomerDetailsSection>
  );
};

const StyledCustomerDetailsSection = styled.div`
  margin-top: 2rem;
  .general-info {
    position: relative;
    width: 100%;
    height: 100%;
    margin-bottom: 3.2rem;
  }
  .detail-info {
    position: relative;
    width: 100%;
    border-radius: 0.5rem;
  }

  @media (min-width: 992px) {
    display: flex;
    .general-info {
      width: 350px;
      margin-bottom: 0;
    }
    .detail-info {
      width: 100%;
      margin-left: 50px;
      .option-btn {
        .text-btn {
          font-size: 1.5rem;
        }
      }
      .ant-tabs-nav {
        &::before {
          border: none;
        }
      }
      .ant-tabs-tab {
        .ant-tabs-tab-btn {
          font-size: 1.8rem;
          font-weight: 600;
          color: ${APP_COLORS.gray500};
        }
      }
      .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          color: ${APP_COLORS.primary};
        }
      }
    }
  }
`;
