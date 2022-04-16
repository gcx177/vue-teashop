<template>
    <div class="order">
        <section ref="wrapper">
            <div>
                <div class="head-back">
                    <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
                    <h2>
                        提交订单
                    </h2>
                    <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
                </div>
                <div class="order-address" @click="goPath">
                    <h3>收货信息:</h3>
                    <div class="address">
                        <div class="content">
                            <p class="name">{{path.name}}&nbsp;&nbsp;{{path.tel}}</p>
                            <p>{{path.province}}&nbsp;{{path.city}}&nbsp;{{path.county}}&nbsp;{{path.addressDetail}}</p>
                        </div>
                        <div class="tubiao">
                            <i class="iconfont icon-xiangyou1"></i>
                        </div>
                    </div>
                </div>
                <div class="order-payway">
                    <div class="payway-header">
                        支付方式：<span>选择在线支付，随机减0-100元</span>
                    </div>
                    <div class="payway-way">
                        <span>支付宝支付</span>
                    </div>
                </div>
                <div class="order-list">
                    <div class="goods-list" v-for="item in goodsList" :key="item.id">
                        <img :src="item.goods_imgUrl">
                        <div class="goods-info">
                            <div class="title">{{item.goods_name}}</div>
                            <div class="price">￥{{item.goods_price}}</div>
                            <div class="num">x{{item.goods_num}}</div>
                        </div>
                    </div>
                    <div class="allgoods-price">合计：<span><em>￥{{parseInt(price).toFixed(2)}}</em></span></div>
                </div>
                <div class="order-mingxi">
                    <h3>账单明细</h3>
                    <div class="mingxi">
                        <div class="txt">订单总价：</div>
                        <div class="prc">￥{{parseInt(price).toFixed(2)}}</div>
                    </div>
                    <div class="mingxi">
                        <div class="txt">运费：</div>
                        <div class="prc">￥0.00</div>
                    </div>
                    <div class="mingxi realprice">
                        <div class="txt">订单总价：</div>
                        <div class="prc bold">￥{{parseInt(price).toFixed(2)}}</div>
                    </div>
                </div>
            </div>
        </section>
        <div class="order-price">
          <div class="total-price">
            <div>
              共<em>{{num}}</em>件，
              总金额:<em class="red">￥{{parseInt(price).toFixed(2)}}</em>
            </div>
          </div>
          <div class="jieshuan-price" @click="postOrder">提交订单</div>
        </div>
    </div>
</template>


<script>
import BScroll from '@better-scroll/core'
import http from '@/common/api/request.js'
import { mapMutations, mapGetters } from 'vuex'
import { Toast } from 'vant';

