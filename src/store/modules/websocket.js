import * as types from '../mutation-types'

const state = {
  isConnected: false,
  message: null,
  messageList: []
}

const mutations = {
  [types.WS_OPEN]: (state) => {
    state.isConnected = 1
    console.log('websocket connected')
  },
  // close message
  [types.WS_CLOSE]: (state) => {
    state.isConnected = 0
    console.log('websocket disconneted')
  },
  // error message
  [types.WS_ERROR]: (state, status) => {
    state.isConnected = 2
    console.log('websocket error')
    console.error(status)
  },
  // receive message
  [types.WS_MESSAGE]: (state, info) => {
    // 当前用户消息
    // let message = typeof info.data.message === 'object' ? JSON.parse(info.data.message) : info.data.message
    state.message = info
    state.messageList.push(info)
  }
}

export default {
  state,
  mutations
}
