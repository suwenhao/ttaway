import { CKECKPASS } from '../constants/cookieType'
import { ActionModel } from '../../types';
import Cookie from 'js-cookie';

export const getCheckPass: ActionModel<any> = () => {
  const polyload = Cookie.get('checkPass') ? JSON.parse(Cookie.get('checkPass')!) : {username: '', password: ''}
  return {
    type: CKECKPASS,
    polyload
  }
}