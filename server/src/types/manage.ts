export interface IManage {
  username?: string;
  password?: string;
}
export interface IManageRes {
  _id?: any;
  root?: boolean;
  username?: string;
  password?: string;
  create_time?: number;
  role_id?: string;
  email?: string;
  phone?: string;
  _v?: number;
}