import { enumNavKey } from '@configs';
import { ICon } from '@interfaces';
import { selectLayout, useAppSelector } from '@redux';
import { useTheme } from '@theme';
import { LogApp } from '@utils';
import styled from 'styled-components';
import {
  BannerMenuIcon,
  BirthdaySpecialMenuIcon,
  BranchMenuIcon,
  BranchMenuIcon2,
  CashbackRuleMenuIcon,
  CategoryMenuIcon,
  CustomerMenuIcon,
  DashboardMenuIcon,
  StaffMenuIcon,
  MemberTierMenuIcon,
  Store,
  CampaignMenuIcon,
  SettingMenuIcon,
  SettingMenuIcon2,
  MarketingSEOMenuIcon,
  MarketingMenuIcon,
  OrderMenuIcon,
  BillMenuIcon,
  ChanceMenuIcon,
  CategoryListMenuIcon,
  CategoryOtherMenuIcon,
  ProductMenuIcon,
  PromotionPolicyMenuIcon,
  CampaignListMenuIcon,
  VoucherMenuIcon,
  ImageMenuIcon,
  SMSMenuIcon,
  MailMenuIcon,
} from '../Icon';
import { Link } from 'react-router-dom';

interface IProps extends ICon {
  pathKey: enumNavKey;
  path: string;
  isSubMenu?: boolean;
}

export const NavMenuIcon = (props: IProps) => {
  const { pathKey, path, isSubMenu } = props;

  const { navCurrentKey } = useAppSelector(selectLayout);

  const { theme } = useTheme();

  const genIcon = () => {
    switch (pathKey) {
      case enumNavKey.DASHBOARD:
        return (
          <DashboardMenuIcon
            size={20}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.CUSTOMERS:
        return (
          <CustomerMenuIcon
            size={24}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.CUSTOMER_TIERS:
        return (
          <MemberTierMenuIcon
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.CASHBACK_RULES:
        return (
          <CashbackRuleMenuIcon
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.ORDER:
        return (
          <OrderMenuIcon
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.CHANCE:
        return (
          <ChanceMenuIcon
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.INVOICE:
        return (
          <BillMenuIcon
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.CATEGORY:
        return (
          <CategoryMenuIcon
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.CATEGORY_LIST:
        return (
          <CategoryListMenuIcon
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.PRODUCT:
        return (
          <ProductMenuIcon
            size={20}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.CATEGORY_OTHER:
        return (
          <CategoryOtherMenuIcon
            size={20}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.CAMPAIGN:
        return (
          <CampaignMenuIcon
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.CAMPAIGN_LIST:
        return (
          <CampaignListMenuIcon
            size={22}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.VOUCHER:
        return (
          <VoucherMenuIcon
            size={22}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.PROMOTION_POLICY:
        return (
          <PromotionPolicyMenuIcon
            size={22}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.MARKETING:
        return (
          <MarketingMenuIcon
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.BANNER:
        return (
          <BannerMenuIcon
            size={22}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.ADS:
        return (
          <ImageMenuIcon
            size={22}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.SMS_MARKETING:
        return (
          <SMSMenuIcon
            size={22}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.EMAIL_MARKETING:
        return (
          <MailMenuIcon
            size={22}
            color={
              isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#ffffffca'
            }
            {...props}
          />
        );
      case enumNavKey.STAFF:
        return (
          <StaffMenuIcon
            size={24}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.BRANCH:
        return (
          <BranchMenuIcon
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      case enumNavKey.SETTINGS:
        return (
          <SettingMenuIcon2
            size={22}
            color={isSubMenu && navCurrentKey === pathKey ? theme?.colors?.sidebar?.active : '#fff'}
            {...props}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Link to={path} className="menu__icon ant-menu-item-icon sidebar-menu-icon">
      {genIcon()}
    </Link>

    // <>{genIcon()}</>
  );
};

const StyledNavMenuIcon = styled.div<{
  $appTheme?: string;
}>``;
