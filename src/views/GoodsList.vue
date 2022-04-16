<template>
    <div class="goods-list">
        <div class="head-back">
            <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
            <h2>
                商品分类
            </h2>
            <i class="iconfont icon-search" @click="$router.push('/search')" v-if="$route.path == '/master'"></i>
            <i class="iconfont icon-shouye1" @click="$router.push('/home')" v-else></i>
        </div>
        <ul class="list-tab">
            <li v-for="(item, i) in tabList" :key="i" :class="{active: i == currentIndex}" @click="selectGoods(i)">{{item}}</li>
        </ul>
        <section ref="wrapper">
            <div style="overflow: hidden">
                <ul class="list-pro">
                    <li v-for="item in selectList" :key="item.id" @click="goDetail(item.id)">
                        <div class="list-detail">
                            <img :src="item.imgUrl" @load="imageLoad">
                            <p class="txt">{{item.name}}</p>
                            <p class="price">
                                <span>￥{{item.price}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import http from '@/common/api/request.js'
// 引入插件
import BScroll from '@better-scroll/core'

export default {
    name: 'GoodsList',
    components: {
      Tabber
    },
    data() {
        return {
            tabList: ['大红袍', '龙井', '白茶'],
            goodsList: [],
            currentIndex: 0, // 默认激活的选项
            scroll: null
        }
    },
    mounted() {
        this.getData()

        this.$nextTick(() => {
            // 可以使用$refs来直接获取元素
            this.scroll = new BScroll(this.$refs.wrapper, {
                pullUpLoad: true,
                scrollbar: true,
                pullDownRefresh: true,
                zoom: true,
                // 运行在better-scroll中触发点击事件
                click: true,
                // 禁止better-scroll回弹
                bounce: false
            })
        })

        this.$bus.$on('imageLoading', () => {
            this.scroll.refresh()
        })
    },
    methods: {
        async getData() {
            let res = await http.$axios({
                url: '/api/goods/alllist'
            })

            this.goodsList = res
        },
        selectGoods(i) {
            this.currentIndex = i
        },
        imageLoad() {
            this.$bus.$emit('imageLoading')
        },
        goDetail(id) {
            this.$router.push({
                name: 'Detail',
                query: {
                    id: id
                }
            })
        }
    },
    computed: {
        selectList() {
            return this.goodsList.filter((item) => {

                return item.name.includes(this.tabList[this.currentIndex])
            })
        }
    }
}
</script>

<style scoped lang="scss">
.goods-list {
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
        .list-pro {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            list-style: none;
            li {
                width: 50%;
                float: left;
                position: relative;
                .list-detail {
                    padding: 0.1rem 0.1rem 0;
                    background: #fff;
                    display: block;
                    border: .053333rem #f5f5f5 solid;
                    img {
                        width: 100%;
                        display: block;
                    }
                    .txt {
                        font-size: .4rem;
                        color: #333;
                        line-height: 0.5rem;
                        padding: 0.2rem 0 0;
                        height: 1rem;
                        overflow: hidden;
                    }
                    .price {
                        margin-bottom: .266667rem;
                        span {
                            color: #b0352f;
                            font-size: 0.55rem;
                        }
                    }
                }
            }
        }
    }
    .list-tab {
        width: 100%;
        height: 1.173333rem;
        background-color: #fff;
        display: flex;
        border-bottom: 1px solid #e3e3e3;
        li {
            flex: 1;
            padding: .133333rem .266667rem;
            font-size: .426667rem;
            text-align: center;
            line-height: .906667rem;
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
.active {
    font-weight: bold;
    color: #b0352f;
    border-bottom:2px solid #b0352f;
}
</style>