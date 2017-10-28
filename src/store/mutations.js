import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, o) {
    state.singer = o
  },
  [types.SET_AUTHOR](state, o) {
    state.author = o
  },
  [types.SET_PLAYING](state, o) {
    state.playing = o
  },
  [types.SET_FULLSCREEN](state, o) {
    state.fullScreen = o
  },
  [types.SET_PLAYLIST](state, o) {
    state.playList = o
  },
  [types.SET_SEQUENCELIST](state, o) {
    state.sequenceList = o
  },
  [types.SET_MODE](state, o) {
    state.mode = o
  },
  [types.SET_CURRENTINDEX](state, o) {
    state.currentIndex = o
  }
}

export default mutations
