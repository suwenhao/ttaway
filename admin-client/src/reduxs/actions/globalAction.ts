import { CHANGE_MOBILE, CHANGE_COLLAPSED, CHANGE_MANAGE_INFO } from '../constants/globalType';
import { GET_ROLE_LIST } from '../constants/roleType'
import { GET_USER_LIST } from '../constants/userType'
import { ActionModel } from '../../types';

export interface IMobile {
  mobile: boolean;
}
export const changeMobile: ActionModel<IMobile> = (polyload) => {
  return { type: CHANGE_MOBILE, polyload}
}

export interface ICollapsed {
  collapsed: boolean;
}
export const changeCollapsed: ActionModel<ICollapsed> = (polyload) => {
  return { type: CHANGE_COLLAPSED, polyload }
}
export interface IManageInfo {
  manage_name: string;
  manage_id: string;
  email: string;
  root?: boolean;
  role_id: string;
  role: {menus: string[]};
  phone: string;
}
export const changeManageInfo: ActionModel<IManageInfo> = (polyload) => {
  return { type: CHANGE_MANAGE_INFO, polyload }
}

export const changeRoleList: ActionModel<any> = (polyload) => {
  return { type: GET_ROLE_LIST, polyload }
}
export const changeUserList: ActionModel<any> = (polyload) => {
  return { type: GET_USER_LIST, polyload }
}