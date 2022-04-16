<template>
    <div class="jinjunmei">
        <div class="item">
            <img :src="adImages.image1">
        </div>
        <div class="item">
            <img :src="adImages.image2">
        </div>
        <div class="item">
            <img :src="adImages.image3">
        </div>
        <div class="item" v-for="item in jichuImages" :key="item.id">
            <img :src="item.image" @load="imageLoad">
        </div>
        <div class="item">
            <img :src="adImages.image4">
        </div>
        <div class="product-list">
            <ul>
                <li v-for="item in products" :key="item.id">
                    <div class="product-detail">
                        <div class="pic"><img :src="item.imageUrl" @load="imageLoad"></div>
                        <div class="name">{{item.title}}</div>
                        <div class="prod-act">{{item.content}}</div>
                        <div class="price">
                            <div class="pl">
                                ￥<b>{{item.price}}</b>
                            </div>
                            <div class="pr">
                                <span>去购买</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="item">
            <img :src="adImages.image5">
        </div>
        <div class="item enter">
            <img :src="adImages.image6">
        </div>
        <div class="item">
            <img :src="adImages.image7">
        </div>
        <div class="item footer" @click="backTop">
            <img :src="adImages.image8">
        </div>
    </div>
</template>

<script>
export default {
    name: 'JinJunMei',
    props: ['scroll'],
    data() {
        return {
            adImages: {
                image1: '../images/jinjunmei/jinjunmei1.jpg',
                image2: '../images/jinjunmei/jinjunmei2.jpg',
                image3: '../images/jinjunmei/jinjunmei3.jpg',
                image4: '../images/jinjunmei/jinjunmei7.jpg',
                image5: '../images/jinjunmei/jinjunmei8.jpg',
                image6: '../images/jinjunmei/jinjunmei9.jpg',
                image7: '../images/jinjunmei/jinjunmei10.jpg',
                image8: '../images/jinjunmei/jinjunmei11.jpg'
            },
            jichuImages: [
                {id: 1, image: '../images/jinjunmei/jinjunmei4.jpeg'},
                {id: 2, image: '../images/jinjunmei/jinjunmei5.jpg'},
                {id: 3, image: '../images/jinjunmei/jinjunmei6.jpg'}
            ],
            products: [
                {id: 1, title: '金骏眉-御品豪茗礼盒 250g', content: '滋味醇香 彰显情意', imageUrl: '../images/jinjunmei/product1.jpeg', price: '128', path: ''},
                {id: 2, title: '金骏眉-如意小罐装180g', content: '经典小罐 罐罐尊享', imageUrl: '../images/jinjunmei/product2.jpeg', price: '158', path: ''},
                {id: 3, title: '金骏眉-特级黄芽单罐200g', content: '名茶易得 佳茗难寻', imageUrl: '../images/jinjunmei/product3.jpeg', price: '188', path: ''},
                {id: 4, title: '金骏眉-以茶为礼 200g', content: '复古镂空 古典雅致', imageUrl: '../images/jinjunmei/product4.jpeg', price: '188', path: ''}
            ]
        }
    },
    methods: {
        imageLoad() {
            this.$bus.$emit('imageLoading')
        },
        backTop() {
            this.scroll.scrollTo(0, 0, 1000);
        }
    }
}
</script>

<style scoped>
.item {
    position: relative;
}
.item img {
    vertical-align: middle;
    width: 100%;
}
.product-list {
    background: #fff;
}
.product-list ul {
    padding: .133333rem;
    padding-top: .4rem;
    overflow: hidden;
}
.product-list ul li {
    float: left;
    width: 48%;
    box-sizing: border-box;
    background: #f9f8f6;
    padding: 0.2rem;
    margin: 1%;
}
.product-detail {
    border: 1px solid #cb3c38;
}
.pic {
    position: relative;
    padding: .133333rem;
}
.pic img {
    width: 100%;
}
.name {
    color: #cb3c38;
    text-align: center;
    font-size: 0.386rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 .133333rem;
}
.prod-act {
    color: #666;
    text-align: center;
    padding-bottom: .133333rem;
    border-bottom: 1px dashed #cb3c38;
    margin: 0.2rem;
    font-size: 0.35rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.price {
    display: flex;
    justify-content: space-between;
    color: #cb3c38;
    padding: 0 .266667rem .266667rem;
}
.price .pl {
    font-weight: bold;
    height: .64rem;
    line-height: .64rem;
    font-size: .373333rem;
}
.price .pl b {
    font-weight: bold;
    font-size: .533333rem;
}
.price .pr span {
    text-align: center;
    color: #fff;
    background: #cb3c38;
    height: .64rem;
    line-height: .64rem;
    display: block;
    padding: 0 0.25rem;
    font-size: .373333rem;
}
.enter {
    padding: .266667rem;
    background: #fff;
}
.footer {
    height: 3.890667rem;
}
</style>