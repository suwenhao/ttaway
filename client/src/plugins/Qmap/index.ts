import qmap from './qmap'

export default {
  install(Vue: any) {
    Vue.prototype.$qmap = qmap
  }
}
