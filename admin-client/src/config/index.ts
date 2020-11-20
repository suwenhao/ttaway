import defaultSetting, {DefaultSetting} from './setting'
import menuConfig, {IMenu} from './menu'

export const ds = defaultSetting
export const menuList = menuConfig
export const IMAGE_URL = process.env.REACT_APP_UPLOAD_URL

export interface IMenuConfig extends IMenu {}
export interface IDefaultSetting extends DefaultSetting {}

export default {
  ds: defaultSetting,
  menuList: menuConfig
}
