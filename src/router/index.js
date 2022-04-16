import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}


const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta:{
        title: '首页'
    }
  },
  {
    path: "/list",
    name: "List",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/List.vue"),
    meta:{
        title: '商品分类'
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/Cart.vue"),
    meta:{
      title: '购物车'
    }
  },
  {
    path: "/master",
    name: "Master",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/Master.vue"),
    meta:{
      title: '茶师制定个性好茶'
    }
  },
  {
    path: "/my",
    name: "My",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/My.vue"),
    meta:{
      title: '用户中心'
    }
  },
  {
    path: "/teaList/:id",
    name: "TeaList",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/TeaList.vue"),
    meta:{
      title: '商品列表'
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/Search.vue"),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () =>
          import(/* webpackChunkName: "List" */ "../components/search/SearchIndex.vue"),
        meta:{
          title: '商品查询'
        }
      },
      {
        path: 'products',
        name: 'ProductList',
        component: () =>
          import(/* webpackChunkName: "List" */ "../components/search/SearchList.vue"),
        meta:{
          title: '商品查询'
        }
      }
    ]
  },
  {
    path: "/goodslist",
    name: "GoodsList",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/GoodsList.vue"),
    meta:{
      title: '商品列表'
    }
  },
  {
    path: "/detail",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/Detail.vue"),
    meta:{
      title: '商品详情'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/login/Login.vue"),
    meta:{
      title: '用户登录'
    }
  },
  {
    path: "/userlogin",
    name: "UserLogin",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/login/UserLogin.vue"),
    meta:{
      title: '用户登录'
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/login/Register.vue"),
    meta:{
      title: '用户注册'
    }
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/recovery/Recovery.vue"),
    children: [
      {
        path: '/',
        redirect: '/recovery/index'
      },
      {
        path: 'index',
        name: 'RecoveryIndex',
        component: () =>
          import(/* webpackChunkName: "List" */ "../views/recovery/RecoveryIndex.vue"),
        meta:{
          title: '找回密码'
        }
      },
      {
        path: 'set',
        name: 'RecoverySet',
        component: () =>
          import(/* webpackChunkName: "List" */ "../views/recovery/RecoverySet.vue"),
        meta:{
          title: '找回密码'
        }
      }
    ]
  },
  {
    path: "/myInfo",
    name: "customerInfo",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/Info.vue"),
    meta:{
      title: '用户个人信息'
    }
  },
  {
    path: "/address",
    name: "Address",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/address/Address.vue"),
    children: [
      {
        path: '/',
        redirect: '/address/index'
      },
      {
        path: 'index',
        name: 'AddressIndex',
        component: () =>
          import(/* webpackChunkName: "List" */ "../views/address/AddressIndex.vue"),
        meta:{
          title: '个人地址'
        }
      },
      {
        path: 'edit',
        name: 'AddressEdit',
        component: () =>
          import(/* webpackChunkName: "List" */ "../views/address/AddressEdit.vue"),
        meta:{
          title: '修改地址'
        }
      }
    ]
  },
  {
    path: "/order",
    name: "Order",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/Order.vue"),
    meta:{
      title: '订单详情'
    }
  },
  {
    path: "/orderlist",
    name: "MyOrderList",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/MyOrderList.vue"),
    meta:{
      title: '我的订单列表'
    }
  },
  {
    path: "/collect",
    name: "MyCollect",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/Collect.vue"),
    meta:{
      title: '用户收藏'
    }
  },
  {
    path: "/another",
    name: "PayOrder",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/PayOrder.vue"),
    meta:{
      title: '立即结算'
    }
  },
  // 用于显示错误页面
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "List" */ "../views/NotFound.vue"),
    meta:{
      title: '未找到404'
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let nextRoute = ['PayOrder', 'MyCollect', 'MyOrderList', 'Order', 'AddressEdit', 'AddressIndex', 'Address', 'customerInfo']
  // 判断是否登录
  let userInfo = JSON.parse(localStorage.getItem('teaUserInfo'))

  // 设置页面的title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 进入某些页面时，需要验证是否登录
  // 这里为了方便，直接匹配路由的name属性
  if(nextRoute.indexOf(to.name) >= 0) {
    if(!userInfo) {
      document.title = '用户登录'
      router.push('/login')
    }
  }
  next()
})


export default router;
