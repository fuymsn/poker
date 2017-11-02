import * as types from '../mutation-types'

const state = {
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
        name: '1'
      })
    })
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
  }
}

export default {
  state,
  getters,
  mutations
}
