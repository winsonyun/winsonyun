// pages/post/postcomment/postcomment.js
var app = getApp();
var utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //作品id
    works_id: 0,
    //分页查询数量
    count: 0,
    //总条数
    total: 0,
    //存储查询到的数据
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var works_id = options.works_id;
    this.setData({
      works_id: works_id
    })
    //查询评论总数
    utils.httpRequset(app.globalData.BasePath + "wxcomment/getcommentcount", {
      works_id: this.options.works_id,
    }, this.opreateCount);
    this.getCommentList();

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

    //调用查询所有评论函数
    this.getCommentList();
    wx.showNavigationBarLoading();
    //判断是否加载完成
    if (this.data.total == this.data.commentList.length) {
      wx.showToast({
        title: "已经到底了",
        icon: 'none',
        mask: true,
        duration: 1000
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //查询总条数 并将值存储
  opreateCount: function(res) {
    this.setData({
      total: res.msg
    })
  },
  //查询所有评论
  getCommentList: function() {
    utils.httpRequset(app.globalData.BasePath + "wxcomment/getcommentlist", {
      works_id: this.options.works_id,
      wx_user_id: wx.getStorageSync("user_id"),
      count: this.data.count,
    }, this.opreateCommentList);
  },
  //查询评论回调函数
  opreateCommentList: function(res) {
    //处理时间戳
    for (var i = 0; i < res.msg.length; i++) {
      res.msg[i].create_time = utils.getDiffTime(res.msg[i].create_time)
    }
    //分页 数量
    var count = this.data.count;
    count = count + res.msg.length;
    //数据绑定
    var commentList = this.data.commentList;
    commentList = commentList.concat(res.msg);

    //存储数据
    this.setData({
      commentList: commentList,
      count: count
    })
  },
  //获取文本框的值
  bindCommentInput: function(res) {
    console.log(res);
    var setInput = {};
    setInput["inputValue"] = res.detail.value;
    this.setData(setInput)
  },
  //发送按钮的点击事件
  submitComment: function(res) {
    console.log(res)
    utils.httpRequset(app.globalData.BasePath + "wxcomment/addcomment", {
      works_id: this.data.works_id,
      wx_user_id: wx.getStorageSync("user_id"),
      txt: this.data.inputValue
    }, this.opreateResult);
  },
  //回调函数
  opreateResult: function(res) {
    console.log(res);
    this.setData({
      inputValue: "",
    })

    wx.showToast({
      title: '评论成功',
      mask: true,
      duration: 2000,
      icon: "success"
    })
  }

})