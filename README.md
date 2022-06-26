# vue-teashop（茶七网商城）

## 前言

2020年开始研究生生涯的时候才真正开始接触前端，并对前端产生了浓厚的兴趣。虽然并不是计算机科班出生，但出于对前端的爱好以及课题组项目的需要，本人利用课余时间学习了`Vue.js`、`Node.js`以及其它与前端相关的内容，之后一直想做个完整的项目实战一下。

终于在研一课程结束的时候，有了空闲的时间，可以去做自己的项目了。在做项目之前先去github、gitee上查看了一些其他人所做的项目，思来想去，最后决定模仿 [茶七网 ](http://m.tea7.com/index.htm)做一个电商Web App。由于课题组也有相关的项目及事务需要处理，免不了有各种各样的事情耽误了项目的进度。现在终于差不多做好了，分享出来，新手上路，如有错误，请多多指教。

## 说明

> 本项目前后端分离，前端参考 [茶七网](http://m.tea7.com/index.htm) 实现，但与茶七网官方没有关系，纯属个人实现，若有购买需求请到茶七网官方商城。

> 这是本项目的前端，后端请移步到[teashop-serve](https://github.com/gcx177/teashop_serve) 。

> 项目中还存在一些优化空间，但由于课题组学术要求以及暑期实习，后期项目优化可能未能及时进行，但会不定期的更新完善该项目，如有问题请直接在 Issues 中提。

> 如果觉得这个项目还不错，您可以点右上角 `Star`支持一下， 谢谢！ ^_^ 

## 项目简介

本项目前后端分离，前端基于`Vue` + `Vue-router` + `Vuex` + `Vant-ui` + `Axios` + `better-scroll`，后端基于`Node.js(Express框架)` + `Mysql`实现。

前端主要包含了以下几个模块：首页门户、商品分类、商品购买、个人中心、用户订单。实现了商品的展示、关键字搜索商品、商品详细信息展示、登录、注册、用户购物车、订单结算、用户订单、用户收藏列表以及添加收货地址等功能。

后端是基于`Node.js`的`Express框架`实现，根据前端需要的数据分模块设计了相应的接口。后端传送地址[teashop-serve](https://github.com/gcx177/teashop_serve) 。

## 技术栈

- **前端：**`Vue`+`Vue-router`+`Vuex`+`Vant-ui`+`Axios`+`better-scroll`

- **后端：**`Node.js`、`Express框架`

- **数据库：**`Mysql`

## 运行项目注意事项
- 项目运行需要依靠后端框架和数据库，需要先将数据库数据导入到`Mysql`数据库中，然后运行后端框架代码。
- 如果需要后端代码，请移步到 [teashop-serve](https://github.com/gcx177/teashop_serve) clone后端项目。
- 如果需要项目运行时的数据库，可以点击[这里](https://pan.baidu.com/s/14ZUFQ417Qd7ZG9LwItpSOw )，提取码：gcxz。

## 页面展示

以下为`茶七网商城Web App`的主要页面预览：

- 个人中心

![](https://gitee.com/guo-changxiong/store_image/raw/master/teashop_images/person.jpg)

- 商城首页

![](https://gitee.com/guo-changxiong/store_image/raw/master/teashop_images/homepage.jpg)

- 商品搜索及展示

![](https://gitee.com/guo-changxiong/store_image/raw/master/teashop_images/search.jpg)

- 商品购买、商品订单以及购物车

![](https://github.com/gcx177/vue-teashop/raw/master/images/person.jpg)

## 感谢

- [Vue](https://github.com/vuejs/vue)
- [Vue-Router](https://github.com/vuejs/vue-router-next)
- [Vuex](https://github.com/vuejs/vuex/tree/4.0)
- [axios](https://github.com/axios/axios)
- [Vant](https://github.com/youzan/vant)
- [better-scroll](https://github.com/ustbhuangyi/better-scroll)
