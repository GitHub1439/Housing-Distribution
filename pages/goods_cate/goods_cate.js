import { getCategoryList} from '../../api/store.js';
import { setFormId } from '../../api/api.js';

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navlist: [],
    productList: [],
    navActive: 0,
    parameter: {
      'navbar': '1',
      'return': '0',
      'title':'订单'
    },
    navH:"",
    number:"",
	bastList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    // this.getAllCategory();
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    console.log(index, id);
    this.setData({
      toView: id,
      navActive: index
    });
  },
  getAllCategory:function(){
    var that = this;
    getCategoryList().then(res=>{
      that.setData({
        productList: res.data
      });
      that.infoScroll();
    })
  },
  scroll: function (e) {
    var scrollTop = e.detail.scrollTop;
    var scrollArr = this.data.hightArr;
    for (var i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
        this.setData({
          navActive: 0,
          lastActive: 0
        })
      } else if (scrollTop >= scrollArr[i] - scrollArr[0] && scrollTop < scrollArr[i + 1] - scrollArr[0]) {
        console.log(scrollArr[1] - scrollArr[0])
        this.setData({
          navActive: i
        })
      } else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0]) {
        this.setData({
          navActive: scrollArr.length - 1
        })
      }
    }
  },
	getGoodsCate(){
		let that = this;
		that.setData({
			bastList: [{"image":"/images/fangchang/logo/home_fang.png","store_name":"汇一公寓","price":"均价10980/㎡","sales":"在售 | 2室2厅1卫","dizhi":"距离地铁2号线560米"},{"image":"/images/fangchang/logo/home_fang.png","store_name":"汇一公寓","price":"均价10980/㎡","sales":"在售 | 2室2厅1卫","dizhi":"距离地铁2号线560米"},{"image":"/images/fangchang/logo/home_fang.png","store_name":"汇一公寓","price":"均价10980/㎡","sales":"在售 | 2室2厅1卫","dizhi":"距离地铁2号线560米","rengou":"认购"}]
		});
		
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
	},
  searchSubmitValue: function (e) {
    var that = this;
    setFormId(e.detail.formId).then(res=>{}).catch(err=>{});
    if (e.detail.value.length > 0) 
      wx.navigateTo({ url: '/pages/goods_list/goods_list?searchValue=' + e.detail.value})
    else 
      return app.Tips({ title:'请填写要搜索的产品信息'});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  this.getGoodsCate()
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
	  this.getGoodsCate()
  }
})