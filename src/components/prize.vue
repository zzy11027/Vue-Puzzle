<template>
<div ref="prizeAlls">
	<div class="eggAll">
    <div class="eggs" @mousemove="checkeddetailproduct($event)" v-show="eggShow">
      <div v-for="(prize,index) in prizeImg">
        <img :src="prize.egg" alt="" class="egg"  @click="breaks($event,index)">
        <img src="../../static/prize/seat.png" alt="" class="seat" >
        <img src="../../static/prize/Hammer.png"  v-if="prize.hammer" :class="{'isDraw': true, 'frames': isDraw}" ref="map">
      </div>
    </div>
	</div>
  <div class="Receive" v-show="isReceive">
    <div class="close" @click="close()"></div>
    <!-- <img src="../../static/prize/close.png" alt="" class="close" @click="close()"> -->
    <img src="../../static/prize/Receive.png" alt="">
    <p>请登记您的信息，我们后期会和您联系兑奖事宜，请注意保持手机畅通</p>
    <div class="my myname">
      <span>姓名</span>
      <input type="text" class="name" placeholder="请输入您的姓名" v-model="name">
    </div>
    <div class="my myphone">
      <span>电话</span>
      <input type="text" class="phone" placeholder="请输入您的电话" v-model="phone">
    </div>
    <div class="my myphone">
      <div class="selects select1">
        <span>省</span>
        <select name="" id="provice" @change="getCity($event)"  ref="proviceText">
          <option :value="prov.id" 
            v-for="(prov,index) in provice"
          >
          {{prov.title}}</option>
        </select>
        <i class="iconfont  icon-xiala"></i>
      </div>
      <div class="selects select2">
        <span>市</span>
        <select name="" id="city"  @change="getCityText($event)"  ref="cityText">
          <option value="0"
            v-for="(city,index) in cityArr"
          >
          {{city.title}}</option>
        </select>
        <i class="iconfont  icon-xiala"></i>
      </div>
    </div>
    <div class="my myaddress">
      <span>详细住址</span>
      <input type="text" class="address" placeholder="请输入您的详细住址"  v-model='addressText'>
    </div>
    <div class="my myaddress">
      <span>意向车型</span>
      <select name="" id="cx"  v-model='cxName'>
        <option :value="cx.id"
            v-for="(cx,index) in cxArr"
          >
          {{cx.title}}</option>
      </select>
    </div>
    <span>*您的地址我们将用于礼品发放，我们不会对信息造成任何泄露</span>
    <div class="buttonTj" @click="Tjmessage()">填写信息</div>
  </div>
  <div :class="[{surprised:true},{zIndex:zindex}]"  v-show="isSure">
    <img :src="picUrl" alt="">
    <div :class="[{ active: isActive }, {prizeInformation:true}]">
      <p>{{prize}}</p>
      <img :src="picUrlnum" alt="" :class="[{ actives: isActives }, {prizeurlnum:true}]">
      <span v-show="isReceive">请保持手机畅通，我们会与您联系</span>
      <div :class="{buttonTj:true}" @click="sure()">确定</div>
      <div v-show="!isReceive" class="shopping">欧马可S1/S3  99元订金抵299</div>
      <div v-show="!isReceive" class="shopping">欧马可S5  99元订金抵399</div>
      <div v-show="!isReceive" :class="{buttonTj:true}" @click="showShop()">马上订购</div>
    </div>
  </div>
  <div class="lastImgShows" v-show="Congratulations">
    <p>{{Tips}}</p>
    <div class="buttons" @click="sures()"></div>
  </div>
  <div v-show="shopImg" class="shopImgback" @click="closeFxImg()">
    <img  src="../../static/prize/shopImg.png" alt="">
  </div>
  <Masks :isShow='isShow'/>
  <Bg/>
</div>
</template>

