import * as types from '../mutation-types'

const state = {
  const: false,
  message: null
}

const mutations = {
  [types.WS_CONNECT]: (state, status) => {
    state.connect = true
  },

  [types.WS_RECEIVE_MSG]: (state, message) => {
    state.message = message
  }
}

const actions = {
  socket_userMessage: (context, message) => {
    context.dispatch('newMessage', message)
    context.commit('NEW_MESSAGE_RECEIVED', message)
  }
}

export default {
  state,
  actions,
  mutations
}
