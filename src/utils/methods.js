// API地址
var APIHost = 'https://www.zhengzhicheng.cn/'

// 所有页面公用的方法
var methods = {
  /**发送request请求
   * url:api地址(单个功能模块数据API地址)
   */
  request: options => {
    console.log(`${APIHost}${options.url}`)
    wx.request({
      url: `${APIHost}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || 'application/x-www-form-urlencoded',
      success: options.success || (backData => console.log(backData)),
      fail: err => console.log(PositionError)
    })
  },
  /**
   * 保存搜索记录
   */

}

// 暴露出methods
module.exports.methods = methods
