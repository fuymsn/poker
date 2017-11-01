import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import poker from './modules/poker'
import websocket from './modules/websocket'
import user from './modules/user'
import modal from './modules/modal'
import game from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  modules: {
    poker,
    user,
    modal,
    game,
    websocket
  }
})
