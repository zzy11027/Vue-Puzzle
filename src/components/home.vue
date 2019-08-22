<template>
    <div>
        <div class="rule">
            <img src="../../static/prize/Rulecontent.png" alt="" class="Rulecontent">
            <router-link to="/puzzleM/dist/puzzle"  class="stargame">
                <img src="../../static/prize/startGame.png" alt="" class="startGame">
            </router-link>
        </div>
        <Bg />
    </div>
</template>

<script>
import Bg from '@/common/isbg'
    export default {
        name: 'home',
        data () {
            return {

            }
        },
        methods:{
            stargame:function(e){
                this.$router.push({
                    path: '/puzzleM/dist/puzzle',
                    name: 'puzzle',
                    query: {
                        home: 'this is puzzle'
                    }
                })
            }
        },
        components:{
            Bg
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rule{
    width: 702px;
    height: 818px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../static/prize/rule.png);
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    z-index: 2;
    top: 5%;
}
.Rulecontent{
    display: block;
    width: 80%;
    margin: 0 auto;
    margin-top: 38%;
}
.stargame{
    width: 202px;
    height: 52px;
    position: absolute;
    margin:auto;
    left: 0;
    right: 0;
    bottom: 10%;
}
</style>
