import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, o) {
    state.singer = o
  },
  [types.SET_AUTHOR](state, o) {
    state.author = o
  }
}

export default mutations
