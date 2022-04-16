<template>
    <div class="baokuan">
        <header class="floortitle">
            <span>爆款推荐</span>
        </header>
        <ul class="baokuan-list">
            <li v-for="item in recommedList" :key="item.id" @click="$router.push('/goodslist')">
                <div class="status">{{item.title}}</div>
                <div class="introduce">
                    <div class="name">
                        <h1>{{item.name}}</h1>
                        <div class="text">{{item.content}}</div>
                    </div>
                    <div class="price">
                        <span>￥</span>
                        <b>{{item.price}}</b>
                    </div>
                </div>
                <div>
                    <img :src="item.imgUrl">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Baokuan',
    data() {
        return {
            recommedList: [
                {id: 1, name: '龙井1號铁罐250g', content: '鲜爽甘醇 口粮首选', title: '销冠款', imgUrl: './images/baokuan1.jpeg', price: '68'},
                {id: 2, name: '铁观音2號250g', content: '核心产区滋味正', title: '老铁推荐', imgUrl: './images/baokuan2.jpeg', price: '128'},
                {id: 3, name: '正山小种3號150g', content: '难以忘怀的桂花香', title: '爆款', imgUrl: './images/baokuan3.jpeg', price: '99'},
                {id: 4, name: '黑檀镂空六君子', content: '给生活一点精致的仪式感', title: '茶友必备', imgUrl: './images/baokuan4.jpeg', price: '45'}
            ]
        }
    }
}
</script>

<style scoped>
.baokuan {
    background: #fff;
    margin-top: .4rem;
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
.baokuan-list {
    padding: 0.2rem;
}

.baokuan-list li {
    border-radius: .213333rem;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    list-style: none;
}
.baokuan-list .status {
    background: #D4C0A7;
    position: absolute;
    left: 0.4rem;
    top: 0;
    color: #fff;
    border-radius: 0 0 .213333rem .213333rem;
    padding: .133333rem;
    font-size: .373333rem;
}
.baokuan-list img {
    width: 100%;
    vertical-align: middle;
}
.baokuan-list .introduce {
    position: absolute;
    right: 0;
    box-sizing: border-box;
    width: 50%;
    height: 100%;
    padding-right: 0.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
.baokuan-list .introduce h1 {
    color: #666666;
    font-size: 0.34rem;
    text-align: right;
}
.baokuan-list .introduce .text {
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333333;
    font-size: 0.4rem;
    text-align: right;
}
.baokuan-list .introduce span {
    font-size: 0.34rem;
}
.baokuan-list .introduce b {
    font-size: 0.5rem;
}
.price {
    margin-top: 10%;
    color: #b0352f;
    height: 0.5rem;
}
</style>