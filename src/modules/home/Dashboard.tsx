import { useEffect, useState } from 'react';

import { dashboardAPI } from '@api';
import { useAppDispatch } from '@redux';
import { DashboardSection } from '@pages';

export const DashboardModule = () => {
  const dispatch = useAppDispatch();

  const userId = 0;

  const [data, setData] = useState([]);

  const getGeneralData = async () => {
    try {
      const res: any = await dashboardAPI.getGeneralInfo(userId);
      const data = res.data as any;
      setData(data);
    } catch (error) {
    } finally {
      // dispatch(Loading(false));
    }
  };

  useEffect(() => {
    // getGeneralData();
  }, []);

  return <DashboardSection data={data} />;
};
