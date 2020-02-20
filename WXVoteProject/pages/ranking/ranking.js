// pages/ranking/ranking.js
var app=getApp();
var utils=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranklist:[],//排行榜数据
    time:"",//活动到期时间
    remainTime:"",//活动剩余天数
    activity_id:0//活动id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //存入初始数据
    this.setData({
      activity_id: options.activity_id
    })

    //查找排行榜总数
    utils.httpRequset(app.globalData.BasePath + "wx/getrankcount", { activity_id: options.activity_id},this.opearteGetRankCount);


    console.log(options);
    //查找排行榜
    utils.httpRequset(app.globalData.BasePath + "wx/getrank", { activity_id: options.activity_id},this.operateGetRank);
     //查找前三
    utils.httpRequset(app.globalData.BasePath + "wx/getrank", { activity_id: options.activity_id,istrue:1 }, this.operateGetRankFirst);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取排行榜数据回调函数
  operateGetRank:function(res){
    console.log(res);
    
    //存入页面初始值
    this.setData({
      ranklist:res.msg
    })
  },
  //获取前三数据回调函数
  operateGetRankFirst: function (res){
    console.log(res);
    var time = utils.formatDate(res.msg[0].activity.end_time);//结束日期
    var todayTime = utils.getCurrentDate();//当前日期
    console.log("xxx"+time);
    console.log(todayTime);
    //进行时间比较       getCurrentDate获取当前时间    toDate转换为Date类型进行比较
    if (utils.toDate(time) < utils.toDate(todayTime)) {
      //弹出活动已结束
      wx.showToast({
        title: '该活动已结束',
        icon: 'none',
        duration: 2000//持续的时间
      })
      //该活动下的作品截止投票
      utils.httpRequset(app.globalData.BasePath + "wx/updateVoteState", { activity_id: this.data.activity_id }, this.operateActivityOverdue)

    }
    //日期格式化
    var start_date = new Date(todayTime.replace(/-/g, "/"));
    var end_date = new Date(time.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var days = end_date - start_date.getTime();
    //转换成天数
    var day = (parseInt(days / (1000 * 60 * 60 * 24))) < 0 ? 0 : (parseInt(days / (1000 * 60 * 60 * 24)));
    this.setData({
      firstfew: res.msg,
      time:time,
      remainTime:day
    })
  },
  //修改作品投票状态回调函数
  operateActivityOverdue:function(res){
    console.log("已修改投票状态");
  },

  //跳转作品页面
  tovotedetails:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../votedetails/votedetails?works_id=' + e.currentTarget.dataset.vote_id
    })
  },
  //获取活动下的作品数量
  opearteGetRankCount:function(res){
    //数量为0的话给出提示 并返回上一界面
    if(res.msg==0){
      wx.showToast({
        title: '暂无作品',
        icon: 'none',
        duration: 2000//持续的时间
      })

      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 2000);
     
    }
  }
})