import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { SettingsSection } from '@components';
import { selectApp, setLoading, useAppDispatch, useAppSelector } from '@redux';

export const SettingsModule = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector(selectApp);

  useEffect(() => {}, []);

  return <SettingsSection />;
};
