<template>
  <div id='app' @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <transition name='fade' mode='out-in'>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <play></play>
    <div class="tipBox" v-show="show" ref="tipBox">
      <span class="tip">再按一次退出</span>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {event} from './utils/event'

  export default {
    name: 'app',
    computed: {
      ...mapGetters([
        'fullScreen',
        'focus'
      ])
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      }),
      onDeviceReady() {
        document.addEventListener('backbutton', this.onBackKeyDown, false)
      },
      onBackKeyDown() {
        if (this.fullScreen) {
          this.setFullScreen(false)
          return
        }
        const name = this.$router.currentRoute.name
        if (name === 'search' && this.focus) {
          event.$emit('inputBlur')
        } else if (name === 'recommend' || name === 'singer' || name === 'rank' || name === 'search') {
          this.showBackTip()
          // 注销返回键
          document.removeEventListener('backbutton', this.onBackKeyDown, false)
          // 绑定退出事件
          document.addEventListener('backbutton', this.exitApp, false)
          // 3秒后重新注册
          this.timer = setInterval(() => {
            this.hideTip()
            clearInterval(this.timer)
            this.timer = null
            // 注销返回键
            document.removeEventListener('backbutton', this.exitApp, false)
            // 返回键
            document.addEventListener('backbutton', this.onBackKeyDown, false)
          }, 3000)
        } else {
          this.$router.go(-1)
        }
      },
      exitApp() {
        navigator.app.exitApp()
      },
      showBackTip() {
        this.show = true
        setTimeout(() => {
          this.$refs.tipBox.style.opacity = 1
        }, 100)
      },
      hideTip() {
        this.$refs.tipBox.style.opacity = 0
        setTimeout(() => {
          this.show = false
        }, 1000)
      }
    },
    watch: {
      $route() {
        if (this.timer) {
          clearInterval(this.timer)
          this.hideTip()
          this.timer = null
          // 注销返回键
          document.removeEventListener('backbutton', this.exitApp, false)
          // 返回键
          document.addEventListener('backbutton', this.onBackKeyDown, false)
        }
      }
    },
    created() {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    }
  }
</script>
<style scoped lang="less">
  @import './common/styles/_vars.less';

  .tipBox {
    width: 100%;
    position: fixed;
    top: 45%;
    left: 0;
    text-align: center;
    transition: all .4s;
    opacity: 0;
    .tip {
      background: @color-highlight-background;
      color: #fff;
      display: inline-block;
      padding: 10px 20px;
      border-radius: 5px;
      opacity: .9;
    }
  }
</style>
