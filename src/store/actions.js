import * as types from './mutation-types'

export const setAuthor = function({commit, state}, name) {
  commit(types.SET_AUTHOR, name)
}
