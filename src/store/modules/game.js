import * as types from '../mutation-types'
// 筹码数据
const _chipValueList = [
  { id: 1, name: 1 },
  { id: 5, name: 5 },
  { id: 10, name: 10 },
  { id: 50, name: 50 },
  { id: 100, name: 100 },
  { id: 500, name: 500 },
  { id: 1000, name: '1千' },
  { id: 5000, name: '5千' },
  { id: 10000, name: '1万' },
  { id: 50000, name: '5万' },
  { id: 100000, name: '10万' },
  { id: 500000, name: '50万' },
  { id: 1000000, name: '100万' },
  { id: 5000000, name: '500万' }
]
// 通过id获取筹码value
const _getChipNameById = (id) => {
  let item = _chipValueList.find(item => item.id === id)
  return item ? item.name : 0
}

const state = {
  created: 0, // 游戏界面是否创建完成
  status: 0,
  beginTime: 0,
  currentTime: 0,
  bets: [],
  betLong: 0,
  resultLong: 0
}

const getters = {
  chipData: (state, getters) => {
    let data = []
    state.bets.map((e, i) => {
      data.push({
        id: i + 1,
        point: e,
        name: _getChipNameById(e)
      })
    })
    return data
  },
  getChipItemById: (state, getters) => (id) => {
    return getters.chipData.find(item => item.id === id)
  }
}

const mutations = {
  [types.INIT_GAME]: (state, {beginTime, currentTime, bets, betLong, resultLong}) => {
    state.beginTime = beginTime
    state.currentTime = currentTime
    state.bets = bets
    state.betLong = betLong
    state.resultLong = resultLong
  },
  [types.SET_GAME_STATUS]: (state, gameStatus) => {
    state.status = gameStatus
  },
  [types.START_GAME]: (state) => {
    state.status = 1
  },
  [types.END_GAME]: (state) => {
    state.status = 0
  },
  [types.CREATED]: (state) => {
    state.created = 1
  }
}

export default {
  state,
  getters,
  mutations
}
