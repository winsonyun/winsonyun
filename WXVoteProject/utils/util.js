const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//url 请求地址  data 请求的参数  callback回调函数
function httpRequset(url, data, callback) {
  wx.request({
    url: url,
    data: data,
    month: "POST",//请求方式
    header: {
      'content-type': 'application/x-www-form-urlencoded',//'applciation/json',
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (res) {
      //失败
    },
    complete: function () {
      //无论成功失败都会执行
    },

  })
}


//时间戳转日期
function getLocalTime(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}





/*
 *根据客户端的时间信息得到发表评论的时间格式
 *多少分钟前，多少小时前，然后是昨天，然后再是月日
 * Para :
 * recordTime - {float} 时间戳
 * yearsFlag -{bool} 是否要年份
 */
function getDiffTime(recordTime, yearsFlag) {
  if (recordTime) {
    recordTime = new Date(parseFloat(recordTime) * 1000);
    var minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      now = new Date(),
      diff = now - recordTime;
    var result = '';
    if (diff < 0) {
      return result;
    }
    var weekR = diff / (7 * day);
    var dayC = diff / day;
    var hourC = diff / hour;
    var minC = diff / minute;
    if (weekR >= 1) {
      var formate = 'MM-dd hh:mm';
      if (yearsFlag) {
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.format(formate);
    }
    else if (dayC == 1 || (hourC < 24 && recordTime.getDate() != now.getDate())) {
      result = '昨天' + recordTime.format('hh:mm');
      return result;
    }
    else if (dayC > 1) {
      var formate = 'MM-dd hh:mm';
      if (yearsFlag) {
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.format(formate);
    }
    else if (hourC >= 1) {
      result = parseInt(hourC) + '小时前';
      return result;
    }
    else if (minC >= 1) {
      result = parseInt(minC) + '分钟前';
      return result;
    } else {
      result = '刚刚';
      return result;
    }
  }
  return '';
}

/*
 *拓展Date方法。得到格式化的日期形式
 *date.format('yyyy-MM-dd')，date.format('yyyy/MM/dd'),date.format('yyyy.MM.dd')
 *date.format('dd.MM.yy'), date.format('yyyy.dd.MM'), date.format('yyyy-MM-dd HH:mm')
 *使用方法 如下：
 *                       var date = new Date();
 *                       var todayFormat = date.format('yyyy-MM-dd'); //结果为2015-2-3
 *Parameters:
 *format - {string} 目标格式 类似('yyyy-MM-dd')
 *Returns - {string} 格式化后的日期 2015-2-3
 *
 */
(function initTimeFormat() {
  Date.prototype.format = function (format) {
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
          ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  };
})()





//时间戳转换时间   转换为yyyy-MM-dd
function formatDate(obj) {
  var timestamp = obj.toString();

  timestamp = timestamp.replace(/^\s+|\s+$/, ' ');

  if (/^\d{10}$/.test(timestamp)) {
    timestamp *= 1000;
  } else if (/^\d{13}$/.test(timestamp)) {
    timestamp = parseInt(timestamp);
  } else {
    return "";
  }
  var YmdHis = format(timestamp);
  return YmdHis;
}
//自定义时间格式
function format(timestamp) {
  var time = new Date(timestamp);
  var year = time.getFullYear();
  var month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1))
  var date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate())
  var hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours())
  var minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes())
  var second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds())
  var YmdHis = year + '-' + month + '-' + date; //+ ' ' + hour + ':' + minute + ':' + second;
  return YmdHis;
}



//转换Date类型  yyyy-MM-dd  转换为Date
function toDate(str) {
  var sd = str.split("-");
  return new Date(sd[0], sd[1], sd[2]);
}

//获取当前日期
function getCurrentDate(){
  var timestamp = Date.parse(new Date());
  var date = new Date(timestamp);
  //获取年份  
  var Y = date.getFullYear();
  //获取月份  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //获取当日日期 
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var YmdHis = Y + "-" + M + "-" + D;
  return YmdHis;
}

//方法配置在这里面后外部才能访问
module.exports = {
  formatTime: formatTime,
  httpRequset: httpRequset,
  getDiffTime: getDiffTime,

  getLocalTime: getLocalTime,
  formatDate: formatDate,
  toDate: toDate,
  getCurrentDate: getCurrentDate

}
