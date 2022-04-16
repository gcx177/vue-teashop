<template>
    <div class="search">
        <Header></Header>
        <section ref="wrapper">
            <div class="search-all">
                <!-- 历史搜索 -->
                <div class="search-history" v-if="searchArr">
                    <div class="hd">
                        <i class="iconfont icon-shijian"></i>历史搜索
                        <span @click="deleteStorage">清除历史记录<i class="iconfont icon-shanchu"></i></span>
                    </div>
                    <ul class="bd">
                        <li v-for="(item, index) in searchArr" :key="index" @click="searchHistory(item)">{{item}}</li>
                    </ul>
                </div>
                <!-- 热门搜索 -->
                <div class="search-history">
                    <div class="hd"><i class="iconfont icon-remen"></i>热门搜索</div>
                    <ul class="bd">
                        <li v-for="(item, i) in resouList" :key="i" @click="searchHistory(item)">{{item}}</li>
                    </ul>
                </div>
                <div class="tj-hd"><i class="iconfont icon-tuijian"></i>推荐商品</div>
                <!-- 推荐商品 -->
                <div class="tuijian-product">
                    <ul>
                        <li v-for="item in products" :key="item.id" @click="$router.push('/goodslist')">
                            <div class="pro-detail">
                                <div class="pic">
                                    <img :src="item.imgUrl" @load="upImage">
                                    <span>{{item.content}}</span>
                                </div>
                                <p class="txt">{{item.title}}</p>
                                <p class="cle">
                                    <span>
                                        {{item.price}}
                                        <i>元</i>
                                    </span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import Header from '@/components/search/Header.vue'
// 引入插件
import BScroll from '@better-scroll/core'
import { MessageBox } from 'mint-ui';


export default {
    name: 'Search',
    data() {
        return {
            products: [
                {id: 1, title: '云南凤庆经典蜜香滇红', content: '外形讨喜 甘甜可口', imgUrl: '../images/sousuo/tuijian1.png', price: '88'},
                {id: 2, title: '无烟工艺正山小种2号', content: '浓厚薯密香', imgUrl: '../images/sousuo/tuijian2.jpeg', price: '89'},
                {id: 3, title: '浓郁豆香龙井1号', content: '顺滑鲜爽 回甘明显', imgUrl: '../images/sousuo/tuijian3.jpeg', price: '68'},
                {id: 4, title: '武夷山高级大红袍2号', content: '半岩山场 天然花香', imgUrl: '../images/sousuo/tuijian4.jpeg', price: '99'}
            ],
            scroll: null,
            searchArr: null,
            // 热门搜索数据
            resouList: ['大红袍', '福鼎大白茶', '送礼', '红茶', '龙井', '武夷山', '绿茶']
        }
    },
    components: {
        Tabber,
        Header
    },
    created() {
        this.searchArr = JSON.parse(localStorage.getItem('searchList'))
    },
    mounted() {
        this.$nextTick(() => {
            // 可以使用$refs来直接获取元素
            this.scroll = new BScroll(this.$refs.wrapper, {
                pullUpLoad: true,
                scrollbar: true,
                pullDownRefresh: true,
                zoom: true,
                // 运行在better-scroll中触发点击事件
                click: true,
                bounce: false
            })
        })
        this.$bus.$on('imageLoading', () => {
            this.scroll.refresh()
        })
    },
    methods: {
        upImage() {
            this.$bus.$emit('imageLoading')
        },
        deleteStorage() {
            MessageBox({
                title: '提示',
                message: '确定要删除搜索记录?',
                showCancelButton: true
            }).then(res => {
                if(res == 'confirm') {
                    localStorage.removeItem('searchList')
                    this.searchArr = null
                }
            })
        },
        // 点击历史搜索，进行相关的搜索
        searchHistory(item) {
            // 跳转页面

            let arr = JSON.parse(localStorage.getItem('searchList'))

            if(!arr) {
                arr = []
            }

            arr.unshift(item)

            localStorage.setItem('searchList', JSON.stringify([...new Set(arr)]))

            this.$router.push({name: 'ProductList', query: {key: item}})
        }
    }
}
</script>

<style scoped>
.search {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
}
section {
    flex: 1;
    overflow: hidden;
}
.search-history {
    margin: .266667rem .533333rem .533333rem;
}
.search-all {
    overflow: hidden;
}
.hd {
    font-size: .426667rem;
    margin-bottom: .4rem;
    height: .613333rem;
    line-height: .613333rem;
}
.hd i {
    color: #b0352f !important;
    font-size: .426667rem;
    font-style: normal;
    margin-right: .133333rem;
    line-height: .613333rem;
}
.bd li {
    display: inline-block;
    border: 1px solid #ddd;
    height: .8rem;
    line-height: .8rem;
    padding: 0 .133333rem;
    color: #999;
    margin-right: .4rem;
    margin-bottom: .4rem;
    font-size: .373333rem;
}
.tj-hd {
    border-bottom: 1px #f5f5f5 solid;
    padding: .533333rem;
    font-size: .426667rem;
}
.tj-hd i {
    color: #b0352f !important;
    font-style: normal;
    font-size: .426667rem;
    margin-right: .133333rem;
}
.tuijian-product {
    overflow: hidden;
}
.tuijian-product ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: .053333rem;
}
.tuijian-product ul li {
    width: 48%;
    float: left;
    margin: 0 1%;
    box-sizing: border-box;
    padding-bottom: 0.2rem;
    position: relative;
}
.pro-detail {
    background: #fff;
    display: block;
    padding: 0.3rem;
}
.pro-detail .pic {
    position: relative;
    width: 100%;
}
.pro-detail .pic img {
    position: relative;
    width: 100%;
}
.pro-detail .pic span {
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    font-size: .32rem;
    color: #fff;
    width: 100%;
    padding: 0.1rem 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 -0.3rem;
}
.pro-detail .txt {
    font-size: .373333rem;
    color: #333;
    line-height: 0.5rem;
    padding: 0.15rem 0rem 0.15rem;
    height: 1.2rem;
    box-sizing: border-box;
    overflow: hidden;
}
.pro-detail .cle {
    padding-top: .133333rem;
    overflow: hidden;
}
.pro-detail .cle span {
    float: left;
    font-size: .48rem;
    color: #ff6600;
}
.pro-detail .cle i{
    font-size: 0.3rem;
    font-style: normal;
    color: #ff6600;
}
.hd span {
    float: right;
}
.hd span i {
    margin-left: .133333rem;
}
</style>