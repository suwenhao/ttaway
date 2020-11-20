import { ADD, MINUS, GETLIST} from '../constants/demoType'
import { ActionModel } from '../../types';

export const add: ActionModel<any> = (polyload) => {
  return {
    type: ADD,
    polyload
  }
}

export const minus: ActionModel<any> = () => {
  return {
    type: MINUS
  }
}

export const getList: ActionModel<any> = (polyload) => {
  return {
    type: GETLIST,
    polyload
  }
}