import babelPolyfill from 'babel-polyfill'
import Vue from 'vue'
import vant, {Toast, Notify, Dialog} from 'vant'
import App from './App.vue'
import store from './store'
import router from "./route"
import * as VueLazyload from 'vue-lazyload'
import "./plugins/my-components"
import "./plugins/nprogress"
import "./plugins/inject"
import Qmap from './plugins/Qmap'
import 'vant/lib/index.css';
// @ts-ignore
Vue.use(vant)
Vue.config.productionTip = false
Vue.use(Qmap);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/images/error.jpg'),
  loading: require('@/assets/images/loading.svg'),
  attempt: 1
});
Vue.prototype.$toast = Toast;
Vue.prototype.$notify = Notify;
Vue.prototype.$dialog = Dialog;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
