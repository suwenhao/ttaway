import Vue from 'vue'
import Vuex from 'vuex'
import global from './models/global'
import shop from './models/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    shop
  }
})
