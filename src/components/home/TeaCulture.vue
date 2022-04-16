<template>
    <div class="tea-culture">
        <header class="floortitle">
            <span>茶文化</span>
        </header>
        <ul>
            <li v-for="item in cultureLinks" :key="item.id" @click="$router.push('/goodslist')">
                <router-link :to="item.path" class="bd">
                    <div class="cnt">
                        <h1>{{item.title}}</h1>
                        <span>{{item.content}}</span>
                    </div>
                    <img :src="item.imgUrl" @load="imageLoad">
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'TeaCulture',
    data() {
        return {
            cultureLinks: [
                {id: 1, imgUrl: './images/teaculture1.jpg', path: '/home', title: '好文精选', content: '原创好文都在这'},
                {id: 2, imgUrl: './images/teaculture2.jpg', path: '/home', title: '茶叶百科', content: '让您喝茶更专业'}
            ]
        }
    },
    methods: {
        imageLoad() {
            this.$bus.$emit('imageLoading')
        }
    }
}
</script>


<style scoped>
.tea-culture {
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
.tea-culture ul {
    padding: 0 0.15rem 0.15rem;
    display: flex;
}
.tea-culture ul li {
    width: 50%;
    box-sizing: border-box;
    padding: 0.05rem;
    display: inline-block;
}
.tea-culture ul li .bd {
    display: block;
}
.tea-culture ul li img {
    width: 100%;
    border-radius: .213333rem;
}
::v-deep .bd {
    position: relative;
}
.cnt {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    color: #fff;
    padding: 0.3rem 0 0 0.3rem;
    box-sizing: border-box;
}
.cnt h1 {
    font-size: 0.4rem;
    color: #333;
    font-weight: bold;
    display: block;
}
.cnt h1 {
    font-size: 0.4rem;
    color: #333;
    font-weight: bold;
    display: block;
}
.cnt span {
    font-size: 0.32rem;
    color: #999;
    display: block;
}
</style>