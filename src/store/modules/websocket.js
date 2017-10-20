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
    // 当前用户消息
    state.message = info.data

    switch (info.cmd) {
      // 用户登录
      case 9702001:
        break
      // 押注
      case 9702002:
        break
      // 单点推送押注信息
      case 9702003:
        break
      // 全服广播押注
      case 9702004:
        break
      // 全服广播输赢中奖
      case 9702005:
        break
      // 单点推送中奖
      case 9702006:
        break
      default:

    }
    console.log(info)
  }
}

export default {
  state,
  mutations
}
