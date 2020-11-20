
export interface IShopState {
  cart: any;
}
interface AddCartState {
  _id?: string;
  data?: any;
  type: string;
  spec?: boolean;
}
export interface IShopModel {
  namespaced: boolean;
  state: IShopState;
  getters: {

  },
  actions: {},
  mutations: {
    changeCart?: (state: IShopState, newState: AddCartState) => void;
    clearCart?: (state: IShopState, newState: AddCartState) => void;
  }
}