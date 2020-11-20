import { CHANGE_MOBILE, CHANGE_COLLAPSED, CHANGE_MANAGE_INFO } from '../constants/globalType';
import { ReducerModel } from '../../types';
// class function
import StorageModel, { MANAGE_INFO } from '../../utils/storage'
const Storage = new StorageModel()

export interface IState {
  collapsed?: boolean;
  mobile?: boolean;
  manage_info?: any;
}

const initState: IState = {
  collapsed: false,
  mobile: false,
  manage_info: Storage.get(MANAGE_INFO) || {
    manage_name: '',
    manage_id: '',
    email: '',
    role_id: '',
    root: false,
    role: {
      menus: []
    },
    phone: '',
  },
}

const globalReducerModel: ReducerModel<IState> = (state = initState!, action) => {
  switch (action.type) {
    case CHANGE_COLLAPSED:
      return {
        ...state,
        collapsed: action.polyload.collapsed,
      }
    case CHANGE_MOBILE:
      return {
        ...state,
        mobile: action.polyload.mobile,
      }
    case CHANGE_MANAGE_INFO:
      return {
        ...state,
        manage_info: action.polyload,
      }
    default:
      return state
  }
}

export default globalReducerModel