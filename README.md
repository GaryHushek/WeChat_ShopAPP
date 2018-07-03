# WeChat_ShopApp 

## 项目介绍

个人的一个小型电商APP迁移到微信小程序的demo

### 使用框架

使用组件化开发框架wepy, 框架具体信息可移步github地址： https://github.com/Tencent/wepy

### 主要功能及页面

#### 1.首页

搜索框、轮播图（微信自带组件swiper）、推荐产品 , 多使用弹性布局

#### 2.分类页 

搜索框、左右区域滚动（微信自带组件scroll-view）, 多使用弹性布局

##### 2.1搜索页

搜索及时记录的保存(采用微信的Storage)

##### 2.2搜索结果列表页

销量排序, 价格排序

##### 2.3商品详情页

商品详情展示(采用了wxParse 微信小程序富文本解析自定义组件，支持HTML及markdown解析 [http://weappdev.com/](http://weappdev.com/)) , 收藏(采用微信的Storage) , 加购(采用微信的Storage) , 立即购买  

#### 3.购物车

购物车逻辑(金额的计算,采用wepy的computed属性)

#### 4.我的

登陆（利用微信自带API wx.getUserInfo 与button open-type='getUserInfo' 获取用户信息）、订单页





