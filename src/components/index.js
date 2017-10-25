import mHeader from './m-header/m-header.vue'
import tab from './tab/tab.vue'
import slider from '../base/slider/slider.vue'
import scroll from '../base/scroll/scroll.vue'
import loading from '../base/loading/loading.vue'
import listView from '../base/list-view/list-view.vue'

let components = [
  mHeader,
  tab,
  slider,
  scroll,
  loading,
  listView
]

export default {
  install: (Vue) => {
    components.map(item => {
      Vue.component(item.name, item)
    })
  }
}
