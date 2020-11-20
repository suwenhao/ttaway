import { GET_ROLE_LIST_SET } from '../constants/roleType';
import { ReducerModel } from '../../types';

export interface IRoleItem {
  auth_name?: string;
  auth_time?: number;
  create_time?: number;
  menus?: string[];
  __v?: number;
  _id?: string;
}
export interface IState {
  roles?: IRoleItem[];
}

const initState: IState = {
  roles: [],
}

const roleReducerModel: ReducerModel<IState> = (state = initState!, action) => {
  switch (action.type) {
    case GET_ROLE_LIST_SET:
      return {
        ...state,
        roles: action.polyload,
      }
    default:
      return state
  }
}

export default roleReducerModel