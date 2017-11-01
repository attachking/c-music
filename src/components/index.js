import mHeader from './m-header/m-header.vue'
import tab from './tab/tab.vue'
import slider from '../base/slider/slider.vue'
import scroll from '../base/scroll/scroll.vue'
import loading from '../base/loading/loading.vue'
import listView from '../base/list-view/list-view.vue'
import musicList from './music-list/music-list.vue'
import songsList from '../base/songs-list/songs-list.vue'
import player from './player/player.vue'
import progressBar from '../base/progress-bar/progress-bar.vue'
import progressCircle from '../base/progress-circle/progress-circle.vue'

let components = [
  mHeader,
  tab,
  slider,
  scroll,
  loading,
  listView,
  musicList,
  songsList,
  player,
  progressBar,
  progressCircle
]

export default {
  install: (Vue) => {
    components.map(item => {
      Vue.component(item.name, item)
    })
  }
}
