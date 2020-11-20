import bmap from './bmap'

export default {
  install(Vue) {
    Vue.prototype.$bmap = bmap
  }
}
