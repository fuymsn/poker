import * as types from '../mutation-types'

const state = {
  state: 0,
  beginTime: 0,
  currentTime: 0,
  bets: []
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
  [types.INIT_GAME]: (state, {beginTime, currentTime, bets}) => {
    state.beginTime = beginTime
    state.currentTime = currentTime
    state.bets = bets
  },
  [types.SET_GAME_STATE]: (state, gameState) => {
    state.state = gameState
  },
  [types.START_GAME]: (state) => {
    state.state = 1
  },
  [types.END_GAME]: (state) => {
    state.state = 0
  }
}

export default {
  state,
  getters,
  mutations
}
