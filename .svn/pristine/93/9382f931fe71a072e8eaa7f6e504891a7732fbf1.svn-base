// pages/welcome/welcome.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideTabBar();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  
  //获取用户基本信息
  getUserInfo: function (e) {

    console.log(e);
    //储存用户信息   有3种方式  1.存到app的全局变量中  2.存到缓存  3.存到数据库
    var userInfo = wx.getStorageSync("userInfo");//获取缓存中的userInfo
    var user_id = wx.getStorageSync("user_id");//获取缓存中的user_id
    //判断是否存在userInfo  如果不存在就把获取的信息存入缓存和app全局变量
    if (!userInfo) {
      wx.setStorageSync("userInfo", e.detail.userInfo)//存入缓存
      app.globalData.userInfo = e.detail.userInfo;//存入app全局变量
      userInfo = e.detail.userInfo;
    } else {
      app.globalData.userInfo = userInfo;//存入app全局变量
    }
    //如果user_id为空则登陆
    if (!user_id) {
      wx.login({
        success: function (res) {
          console.log(res);
          wx.request({
            url: app.globalData.BasePath + 'wx/wxlogin',
            data: { code: res.code, nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl },
            month: "GET",//请求方式
            header: {
              'content-type': 'application/xml',
            },
            success: function (res) {
              console.log(res);
              app.globalData.user_id = res.data.msg;
              wx.setStorageSync("user_id", res.data.msg);
            },
            fail: function (res) {
              //失败
            },
            complete: function () {
              //无论成功失败都会执行
            },
          })
        }
      })
    }
    console.log("cg");

    //跳转到post页面   有两种方式  1.跳转到普通页面  2.跳转到带tap的页面
    //1.跳转到普通页面 
    
    wx.switchTab({
      url: '../main/main',
    })
  }
})