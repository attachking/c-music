import mHeader from './m-header/m-header.vue'
import tab from './tab/tab.vue'
import slider from './slider/slider.vue'
import scroll from './scroll/scroll.vue'

let components = [
  mHeader,
  tab,
  slider,
  scroll
]

export default {
  install: (Vue) => {
    components.map(item => {
      Vue.component(item.name, item)
    })
  }
}
