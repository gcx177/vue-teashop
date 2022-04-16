<template>
    <div class="detail-product">
        <header>
            <div class="head-one" v-show="isShow">
                <div>
                    <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
                </div>
                <div>
                    <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
                </div>
            </div>
            <div class="head-back" v-show="!isShow" :style="styleOption">
                <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
                <h2 @click="toDteailPro"><span :class="{active: flag == 1 ? true : false}">商品详情</span></h2>
                <h2 @click="toLikePro"><span :class="{active: flag == 2 ? true : false}">猜你喜欢</span></h2>
                <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
            </div>
        </header>
        <section ref="wrapper">
            <div>
                <div class="top-sum" ref="toSum">
                    <div class="swiper-pic">
                        <!-- 滑动组件 -->
                        <swiper v-if="swiperList.length > 0" :options="swiperOption">
                            <swiper-slide 
                                v-for='(item,index) in swiperList' 
                                :key='index'
                            >
                                <img :src="item">
                            </swiper-slide>
                        </swiper>
                        <!-- 小圆点滚动 -->
                        <div class="swiper-pagination"></div> 
                    </div>
                    <div class="shortname">
                        <h1>{{proDetail.name}}</h1>
                        <div class="restrci">{{proDetail.content}}</div>
                    </div>
                    <!-- 价格板块 -->
                    <div class="d-price">
                        <div class="present-price">
                            <p class="p1"><span>{{proDetail.price}}</span></p>
                            <p class="p2"><span>/ 256g</span></p>
                        </div>
                        <div class="original-price">
                            <div class="o">
                                <span>价格:</span>
                                <del>¥699</del>
                            </div>
                        </div>
                    </div>
                    <div class="d-additional">
                        <ul>
                            <li>
                                <div class="bd">
                                    <span class="col-l">茶币</span>
                                    <span class="col-r">买就赠送<b>24</b>茶币</span>
                                </div>
                            </li>
                            <li>
                                <div class="bd">
                                    <span class="col-l">服务</span>
                                    <span class="col-r">
                                        <div class="slist"><i class="iconfont icon-zhengque"></i>满99元包邮</div>
                                        <div class="slist"><i class="iconfont icon-zhengque"></i>48小时发货</div>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 商品详情 -->
                <div class="detail-box" ref="detailBox">
                    <div class="hd">
                        <em>⬇</em>
                        <span>商品详情</span>
                    </div>
                    <div class="fixck">
                        <p>
                            <img :src="proDetail.bgImgUrl1" @load="imageLoad">
                            <img :src="proDetail.bgImgUrl2" @load="imageLoad">
                        </p>
                    </div>
                </div>
                <!-- 猜你喜欢 -->
                <div class="guess-like">
                    <div class="hd">
                        <i class="iconfont icon-aixin"></i>
                        <b>猜你喜欢</b>
                    </div>
                    <div class="guess-pro">
                        <ul>
                            <li v-for="item in guessLike" :key="item.id" @click="toDetail(item)">
                                <div>
                                    <img :src="item.imgUrl" @load="imageLoad">
                                    <p>{{item.name}}</p>
                                    <span class="tip">柔和顺滑 清新爽口</span>
                                    <div class="pb">
                                        <div class="pb-price">
                                            ￥
                                            <span>{{item.price}}</span>
                                        </div>
                                        <div class="pb-btn">查看详情</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <div class="detail-footer">
            <div :class="['cell', {collect: isCollect }]" @click="collectGoods">
                <i class="iconfont icon-shoucang"></i>
                <span>收藏</span>
            </div>
            <div class="cell" @click="$router.push('/cart')">
                <i class="iconfont icon-gouwuche"></i>
                <span>购物车</span>
                <em v-show="cartNums > 0">{{cartNums}}</em>
            </div>
            <div class="btn add-gouwuche" @click="addCart">加入购物车</div>
            <div class="btn add-goumai" @click="showByGoods = true">立即购买</div>
        </div>
        <div class="back-top" v-show="showBack" @click="backTop"><i class="iconfont icon-huidaodingbu"></i></div>
        <!-- 显示购买商品的对话框 -->
        <van-sku
        v-model="showByGoods"
        :sku="buyGoods.sku"
        :goods="buyGoods.goods"
        :goods-id="buyGoods.goodsId"
        :hide-stock="buyGoods.sku.hide_stock"
        :show-add-cart-btn="false"
        @buy-clicked="onBuyClicked"
        />
    </div>
