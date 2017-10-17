import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import poker from './modules/poker'
import websocket from './modules/websocket'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.use(Vuex)

Vue.use(VueSocketio, socketio('ws://10.72.2.39:8083', {
  transports: ['websocket'],
  path: '/websocket',
  query: {
    request: 'e3VpZDoyNjUwMDAxO3JpZDoyNjUwMDEwO3Rva2VuOiI0MzYwNjgxMWM3MzA1Y2NjNmFiYjJiZTExNjU3OWJmZCJ9'
  }
}).on('connect_error', function (error) {
  console.log('connect error')
  console.log(error)
}).on('connect_timeout', function () {
  console.log('connect timeout')
}).on('reconnect', function () {
  console.log('reconnect')
}), Vuex)

export default new Vuex.Store({
  // actions,
  modules: {
    poker,
    websocket
  }
})
