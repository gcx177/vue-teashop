<template>
    <div class="cart">
        <section ref="wrapper">
          <div class="content">
              <div class="head-back">
                <i class="iconfont icon-xiangzuo1" @click="$router.push('/home')"></i>
                <h2>
                    购物车
                </h2>
                <span v-show="list.length" @click="isNavBar">{{isNavState ? '完成' : '编辑'}}</span>
              </div>
              <div v-show="!list.length" class="no-list">
                <div class="i">
                  <i class="iconfont icon-weizhaodaoshangpin"></i>
                </div>
                <div class="t1">您的购物车空荡荡的</div>
                <div class="t1 t2">您可以去<b @click="$router.push('/home')">首页</b>选择商品</div>
              </div>
              <div class="cart-title" v-show="list.length">
                <van-checkbox @click="checkAllFn" :value="isAllChecked" checked-color="#b0352f"></van-checkbox>
                <b>商品</b>
              </div>
              <div class="cart-list" v-show="list.length">
                <div class="item-body" v-for="item in list" :key="item.id">
                  <van-checkbox @click="checkedOne(item.id)" v-model="item.checked" checked-color="#b0352f"></van-checkbox>
                  <img :src="item.goods_imgUrl" @load="imageLoad">
                  <div class="item-detail">
                    <div class="title">{{item.goods_name}}</div>
                    <b>￥{{item.goods_price}}.00</b>
                    <div class="delete" @click="delGoodsFn(item.id)"><i class="iconfont icon-shanchu"></i></div>
                    <van-stepper v-model="item.goods_num" @change='changeNum($event, item)'/>
                  </div>
                </div>
              </div>
          </div>
        </section>
        <div class="cart-price" v-show="list.length">
          <div class="select-price">
            <van-checkbox @click="checkAllFn" :value="isAllChecked" checked-color="#b0352f"></van-checkbox>
          </div>
          <div class="total-price">
            <div v-show="!isNavState">
              共有<em>{{total.num}}</em>件商品
              <p>总计：<em>￥{{total.price.toFixed(2)}}</em></p>
            </div>
          </div>
          <div :class="['jieshuan-price', {noproduct: selectList.length ? false : true}]" v-if="!isNavState" @click="goOrder">去结算</div>
          <div class="jieshuan-price" v-else @click="delGoodsFn">删除</div>
        </div>
    </div>
</template>

<script>
// 引入插件
import BScroll from '@better-scroll/core'
import http from '@/common/api/request.js'
import { Toast } from 'vant';
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {
      scroll: null,
      isNavState: false
    }
  },
  mounted() {
    this.getData()

    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        pullUpLoad: true,
        scrollbar: true,
        pullDownRefresh: true,
        disableTouch: false,
        zoom: true,
        // 允许click事件触发
        click: true,
        bounce: false
      })
    })

    this.$bus.$on('imageLoading', () => {
      this.scroll.refresh()
    })
  },
  computed: {
    ...mapState({
      list: state => state.cart.list,
      selectList: state => state.cart.selectList
    }),
    ...mapGetters(['isAllChecked', 'total'])
  },
  methods: {
    ...mapMutations(['listData', 'checkedOne', 'initOrder']),
    ...mapActions(['checkAllFn', 'delGoodsFn']),
    imageLoad() {
      this.$bus.$emit('imageLoading')
    },
    async getData() {

      
      if(!localStorage.getItem('teaUserInfo')) {
        // 如果不是登录状态
        return
      }

      let res = await http.$axios({
        url: '/api/selectCart',
        method: 'POST',
        headers: {
          token: true
        }
      })

      if(res.success) {

        res.data.forEach(v => {
          v['checked'] = true
        });

        this.listData(res.data)
      }
    },
    isNavBar() {
      this.isNavState = !this.isNavState
    },
    // 计数器change触发
    changeNum(value, item) {
      // 需要获取当前购物车商品的id以及修改后的数量传递给后端
      // value就是商品的数量，item.id就是商品的id
      http.$axios({
        url: '/api/updateNumber',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id: item.id,
          num: value
        }
      }).then(res => {
        
      })


    },
    // 去结算
    goOrder() {
      if(!this.selectList.length) {
        Toast('请至少选择一件商品')
        return
      }

      let newArr = this.list.filter(v => {
        return this.selectList.includes(v.id)
      })


      // 生成一个订单
      http.$axios({
        url: '/api/addOrder',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          arr: newArr
        }
      }).then(res => {
        if(!res.success) {
          Toast(res.message)
          return
        }
        
        // 存储订单号
        this.initOrder(res.data)


        this.$router.push({
          name: 'Order',
          query: {
            num: this.total.num,
            price: this.total.price,
            detail: JSON.stringify(this.selectList)
          }
        })

        // 将购物车中的所有数据存进本地存储中
        if(localStorage.getItem('orderList') !== null) {
          localStorage.removeItem('orderList')
          localStorage.setItem('orderList', JSON.stringify(this.list))
        } else {
          localStorage.setItem('orderList', JSON.stringify(this.list))
        }

      })

    }
  }
}
</script>