</template>

<script>
// 引入插件
import BScroll from '@better-scroll/core'
import 'swiper/dist/css/swiper.css'
import http from '@/common/api/request.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Toast } from 'vant';
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Detail',
    data() {
        return {
            gouwuNum: null,
            swiperList: [],
            swiperOption: {
                // 循环轮播
                loop: true,
                // 自动播放,并且保证滑动、点击轮播图后仍能自动播放
                autoplay: {
                    delay: 2500,
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                },
                speed: 500,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction'
                }
            },
            scroll: null,
            // 商品详细信息
            proDetail: {},
            // 控制头部的切换
            isShow: true,
            styleOption: {},
            // 控制激活按钮
            flag: 0,
            // 商品详情到顶部的高度
            detailHeight: 0,
            // 猜你喜欢到顶部的高度
            likeHeight: 0,
            // 回到顶部
            showBack: false,
            // 猜你喜欢
            guessLike: [],
            // 购物车总数
            cartNums: 0,
            // 收藏
            isCollect: false,
            // 是否显示购买商品的对话框
            showByGoods: false,
            // 商品购买相关的数据
            buyGoods: {
                sku: {
                    tree: [],
                    price: '88.00',
                    stock_num: 1000,
                    none_sku: true,
                    hide_stock: false
                },
                goods: {
                    picture: 'https://b.yzcdn.cn/vant/sku/shoes-1.png'
                },
                goodsId: 1,
            }
        }
    },
    mounted() {
        this.getDetailData()
        this.getAllData()
        this.getAllCarts()

        this.isSureCollect()

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
                    // 禁止better-scroll回弹
                    bounce: false,
                    probeType: 3
                })
            }

            

            if(this.scroll) {
                this.scroll.on('scroll', (pos) => {
                    let posY = Math.abs(pos.y)
                    let opacity = posY / 300

                    opacity = opacity >= 1 ? 1 : opacity

                    this.styleOption = {
                        opacity: opacity
                    }

                    if(posY >= 200) {
                        this.isShow = false
                    } else {
                        this.isShow = true
                    }

                    if(posY >= 500) {
                        this.showBack = true
                    } else {
                        this.showBack = false
                    }

                    setTimeout(() => {
                        if(this.$refs.toSum && this.$refs.detailBox) {
                            let scrollTop = this.$refs.toSum.clientHeight
                            let detailBoxH = this.$refs.detailBox.clientHeight
                            this.detailHeight = scrollTop - 35
                            this.likeHeight = scrollTop + detailBoxH - 22
                            
                            if(posY >= this.detailHeight && posY < this.likeHeight) {
                                this.flag = 1
                            } else if(posY >= this.likeHeight) {
                                this.flag = 2
                            } else {
                                this.flag = 0
                            }
                        }
                    }, 0)
                })
            }
        })

         

        this.$bus.$on('imageLoading', () => {
            if(this.scroll) {
                this.scroll.refresh()
            }
        })

    },
    components: {
        swiper,
        swiperSlide
    },
    methods: {
        ...mapMutations(['initOrder']),
        async getDetailData() {
        
            let that = this
            // 如果我们直接在网址中输入/detail，就默认this.$route.query.id为1
            if(!this.$route.query.id) {
                this.$route.query.id = 1
            }

            let res = await http.$axios({
                url: '/api/goods/detail',
                params: {
                    id: that.$route.query.id
                }
            })
            

            this.proDetail = res[0]
            this.swiperList.push(res[0].introImgUrl1)
            this.swiperList.push(res[0].introImgUrl2)
            this.swiperList.push(res[0].introImgUrl3)

            this.buyGoods.sku.price = res[0].price
            this.buyGoods.goods.picture = res[0].introImgUrl1
            this.buyGoods.goodsId = this.$route.query.id


        },
        imageLoad() {
            this.$bus.$emit('imageLoading')
        },
        async getAllData() {
            let res = await http.$axios({
                url: '/api/goods/alllist'
            })

            this.guessLike = res.filter((item) => {
                return item.id != this.$route.query.id
            })
        },
        toDetail(item) {
            this.$router.push({
                name: 'Detail',
                query: {
                    id: item.id
                }
            })
        },
        toDteailPro() {
            this.scroll.scrollTo(0, -this.detailHeight)
        },
        toLikePro() {
            this.scroll.scrollTo(0, -this.likeHeight)
        },
        backTop() {
            this.scroll.scrollTo(0, 0)
        },
        // 加入到购物车
        addCart() {
            let id = this.$route.query.id
            http.$axios({
                url: '/api/addCart',
                method: 'POST',
                data: {
                    goodsId: id
                },
                headers: {
                    // true代表验证token，false代表不验证
                    token: true
                }
            }).then(res => {
                if(res.success) {
                    Toast('添加购物车成功')
                    this.getAllCarts()
                }
                
            })
        },
        // 获取用户购物车总数
        getAllCarts() {
            let user = JSON.parse(localStorage.getItem('teaUserInfo'))
            if(user == null) {
                return
            }
            
            http.$axios({
                url: '/api/userGoodsNumber',
                method: 'POST',
                params: {
                    tel: user.tel
                }
            }).then(res => {
                this.cartNums = res.data
            })
        },
        // 是否收藏该商品
        collectGoods() {
            if(this.isCollect) {
                // 取消收藏
                http.$axios({
                    url: '/api/cancelCollect',
                    method: 'POST',
                    data: {
                        goodsId: this.$route.query.id
                    },
                    headers: {
                        token: true
                    }
                }).then(res => {
                    if(res.success) {
                        Toast('已取消收藏')
                        this.isCollect = false
                    }
                })

            } else {
                
                // 收藏成功
                http.$axios({
                    url: '/api/addCollect',
                    method: 'POST',
                    data: {
                        goodsId: this.$route.query.id
                    },
                    headers: {
                        token: true
                    }
                }).then(res => {
                    if(res.success) {
                        Toast('收藏成功')
                        this.isCollect = true
                    }
                })

            }
        },
        // 该商品是否被该用户收藏
        isSureCollect() {
            if(!this.loginStatus) {
                return
            } else {
                http.$axios({
                    url: '/api/isCollect',
                    headers: {
                        token: true
                    },
                    params: {
                        goodsId: this.$route.query.id
                    }
                }).then(res => {

                    this.isCollect = res.success
                })
            }
        },
        // 进入点击购买的对话框
        onBuyClicked(skuData) {

            let obj = {
                goods_id: this.$route.query.id,
                goods_name: this.proDetail.name,
                goods_price: this.proDetail.price,
                goods_num: skuData.selectedNum
            }

            let newArr = []
            newArr.push(obj)


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
                if(!res.success) return
                // 存储订单号
                this.initOrder(res.data)

                console.log(res.data);

                this.$router.push({
                    name: 'PayOrder',
                    query: {
                        id: res.data[0].id
                    }
                })
            })
        }
    },
    watch: {
        $route() {
            // 当路由发生改变，刷新页面
            this.$router.go(0)
        }
    },
    computed: {
        ...mapState({
            loginStatus: state => state.user.loginStatus
        })
    }
}
</script>

