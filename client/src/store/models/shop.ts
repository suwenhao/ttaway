import StorageModel, {CART_DATA} from '@/utils/storage'
import {IShopState, IShopModel} from '@/types/store/shop'

const Storage = new StorageModel();

const initialState: IShopState = {
  cart: Storage.get(CART_DATA) || {}
};

const model: IShopModel = {
    namespaced: true,
    state: initialState,
    getters: { },
    actions: { },
    mutations: {
      changeCart (state, newState) {
        if (state.cart&&state.cart[newState._id]) {
          let newCart = Object.assign({}, state.cart)
          let keyName = ''
          if (newState.spec) {
            keyName = newState.data._id + newState.data.selectSpec
          } else {
            keyName = newState.data._id
          }
          if (newCart[newState._id][keyName]) {
            if (newState.type === 'add') {
              if (newState.spec) {
                newCart[newState._id][keyName].num = newCart[newState._id][keyName].num + newState.data.num
              } else {
                newCart[newState._id][keyName].num++
              }
            } else {
              if (newCart[newState._id][keyName].num===1){
                if (Object.keys(newCart[newState._id]).length===1) {
                  delete newCart[newState._id]
                } else {
                  delete newCart[newState._id][keyName]
                }
              } else {
                newCart[newState._id][keyName].num--
              }
            }
          } else {
            newCart[newState._id][keyName] = {
              num: newState.spec?newState.data.num:1,
              data: newState.data
            }
            if (newState.spec) {
              newCart[newState._id][keyName].spec = true
            }
          }
          state.cart = newCart
          Storage.set(CART_DATA, state.cart)
        } else {
          state.cart = {}
          let newCart =  Object.assign({}, state.cart)
          let keyName = ''
          if (newState.spec) {
            keyName = newState.data._id + newState.data.selectSpec
          } else {
            keyName = newState.data._id
          }
          newCart[newState._id] = {}
          newCart[newState._id][keyName] = {
            num: newState.spec?newState.data.num:1,
            data: newState.data
          }
          if (newState.spec) {
            newCart[newState._id][keyName].spec = true
          }
          state.cart = newCart
          Storage.set(CART_DATA, state.cart)
        }
      },
      clearCart (state, newState) {
        if (state.cart&&state.cart[newState._id]) {
          let newCart = Object.assign({}, state.cart)
          delete newCart[newState._id]
          state.cart = newCart
          Storage.set(CART_DATA, state.cart)
        }
      }
    }
}
export default model
