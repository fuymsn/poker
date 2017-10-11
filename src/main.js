// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store'

Vue.use(Vuex)
Vue.config.productionTip = false

// const store = new Vuex.Store({
//   state: {
//     currentPoker: 0,
//     currentChip: 0,
//     currentPoint: 0,
//     currentSumPoints: 0
//   },

//   mutations: {
//     selectPoker (state, id) {
//       state.currentPoker = id
//     },
//     selectChip (state, data) {
//       state.currentChip = data.id
//       state.currentPoint = data.point
//     },
//     resetPoints (state) {
//       state.currentPoker = 0
//       state.currentChip = 0
//       state.currentPoint = 0
//       state.currentSumPoints = 0
//     },
//     sumItemPoints (state, id) {
//       state['currentSumPoints' + id] = (state['currentSumPoints' + id] || 0) + state.currentPoint
//     },

//     sumPoints (state) {
//       state.currentSumPoints = state.currentSumPoints + state.currentPoint
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
