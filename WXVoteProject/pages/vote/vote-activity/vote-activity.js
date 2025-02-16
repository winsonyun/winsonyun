// pages/vote/vote-activity/vote-activity.js
var utils = require("../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banlanimg: [],//斑斓图
    count: 0,//过滤多少条
    activitylist: [],//查询的值
    inputValue: "",//input输入的值
    all:0//总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画
    this.banlan();//获取斑斓图
    utils.httpRequset(app.globalData.BasePath + "wxactivity/wxactivitycount", { activity_name: this.data.inputValue }, this.opreateCount);//查询总数量
    this.getActivityTowx();//查询数据库的值
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
    if (this.data.activitylist.length <this.data.all){//判断是否加载完全
      this.getActivityTowx();
      wx.showNavigationBarLoading();//在当前页面显示导航条加载动画
    }else{//到底提示已经加载完
      wx.showToast({
        title: '已经到底了',
        icon:'none',
        duration:1000
      })  
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  opreateCount: function (res){
    console.log(res);
    //设置当前页面的初始值
    this.setData({
      all: res
    })
  },
  /***
   * 获取斑斓图
   */
  banlan: function () {
    utils.httpRequset(app.globalData.BasePath + "wxactivity/wxactivityall", { activity_name: '', index: 0 }, this.onpreatebanlan);
  },

  onpreatebanlan: function (res) {
    console.log(res);
    //设置当前页面的初始值
    this.setData({
      banlanimg: res.msg
    })
  },
  /***
   * 根据条件获取活动
   */
  getActivityTowx: function () {
    utils.httpRequset(app.globalData.BasePath + "wxactivity/wxactivityall", {activity_name: this.data.inputValue, index: this.data.count }, this.onpreateActivityTowx);
  },

  onpreateActivityTowx:function(res){
    console.log(res);
    for (var i = 0; i < res.msg.length; i++) {//循环转换时间
      res.msg[i].start_time = utils.formatDate(res.msg[i].start_time);
      res.msg[i].end_time = utils.formatDate(res.msg[i].end_time);
    }
    var count = this.data.count;
    count = count + res.msg.length;
    var activitylist = this.data.activitylist.concat(res.msg);//拼接查询的值
    //设置当前页面的初始值
    this.setData({
      activitylist: activitylist,
      count: count
    })
    //隐藏加载提示
    wx.hideNavigationBarLoading();
    //停止下来显示
    wx.stopPullDownRefresh();
  },

  bindCommentInput: function (e) {
    console.log(e);
    var setInput = {};
    setInput["inputValue"] = e.detail.value;
    this.setData(setInput)
  },
  /***
   * 搜索
   */
  submitComment: function (e) {
    this.setData({
      count:0,
      activitylist:[]
    });
    this.onLoad();
    wx.showToast({
      title: '操作成功',
      mask: true,
      duration: 2000,
      icon: "success"
    })
  },

  opreateResult: function (res) {
    console.log(res);
    this.setData({
      inputValue: ""
    })

    wx.showToast({
      title: '操作成功',
      mask: true,
      duration: 2000,
      icon: "success"
    })
  },
  /***
   * 去作品详情
   */
  tomain:function(e){
    console.log(e);
    var activity_id = e.currentTarget.dataset.activityid;//获取id
    wx.navigateTo({
      url: '../voteing/voteing?activity_id=' + activity_id,
    })
  },
  /***
   * 去排行榜
   */
  toranking: function (e) {
    console.log(e);
    var activity_id = e.target.dataset.activityid;//获取id
    wx.navigateTo({
      url: '../../ranking/ranking?activity_id=' + activity_id,
    })
  }
})