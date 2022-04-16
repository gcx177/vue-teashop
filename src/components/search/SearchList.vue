<template>
    <div class="search-list">
        <Header></Header>
        <section ref="wrapper">
            <ul v-if="showList">
                <li v-for="item in productDatas" :key="item.id" @click="goDetail(item.id)">
                    <div class="product">
                        <img :src="item.imgUrl" @load="upImage">
                        <p class="txt">{{item.name}}</p>
                        <div class="pro">
                            <div class="price">
                                <span class="red">¥{{item.price}}</span>
                            </div>
                            <div class="pl-btn">
                                <span>立即购买</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="no-productlist" v-else>
                <i class="iconfont icon-weizhaodaoshangpin"></i>
                <span>
                    不好意思未找到你想要搜索的商品
                    <br>
                    您可以尝试搜索<b @click="searchPro('大红袍')">大红袍</b>、<b @click="searchPro('龙井')">龙井</b>、<b @click="searchPro('白茶')">白茶</b>等产品
                </span>
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
// 引入二次封装的axios
import http from '@/common/api/request.js'


export default {
    name: 'SearchList',
    components: {
        Tabber,
        Header
    },
    data() {
        return {
            productDatas: [],
            scroll: null,
            showList: true
        }
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
        async getData() {

            let res = await http.$axios({
                url: '/api/goods/shopList',
                params: {
                    searchName: this.$route.query.key
                }
            })

            if(!res.length) {
                this.showList = false
            } else {
                this.showList = true
            }

            this.productDatas = res
        },
        searchPro(productName) {

            let arr = JSON.parse(localStorage.getItem('searchList'))

            arr.unshift(productName)

            localStorage.setItem('searchList', JSON.stringify([...new Set(arr)]))

            this.$router.push({name: 'ProductList', query: {key: productName}})
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
    created() {
        this.getData()
    },
    watch: {
        // 监听路由的变化
        $route() {
            // 当路由发生改变，重新获取数据
            this.getData()
        }
    }
}
</script>

<style scoped>
.search-list {
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
section ul {
    overflow: hidden;
}
.search-list ul li {
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding-bottom: 0.05rem;
    position: relative;
}
.search-list ul li:nth-child(2n) {
    padding-left: 0.025rem;
}
.search-list ul li:nth-child(2n+1) {
    padding-right : 0.025rem;
}

.search-list ul li .product {
    padding: 0.2rem 0.2rem 0.1rem;
    background: #fff;
}
.search-list ul img {
    width: 100%;
    display: block;
}
.search-list ul .txt {
    font-size: 14px;
    color: #333;
    line-height: 0.6rem;
    padding: 0.1rem 0 0rem;
    height: 0.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pro {
    display: -webkit-box;
    min-height: 1rem;
}
.pro .price {
    width: 60%;
}
.red {
    min-width: 2.133333rem;
    color: #b0352f;
    font: .373333rem/1.4 PingFangSC-Light,helvetica,"Microsoft YaHei", arial;
}
.pl-btn {
    width: 40%;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
}
.pl-btn span {
    color: #fff;
    background-color: #b0352f;
    text-align: center;
    border-radius: .133333rem;
    font-size: 0.34rem;
    white-space: nowrap;
    display: block;
    padding: 0.1rem 0.2rem;
}
.no-productlist i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -170%);
    font-size: 2.133333rem;
}

.no-productlist {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #e3e3e3;
    color: #b0352f;
    font-size: .506667rem;
}
.no-productlist span {
    position: absolute;
    text-align: center;
    display: block;
    line-height: 1.5;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
}
</style>