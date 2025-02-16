// pages/votedetails/votedetails.js
var app = getApp();
var utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worksdetail: null,
    works_id: 0,
    works_state: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var works_id = options.works_id
    this.setData({
      works_id: works_id
    })
    //添加访问数量
    utils.httpRequset(app.globalData.BasePath + "wx/getaddcount", { works_id: this.options.works_id}, this.countback);
    //获取作品详情
    utils.httpRequset(app.globalData.BasePath + "wxworks/getworksbyid", {
      works_id: this.options.works_id,
      wx_user_id: wx.getStorageSync("user_id")
    }, this.opreateWorksDetail);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  
  opreateWorksDetail: function(res) {
    //
    for (var i = 0; i < res.msg[0].vlist.length; i++) {
      res.msg[0].vlist[i].voteTime = utils.getDiffTime(res.msg[0].vlist[i].voteTime, true);
    }
    console.log(res)
    res.msg[0].activity.end_time = utils.formatDate(res.msg[0].activity.end_time);


    this.setData({
      worksdetail: res.msg,
      end_time: res.msg[0].activity.end_time,
      works_state: res.msg[0].works_state
    })
    
  },
  
  countback: function (res) {//跳转到作品详情页的回调
    this.setData({
      count: res.msg
    })
  },
  //评论点击事件
  commentclick: function(res) {
    wx.navigateTo({
      url: '../comment/comment?works_id=' + this.data.works_id,
    })
  },
  //投票点击事件
  voteclick: function(res) {
    wx.showLoading({
      title: '正在操作',
      mask: true
    })
    var time = utils.getCurrentDate();
    //如果当前时间小于活动结束时间 并且作品投票状态为0 可投票 否则提示已过投票时间
    if (time < this.data.end_time && this.data.works_state == 0) {
      utils.httpRequset(app.globalData.BasePath + "wxworks/addworksvote", {
        works_id: this.options.works_id,
        wx_user_id: wx.getStorageSync("user_id")

      }, this.opreateVote);
      
     
    } else{
      wx.showToast({
        title: '当前已过投票时间',
        mask: true,
        duration: 2000,
        icon: "none"
      })
    }

  },
  //回调函数
  opreateVote: function(res) {
    var data = this.data;
    
    if(res.code==200){
      data.worksdetail[0].voteNum = data.worksdetail[0].voteNum + 1;
      this.setData({
        data:this.data.worksdetail
      })
     
    }
    
    wx.showToast({
      title:res.msg,
      mask: true,
      duration: 2000,
      icon: res.code==200?"success":"none"
    })
  

  }

})