import {playMode} from '../utils/config'

const state = {
  author: 'chen',
  focus: false,
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: 0,
  disc: {},
  topList: []
}

export default state
