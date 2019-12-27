// pages/my-promotion/index.js

import { getUserInfo, getMenuList } from '../../api/user.js';


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '分销中心',
      'color': true,
      'class': '0'
    },
    userInfo:[],
    yesterdayPrice:0.00,
    isClone:false,
	loginType: app.globalData.loginType,
	orderStatusNum: {},
	MyMenus:[],
  },
  onLoadFun:function(){
    this.getUserInfo();
	this.getMyMenus();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getMyMenus: function () {
    var that = this;
    if (this.data.MyMenus.length) return;
    getMenuList().then(res=>{
  		// console.log(JSON.stringify(res.data))
      that.setData({ MyMenus: res.data.routine_my_menus });
  	  that.setData({
  		  MyMenus: [{"name":"我的收藏","pic":"/images/fangchang/icon/my_shou.png","url":"/pages/user_goods_collection/index"},{"name":"申请合作","pic":"/images/fangchang/icon/shenq.png","url":"/pages/user_vip/index"},{"name":"分销中心","pic":"/images/fangchang/icon/fenxiao.png","url":"/pages/user_spread_user/index"}]
  	  })
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isLog && this.data.isClone){
      this.getUserInfo();
    }
  },
  /**
   * 获取个人用户信息
   */
  getUserInfo: function () {
    var that = this;
    getUserInfo().then(res=>{
      that.setData({ userInfo: res.data, loginType: res.data.login_type, orderStatusNum: res.data.orderStatusNum });
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({isClone:true});
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