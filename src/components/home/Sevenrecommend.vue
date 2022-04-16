<template>
    <div class="qi-tuijian">
        <header class="floortitle">
            <span>小七推荐</span>
        </header>
        <ul>
            <li v-for="item in tuijianLinks" :key="item.id" @click="$router.push('/goodslist')">
                <router-link :to="item.path" class="bd"><img :src="item.imgUrl"></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Sevenrecommend',
    data() {
        return {
            tuijianLinks: [
                {id: 1, imgUrl: './images/xiaoqituijian1.png', path: '/home'},
                {id: 2, imgUrl: './images/xiaoqituijian2.png', path: '/home'}
            ]
        }
    }
}
</script>


Header<style scoped>
.qi-tuijian {
    background: #fff;
    margin-top: 10px;
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
.qi-tuijian ul {
    padding: 0 0.15rem 0.15rem;
    display: flex;
}
.qi-tuijian ul li {
    width: 50%;
    box-sizing: border-box;
    padding: 0.05rem;
    display: inline-block;
}
.qi-tuijian ul li .bd {
    display: block;
}
.qi-tuijian ul li img {
    width: 100%;
}
</style>