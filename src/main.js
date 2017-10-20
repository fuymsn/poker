// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueNativeSock from 'vue-native-websocket'
import App from './App'
import store from './store'

// import Base64 from 'crypto-js/enc-base64'

// let ori = Base64.parse('')
// let info = Base64.stringify('')

// console.log(ori)
// console.log(info)

Vue.use(Vuex)

Vue.use(VueNativeSock, 'ws://10.72.2.39:8083/websocket?request=e3VpZDoyNjUwMDAxO3JpZDoyNjUwMDEwO3Rva2VuOiI0MzYwNjgxMWM3MzA1Y2NjNmFiYjJiZTExNjU3OWJmZCJ9', { store: store, format: 'json' })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
