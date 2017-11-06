import * as types from './mutation-types'

export const setAuthor = function({commit, state}, name) {
  commit(types.SET_AUTHOR, name)
}

export const selectPlay = function({commit}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const addSong = function({commit, state}, item) {
  let check = checkSongs(state.playList, item.id)
  if (check === true) {
    let arr = state.playList.slice(0)
    arr.splice(state.currentIndex, 0, item)
    commit(types.SET_SEQUENCE_LIST, arr)
    commit(types.SET_PLAYLIST, arr)
    commit(types.SET_PLAYING, true)
  } else {
    commit(types.SET_CURRENT_INDEX, check)
  }
}

export const addToNext = function({commit, state}, item) {
  if (checkSongs(state.playList, item.id) === true) {
    let arr = state.playList.slice(0)
    if (state.playList.length === 0) {
      arr.splice(0, 0, item)
    } else {
      arr.splice(state.currentIndex + 1, 0, item)
    }
    commit(types.SET_SEQUENCE_LIST, arr)
    commit(types.SET_PLAYLIST, arr)
    commit(types.SET_PLAYING, true)
  }
}

// 防止添加重复歌曲
function checkSongs(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (id === list[i].id) {
      return i
    }
  }
  return true
}
