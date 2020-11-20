class StorageModel {
  /**
   * name
   */
  type: string;
  constructor(type?: string) {
    this.type = type || "localStorage";
  }
  get(name) {
    if (this.type === "localStorage") {
      const data = localStorage.getItem(name) || "";
      let newData;
      try {
        newData = JSON.parse(data);
      } catch (error) {
        newData = data;
      }
      return newData;
    } else {
      const data = sessionStorage.getItem(name) || "";
      var newData;
      try {
        newData = JSON.parse(data);
      } catch (error) {
        newData = data;
      }
      return newData;
    }
  }
  set(name, data) {
    let newData;
    if (typeof data === "string") {
      newData = data || "";
    } else if (typeof data === "object") {
      newData = JSON.stringify(data) || "";
    } else {
      newData = data;
    }
    if (this.type === "localStorage") {
      return localStorage.setItem(name, newData);
    } else {
      return sessionStorage.setItem(name, newData);
    }
  }
  remove(name) {
    if (this.type === "localStorage") {
      return localStorage.removeItem(name);
    } else {
      return sessionStorage.removeItem(name);
    }
  }
  clear() {
    if (this.type === "localStorage") {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  }
}

export const CITYLIST = "CITYLIST";
export const LOCATION = "LOCATION";
export const CART_DATA = "CART_DATA";
export const ADDRESS = "ADDRESS";
export const TOKEN = "TOKEN";
export const USERID = "USERID";
export const SHOPINFO = "SHOPINFO";
export const ADDRESSPAY = "ADDRESSPAY";
export const SELECTADDRESS = "SELECTADDRESS";
export const ORDER_DETAIL = "ORDER_DETAIL";

export default StorageModel;
