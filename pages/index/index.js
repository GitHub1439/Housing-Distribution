const app = getApp();

import { getIndexData, getCoupons } from '../../api/api.js';
import Util from '../../utils/util.js';

// import { getIndexDatas} from '../../api/data.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    itemNew:[],
    activityList:[],
    menus: [],
    bastBanner: [],
    bastInfo: '',
    bastList: [],
    fastInfo: '',
    fastList: [],
    firstInfo: '',
    firstList: [],
    salesInfo: '',
    likeInfo: [],
    lovelyBanner: {},
    benefit:[],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    parameter:{
      'navbar':'0',
      'return':'0'
    },
    window: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.spid) app.globalData.spid = options.spid;
    if (options.scene) app.globalData.code = decodeURIComponent(options.scene);
  },
  catchTouchMove: function (res) {
    return false
  },
  onColse:function(){
    this.setData({ window: false});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // methods: {
    setGoodsSearch:function(){
       wx.navigateTo({
         url: '/pages/goods_search/index',
       })
    },
	// },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getIndexConfig();
    if(app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
  },
  get_issue_coupon_list:function(){
    var that = this;
    getCoupons({page:1,limit:3}).then(res=>{
      that.setData({ couponList: res.data });
      if (!res.data.length) that.setData({ window: false });
    });
  },
  getIndexConfig:function(){
    var that = this;
    getIndexData().then(res=>{
		// console.log(res )
      that.setData({
        imgUrls: res.data.banner,
        menus: res.data.menus,
        itemNew: res.data.roll,
        activityList: res.data.activity,
        bastBanner: res.data.info.bastBanner,
        bastInfo: res.data.info.bastInfo,
        bastList: res.data.info.bastList,
        fastInfo: res.data.info.fastInfo,
        fastList: res.data.info.fastList,
        firstInfo: res.data.info.firstInfo,
        firstList: res.data.info.firstList,
        salesInfo: res.data.info.salesInfo,
        likeInfo: res.data.likeInfo,
        lovelyBanner: res.data.lovely.length ? res.data.lovely[0] : {},
        benefit: res.data.benefit,
        logoUrl: res.data.logoUrl,
        couponList: res.data.couponList,
      });
	  that.setData({
	    imgUrls: [{"id":104,"name":"banenr2","url":"","pic":"/images/fangchang/bg/bg.png"},{"id":104,"name":"banenr2","url":"","pic":"/images/fangchang/bg/bg.png"},{"id":104,"name":"banenr2","url":"","pic":"/images/fangchang/bg/bg.png"}],
	    menus: [{"name":"房屋报备","pic":"/images/fangchang/icon/baobei.png","url":"/pages/goods_cate/goods_cate",show:true},{"name":"申请合作","pic":"/images/fangchang/icon/hezuo.png","url":"/pages/goods_cate/goods_cate",show:true},{"name":"集团介绍","pic":"/images/fangchang/icon/jituan.png","url":"/pages/goods_cate/goods_cate",show:true},{"name":"房屋租赁","pic":"/images/fangchang/icon/zhushou.png","url":"/pages/goods_cate/goods_cate",show:true},{"name":"入客","pic":"/images/fangchang/icon/ruke.png","url":"/pages/goods_cate/goods_cate",show:true}],
	    itemNew: [{info:"近日常州东方君开楼盘开盘销售1...",status:false,url:""},{info:"近日常州东方君开楼盘开盘销售2...",status:false,url:""},{info:"近日常州东方君开楼盘开盘销售3...",status:false,url:""}],
		bastList: [{"image":"/images/fangchang/logo/home_fang.png","store_name":"汇一公寓","price":"均价10980/㎡","sales":"在售 | 2室2厅1卫","dizhi":"距离地铁2号线560米",detail:true},{"image":"/images/fangchang/logo/home_fang.png","store_name":"汇一公寓","price":"均价10980/㎡","sales":"在售 | 2室2厅1卫","dizhi":"距离地铁2号线560米",detail:true},{"image":"/images/fangchang/logo/home_fang.png","store_name":"汇一公寓","price":"均价10980/㎡","sales":"在售 | 2室2厅1卫","dizhi":"距离地铁2号线560米",detail:true}]
	  });
	  // console.log(that.data)
      wx.getSetting({
        success(res) {
			console.log(res)
          if (!res.authSetting['scope.userInfo']) {
            that.setData({ window: that.data.couponList.length ? true : false });
          } else {
            that.setData({ window: false });
          }
        }
      });
    })
  },
  getmap(){
	  wx.getLocation({
	   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
	   success (res) {
		   console.log(res)
	     const latitude = res.latitude
	     const longitude = res.longitude
	     wx.openLocation({
	       latitude,
	       longitude,
	       scale: 18
	     })
	   }
	  })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ window:false});
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getIndexConfig();
    if (app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})