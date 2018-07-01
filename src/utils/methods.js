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
   * options:{
   *    key: String  stroage的键, (必填)
   *    data:  Object/String  要存储的内容 (必填)
   * }
   */
  saveHistorySearch: options => {
    if (!(options.key && options.data)) {
      console.log('请保证key跟data的完整性!')
      return false
    }
    // 检测本地是否有历史搜索记录
    wx.getStorage({
      key: options.key,
      success: res => {
        console.log(res)
        // 有历史搜索记录,取出,添加,存入localStroage
        var searchDataList = res.data // 取到历史搜索记录的数组
        // 检测搜索记录中是否有搜索内容跟本次相同
        console.log(searchDataList)
        for (var i = 0; i < searchDataList.length; i++) {
          if (searchDataList[i].searchData == options.data) {
            return
          }
        }
        searchDataList.push({
          searchData: options.data,
          id: searchDataList[searchDataList.length - 1].id + 1
        }) // 添加本次搜索进入本地缓存搜索记录
        wx.setStorage({
          key: 'historySearch',
          data: searchDataList
        })
        // 页面同步历史搜索记录
        // this.historySearchData = searchDataList
        // this.$apply()
      },
      fail: err => {
        // 如果失败,检测时候是没有数据
        if (err.errMsg.indexOf('data not found', 0)) {
          // 没有历史搜索记录
          // 创建一个本地缓存,保存历史搜索记录
          wx.setStorage({
            key: options.key,
            data: [
              {
                id: 0,
                searchData: options.data
              }
            ]
          })
          // 页面同步历史搜索记录数据
          // this.historySearchData = [{ searchData: searchContent }]
          // 删除历史搜索记录按钮显示
          this.isDelete = false
          this.$apply()
          return
        }
        console.log(err)
      }
    })
  },
  /**
   * 收藏与取消收藏（用Storage模拟）
   * options:{
   *  goods_id: Number 产品的ID (必填)
   *  flag: Number 收藏还是取消收藏 0：取消收藏 1：收藏 (必填)
   * }
   */
  likes: options => {
    if (options.flag) {
      // 收藏
      // 查询是否存在Storage
      wx.getStorage({
        key: 'likes',
        success: res => {
          // 有 添加
          console.log(res)
          // 获取到收藏数组数据
          var likesArr = res.data
          likesArr.push({
            goods_id: options.goods_id
          })
          // 重新设置Stroage的值
          wx.setStorage({
            key: 'likes',
            data: likesArr
          })
        },
        fail: err => {
          // 没有 新建
          wx.setStorage({
            key: 'likes',
            data: [
              {
                goods_id: options.goods_id
              }
            ]
          })
        }
      })
    } else {
      // 取消收藏
      wx.getStorage({
        key: 'likes',
        success: res => {
          var likesArr = res.data
          var result = []
          console.log(options.goods_id)
          // 循环判断存在数组的索引
          for (var i = 0; i < likesArr.length; i++) {
            if (likesArr[i].goods_id == options.goods_id) {
              console.log('!!!!!!!!')
              likesArr.splice(i, 1)
              // 重新设置Stroage的值
              wx.setStorage({
                key: 'likes',
                data: likesArr,
                success: res => {
                  console.log(res)
                },
                fail: err => {
                  console.log(err)
                }
              })
              break
            }
          }
        }
      })
    }
  }
}

// 暴露出methods
module.exports.methods = methods
