import { ContentStateConverter } from 'draft-convert';
import axiosClient, { ApiClient } from './axiosClient';

export const settingAPI = {
  getUserInfo: () => {
    const url = '/member/info';
    return ApiClient.get(url);
  },
  updateGeneralSetting: (body?: any) => {
    const url = '/member/general-setting';
    return ApiClient.patch(url, body);
  },
  updateUserInfo: (body?: { full_name: string; receive_noti: boolean }) => {
    const url = '/member/profile';
    return ApiClient.patch(url, body);
  },
  changePassword: (body?: { password: string; newPassword: boolean }) => {
    const url = '/users/change-password'; 
    return ApiClient.patch(url, body);
  },
  updatePrivacyPolicy: (body?: { privacy_policy: ContentStateConverter }) => {
    const url = '/member/privacy-policy';
    return ApiClient.patch(url, body);
  },
  getPrivacyPolicy: () => {
    const url = '/member/privacy-policy';
    return ApiClient.get(url);
  },
  uploadImage: (form: FormData) => {
    const url = `/upload/single`;
    return ApiClient.post(url, form);
  },
};
