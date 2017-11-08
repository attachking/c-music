import {playMode} from '../utils/config'
import {getHistory, saveTypes} from '../common/js/storage'

const state = {
  author: 'chen',
  focus: false,
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: [],
  searchHistory: getHistory(saveTypes.searchHistory)
}

export default state
