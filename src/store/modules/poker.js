import * as types from '../mutation-types'

const state = {
  currentPoker: 0,
  currentChip: 0,
  currentPoint: 0,
  currentSumPoints1: 0,
  currentSumPoints2: 0,
  currentSumPoints3: 0,
  currentSumPoints4: 0,
  currentSumPoints: 0
}

const mutations = {
  [types.SELECT_POKER]: (state, id) => {
    state.currentPoker = id
  },
  [types.SELECT_CHIP]: (state, data) => {
    state.currentChip = data.id
    state.currentPoint = data.point
  },
  [types.RESET_POINTS]: (state) => {
    state.currentPoker = 0
    state.currentChip = 0
    state.currentPoint = 0
    state.currentSumPoints = 0
  },
  [types.SUM_ITEM_POINTS]: (state, id) => {
    state['currentSumPoints' + id] = (state['currentSumPoints' + id] || 0) + state.currentPoint
  },

  [types.SUM_POINTS]: (state) => {
    state.currentSumPoints = state.currentSumPoints + state.currentPoint
  }
}

export default {
  state,
  mutations
}
