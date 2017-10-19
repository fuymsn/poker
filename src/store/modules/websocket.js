import * as types from '../mutation-types'

const state = {
  isConnected: false,
  message: null
}

const mutations = {
  [types.WS_OPEN]: (state) => {
    state.isConnected = true
    console.log('websocket connected')
  },
  // close message
  [types.WS_CLOSE]: (state) => {
    state.isConnected = false
    console.log('websocket disconneted')
  },
  // error message
  [types.WS_ERROR]: (state, status) => {
    console.error(status)
  },
  // receive message
  [types.WS_MESSAGE]: (state, info) => {
    state.message = info.data
    console.log(info)
  }
}

// const actions = {
//   [types.WS_SEND]: (context, message) => {
//     context.$socket.send(message)
//   }
// }

export default {
  state,
  // actions,
  mutations
}
