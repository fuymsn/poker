import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import poker from './modules/poker'
import websocket from './modules/websocket'
import VueSocketio from 'vue-socket.io'

Vue.use(Vuex)

Vue.use(VueSocketio, 'http://10.1.100.102:1923', Vuex)

export default new Vuex.Store({
  // actions,
  modules: {
    poker,
    websocket
  }
})
