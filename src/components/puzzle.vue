<template>
<div>
  <div class="prizeAll" @mousemove="stopMove($event)">
    <div class="box">
        <ul class="puzzle-wrap">
            <li 
                :class="{'puzzle': true, 'puzzle-empty': !puzzle,'maxWidth':maxWidth,'minWidth':minWidth}" 
                v-for="(puzzle,index) in puzzles" 
                @click.stop="moveFn(index)"
            >
          <img :src='getImgUrl(puzzle)'>
            </li>
        </ul>
    </div>
    <div class="time">
      <span>{{time}}</span>
    </div>
  </div>
  <div class="love">
    <img :src="Original" alt="" class="loveLeft">
    <img src="../../static/prize/love.png" alt="" class="loveImg">
  </div>
  <div class="lastImg" >
    <img src="../../static/prize/lastImg.png" alt="" @click="last()">
    <!-- <img src="../../static/prize/goPrize.png" alt=""  @click="goPrize()"> -->
  </div>
  <div class="NextPass" v-show="Congratulations">
    <p ref="prizeWord">恭喜您进入下一关！</p>
    <div class="buttons" @click="goLast()"></div>
  </div>
  <div class="lastImgShow" v-show="lastImgShow">
    <p>拼图时间结束了，请前往抽奖吧</p>
    <div class="buttons" @click="goPrize()"></div>
  </div>
  <Masks :isShow='isShow'/>
  <Bg/>
</div>
</template>

