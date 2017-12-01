import * as types from '../mutation-types'

const state = {
  isConnected: 0, // 服务端断开
  message: null,
  messageList: [],
  heartBeatStatus: 1, // 1 心跳连通, 2 心跳断开
  heartBeatCount: 0, // 允许有一次丢包的情况, 如果丢包超过1, 则断开网络
  closeCode: 0,
  closeReason: '',
  errorReason: ''
}

const mutations = {
  [types.WS_OPEN]: (state) => {
    state.isConnected = 1
    console.log('websocket connected')
  },
  // close message
  [types.WS_CLOSE]: (state, status) => {
    state.isConnected = 0
    state.closeCode = status.code
    state.closeReason = status.reason
    console.log('websocket disconneted')
    console.error(status)
  },
  // error message
  [types.WS_ERROR]: (state, errorInfo) => {
    state.isConnected = 2
    state.errorReason = errorInfo
    console.log('websocket error')
    console.error(errorInfo)
  },
  // receive message
  [types.WS_MESSAGE]: (state, info) => {
    // 当前用户消息
    // let message = typeof info.data.message === 'object' ? JSON.parse(info.data.message) : info.data.message
    state.message = info
    state.messageList.push(info)
  },
  [types.HEART_BEAT_DISCONNECTED_COUNT]: (state) => {
    state.heartBeatCount ++
  },
  [types.START_HEART_BEAT]: (state) => {
    state.heartBeatStatus = 1
  },
  [types.STOP_HEART_BEAT]: (state) => {
    state.heartBeatStatus = 0
  }
}

export default {
  state,
  mutations
}
