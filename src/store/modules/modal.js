import * as types from '../mutation-types'

const state = {
  modalTipState: 0,
  modalTipText: 0,
  maskStatus: 0,
  dialogStatus: 0,
  dialogText: ''
}

const mutations = {
  [types.OPEN_MODAL_TIP]: (state) => {
    state.modalTipState = 1
  },
  [types.CLOSE_MODAL_TIP]: (state) => {
    state.modalTipState = 0
  },
  [types.SET_MODAL_TIP_TEXT]: (state, text) => {
    state.modalTipText = text
  },
  [types.OPEN_MASK]: (state) => {
    state.maskStatus = 1
  },
  [types.CLOSE_MASK]: (state) => {
    state.maskStatus = 0
  },
  [types.OPEN_DIALOG]: (state, { text }) => {
    state.dialogStatus = 1
    state.dialogText = text
  },
  [types.CLOSE_DIALOG]: (state) => {
    state.dialogStatus = 0
  }
}

export default {
  state,
  mutations
}
