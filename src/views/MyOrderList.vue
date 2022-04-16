<template>
    <div class="my-orderlist">
        <div class="head-back">
            <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
            <h2>
                我的订单
            </h2>
            <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
        </div>
        <div class="orderlist-select">
            <div :class="['orderlist-item', {active: flag == 1 ? true : false}]" @click="noSettle">未结算</div>
            <div :class="['orderlist-item', {active: flag == 2 ? true : false}]" @click="isSettle">已结算</div>
        </div>
        <section ref="wrapper">
            <div style="overflow: hidden" v-if="this.list.length > 0">
                <div class="list-item" v-for="item in list" :key="item.id">
                    <div class="des"><span>创建时间：{{formatDate(item.order_time)}}</span></div>
                    <div class="des"><span>订单号：{{item.order_id}}</span></div>
                    <div class="address">
                        <div class="ad">订单地址：</div>
                        <div class="ad">姓名：{{item.address[0]}}&nbsp;&nbsp;&nbsp;电话：{{item.address[1]}}</div>
                        <div class="ad">详细地址：{{item.address[2]}}&nbsp;&nbsp;&nbsp;{{item.address[3]}}&nbsp;&nbsp;&nbsp;{{item.address[4]}}&nbsp;&nbsp;&nbsp;{{item.address[5]}}</div>
                    </div>
                    <ul>
                        <li v-for="v in item.goods" :key="v.id">
                            <img :src="v.imgUrl" @load="imageLoad">
                            <div class="detail">
                                <div class="goods_name">{{v.name}}</div>
                                <div class="goods_prinum">￥{{parseInt(v.price).toFixed(2)}} x {{v.num}}</div>
                            </div>
                        </li>
                    </ul>
                    <div class="order_check">共<span>{{item.allNums}}</span>件产品&nbsp;&nbsp;总计：<em>￥{{item.allPrice}}</em></div>
                    <div class="order_settle" v-if="flag == 1">
                        <div class="settle" @click="deleteNoPayOrder(item)">
                            删除
                        </div>
                        <div class="settle" @click="goPay(item)">
                            结算
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="no-order">
                    还没有{{flag == 1 ? '未结算' : '已结算' }}订单哦
                </div>
            </div>
        </section>
        <Tabber></Tabber>
    </div>
</template>


<script>
import Tabber from '@/components/common/Tabber.vue'
import BScroll from '@better-scroll/core'
import http from '@/common/api/request.js'
import { Toast, Dialog } from 'vant';

export default {
    name: 'MyOrderList',
    components: {
        Tabber
    },
    data() {
        return {
            // 控制结算与未结算的切换
            flag: null,
            // 滑动组件
            scroll: null,
            // 订单
            list: []
        }
    },
    created() {
        this.flag = this.$route.query.orderStatus || 2
        if(this.flag == 2) {
            this.getPayOrder()
        } else {
            this.getNoPayOrder()
        }

        
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

        this.$bus.$on('imageLoading', () => {
            if(this.scroll) {
                this.scroll.refresh()
            }
        })
    },
    methods: {
        // 已结算
        isSettle() {
            this.flag = 2
            this.getPayOrder()
        },
        // 未结算
        noSettle() {
            this.flag = 1
            this.getNoPayOrder()
        },
        // 已支付的订单
        getPayOrder() {
            http.$axios({
                url: '/api/payOrderList',
                method: 'POST',
                headers: {
                    token: true
                }
            }).then(res => {
                
                if(res.success) {
                    this.list = res.data
                }

            })
        },
        // 未支付的订单
        getNoPayOrder() {
            http.$axios({
                url: '/api/noPayOrderList',
                method: 'POST',
                headers: {
                    token: true
                }
            }).then(res => {
                
                if(res.success) {
                    this.list = res.data
                }

            })
        },
        // 时间戳换算成时间
        formatDate(now) { 
            // now参数为时间戳
            var d=new Date(Number(now));   //创建一个指定的日期对象
            function add0(m){
                return m<10?'0'+m:m 
            }
            var year=d.getFullYear();  //取得4位数的年份
            var month=d.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date=d.getDate();      //返回日期月份中的天数（1到31）
            var hour=d.getHours();     //返回日期中的小时数（0到23）
            var minute=d.getMinutes(); //返回日期中的分钟数（0到59）
            var second=d.getSeconds(); //返回日期中的秒数（0到59）
            return year+"-"+add0(month)+"-"+add0(date)+" "+add0(hour)+":"+add0(minute)+":"+add0(second); 
        },
        imageLoad() {
            this.$bus.$emit('imageLoading')
        },
        // 删除对应的未结算订单
        deleteNoPayOrder(item) {

            Dialog.confirm({
                message: '确定要删除该订单吗？',
            })
            .then(() => {
                // on confirm
                http.$axios({
                    url: '/api/deleteNoPayOrder',
                    method: 'POST',
                    headers: {
                        token: true
                    },
                    data: {
                        id: item.id
                    }
                }).then(res => {
                    
                    if(res.success) {
                        Toast(res.message)
                        this.getNoPayOrder()
                    }

                })
            })
            .catch(() => {
                // on cancel
            });
        },
        // 去结算未结算的订单
        goPay(option) {
            this.$router.push({
                name: 'PayOrder',
                query: {
                    id: option.id
                }
            })
        }
    }

}
</script>