<style scoped lang="scss">
.detail-product {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    section {
        flex: 1;
        overflow: hidden;
        height: 100%;
        .shortname {
            padding: 0.3rem;
            background: #fff;
            position: relative;
            h1 {
                font-size: .48rem;
                color: #232326;
            }
            .restrci {
                font-size: .373333rem;
                padding-top: 0.1rem;
                color: #999;
            }
        }
        .d-price {
            line-height: 1;
            padding: 0 0.3rem 0.3rem;
            background: #fff;
            border-bottom: .026667rem solid #e1e1e1;
            .present-price {
                padding-top: 0.3rem;
                position: relative;
                .p1 {
                    margin-right: .133333rem;
                    display: inline;
                    line-height: 1;
                    color: #D22531;
                    span {
                        font-size: .75rem;
                    }
                }
                .p2 {
                    display: inline;
                    margin-right: 0.32rem;
                    color: #949494;
                    word-spacing: .133333rem;
                    font-size: 0.4rem;
                    span {
                        color: #949494;
                        word-spacing: 5px;
                        font-size: 0.4rem;
                    }
                }
            }
            .original-price {
                padding: 0.2rem 0 0;
                color: #999;
                font-size: .35rem;
                .o {
                    display: inline-block;
                    margin-right: 0.3rem;
                    color: #999;
                    font-size: .35rem;
                }
            }
        }
        .d-additional {
            border-top: .026667rem solid #f4f4f4;
            border-bottom: .026667rem solid #f4f4f4;
            background-color: #fff;
            margin: .266667rem 0;
            width: 100%;
            overflow: hidden;
            ul {
                list-style: none;
                li {
                    border-bottom: .026667rem solid #f4f4f4;
                    margin-left: 0.3rem;
                    font-size: .35rem;
                    color: #333;
                    .bd {
                        width: 100%;
                        padding-top: .373333rem;
                        padding-bottom: .373333rem;
                        overflow: hidden;
                        .col-l {
                            width: 1.4rem;
                            display: block;
                            color: #999;
                            float: left;
                        }
                        .col-r {
                            color: #333;
                            display: block;
                            font-weight: normal;
                            padding-right: 0.6rem;
                            float: left;
                            b {
                                color: #b4282d;
                                padding: 0 1px;
                            }
                            .slist {
                                display: inline-block;
                                padding-right: 0.2rem;
                                i {
                                    color: #b4282d;
                                    padding-right: 2px;
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }
        }
        .detail-box {
            background-color: #fff;
            padding: .266667rem;
            margin-top: .266667rem;
            border-top: .026667rem solid #f4f4f4;
            border-bottom: .026667rem solid #f4f4f4;
            .hd {
                width: 100%;
                line-height: 1;
                span {
                    height: .533333rem;
                    line-height: 1;
                    font-size: .426667rem;
                }
                em {
                    display: inline-block;
                    height: 100%;
                    font-size: 18px;
                    font-style: normal;
                    color: #DD2727;
                    margin-right: .133333rem;
                }
            }
            .fixck {
                padding: .533333rem 0;
                p {
                    width: 100%;
                    img {
                        width: 100%;
                        display: block;
                    }
                }
            }
        }
    }
    .detail-footer {
        width: 100%;
        height: 1.36rem;
        display: flex;
        border-top: .026667rem solid #E5E5E5;
        .cell {
            width: 1.36rem;
            height: 100%;
            text-align: center;
            line-height: 1.36rem;
            position: relative;
            padding: 0;
            border-right: .026667rem solid #E5E5E5;
            background-color: rgb(255, 255, 255);
            color: #999;
            i {
                width: .666667rem;
                height: .666667rem;
                line-height: .666667rem;
                font-size: .533333rem;
                display: block;
                margin: .026667rem auto 0;
            }
            span {
                display: block;
                width: 100%;
                font-size: .4rem;
                height: .693333rem;
                text-align: center;
                line-height: .693333rem;
            }
            em {
                position: absolute;
                top: .053333rem;
                right: .053333rem;
                width: .32rem;
                height: .32rem;
                color: #fff;
                font-size: .213333rem;
                border-radius: 50%;
                background-color: #f23030;
                font-style: normal;
                text-align: center;
                line-height: .32rem;
            }
        }
        .btn {
            height: 1.36rem;
            text-align: center;
            line-height: 1.36rem;
            color: #fff;
            font-size: .426667rem;
            flex: 1;
        }
    }
}
.head-back {
    position: fixed;
    display: flex;
    width: 100%;
    height: 1.173333rem;
    line-height: 1.173333rem;
    color: #222;
    background: #fff;
    z-index: 999;
    border-bottom: .026667rem solid #e3e3e3;
}
.head-back h2 {
    flex: 1;
    height: 100%;
    font-size: .426667rem;
    font-weight: 400;
    display: block;
    text-align: center;
    span {
        display: inline-block;
        height: 100%;
    }
}
.head-back i {
    display: block;
    width: 1.173333rem;
    height: 1.173333rem;
    color: #222;
    font-size: .533333rem;
    line-height: 1.173333rem;
    text-align: center;
}
.head-one {
    position: fixed;
    width: 100%;
    height: 1.173333rem;
    line-height: 1.173333rem;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        height: 1.173333rem;
        width: 1.173333rem;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
        i {
            display: block;
            width: 1.173333rem;
            height: 1.173333rem;
            color: #fff;
            font-size: .533333rem;
            line-height: 1.173333rem;
            text-align: center;
        }
    }
}
.add-gouwuche {
    background-color: #FF9500;
}
.add-goumai {
    background-color: #DD2727;
}

.swiper-pic {
    background-color: #fff;
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;
    height: 10rem;
}
.swiper-pic img {
    width: 100%;
}
.swiper-pic .swiper-pagination {
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    width: .746667rem;
    height: .746667rem;
    padding: .053333rem;
    right: .133333rem;
    bottom: .133333rem;
    font-size: .266667rem;
    text-align: center;
    line-height: .746667rem;
    position: absolute;
}
.detail-product ::v-deep .swiper-pagination-fraction {
    left: 90%;
}
.p1::before {
    content: '￥';
    display: inline-block;
    font-size: .42rem;
    text-indent: 0rem;
    color: #D22531;
}
.present-price::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: .026667rem;
    z-index: 15;
    background-color: #e3e5e9;
    transform: scale(.5);
    transform-origin: left top;
}
.guess-like {
    margin-top: .266667rem;
    border-top: .026667rem solid #f4f4f4;
    border-bottom: .026667rem solid #f4f4f4;
    background-color: #fff;
    padding: 0;
    .hd {
        padding: .266667rem;
        border-bottom: .026667rem solid #f5f5f5;
        font: .373333rem/1.4 PingFangSC-Light,helvetica,"Microsoft YaHei", arial;
        b {
            font-size: 15px;
            vertical-align: middle;
            font-weight: bold;
        }
        i {
            color: #DD2727;
            margin-right: .133333rem;
        }
        
    }
    .guess-pro {
        background: #f5f5f5;
        padding-bottom: .266667rem;
        ul {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            li {
                float: left;
                width: 50%;
                box-sizing: border-box;
                margin-bottom: .053333rem;
                background: #fff;
                position: relative;
                list-style: none;
                div {
                    padding: 0.2rem 0.2rem 0.1rem;
                    background: #fff;
                    text-align: center;
                    img {
                        width: 100%;
                        display: block;
                    }
                    p {
                        font-weight: bold;
                        font-size: .373333rem;
                        color: #333;
                        line-height: 0.6rem;
                        padding: 0.1rem 0 0rem;
                        height: 0.6rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .tip {
                        display: block;
                        font-size: .373333rem;
                        color: #999;
                        height: 0.6rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .pb {
                        .pb-price {
                            margin: .133333rem auto;
                            color: #b0352f;
                            font-size: .32rem;
                            span {
                                font-size: 0.386rem;
                                font-weight: 700;
                            }
                        }
                        .pb-btn {
                            width: 70%;
                            padding: .053333rem;
                            margin: 0 auto .133333rem;
                            background: #cc9900;
                            color: #fff;
                            border-radius: .133333rem;
                            display: block;
                            font-size: .373333rem;
                        }
                    } 
                }
            }
        }
    }
}
.guess-pro ul li:nth-child(2n+1) {
    border-right: .026667rem solid #f5f5f5;
}
.guess-pro ul li:nth-child(2n) {
    border-left: .026667rem solid #f5f5f5;
}
.active {
    color: #b0352f;
    border-bottom: .08rem solid #b0352f;
}
.back-top {
    width: 1.066667rem;
    position: fixed;
    right: .266667rem;
    bottom: 1.6rem;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    line-height: 1.066667rem;
    text-align: center;
    border-radius: 50%;
    font-size: .533333rem;
}

.collect {
    color: rgba(255, 181, 0, 0.9)!important;
}

.detail-product ::v-deep .van-sku-body {
    height: 8rem;
}
</style>