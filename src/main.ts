import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import { vueI18n } from '@/i18n/i18n';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n: vueI18n,
  render: h => h(App),
}).$mount('#app')
