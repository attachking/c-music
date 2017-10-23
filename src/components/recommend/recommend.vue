<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content">
      <slider v-if="sliders.length">
        <div v-for="(val, key) in sliders">
          <a :href="val.linkUrl">
            <img :src="val.picUrl" @load="loadImage">
          </a>
        </div>
      </slider>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {jsonp} from '../../utils/http'
  import {ERR_OK} from '../../utils/config'

  export default {
    name: 'recommend',
    data() {
      return {
        sliders: [],
        checkLoaded: false
      }
    },
    methods: {
      getRecommend() {
        jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {}).then(data => {
          if (data.code === ERR_OK) {
            this.sliders = data.data.slider
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadImage() {
        if (this.checkLoaded) return
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    mounted() {
      this.getRecommend()
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/_vars.less";

  .recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content{
      height: 100%;
      overflow: hidden;
      .slider-wrapper{
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recommend-list{
        .list-title{
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-theme;
          .item{
            display: flex;
            box-sizing: border-box;
            align-items: center;
            padding: 0 20px 20px 20px;
            .icon{
              flex: 0 0 60px;
              width: 60px;
              padding-right: 20px;
            }
            .text{
              display: flex;
              flex-direction: column;
              justify-content: center;
              flex: 1;
              line-height: 20px;
              overflow: hidden;
              font-size: @font-size-medium;
              .name{
                margin-bottom: 10px;
                color: @color-text;
              }
              .desc{
                color: @color-text-d;
              }
            }
          }
        }
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
