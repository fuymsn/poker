import * as types from '../mutation-types'

const state = {
  currentPoker: 0,
  currentChip: 1,
  currentPoint: 0,

  // 用户自身投注数据
  currentSumPointsList: [0, 0, 0, 0],
  currentSumPoints: 0,

  // 来自服务端总的数据
  sumPointsList: [0, 0, 0, 0],

  pokerData: [
    { id: 1, name: '貂蝉' },
    { id: 2, name: '王昭君' },
    { id: 3, name: '西施' },
    { id: 4, name: '杨贵妃' }
  ],
  pokerHeight: 0,
  pokerWidth: 0,
  pokerCoord: [], // poker的坐标
  chipHeight: 0,
  chipWidth: 0,
  chipCoord: [], // chip的坐标
  chipList: [], // { id: chipid, x: x坐标, y: y坐标 }
  currentBetPoker: 0, // 当前押注(来自服务器)
  currentBetChip: 0, // 当前选卡(来自服务器)
  winner: 0, // 开牌, 并在压注的时候归零
  winnerBgList: [1, 1, 1, 1]
}

const getters = {
  getCurrentSumPointsItemById: (state, getters) => (index) => {
    return state.currentSumPointsList[index]
  },
  getSumPointsItemById: (state, getters) => (index) => {
    return state.sumPointsList[index]
  },
  // [0, 0, 0, 0] //1正面, 0背面
  getWinnerBgList: (state, getters) => () => {
    let list = []
    state.pokerData.map((item) => {
      if (state.winner === item.id) {
        list.push(1)
      } else {
        list.push(0)
      }
    })
    return list
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
    // state.currentChip = 0
    state.currentPoint = 0
    state.currentSumPoints = 0
    state.currentSumPointsList = [0, 0, 0, 0]
    state.chipList = []
    state.sumPointsList = [0, 0, 0, 0]
  },
  [types.SET_SELF_ITEM_POINTS]: (state, { id, point }) => {
    // 替换值
    state.currentSumPointsList.splice((id - 1), 1, point)
  },
  [types.SET_SUM_ITEM_POINTS]: (state, sumItems) => {
    // 替换值
    state.sumPointsList = sumItems
  },

  [types.SUM_POINTS]: (state) => {
    // 将数组中的值相加
    state.currentSumPoints = state.currentSumPointsList.reduce((accumulator, currentValue) => { return accumulator + currentValue })
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

  [types.APPEND_CHIP_COORD]: (state, coordinates) => {
    state.chipCoord.push(coordinates)
  },

  [types.UPDATE_CHIP_LIST]: (state, chipItem) => {
    state.chipList.push(chipItem)
  },

  [types.SET_BET_POKER_FROM_SERVER]: (state, role) => {
    state.currentBetPoker = role
  },
  [types.SET_BET_CHIP_FROM_SERVER]: (state, chip) => {
    state.currentBetChip = chip
  },
  [types.SET_WINNER]: (state, winner) => {
    state.winner = winner
  }
}

export default {
  state,
  getters,
  mutations
}
