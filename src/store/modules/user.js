import * as types from '../mutation-types'

const state = {
  gameid: 0,
  uid: 0,
  rid: 0
}

const mutations = {
  [types.USER_SET_GAMEID]: (state, gameid) => {
    state.gameid = gameid
  },
  // close message
  [types.USER_SET_UID]: (state, uid) => {
    state.uid = uid
  },
  // error message
  [types.USER_SET_RID]: (state, rid) => {
    state.rid = rid
  }
}

export default {
  state,
  mutations
}
