import { getBargainPoster, getCombinationPoster } from '../../../api/activity.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '拼团海报',
      'color': true,
      'class': '0'
    },
    type:0,
    id:0,
    image:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.hasOwnProperty('type') && options.hasOwnProperty('id')){
      that.setData({ type: options.type, id: options.id});
      if (options.type == 1) 
        that.setData({ 'parameter.title':'砍价海报' }); 
      else 
        that.setData({ 'parameter.title': '拼团海报' }); 
    }else{
      return app.Tips({ title: '参数错误', icon: 'none'}, { tab: 3, url: 1 });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPosterInfo();
  },
  getPosterInfo:function(){
    var that = this,url = '';
    let data = { id: that.data.id, 'from':'routine'};
    if(that.data.type == 1){
      getBargainPoster({ bargainId: that.data.id, 'from': 'routine' }).then(res=>{
        that.setData({ image: res.data.url });
      }).catch(err=>{
        return app.Tips({title:err});
      })
    }else{
      getCombinationPoster(data).then(res=>{
        that.setData({ image: res.data.url });
      }).catch(err => {
        return app.Tips({ title: err });
      })
    }
  },
  showImage:function(){
    var that = this;
    wx.previewImage({
      current: that.data.image,
      urls: [that.data.image],
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
})