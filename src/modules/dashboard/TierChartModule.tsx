import { dashboardAPI } from '@api';
import { MemberTierChart } from '@components';
import { TierStatisticResponse, TierStatisticRoot } from '@interfaces';
import React, { useEffect, useState } from 'react';

export const TierChartModule = () => {
  const [memberTiers, setMemberTiers] = useState<TierStatisticResponse[]>([]);
  const getCustomerTiers = async () => {
    try {
      const res: TierStatisticRoot = await dashboardAPI.getCustomerTiers();
      setMemberTiers(
        res.data.map((item) => {
          return {
            name: item.name,
            total: Number(item.total),
            id: item.tier_id,
          };
        }),
      );
    } catch (error) {}
  };
  useEffect(() => {
    getCustomerTiers();
  }, []);
  return <MemberTierChart memberTiers={memberTiers} />;
};
