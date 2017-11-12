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
  import event, {EVENT_TYPES} from './utils/event'

  export default {
    name: 'app',
    computed: {
      ...mapGetters([
        'fullScreen',
        'focus',
        'playListShow',
        'addSongShow',
        'confirmShow'
      ])
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayListShow: 'SET_PLAY_LIST_SHOW',
        setAddSongShow: 'SET_ADD_SONG_SHOW'
      }),
      // 设备准备完毕后
      onDeviceReady() {
        document.addEventListener('backbutton', this.onBackKeyDown, false)
      },
      // 监听返回键
      onBackKeyDown() {
        const name = this.$router.currentRoute.name
        if (this.focus) {
          // 当前如果正在调用手机输入法时，退出用户输入操作
          event.$emit(EVENT_TYPES.inputBlur)
        } else if (this.confirmShow) {
          // 当前确认窗口弹出状态时，关闭窗口
          event.$emit(EVENT_TYPES.confirmHide)
        } else if (this.fullScreen) {
          // 当播放器全屏时，退出全屏播放
          this.setFullScreen(false)
        } else if (this.addSongShow) {
          // 如果当前停留在添加歌曲页面时，退出添加歌曲
          this.setAddSongShow(false)
        } else if (this.playListShow) {
          // 当前如果正在显示播放列表时，退出播放列表显示
          this.setPlayListShow(false)
        } else if (name === 'recommend' || name === 'singer' || name === 'rank' || name === 'search') {
          // 按两次返回键退出逻辑
          this.showBackTip()
          // 注销返回键
          document.removeEventListener('backbutton', this.onBackKeyDown, false)
          // 绑定退出事件
          document.addEventListener('backbutton', this.exitApp, false)
          // 3秒后重新注册返回事件
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
          // 否则执行浏览器回退
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
