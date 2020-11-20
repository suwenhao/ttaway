import { GET_USER_LIST_SET } from '../constants/userType';
import { ReducerModel } from '../../types';

export interface IUserItem {
  auth_name?: string;
  auth_time?: number;
  create_time?: number;
  menus?: string[];
  __v?: number;
  _id?: string;
}

export interface IState {
  users?: any[];
}

const initState: IState = {
  users: [],
}

const userReducerModel: ReducerModel<IState> = (state = initState!, action) => {
  switch (action.type) {
    case GET_USER_LIST_SET:
      return {
        ...state,
        users: action.polyload,
      }
    default:
      return state
  }
}

export default userReducerModel