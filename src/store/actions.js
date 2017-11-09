import * as types from './mutation-types'
import {addSearchHistory, getHistory, saveTypes, removeSearchHistory} from '../common/js/storage'

export const setAuthor = function({commit, state}, name) {
  commit(types.SET_AUTHOR, name)
}
// 选择歌单某一项进行播放
export const selectPlay = function({commit}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
  setTimeout(() => {
    commit(types.SET_FULL_SCREEN, true)
  }, 300)
}
// 添加新歌曲至当前播放索引的下一个,并播放该歌曲
export const addSong = function({commit, state}, item) {
  let arr = state.playList.slice(0)
  let check = checkSongs(arr, item.id)
  let index = state.currentIndex
  if (check === true) {
    // 如果当前列表中无重复歌曲
    arr.splice(state.currentIndex + 1, 0, item)
    index++
  } else if (check < state.currentIndex) {
    // 如果重复歌曲在当前播放歌曲之前
    arr.splice(state.currentIndex, 0, item)
  } else {
    // 如果重复歌曲为当前歌曲或在当前播放歌曲之后
    arr.splice(state.currentIndex + 1, 0, item)
    index++
  }
  commit(types.SET_SEQUENCE_LIST, arr)
  commit(types.SET_PLAYLIST, arr)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
}

// 添加搜索历史记录
export const insertHistory = function({commit}, item) {
  addSearchHistory(item)
  commit(types.SET_SEARCH_HISTORY, getHistory(saveTypes.searchHistory))
}

// 删除某个搜索历史纪录
export const deleteSearch = function({commit}, index) {
  removeSearchHistory(index)
  commit(types.SET_SEARCH_HISTORY, getHistory(saveTypes.searchHistory))
}

// 清空搜索历史记录
export const removeAllSearch = function({commit}) {
  localStorage.removeItem(saveTypes.searchHistory)
  commit(types.SET_SEARCH_HISTORY, getHistory(saveTypes.searchHistory))
}

// 防止添加重复歌曲,去除重复歌曲
function checkSongs(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (id === list[i].id) {
      list.splice(i, 1)
      return i
    }
  }
  return true
}
