type IStorage = 'localStorage' | 'sessionStorage'
class StorageModel {
  /**
   * name
   */
  private type: IStorage
  constructor(type?: IStorage){
    this.type = type || 'localStorage'
  }
  public get(name: string) {
    if(this.type === 'localStorage') {
      const data = localStorage.getItem(name) || ''
      let newData
      try {
        newData = JSON.parse(data)
      } catch (error) {
        newData = data
      }
      return newData
    } else {
      const data = sessionStorage.getItem(name) || ''
      var newData
      try {
        newData = JSON.parse(data)
      } catch (error) {
        newData = data
      }
      return newData
    }
  }
  public set(name: string, data: any) {
    let newData
    if (typeof data === 'string'){
      newData = data || ''
    } else if(typeof data === 'object') {
      newData = JSON.stringify(data) || ''
    } else {
      newData = ''
    }
    if (this.type === 'localStorage') {
      return localStorage.setItem(name, newData)
    } else {
      return sessionStorage.setItem(name, newData)
    }
  }
  public remove(name: string) {
    if (this.type === 'localStorage') {
      return localStorage.removeItem(name)
    } else {
      return sessionStorage.removeItem(name)
    }
  }
  public clear() {
    if (this.type === 'localStorage') {
      localStorage.clear()
    } else {
      sessionStorage.clear()
    }
  }
}

export const MANAGE_TOKEN = 'MANAGE_TOKEN'
export const MANAGE_INFO = 'MANAGE_INFO'
export const EDIT_SHOP_INFO = 'EDIT_SHOP_INFO'
export const HISTORY_URL = 'HISTORY_URL'

export default StorageModel