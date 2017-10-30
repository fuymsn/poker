import * as types from '../mutation-types'

const state = {
  currentPoker: 0,
  currentChip: 0,
  currentPoint: 0,
  currentSumPoints1: 0,
  currentSumPoints2: 0,
  currentSumPoints3: 0,
  currentSumPoints4: 0,
  currentSumPoints: 0,

  pokerData: [
    { id: 1, name: '貂蝉' },
    { id: 2, name: '西施' },
    { id: 3, name: '贵妃' },
    { id: 4, name: '如花' }
  ],
  pokerHeight: 0,
  pokerWidth: 0,
  pokerCoord: [], // poker的坐标

  chipData: [
    { id: 1, point: 10, name: '10' },
    { id: 2, point: 100, name: '100' },
    { id: 3, point: 1000, name: '1千' },
    { id: 4, point: 10000, name: '1万' },
    { id: 5, point: 100000, name: '10万' },
    { id: 6, point: 500000, name: '50万' }
  ],
  chipHeight: 0,
  chipWidth: 0,
  chipCoord: [], // chip的坐标
  chipList: [] // { id: chipid, x: x坐标, y: y坐标 }
}

const getters = {
  getChipItemById: (state, getters) => (id) => {
    return state.chipData.find(item => item.id === id)
  }
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
  },

  [types.SET_POKER_WIDTH]: (state, width) => {
    state.pokerWidth = width
  },

  [types.SET_POKER_HEIGHT]: (state, height) => {
    state.pokerHeight = height
  },

  [types.SET_POKER_COORD]: (state, coordinatesArray) => {
    state.pokerCoord = coordinatesArray
  },

  [types.SET_CHIP_WIDTH]: (state, width) => {
    state.chipWidth = width
  },

  [types.SET_CHIP_HEIGHT]: (state, height) => {
    state.chipHeight = height
  },

  [types.SET_CHIP_COORD]: (state, coordinatesArray) => {
    state.chipCoord = coordinatesArray
  },

  [types.UPDATE_CHIP_LIST]: (state, chipItem) => {
    state.chipList.push(chipItem)
  }
}

export default {
  state,
  getters,
  mutations
}
