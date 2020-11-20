type ITheme = 'dark' | 'light'
export interface DefaultSetting{
  theme: ITheme;
  color: any;
}
const defaultSetting: DefaultSetting = {
  theme: 'dark',
  color: {
    'light': '#1890ff',
    'dark': '#fff'
  }
}
export default defaultSetting