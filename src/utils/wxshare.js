import https from '../https.js';
import wx from 'weixin-js-sdk';
export default {
  wxShowMenu: function(data) {
    console.log(data);
  	let params = '';
	https.fetchPost('http://omkcc.douyar.cc/pc_spell.php?step=fx',params ).then((res) => {
	console.log(res);
	var getMsg = res.data;
      wx.config({
        debug: false, //生产环境需要关闭debug模式
        appId: 'wxa1ef57725e6a43a9', //appId通过微信服务号后台查看
        timestamp: getMsg.timestamp, //生成签名的时间戳
        nonceStr: getMsg.noncestr, //生成签名的随机字符串
        signature: getMsg.sha1, //签名
        jsApiList: [ //需要调用的JS接口列表
          'onMenuShareTimeline', //分享给好友
          'onMenuShareAppMessage', //分享到朋友圈
        ]
      });
      wx.ready(function() {
        //分享到朋友圈
        wx.onMenuShareAppMessage({
          title: data.titles, // 分享标题
          desc: data.descs, //分享描述
          link: data.link, // 分享链接
          imgUrl: data.imgUrl // 分享图标
        });
        //分享给朋友
        wx.onMenuShareTimeline({
          title: data.titles, // 分享标题
          desc: data.descs, //分享描述
          link: data.link, // 分享链接
          imgUrl: data.imgUrl // 分享图标
        });
      });
	}).catch(err=>{
		console.log(err)
	})
  }
}
