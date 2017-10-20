// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueNativeSock from 'vue-native-websocket'
import App from './App'
import store from './store'

import base64 from 'base-64'

let userInfo = {
  gameid: 9702,
  uid: 2650001,
  rid: 2650010,
  token: '43606811c7305ccc6abb2be116579bfd'
}

let userInfoEncode = base64.encode(JSON.stringify(userInfo))
console.log(userInfoEncode)

Vue.use(Vuex)
Vue.use(VueNativeSock, 'ws://10.72.2.39:8083/websocket?request=' + userInfoEncode, { store: store, format: 'json' })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
