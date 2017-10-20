import mHeader from './m-header/m-header.vue'
import tab from './tab/tab.vue'

let components = [
  mHeader,
  tab
]

export default {
  install: (Vue) => {
    components.map(item => {
      Vue.component(item.name, item)
    })
  }
}
