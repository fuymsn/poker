import * as types from '../mutation-types'

const state = {
  modalTipStatus: 0,
  modalTipText: '',
  modalAlertStatus: 0,
  modalAlertMaskStatus: 0,
  modalAlertText: '',
  dialogStatus: 0,
  dialogText: ''
}

const mutations = {
  [types.OPEN_MODAL_TIP]: (state) => {
    state.modalTipStatus = 1
  },
  [types.CLOSE_MODAL_TIP]: (state) => {
    state.modalTipStatus = 0
  },
  [types.SET_MODAL_TIP_TEXT]: (state, text) => {
    state.modalTipText = text
  },
  [types.OPEN_MODAL_ALERT]: (state) => {
    state.modalAlertStatus = 1
  },
  [types.CLOSE_MODAL_ALERT]: (state) => {
    state.modalAlertStatus = 0
  },
  [types.OPEN_MODAL_ALERT_MASK]: (state) => {
    state.modalAlertMaskStatus = 1
  },
  [types.CLOSE_MODAL_ALERT_MASK]: (state) => {
    state.modalAlertMaskStatus = 0
  },
  [types.SET_MODAL_ALERT_TEXT]: (state, text) => {
    state.modalAlertText = text
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