<script>
import https from '../https.js';
import '../assets/css/puzzle.css'
import Masks from '@/common/mask'
import Bg from '@/common/isbg'
export default {
  inject:['reload'],
  name: 'puzzle',
  data () {
    return {
      puzzles: [],
      Checkpoint:1,//默认九宫格
      minWidth:false,
      maxWidth:false,
      lastImgShow:false,
      Congratulations:false,
      time:120,
      Original:'',
      settime:'',
      isShow:false,
      isGoprize:false
    }
  },
  created(){
    this.settime = setInterval(()=>{
      this.time--;
      if(this.time <= 0){
        clearInterval(this.settime);
            alert('时间到啦~~~')



            
        // this.lastImgShow = true;
        // this.isShow = true;
        // this.$router.push({
        //   path: '/prize',
        //   name: 'prize',
        //   query: {
        //     // prize: 'this is prize'
        //   }
        // })
      }
    },1500)
  },
  methods: {
    stopMove(){return false},
    goLast(){
      if(this.isGoprize == true){
        this.$router.push({
          path: '/prize',
          name: 'prize',
          query: {
            // prize: 'this is prize'
          }
        })
        return false;
      }
      this.isShow = false;
      this.Congratulations = false;
      if(this.Checkpoint == 2){
        clearInterval(this.settime);
        this.time = 300;
        this.settime = setInterval(()=>{
          this.time--;
          if(this.time <= 0){
            clearInterval(this.settime);
            // this.lastImgShow = true;
            // this.isShow = true;
            alert('时间到啦~~~')
          }
        },1500)
      }else if(this.Checkpoint == 3){
        clearInterval(this.settime);
        this.time = 600;
        this.settime = setInterval(()=>{
          this.time--;
          if(this.time <= 0){
            clearInterval(this.settime);
            // this.lastImgShow = true;
            // this.isShow = true;
            alert('时间到啦~~~')
          }
        },1500)
      }
    },
  // 重置渲染
    render () {
        let puzzleArr = [],
            i = 1

        switch(this.Checkpoint){
      case 1:
            // 生成包含1 ~ 15数字的数组
            for (i; i < 9; i++) {
                puzzleArr.push(i)
            }
            puzzleArr.splice(Math.random() * puzzleArr.length, 0, '');
      break;
      case 2:
            // 生成包含1 ~ 15数字的数组
            for (i; i < 16; i++) {
                puzzleArr.push(i)
            }
            puzzleArr.splice(Math.random() * puzzleArr.length, 0, '');
      break;
      case 3:
            // 生成包含1 ~ 15数字的数组
            for (i; i < 25; i++) {
                puzzleArr.push(i)
            }
            puzzleArr.splice(Math.random() * puzzleArr.length, 0, '');
      break;
      }
        // 随机打乱数组    这样会死局！！！！！！！！！！！！！！！！！！！！
        // puzzleArr = puzzleArr.sort(() => {
        //     return Math.random() - 0.5
        // });
        // 页面显示
        this.puzzles = puzzleArr;
        // this.puzzles.push('');
    },
    moveFn(index){
    // let params ={'uid': 61};
    // https.fetchPost('/api/ol/ol_spirit.php',params ).then((data) => {
    //  console.log(data);
    // }).catch(err=>{
    //         console.log(err)
    //     }
    // )
      switch(this.Checkpoint){
        case 1:
        var curIndex = this.puzzles[index];
        var leftIndex = this.puzzles[index - 1];
        var rightIndex = this.puzzles[index + 1];
        var topIndex = this.puzzles[index - 3];
        var bottomIndex = this.puzzles[index + 3];
        if (leftIndex === '' && index % 3) {
          this.$set(this.puzzles, index - 1, curIndex);
          this.$set(this.puzzles, index, '');
        } else if (rightIndex === '' && 2 !== index % 3) {
          this.$set(this.puzzles, index + 1, curIndex);
          this.$set(this.puzzles, index, '');
        } else if (topIndex === '') {
          this.$set(this.puzzles, index - 3, curIndex);
          this.$set(this.puzzles, index, '');
        } else if (bottomIndex === '') {
          this.$set(this.puzzles, index + 3, curIndex);
          this.$set(this.puzzles, index, '');
        }  
        break;
        case 2:
        var curNum = this.puzzles[index],
                leftNum = this.puzzles[index - 1],
                rightNum = this.puzzles[index + 1],
                topNum = this.puzzles[index - 4],
                bottomNum = this.puzzles[index + 4]

              if (leftNum === '' && index % 4) {
                  this.$set(this.puzzles,index - 1, curNum)
                  this.$set(this.puzzles,index, '')
              } else if (rightNum === '' && 3 !== index % 4) {
                  this.$set(this.puzzles,index + 1, curNum)
                  this.$set(this.puzzles,index, '')
              } else if (topNum === '') {
                  this.$set(this.puzzles,index - 4, curNum)
                  this.$set(this.puzzles,index, '')
              } else if (bottomNum === '') {
                  this.$set(this.puzzles,index + 4, curNum)
                  this.$set(this.puzzles,index, '')
              }     
        break;
      case 3:
        var curNum = this.puzzles[index],
                leftNum = this.puzzles[index - 1],
                rightNum = this.puzzles[index + 1],
                topNum = this.puzzles[index - 5],
                bottomNum = this.puzzles[index + 5]
                console.log(index);
                console.log(this.puzzles);
                console.log(curNum,leftNum,rightNum,topNum,bottomNum);
              if (leftNum === '' && index % 5) {
                  this.$set(this.puzzles,index - 1, curNum)
                  this.$set(this.puzzles,index, '')
              } else if (rightNum === '' && 4 !== index % 5) {
                  this.$set(this.puzzles,index + 1, curNum)
                  this.$set(this.puzzles,index, '')
              } else if (topNum === '') {
                  this.$set(this.puzzles,index - 5, curNum)
                  this.$set(this.puzzles,index, '')
              } else if (bottomNum === '') {
                  this.$set(this.puzzles,index + 5, curNum)
                  this.$set(this.puzzles,index, '')
              }       
        break;
      }

    this.passFn()
    },
    passFn() {
    switch(this.Checkpoint){
      case 1:
        if (this.puzzles[8] === '') {
          const newPuzzles = this.puzzles.slice(0, 8);
          const isPass = newPuzzles.every((e, i) => e === i + 1);
          if (isPass) {
            this.puzzles[8] = '9';//替换最后一个白块
            setTimeout(()=>{
              this.Original =  '../../static/images/1s/Original.png'; 
              this.Checkpoint = 2;
              this.minWidth = true;
              this.maxWidth = false;
              this.render();
              this.Congratulations = true;
              this.isShow = true;
            },1500)
          }
        }
      break;
      case 2:
        if (this.puzzles[15] === '') {
          const newPuzzles = this.puzzles.slice(0, 15);
          const isPass = newPuzzles.every((e, i) => e === i + 1);
          if (isPass) {
            this.puzzles[15] = '16';//替换最后一个白块
            setTimeout(()=>{
              this.Original =  '../../static/images/2/Original.png';
              this.Checkpoint = 3;
              this.maxWidth = true;
              this.minWidth = false;
              this.render();
              this.Congratulations = true;              
              this.isShow = true;
            },1500)
          }
        }
      break;
      case 3:
        if (this.puzzles[24] === '') {
          const newPuzzles = this.puzzles.slice(0, 24);
          const isPass = newPuzzles.every((e, i) => e === i + 1);
          if (isPass) {
            this.puzzles[24] = '25';//替换最后一个白块
            this.$refs.prizeWord.innerHTML = '恭喜已经全部通关！';
            this.Congratulations = true;
            this.isGoprize = true;
            setTimeout(() =>{
              this.time = 600;
              this.render();
            },500)
          }
        }
      break;
      }
    },
  getImgUrl(puzzle){
    switch(this.Checkpoint){
      case 1:
        var url = '../../static/images/'+puzzle+'.png';
        if(puzzle != ''){return url;}     
        if(puzzle == ''){return '../../static/images/wirtethree.png';}  
        this.Original = '../../static/images/Original.png';    
      break;
      case 2:
        // var random = Math.round(Math.random());
        // if(random == 0){
        //   var url = '../../static/images/1/'+puzzle+'four.png';
        //   if(puzzle != ''){return url;}     
        //   if(puzzle == ''){return '../../static/images/wirtefour.png';} 
        //   this.Original =  '../../static/images/1/Original.png';          
        // }else{
          var url = '../../static/images/1s/'+puzzle+'four.png';
          if(puzzle != ''){return url;}     
          if(puzzle == ''){return '../../static/images/wirtefour.png';} 
          this.Original =  '../../static/images/1s/Original.png'; 
        // }
      break;
      case 3:
       var random = Math.round(Math.random());
        // if(random == 0){
          var url = '../../static/images/2/'+puzzle+'five.png';
          if(puzzle != ''){return url;}     
          if(puzzle == ''){return '../../static/images/wirtefive.png';}  
          this.Original =  '../../static/images/2/Original.png';          
        // }else{
        //   var url = '../../static/images/2s/'+puzzle+'five.png';
        //   if(puzzle != ''){return url;}     
        //   if(puzzle == ''){return '../../static/images/wirtefive.png';}  
        //   this.Original =  '../../static/images/2s/Original.png';
        // }
      break;
    }
  },
  last(){
    this.isShow = false;
    this.reload();
    // this.$router.push({
    //   path: '/puzzle',
    //   name: 'puzzle',
    //   query: {
    //     // puzzle: 'this is puzzle'
    //   }
    // })
  },
  goPrize(){
    this.isShow = false;
    this.$router.push({
      path: '/prize',
      name: 'prize',
      query: {
        // prize: 'this is prize'
      }
    })
  },
  },
  mounted(){
    this.render();
    this.Original = '../../static/images/Original.png';
  },
  computed:{

  },
  components:{
    Masks,
    Bg
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>