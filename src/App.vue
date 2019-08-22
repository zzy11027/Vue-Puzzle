<template>
  <div id="app">
    <router-view :isPc="isPc" v-if="isRouterAlive" />
  </div>
</template>

<script>
import './assets/css/bg.css'
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data () {
    return {
      isPc:'',
      isRouterAlive:true
    }
  },
  mounted() {
    if (this._isMobile()) {
      this.isPc = 'm';
      this.WXConfig.wxShowMenu(
        {
          titles : '爱“拼”才会赢 大礼送不停',
          descs : '参与活动，即可赢取大奖',
          link :'http://omkcc.douyar.cc/puzzleM/dist/',
          imgUrl : 'http://omkcc.douyar.cc/puzzleM/dist/static/prize/wxshare.jpg',
        }
      );
      this.$router.replace('/puzzleM/dist');
    } else {
      this.isPc = 'pc';
      // this.$router.replace('/pc_index');
    }
  },
  methods:{
    _isMobile() {
       let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
       return flag;
    },
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
import '@/src/assets/css/global.css' /*引入公共样式*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