<script>
import https from '../https.js';
import '../assets/css/prize.css'
import Masks from '@/common/mask'
import Bg from '@/common/isbg'
export default {
  name: 'puzzle',
  props:{
    isPc: {
      isPc: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      prizeImg: [
        {'egg':'../../static/prize/eggComplete.png','hammer':''},
        {'egg':'../../static/prize/eggComplete.png','hammer':''},
        {'egg':'../../static/prize/eggComplete.png','hammer':''},
        {'egg':'../../static/prize/eggComplete.png','hammer':''},
        {'egg':'../../static/prize/eggComplete.png','hammer':''},
        {'egg':'../../static/prize/eggComplete.png','hammer':''}
      ],
      provice:[], 
      cityArr:[],
      cxArr:[{id: "0", title: "请选择您的意向车型"},{id: "1", title: "欧马可S1 99元订金抵299"},{id: "3", title: "欧马可S3 99元订金抵299"},{id: "5", title: "欧马可S5 99元订金抵399"}],
      isDraw:false, 
      isShow:false,
      eggShow:true,
      name:'',
      phone:'',
      // proviceID:'',
      // cityID:'',
      proviceName:'',
      cityName:'',
      addressText:'',
      cxName:'',
      prize:'',
      picUrl:'',
      isSure:false,
      isReceive:false,
      Congratulations:false,
      Tips:'',
      picUrlnum:'',
      isActive:false,
      isActives:false,
      shopImg:false,
      zindex:false,
    }
  },
  created(){
    this.cityArr.splice(0,0,{id: "0", title: "请选择您的城市", pid: "0", short_title: "", areacode: "0", zipcode: "0", pinyin: ""});
    this.cxName = this.cxArr[0].id;
    https.fetchPost('http://omkcc.douyar.cc/pc_spell.php?step=prov','' ).then((data) => {
      this.provice = data.data;
      this.provice.splice(0,0,{id: "0", title: "请选择您的省份", pid: "0", short_title: "", areacode: "0", zipcode: "0", pinyin: ""});
      // this.proviceID = this.provice[0].id;
    }).catch(err=>{
          console.log(err)
        }
    )
  },
  methods: {
    close(e){
      this.isReceive = false;
      this.isShow = false;
      this.prizeImg.forEach((index,item)=>{
        console.log(index,item);
        index.hammer = '';
      })
    },
    checkeddetailproduct(e){
      // this.$refs.map.style.left = e.screenX + 'px';
      // this.$refs.map.style.top = e.screenY + 'px';
    },
    breaks(e,index){
      console.log(index);
      // if(this.isDraw === true){return false;}
      // this.$refs.map.style.display = 'none';
      setTimeout(()=>{
        this.isDraw = true;
        this.prizeImg[index].hammer = '../../static/prize/Hammer.png';
      },500);
      setTimeout(()=>{
        // this.prizeImg[index].hammer = '';
        // this.prizeImg[index].egg = '../../static/prize/brokeneggs.png';
        this.isReceive = true;
        this.isShow = true;
        this.isDraw = false;
      },1500);
      return;
  		let params ={'uid': 61};
  		https.fetchPost('http://omkcc.douyar.cc/pc_spell.php?step=info',params ).then((data) => {
  			console.log(data);
  		}).catch(err=>{
  	        console.log(err)
  		    }
  		)
    },
    getCity(e){
      let params ={prov: e.target.value};
      https.fetchPost('http://omkcc.douyar.cc/pc_spell.php?step=city',params).then((data) => {
          this.cityArr = data.data;
          this.cityArr.splice(0,0,{id: "0", title: "请选择您的城市", pid: "0", short_title: "", areacode: "0", zipcode: "0", pinyin: ""});
          // this.cityID = this.cityArr[0].id;
          this.proviceName = this.$refs.proviceText[this.$refs.proviceText.selectedIndex].text;
      }).catch(err=>{
            console.log(err)
          }
      )
    },
    getCityText(e){
      this.cityName = this.$refs.cityText[this.$refs.cityText.selectedIndex].text;
    },
    Tjmessage(e){
      console.log(this.cx);
      if(this.name == ''){this.Congratulations = true;this.Tips ='请输入您的姓名!';return false;}
      if(this.phone == ''){this.Congratulations = true;this.Tips ='请输入您的电话!';return false;}
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(this.phone)) {this.Congratulations = true;this.Tips ='请输入正确的手机号!';return false;}
      if(this.proviceName == ''){this.Congratulations = true;this.Tips ='请输入您的省份!';return false;}
      if(this.cityName == ''){this.Congratulations = true;this.Tips ='请输入您的城市!';return false;}
      if(this.addressText == ''){this.Congratulations = true;this.Tips ='请输入您的详细住址!';return false;}
      if(this.cxName == 0){this.Congratulations = true;this.Tips ='请输入您的意向车型!';return false;}
      if(this.cxName == 1){var cxcx = '欧马可S1'};
      if(this.cxName == 3){var cxcx = '欧马可S3'};
      if(this.cxName == 5){var cxcx = '欧马可S5'};
      let params ={name:this.name,phone:this.phone,prove:this.proviceName,city:this.cityName,address:this.addressText,source:this.isPc,cx:cxcx};
      console.log(params);
      https.fetchPost('http://omkcc.douyar.cc/pc_spell.php?step=info',params).then((data) => {
        console.log(data);
        this.isSure = true;
        this.isReceive = false;
        this.eggShow = false;
        if(data.data == 1){
          this.prize = '奖品“1元话费”一份';
          this.picUrl = '../../static/prize/prize.png';
          this.picUrlnum = '../../static/prize/prize5.png';
        }else if(data.data == 2){
          this.prize = '奖品“2元话费”一份';
          this.picUrl = '../../static/prize/prize.png';
          this.picUrlnum = '../../static/prize/prize5.png';
        }else if(data.data == 3){
          this.prize = '奖品“5元话费”一份';
          this.picUrl = '../../static/prize/prize.png';
          this.picUrlnum = '../../static/prize/prize5.png';
        }else if(data.data == 4){
          this.prize = '奖品“康明斯洗车套”一份';
          this.picUrl = '../../static/prize/prize.png';
          this.picUrlnum = '../../static/prize/prize6.png';
        }else if(data.data == 5){
          this.prize = '奖品“雨伞”一份';
          this.picUrl = '../../static/prize/prize.png';
          this.picUrlnum = '../../static/prize/prize4.png';
          this.isActives = true;
        }else if(data.data == 6){
          this.prize = '奖品“蓝牙音箱”一份';
          this.picUrl = '../../static/prize/prize.png';
          this.picUrlnum = '../../static/prize/prize3.png';
        }else if(data.data == 7){
          this.prize = '奖品“按摩器”一份';
          this.picUrl = '../../static/prize/prize.png';
          this.picUrlnum = '../../static/prize/prize1.png';
        }else if(data.data == 8){
          this.prize = '奖品“车模”一份';
          this.picUrl = '../../static/prize/prize.png';
          this.picUrlnum = '../../static/prize/prize2.png';
          this.isActives = true;
        }else if(data.data == 9){
          this.prize = '本次活动奖品与您只差一丢丢~';
          this.picUrl = '../../static/prize/none.png';
          this.isActive = true;
        }else if(data.data == 10){
          this.prize = '本次活动奖品与您只差一丢丢~';
          this.picUrl = '../../static/prize/none.png';
          this.isActive = true;
        }
      }).catch(err=>{
            console.log(err)
          }
      )
    },
    sure(e){
      window.location.href = 'http://omkcc.douyar.cc/puzzleM/dist';
    },
    sures(e){
      this.Congratulations = false;
    },
    showShop(e){
      this.shopImg = true;
      this.zindex = true;
    },
    closeFxImg(e){
      this.shopImg = false;
      this.zindex = false;
    },
  },
  mounted(){
    // console.log(this.prizeImg)
  	// this.render();
  },
  computed:{

  },
  watch:{
      // 'name': function(newname){
      //   console.log(newname);
      // },
      // 'phone': function(newphone){
      //   console.log(newphone);
      // },
      // 'addressText': function(newaddress){
      //   console.log(newaddress);
      // }
      'cxName':function(newCx){
        console.log(newCx);
        // if(newCx == '欧马可S1'){
        //   this.cxName = '欧马可S1';
        // }else if(newCx == '欧马可S3'){
        //   this.cxName = '欧马可S3';
        // }else if(newCx == '欧马可S5'){
        //   this.cxName = '欧马可S5';
        // }
      }
  },
  destroyed(){
    this.$router.push({
      path: '/puzzleM/dist',
      name: 'home',
      query: {
        // prize: 'this is prize'
      }
    })
  },
  components:{
    Masks,
    Bg
  }
}
</script>
<style scoped>

</style>
