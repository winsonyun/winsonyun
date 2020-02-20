// pages/vote/voteing/voteing.js
var utils = require("../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:0,//活动id
    activity:[],//根据活动id查询的活动的值
    count: 0,//过滤多少条
    workslist: [],//根据活动id查询的作品的值
    inputValue: "",//input输入的值
    all: 0//总数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画
    console.log(options);
    //设置当前页面的初始值
    this.setData({
      activity_id: options.activity_id
    })
    console.log(this.data.activity_id);
    utils.httpRequset(app.globalData.BasePath + "wxactivity/wxworkscount", { works_name: this.data.inputValue, activity_id: this.data.activity_id }, this.opreateCount);//查询总数量
    utils.httpRequset(app.globalData.BasePath + "wxactivity/wxactivitybyid", { activity_id: this.data.activity_id }, this.opreateActivity);//根据活动id查询的活动的值 
    this.getWorksTowx();//根据活动id查询的作品的值
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
    if (this.data.workslist.length < this.data.all) {//判断是否加载完全
      this.getWorksTowx();//根据活动id查询的作品的值
      wx.showNavigationBarLoading();//在当前页面显示导航条加载动画
    } else {//到底提示已经加载完
      wx.showToast({
        title: '已经到底了',
        icon: 'none',
        duration: 1000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  opreateActivity: function (res) {
    console.log(res);
    //设置当前页面的初始值
    this.setData({
      activity: res
    })
    var nowTime = utils.getCurrentDate();//获取当前时间
    console.log(nowTime);
    console.log(utils.formatDate(this.data.activity.end_time));
    var endingTime = utils.formatDate(this.data.activity.end_time);
    console.log(endingTime);
    if (nowTime > endingTime){
      wx.showToast({
        title: '已经过期了',
        icon: 'none',
        duration: 2000
      })  
    }
  },

  opreateCount: function (res) {
    console.log(res);
    //设置当前页面的初始值
    this.setData({
      all: res
    })
    //数量为0的话给出提示 并返回上一界面
    if (res == 0) {
      wx.showToast({
        title: '暂无作品',
        icon: 'none',
        duration: 3000//持续的时间
      })

      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 2000);

    }
  },

  getWorksTowx: function () {
    utils.httpRequset(app.globalData.BasePath + "wxactivity/wxworksall", { works_name: this.data.inputValue, index: this.data.count, activity_id: this.data.activity_id }, this.onpreateWorksTowx);
  },

  onpreateWorksTowx: function (res) {
    console.log(res);
    var count = this.data.count;
    count = count + res.msg.length;
    var workslist = this.data.workslist.concat(res.msg);
    //设置当前页面的初始值
    this.setData({
      workslist: workslist,
      count: count,
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

  submitComment: function (e) {
    this.setData({
      count: 0,
      workslist: []
    });
    utils.httpRequset(app.globalData.BasePath + "wxactivity/wxworkscount", { works_name: this.data.inputValue, activity_id: this.data.activity_id }, this.opreateCount);
    this.getWorksTowx();
    wx.showToast({
      title: '操作成功',
      mask: true,
      duration: 2000,
      icon: "success"
    })
  },

  opreateResult: function (res) {
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
  tovotedetails: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../../votedetails/votedetails?works_id=' + e.currentTarget.dataset.worksid,
    })
  },
})