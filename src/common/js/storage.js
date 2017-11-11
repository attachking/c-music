const MAX_PLAY_HISTORY = 30
const MAX_SEARCH_HISTORY = 15

let s = localStorage

// 保存类型
export const saveTypes = {
  searchHistory: 'searchHistory',
  favorite: 'favorite',
  playHistory: 'playHistory'
}

export function addSearchHistory(query) {
  let h = getHistory(saveTypes.searchHistory)
  checkItem(h, query)
  s.setItem(saveTypes.searchHistory, JSON.stringify(h))
}

// 检查是否已存在
function checkItem(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      arr.splice(i, 1)
    }
  }
  if (arr.length >= MAX_SEARCH_HISTORY) arr.pop()
  arr.unshift(item)
}

export function getHistory(type) {
  let h
  try {
    h = JSON.parse(s.getItem(type))
  } catch (err) {
    h = []
  }
  return h || []
}

export function removeSearchHistory(index) {
  let h = getHistory(saveTypes.searchHistory)
  h.splice(index, 1)
  s.setItem(saveTypes.searchHistory, JSON.stringify(h))
}

// 添加一首歌到我喜欢
export function insertFavorite(song) {
  let f = getHistory(saveTypes.favorite)
  let o = Object.assign({}, song)
  delete o.lyric
  f.push(o)
  s.setItem(saveTypes.favorite, JSON.stringify(f))
}

// 删除我喜欢的一首歌
export function removeFavorite(song) {
  let f = getHistory(saveTypes.favorite)
  let index = f.findIndex((item) => {
    return item.id === song.id
  })
  if (index !== -1) {
    f.splice(index, 1)
  }
  s.setItem(saveTypes.favorite, JSON.stringify(f))
}

// 删除所有我喜欢的
export function removeAllFavorite() {
  s.removeItem(saveTypes.favorite)
}

// 添加一首歌到播放历史
export function insertPlayHistory(song) {
  let list = getHistory(saveTypes.playHistory)
  let index = list.findIndex((item) => {
    return song.id === item.id
  })
  if (index !== -1) {
    list.splice(index, 1)
  }
  let o = Object.assign({}, song)
  delete o.lyric
  list.unshift(o)
  if (list.length > MAX_PLAY_HISTORY) {
    list.pop()
  }
  s.setItem(saveTypes.playHistory, JSON.stringify(list))
}

// 删除一个播放历史
export function deletePlayHistory(song) {
  let list = getHistory(saveTypes.playHistory)
  let index = list.findIndex((item) => {
    return item.id === song.id
  })
  if (index !== -1) {
    list.splice(index, 1)
    s.setItem(saveTypes.playHistory, JSON.stringify(list))
  }
}

// 移除所有播放历史
export function removePlayHistory() {
  s.removeItem(saveTypes.playHistory)
}
