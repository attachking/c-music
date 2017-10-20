<template>
  <div class="hello">

  </div>
</template>

<script>
  import {jsonp} from '../../utils/http'
  import {ERR_OK} from '../../utils/config'
  export default {
    name: 'recommend',
    data() {
      return {}
    },
    methods: {
      getRecommend() {
        jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {}).then(data => {
          if (data.code === ERR_OK) {
            console.log(data.data.slider)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getRecommend()
    }
  }
</script>

<style scoped lang="less">

</style>
