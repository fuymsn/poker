// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueNativeSock from 'vue-native-websocket'
import App from './App'
import store from './store'
import VModal from 'vue-js-modal'
import queryString from 'query-string'
import base64 from 'base-64'

var testInfo = {
  gameid: 9702,
  uid: 1394510,
  rid: 2650010,
  ws: 'ws://10.72.2.39:9083',
  token: '43606811c7305ccc6abb2be116579bfd'
}

let userTestEncode = base64.encode(JSON.stringify(testInfo))
console.log(userTestEncode)

let userInfoEncode = queryString.parse(location.search).token
let userInfo = JSON.parse(base64.decode(userInfoEncode))
window.userInfo = userInfo
// eyJnYW1laWQiOjk3MDIsInVpZCI6MTM5NDUxMCwicmlkIjoyNjUwMDEwLCJ0b2tlbiI6IjQzNjA2ODExYzczMDVjY2M2YWJiMmJlMTE2NTc5YmZkIiwid3MiOiJ3czovLzEwLjcyLjIuMzk6OTA4MyJ9

Vue.use(Vuex)
Vue.use(VueNativeSock, userInfo.ws + '/websocket?request=' + userInfoEncode, { store: store, format: 'json' })
Vue.use(VModal, { dialog: true })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
