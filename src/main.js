import Vue from 'vue'
import App from './App.vue'
import router from './router'
import bluebird from 'bluebird'
import components from './components'
import './common/styles/index.less'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import store from './store'

window.Promise = bluebird
fastclick.attach(document.body)

Vue.use(components)
Vue.use(VueLazyLoad, {
  loading: require('./assets/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
