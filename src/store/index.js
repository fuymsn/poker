import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import poker from './modules/poker'
import websocket from './modules/websocket'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  modules: {
    poker,
    user,
    websocket
  }
})