export default {
    name: 'Order',
    data() {
        return {
            num: 0,
            price: 0,
            imgUrl: './images/favorite2.jpeg',
            // 滑动组件
            scroll: null,
            // 收货地址
            path: {},
            // 选中商品的id
            item: [],
            // 购物车中的商品
            cartList: []
        }

    },
    created() {
        this.num = this.$route.query.num
        this.price = this.$route.query.price
        this.item = JSON.parse(this.$route.query.detail)
        this.cartList = JSON.parse(localStorage.getItem('orderList'))

        http.$axios({
            url: '/api/selectAddress',
            headers: {
                token: true
            }
        }).then(res => {
            if(res.success) {
                this.initData(res.data)
            }
            if(this.defaultAddress.length) {
                this.path = this.defaultAddress[0]
            } else {
                // 如果没有默认地址，直接获取地址中的第一项
                this.path = res.data[0]
            }

            // 如果用户新选择了地址，就用新的地址；没有新选择地址就是要默认的地址
            this.path = JSON.parse(localStorage.getItem('selectAddress')) || this.path
        })

    },
    mounted() {

        this.$nextTick(() => {
            // 可以使用$refs来直接获取元素
            if(this.$refs.wrapper) {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    pullUpLoad: true,
                    scrollbar: true,
                    pullDownRefresh: true,
                    zoom: true,
                    // 运行在better-scroll中触发点击事件
                    click: true,
                    bounce: false
                })
            }
        })
    },
    methods: {
        ...mapMutations(['initData']),
        goPath() {
            // 选择地址
            this.$router.push({
                path: '/address/index',
                query: {
                    type: 'select'
                }
            })
        },
        // 提交订单
        postOrder() {

            let addressArr = [];
            
            addressArr.push(this.path.name);
            addressArr.push(this.path.tel);
            addressArr.push(this.path.province);
            addressArr.push(this.path.city);
            addressArr.push(this.path.county);
            addressArr.push(this.path.addressDetail);


            // 发送请求(1.修改订单状态; 2.删除对应购物车中的数据)
            http.$axios({
                url: '/api/submitOrder',
                method: 'POST',
                headers: {
                    token: true
                },
                data: {
                    orderId: localStorage.getItem('tea_orderid'),
                    shopArr: this.item,
                    address: addressArr
                }
            }).then(res => {
                
                if(res.success) {
                    Toast.success('结算成功');
                    this.$router.push('/my')
                }

            })


            let newArr = JSON.parse(localStorage.getItem('orderList')).filter(v => {
                return !this.item.includes(v.id)
            })

            localStorage.setItem('orderList', JSON.stringify(newArr))
        }
    },
    computed: {
        ...mapGetters(['defaultAddress']),
        goodsList() {
        

            return this.cartList.filter(v => {
                return this.item.includes(v.id)
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.order {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    section {
        flex: 1;
        overflow: hidden;
        width: 100%;
        .order-address {
            h3 {
                padding: .213333rem .4rem;
                font-weight: 400;
                font-size: .373333rem;
            }
            .address {
                padding: .266667rem .4rem;
                background-color: #fff;
                display: flex;
                .content {
                    height: 100%;
                    width: 8.4rem;
                    font-size: .373333rem;
                    .name {
                        margin-bottom: .133333rem;
                    }
                }
                .tubiao {
                    flex: 1;
                    height: 100%;
                    text-align: center;
                    line-height: 1.173333rem;
                    i {
                        font-size: .666667rem;
                        color: #9e9e9e;
                    }
                }
            }
        }
        .order-payway {
            margin-top: .266667rem;
            padding: .32rem .4rem;
            font-size: .373333rem;
            background-color: #fff;
            .payway-header {
                height: .533333rem;
                padding-bottom: .266667rem;
                span {
                    color: #b0352f;
                }
            }
            .payway-way {
                span {
                    border: .053333rem solid #b0352f;
                    padding: 0 .106667rem;
                    height: .8rem;
                    line-height: .8rem;
                    display: inline-block;
                }
            }
        }
        .order-list {
            margin-top: .266667rem;
            background-color: #fff;
            .goods-list {
                padding: .346667rem .4rem;
                border-bottom: .026667rem solid #e8e8e8;
                flex: 1;
                height: 2.026667rem;
                display: flex;
                img {
                    width: 1.973333rem;
                    height: 1.973333rem;
                    border: .026667rem solid #e4e4e4;
                    overflow: hidden;
                    display: block;
                }
                .goods-info {
                    height: 100%;
                    flex: 1;
                    padding: 0 1.2rem 0 .266667rem;
                    position: relative;
                    box-sizing: border-box;
                    font-size: .32rem;
                    .title {
                        height: .906667rem;
                        overflow: hidden;
                        font-size: .373333rem;
                    }
                    .price {
                        position: absolute;
                        bottom: 0;
                        left: .266667rem;
                        font-size: .426667rem;
                        font-weight: 400;
                        color: #b0352f;
                    }
                    .num {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        font-size: .426667rem;
                    }
                }
            }
            .allgoods-price {
                font-size: .373333rem;
                text-align: right;
                color: #666;
                padding: .266667rem .4rem;
                background-color: #fff;
                span {
                    color: #b0352f;
                    em {
                        font-weight: 700;
                        font-family: Verdana, Tahoma, arial;
                        font-size: .373333rem;
                        font-style: normal;
                    }
                }
            }
        }
        .order-mingxi {
            padding-bottom: .533333rem;
            h3 {
                padding: .213333rem .4rem;
                font-weight: 400;
                font-size: .373333rem;
                
            }
            .mingxi {
                padding: .266667rem .4rem 0;
                background: #fff;
                display: flex;
                font-size: .373333rem;
                .txt {
                    width: 5.546667rem;
                    height: 100%;
                    color: #999;
                }
                .prc {
                    flex: 1;
                    text-align: right;
                    height: 100%;
                    color: #333;
                }
                .bold {
                    color: #b0352f;
                    font-weight: bold;
                }
            }
            .realprice {
                padding: .266667rem .4rem;
            }
        }
    }
}

.order-price {
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
      padding-left: .4rem;
      box-sizing: border-box;
      line-height: 1.2rem;
      em {
        margin: 0 .2rem;
        color: #b0352f;
        font-size: .373333rem;
        font-style: normal;
      }
      .red {
          color: #b0352f;
          font-size: .48rem;
      }
      
    }
    .select-price {
      height: 100%;
      width: 1.2rem;
    }
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
</style>