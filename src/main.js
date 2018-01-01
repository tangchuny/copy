import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueAxios, Axios, MintUI)
Vue.config.productionTip = false


import '@/assets/css/app.css'
import '@/assets/js/app.js'

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: {
    App
  }
})
