<template>
    <div class="dahongpao">
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
    name: 'DaHongPao',
    props: ['scroll'],
    data() {
        return {
            adImages: {
                image1: '../images/dahongpao/dahongpao1.jpg',
                image2: '../images/dahongpao/dahongpao2.jpg',
                image3: '../images/dahongpao/dahongpao3.jpg',
                image4: '../images/dahongpao/dahongpao7.jpg',
                image5: '../images/dahongpao/dahongpao8.jpg',
                image6: '../images/dahongpao/dahongpao9.jpg',
                image7: '../images/dahongpao/dahongpao10.jpg',
                image8: '../images/dahongpao/dahongpao11.jpg'
            },
            jichuImages: [
                {id: 1, image: '../images/dahongpao/dahongpao4.jpg'},
                {id: 2, image: '../images/dahongpao/dahongpao5.jpg'},
                {id: 3, image: '../images/dahongpao/dahongpao6.jpg'}
            ],
            products: [
                {id: 1, title: '口粮茶 铁盒装200g', content: '中火焙制，香气更醇', imageUrl: '../images/dahongpao/product1.jpeg', price: '59', path: ''},
                {id: 2, title: '武夷陈茶96g 罐装', content: '香气陈韵 口感顺滑', imageUrl: '../images/dahongpao/product2.jpeg', price: '88', path: ''},
                {id: 3, title: '远致肉桂96g 盒装', content: '果香迷人 口感顺滑', imageUrl: '../images/dahongpao/product3.jpeg', price: '59', path: ''},
                {id: 4, title: '花果香肉桂96g 盒装', content: '茶师亲制 滋味醇正', imageUrl: '../images/dahongpao/product4.jpeg', price: '99', path: ''}
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
    border: 1px solid #89c997;
}
.pic {
    position: relative;
    padding: .133333rem;
}
.pic img {
    width: 100%;
}
.name {
    color: #357133;
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
    border-bottom: 1px dashed #89c997;
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