import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import poker from './modules/poker'
import websocket from './modules/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  modules: {
    poker,
    websocket
  }
})
