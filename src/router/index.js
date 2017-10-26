import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend/recommend.vue'
import singer from '../components/singer/singer.vue'
import singerDetail from '../components/singer-detail/singer-detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [{
        path: ':id',
        name: 'singerDetail',
        component: singerDetail
      }]
    }
  ]
})