<style scoped lang="scss">
.my-orderlist {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgb(245, 245, 245);
    section {
        flex: 1;
        overflow: hidden;
    }
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

.orderlist-select {
    width: 100%;
    height: 1.173333rem;
    display: flex;
    background: #fff;
    .orderlist-item {
        height: 1.173333rem;
        width: 50%;
        padding: 0 .266667rem;
        font-size: .426667rem;
        text-align: center;
        line-height: 1.173333rem;
        position: relative;
        z-index: 999;
    }
}

.active {
    color: #b0352f;
    border-bottom: .053333rem solid #b0352f;
}

.list-item {
    margin-top: .533333rem;
    margin-bottom: .533333rem;
    background: #fff;
    .des {
        color: #9e9e9e;
        height: 1.066667rem;
        padding: .266667rem .32rem;
        font-size: .373333rem;
        box-sizing: border-box;
        border-bottom: .026667rem solid #f5f5f5;
    }
    .address {
        padding: 0.266667rem 0.32rem;
        height: 1.6rem;
        width: 100%;
        border-bottom: .026667rem solid #f5f5f5;
        .ad {
            width: 100%;
            height: .533333rem;
            color: #9e9e9e;
            font-size: .373333rem;
        }
    }
    ul {
        list-style: none;
        li {
            background: #fff;
            color: #333;
            position: relative;
            display: flex;
            border-bottom: solid 1px #f5f5f5;
            padding: .133333rem;
            img {
                width: 2.266667rem;
                height: 2.266667rem;
                display: block;
                border: none;
            }
            .detail {
                flex: 1;
                height: 2.266667rem;
                padding: .133333rem .32rem;
                background: #FCFCFC;
                box-sizing: border-box;
                font-size: .373333rem;
                position: relative;
                .goods_name {
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    color: #222;
                    position: absolute;
                    left: .32rem;
                    top: 0;
                }
                .goods_prinum {
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    color: #b0352f;
                    position: absolute;
                    left: .32rem;
                    bottom: 0;
                }
            }
        }
    }
    .order_check {
        text-align: right;
        padding: .133333rem .32rem;
        color: #9e9e9e;
        font-size: .373333rem;
        span {
                color: #333;
                margin: 0 .133333rem;
        }
        em {
            color: #b0352f;
            font-style: normal;
        }
    }
    .order_settle {
        width: 100%;
        height: 1.066667rem;
        border-bottom: .026667rem solid #f5f5f5;
        display: flex;
        .settle {
            height: 1.066667rem;
            width: 100%;
            padding: .266667rem;
            box-sizing: border-box;
            font-size: .373333rem;
            text-align: center;
            position: relative;
            color: #b0352f;
        }
    }
}

.no-order {
    width: 100%;
    height: 14rem;
    text-align: center;
    line-height: 14rem;
    color: #9e9e9e;
    font-size: .533333rem;
}
</style>