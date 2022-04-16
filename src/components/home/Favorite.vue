<template>
    <div class="you-favorite">
        <header class="floortitle">
            <span>猜你喜欢</span>
        </header>
        <ul>
            <li v-for="item in favoriteList" :key="item.id" @click="goDetail(item)">
                <div class="bg-img">
                    <img :src="item.imgUrl" @load="imageLoad">
                </div>
                <div class="name">{{item.name}}</div>
                <div class="price">
                    <span>¥</span>
                    <b>{{item.price}}</b>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import http from '@/common/api/request.js'

export default {
    name: 'Favorite',
    data() {
        return {
            favoriteList: []
        }
    },
    mounted() {
        this.getDatas()
    },
    methods: {
        imageLoad() {
            this.$bus.$emit('imageLoading')
        },
        async getDatas() {
            let res = await http.$axios({
                url: '/api/goods/alllist'
            })

            this.favoriteList = res
        },
        goDetail(item) {
            this.$router.push({
                name: 'Detail',
                query: {
                    id: item.id
                }
            })
        }
    }
}
</script>


<style scoped>
.you-favorite {
    background: #fff;
    margin-top: .266667rem;
    padding: 0.2rem 0;
}
.floortitle {
    text-align: center;
    padding: 0.2rem 0;
    font-size: 0.5rem;
    color: #333333;
}
.floortitle span {
    position: relative;
    font-size: 0.5rem;
    color: #333333;
    text-align: center;
}
.floortitle span::before, .floortitle span::after {
    content: "";
    position: absolute;
    width: .213333rem;
    height: .213333rem;
    border-radius: 50%;
    display: block;
    background: #d4c0a7;
    top: 50%;
    transform: translateY(-50%);
}
.floortitle span::before {
    left: -0.5rem;
}
.floortitle span::after {
    right: -0.5rem;
}
.you-favorite ul {
    padding: 0.1rem;
    list-style: none;
    overflow: hidden;
}
.you-favorite ul li {
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding: 0.1rem;
    margin-bottom: 0.4rem;
}
.you-favorite ul li img {
    display: block;
    width: 100%;
}
.you-favorite ul li .name {
    padding: .213333rem 0;
    font-size: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.price {
    color: #b0352f;
    height: 0.5rem;
    line-height: 0.5rem;
}
.price span {
    font-size: 0.34rem;
}
.price b {
    font-size: 0.5rem;
    font-weight: normal;
}
.bg-img {
    background: #f3f3f3;
}
</style>