<style scoped lang="scss">
.head-back {
    display: flex;
    width: 100%;
    height: 1.173333rem;
    line-height: 1.173333rem;
    color: #fff;
    background: #b0352f;
}
.head-back h2 {
    flex: 1;
    height: 100%;
    font-size: .426667rem;
    font-weight: 400;
    display: block;
    text-align: center;
}
.head-back i {
    display: block;
    width: 1.173333rem;
    height: 1.173333rem;
    color: #fff;
    font-size: .533333rem;
    line-height: 1.173333rem;
    text-align: center;
}
.head-back span {
  display: block;
  width: 1.173333rem;
  height: 1.173333rem;
  text-align: center;
  line-height: 1.173333rem;
  color: #fff;
  font-size: .426667rem;
}
.cart {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgb(245, 245, 245);
  section {
    flex: 1;
    overflow: hidden;
    .cart-title {
      padding: .266667rem .133333rem;
      border-bottom: .026667rem solid #e8e8e8;
      height: 1.066667rem;
      display: flex;
      b {
        margin-left: .266667rem;
        font-size: .426667rem;
        line-height: 1.066667rem;
      }
    }
  }
  .cart-price {
    height: 1.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    box-shadow: -0.08rem 0 .08rem rgba(70, 55, 55, 0.3);
    .total-price {
      width: 6.826667rem;
      height: 100%;
      font-size: .32rem;
      padding-top: .133333rem;
      box-sizing: border-box;
      em {
        margin: 0 .2rem;
        color: #b0352f;
        font-size: .373333rem;
        font-style: normal;
      }
      
    }
    .select-price {
      height: 100%;
      width: 1.2rem;
    }
  }
}

.cart .content {
  width: 100%;
  overflow: hidden;
}

.jieshuan-price {
  flex: 1;
  height: 100%;
  background-color: #b0352f;
  color: #fff;
  font-size: .48rem;
  text-align: center;
  line-height: 1.2rem;
}

.noproduct {
  background-color: #ddd;
  color: #999;
}

.select-price ::v-deep .van-checkbox {
  width: 100%;
  height: 100%;
  padding: 0 .333333rem;
}

.select-price ::v-deep .van-checkbox__icon {
  font-size: .533333rem;
}

.cart-title ::v-deep .van-checkbox {
  margin-left: .266667rem;
  font-size: .533333rem;
}
.item-body {
    border-bottom: .026667rem solid #e8e8e8;
    padding: .266667rem .133333rem;
    height: 2.026667rem;
    background: #fff;
    display: flex;
    img {
      margin-left: 10px;
      border: .026667rem;
      width: 1.973333rem;
      height: 1.973333rem;
      border: .026667rem solid #eee;
    }
    .item-detail {
      height: 100%;
      flex: 1;
      margin-left: .266667rem;
      position: relative;
      .title {
        color: #222;
        width: 4.4rem;
        position: absolute;
        font-size: .32rem;
        left: 0;
        top: 0;
      }
      b {
        position: absolute;
        left: 0;
        top: 1.066667rem;
        color: #b0352f;
        font-size: .426667rem;
      }
      .delete {
        position: absolute;
        right: 0;
        top: 0;
        width: .64rem;
        height: .64rem;
        text-align: center;
        line-height: .64rem;
        i {
          font-size: .48rem;
        }
      }
    }
}
.item-body ::v-deep .van-checkbox {
    margin: 0 .266667rem;
    font-size: .533333rem;
}
.item-detail ::v-deep .van-stepper {
  display: inline-block;
  position: absolute;
  right: 0;
  bottom: 0;
}

.no-list {
  height: 16rem;
  width: 100%;
  color: #9e9e9e;
  font-size: .426667rem;
  position: relative;
  .i {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 27%;
    width: 3.2rem;
    height: 3.2rem;
    i {
      font-size: 3.2rem;
    }
  }
  .t1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
  }
  .t2 {
      top: 55%;
      b {
        color: #b0352f;
      }
    }
}
</style>