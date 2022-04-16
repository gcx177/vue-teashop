<template>
    <div class="collect">
        <div class="head-back">
            <i class="iconfont icon-xiangzuo1" @click="$router.push('/my')"></i>
            <h2>
                我的收藏
            </h2>
            <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
        </div>
        <section ref="wrapper">
            <div style="overflow: hidden" v-show="collectList.length > 0">
                <div class="list-item" v-for="item in collectList" :key="item.id" @click="goDetail(item)">
                    <img :src="item.goods_imgUrl" @load="imageLoad">
                    <div class="content">
                        <div class="name">{{item.goods_name}}</div>
                        <div class="price">￥{{item.goods_price}}</div>
                        <div class="btn"><i class="iconfont icon-gouwuche"></i></div>
                    </div>
                </div>
            </div>
            <div v-show="collectList.length == 0">
                <div class="describe">
                    您还没有收藏的商品哦，可以去首页逛逛
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

export default {
    name: 'Collect',
    components: {
        Tabber
    },
    data() {
        return {
            scroll: null,
            collectList: []
        }
    },
    mounted() {

        this.getMyCollect()
        this.$nextTick(() => {
            if(this.$refs.wrapper) {
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
            }
        })

        this.$bus.$on('imageLoading', () => {
            if(this.scroll) {
                this.scroll.refresh()
            }
        })
    },
    methods: {
        getMyCollect() {
            http.$axios({
                url: '/api/myCollect',
                method: 'POST',
                headers: {
                    token: true
                }
            }).then(res => {
                if(res.success) {
                    this.collectList = res.data
                }
            })
        },
        imageLoad() {
            this.$bus.$emit('imageLoading')
        },
        goDetail(item) {
            this.$router.push({
                name: 'Detail',
                query: {
                    id: item.goods_id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.collect {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    section {
        flex: 1;
        overflow: hidden;
        .list-item {
            margin-top: .266667rem;
            padding: .266667rem;
            display: flex;
            height: 2.133333rem;
            background: #fff;
            margin-bottom: .266667rem;
            img {
                width: 2.133333rem;
                height: 2.133333rem;
                display: block;
                border: none;
                margin-right: .266667rem;
            }
            .content {
                flex: 1;
                height: 2.133333rem;
                position: relative;
                .name {
                    font-size: .4rem;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .price {
                    font-size: .426667rem;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                .btn {
                    width: 2.506667rem;
                    height: .906667rem;
                    border-radius: .266667rem;
                    background: #b0352f;
                    font-size: .48rem;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    line-height: .906667rem;
                    text-align: center;
                    i {
                        font-size: .48rem;
                        color: #fff;
                    }
                }
            }
        }
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

.describe {
    width: 100%;
    height: 15.173333rem;
    text-align: center;
    line-height: 15.173333rem;
    color: #9e9e9e;
    font-size: .533333rem;
}
</style>