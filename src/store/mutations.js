import * as types from './mutation-types'
import {insertPlayHistory, getHistory, saveTypes} from '../common/js/storage'

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
  [types.SET_FULL_SCREEN](state, o) {
    state.fullScreen = o
  },
  [types.SET_PLAYLIST](state, o) {
    state.playList = o
  },
  [types.SET_SEQUENCE_LIST](state, o) {
    state.sequenceList = o
  },
  [types.SET_MODE](state, o) {
    state.mode = o
  },
  [types.SET_CURRENT_INDEX](state, o) {
    if (o >= 0) {
      insertPlayHistory(state.playList[o])
      state.playHistory = getHistory(saveTypes.playHistory)
    }
    state.currentIndex = o
  },
  [types.SET_DISC](state, o) {
    state.disc = o
  },
  [types.SET_TOP_LIST](state, o) {
    state.topList = o
  },
  [types.SET_FOCUS](state, o) {
    state.focus = o
  },
  [types.SET_SEARCH_HISTORY](state, o) {
    state.searchHistory = o
  },
  [types.SET_FAVORITE](state, o) {
    state.favorite = o
  },
  [types.SET_PLAY_HISTORY](state, o) {
    state.playHistory = o
  }
}

export default mutations
