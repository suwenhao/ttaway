import { ADD, MINUS, GETLIST_SET} from '../constants/demoType';
import { ReducerModel } from '../../types';

interface IState {
  num: number;
  data: any;
  count: number;
}

const initState: IState = {
  num: 0,
  data: [],
  count: 0
}

const demoReducerModel: ReducerModel<IState> = (state = initState!, action) => {
  switch (action.type) {
    case ADD:
      let num = state.num + 1
      if (action.polyload){
        num = state.num + action.polyload.num
      }
      return {
        ...state,
        num
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    case GETLIST_SET:
      return {
        ...state,
        data: action.polyload.data
      }
    default:
      return state
  }
}

export default demoReducerModel