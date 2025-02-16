// pages/main/main.js
var app = getApp();
var utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    /**
     * 斑斓图数组
     */
    haedimag:[],
    /**
     * 搜索
     */ 
    all:0,
    findMain:[],
    inputValue:'',
    mainlist:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示加载
    this.getBanlanImag();//请求斑斓图
    this.getMainFind();//提交文本框的值
    wx.showNavigationBarLoading();//刷新转圈圈提示
    utils.httpRequset(app.globalData.BasePath + "wxactivity/wxworkscount", { works_name: this.data.inputValue, activity_id: 0 }, this.opreateCount);
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
    wx.showNavigationBarLoading();//刷新转圈圈提示
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.mainlist.length < this.data.all) {//判断是否加载完全
      this.getMainFind();
      wx.showNavigationBarLoading();
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
  /**
   * 请求斑斓图
   */
  getBanlanImag:function(){
    utils.httpRequset(app.globalData.BasePath + "wx/getbanlan", null, this.callback);
  },
  callback:function(res){
    this.setData({
      haedimag: res.msg
    })

  },
  //获取文本框的值
  bindinMain: function (e) {
    var ins = e.detail.value;
    this.setData({
      inputValue: ins
    })
  },
  //提交文本框的值&&请求首页数据
  getMainFind:function(){
    utils.httpRequset(app.globalData.BasePath + "wx/getmainlist", { works_name: this.data.inputValue },this.findcomeback);
  },
  findcomeback:function(res){
    if (res.msg == null || res.msg ==""){
      wx.showToast({
        title: '搜索内容为空~',
        icon: 'none',
        duration: 2000
      })
      this.getMainFind();
    }
    this.setData({
      mainlist:res.msg,
      inputValue: ""
    })
    //隐藏加载显示
    wx.hideNavigationBarLoading();
    //刷新后立马显示
    wx.stopPullDownRefresh();
  },
  //点击显示详情页事件
  topostdetailswiper: function (e) {
    var activity_id = e.target.dataset.activityid;
    wx.navigateTo({//配置导航栏以后 用reLaunch做跳转 关闭所有页面,跳转到非tabBar的页面
      url: '../vote/voteing/voteing?activity_id=' + activity_id,
    })
  },

  topostdetail: function (s) {//修改浏览数(详情页显示)
    utils.httpRequset(app.globalData.BasePath + "wx/getaddcount", { works_id: s.currentTarget.dataset.worksid}, this.countback);

    wx.navigateTo({//跳转到作品详情页
      url: '../votedetails/votedetails?works_id=' + s.currentTarget.dataset.worksid,
    })
  },
  
  opreateCount: function (res) {
    //设置当前页面的初始值(首页 )
    this.setData({
      all: res
    })
  }
})