import { CKECKPASS } from '../constants/cookieType';
import { ReducerModel } from '../../types';

interface IState {
  username: string;
  password: string;
}

const initState: IState = {
  username: '',
  password: ''
}

const cookieReducerModel: ReducerModel<IState> = (state = initState!, action) => {
  switch (action.type) {
    case CKECKPASS:
      const { username, password } = action.polyload
      return {
        ...state,
        username,
        password
      }
    default:
      return state
  }
}

export default cookieReducerModel