<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" :probe-type="3" :listen-scroll="true" @scroll="scroll" class="list" ref="list">
      <div class="song-list-wrapper">
        <songs-list :songs="songs"></songs-list>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
  const RESOLVED_HEIGHT = 40

  export default {
    name: 'music-list',
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.imgHeight = this.$refs.bgImage.clientHeight
      this.minHeight = -this.imgHeight + RESOLVED_HEIGHT
      // scroll为自定义组件,需要加上$el
      this.$refs.list.$el.style.top = `${this.imgHeight}px`
    },
    computed: {
      bgStyle: {
        get() {
          return `background-image:url(${this.bgImage})`
        }
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      scroll(pos) {
        let translate = Math.max(pos.y, this.minHeight)
        this.$refs.layer.style.transform = `translate(0, ${translate}px)`
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../common/styles/_vars.less";
  @import "../../common/styles/_mixin.less";

  .music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: @color-background;
    .back{
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .icon-back{
        display: block;
        padding: 10px;
        font-size: @font-size-large-x;
        color: @color-theme;
      }
    }
    .title{
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      .no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: @font-size-large;
      color: @color-text;
    }
    .bg-image{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      .play-wrapper{
        position: absolute;
        bottom: 20px;
        z-index: 50;
        width: 100%;
        .play{
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid @color-theme;
          color: @color-theme;
          border-radius: 100px;
          font-size: 0;
          .icon-play{
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: @font-size-medium-x;
          }
          .text{
            display: inline-block;
            vertical-align: middle;
            font-size: @font-size-small;
          }
        }
      }
      .filter{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .bg-layer{
      position: relative;
      height: 100%;
      background: @color-background;
    }
    .list{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: @color-background;
      .song-list-wrapper{
        padding: 20px 30px;
      }
      .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
