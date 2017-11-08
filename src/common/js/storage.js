let s = localStorage

// 保存类型
export const saveTypes = {
  searchHistory: 'searchHistory'
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
  if (arr.length >= 15) arr.pop()
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
