<template>
  <div class="Mask" v-show="isShow"></div>
</template>

<script>
export default {
  name: 'Masks',
  props:{
    isShow: {
      isShow: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
    }
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*@import '../assets/css/home.css'*/
.Mask{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.75);
  position: fixed;
  z-index: 1;
  top: 0;
}
</style>
