import * as types from './mutation-types'
import {playMode} from '../utils/config'

export const setAuthor = function({commit, state}, name) {
  commit(types.SET_AUTHOR, name)
}

export const selectPlay = function({commit}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_MODE, playMode.sequence)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
}
