<template>
    <div class="longjing">
        <img :src="headerImages.background" class="s-img">
        <div class="top-des">
            <div>
                <div class="tea-manager">
                    <img :src="headerImages.person">
                    <b>陈建国</b>
                    <span>普洱产品经理</span>
                </div>
                <p>普洱茶有生茶和熟茶之分，生茶霸气感十足，但随着陈放时间的增长，会转化得越来越柔和。熟茶比较醇厚，喝起来很温润。
                    我从云南带来了几款很有代表性的生普和熟普，欢迎品鉴。</p>
            </div>
            <b class="wechat"><em class="iconfont icon-weixin"></em>这是我的微信号：15506901199，欢迎随时找我交流</b>
        </div>
        <!-- 口粮茶 -->
        <div class="tea-item">
            <div class="introduce-title">
                <span><i class="iconfont icon-chaye"></i></span>
            </div>
            <b class="top-title">
                最热单品<br>
                90%用户首选它
            </b>
            <div class="introduce-format">
                <span>
                    <p>在普洱茶界，一直流传这种说法：“藏新茶，喝熟茶，品老茶”。
                    </p>
                    <p>这款茶的口感非常
                        <b style="color: #b54f4a;">适合普洱茶入门茶友</b>
                    </p>
                    <p>茶的
                        <b style="color: #b54f4a;">醇厚度适中</b>
                        ，没有堆味。入口
                        <b style="color: #b54f4a;">甘甜顺滑，口感纯净</b>
                        。算是传统“勐海味”标准之作。
                    </p>
                </span>
                <div class="product-kouliang">
                    <img :src="kouliang.product">
                    <p class="name">渤海熟茶</p>
                    <p class="price">
                        <b>78元/357g</b>
                        <em>约230元/斤</em>
                    </p>
                    <p class="subtitle">
                        高性价比
                        <br>
                        具有传统渤海味
                    </p>
                    <p class="seebtn">查看详情></p>
                </div>
            </div>
            
        </div>
        <!-- 外形口感 -->
        <div class="tea-item">
            <div class="introduce-title">
                <span><i class="iconfont icon-chaye"></i></span>
            </div>
            <b class="top-title">如果您喜欢醇厚的普洱</b>
            <div class="introduce-image">
                <span>
                    <img :src="kouliang.image1">
                </span>
                <span>
                    <img :src="kouliang.image2" @load="imageLoad">
                </span>
            </div>
            <div class="plate-introduce">
                <p>
                    龙井等级的高低受到产地、采摘时间、外形等因素的影响。采摘于
                    <b style="color: #b54f4a;">雨前</b>
                    的这两款龙井，外形美观，口感
                    <b style="color: #b54f4a;">鲜爽迷人</b>
                    ，而且价格也适中。而初芽价格略高于凝露，主要还是因为初芽
                    <b style="color: #b54f4a;">外形</b>
                    更有优势一些。
                </p>
            </div>
            <div class="introduce-format-list" :style="{backgroundImage: `url(${backgroundImages})`}">
                <div class="list-product">
                    <div class="product-kouliang addp">
                        <img :src="productImages.image1">
                        <p class="name">宫廷熟茶</p>
                        <p class="price">
                            <b>168元/357g</b>
                            <em>约230元/斤</em>
                        </p>
                        <p class="subtitle">
                            八年陈，全芽制作
                            <br>
                            香气有层次
                        </p>
                        <p class="seebtn">查看详情></p>
                    </div>
                    <div class="product-kouliang addp">
                        <img :src="productImages.image2">
                        <p class="name">青柑熟茶</p>
                        <p class="price">
                            <b>159元/24粒</b>
                        </p>
                        <p class="subtitle">
                            新会小青柑礼盒
                            <br>
                            高颜值，好看更好喝
                        </p>
                        <p class="seebtn">查看详情></p>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- 个性好茶 -->
        <div class="tea-item">
            <div class="introduce-title">
                <span><i class="iconfont icon-chaye"></i></span>
            </div>
            <b class="top-title">如果您想要更好一点的外形口感</b>
            <div class="introduce-image">
                <img :src="dashiImages" class="dashicha-img">
            </div>
            <div class="plate-introduce">
                <p>
                    当勐海熟茶遇到新会小青柑，茶香和果香一见倾心，完美融合，清新甘甜的滋味，一次就难以忘怀，难道你要错过吗？
                    <b style="color: #b54f4a;">山高雾重，温热多雨</b>
                    ，方有上等普洱，1000多天沉淀见证时间带来的奇迹-绵绵不绝的滑爽与甘甜
                </p>
            </div>
            <div class="back-dashi">
                <p>查看详情></p>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'LongJing',
    props: ['scroll'],
    data() {
        return {
            headerImages: {
                background: '../images/puer/puer1.jpg',
                person: '../images/puer/person.jpg'
            },
            kouliang: {
                image1: '../images/puer/puer2.jpg',
                image2: '../images/puer/puer3.jpg',
                product: '../images/puer/puer4.jpeg'
            },
            backgroundImages: '../images/longjing/background.gif',
            productImages: {
                image1: '../images/puer/product1.jpeg',
                image2: '../images/puer/product2.jpeg'
            },
            dashiImages: '../images/longjing/dashi.jpg'
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
.longjing {
    background-color: #f5f5f5;
}
.s-img {
    width: 100%;
    text-align: center;
    display: block;
    margin: 0 auto;
}
.top-des {
    background: #fff;
}
.top-des > div {
    position: relative;
    font-size: 0.34rem;
    line-height: 1.5;
    text-align: center;
    padding: .266667rem;
    display: flex;
}
.tea-manager {
    text-align: center;
    width: 30%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: .48rem;
    color: #b54f4a;
}
.tea-manager img {
    width: 1.866667rem;
    height: 1.866667rem;
    border-radius: 50%;
    border: 1px solid #dedede;
    text-align: center;
    margin: 0 auto;
}
.tea-manager b {
    display: block;
    white-space: nowrap;
    text-align: center;
}
.tea-manager span {
    color: #000;
    white-space: nowrap;
    font-size: .32rem;
}
.top-des p {
    width: 70%;
    padding-left: .266667rem;
    font-size: 0.36rem;
    box-sizing: border-box;
    text-align: justify;
    line-height: 1.5;
}
.top-des .wechat {
    text-align: center;
    color: #b54f4a;
    display: block;
    width: 100%;
    font-size: 0.35rem;
    padding-bottom: .266667rem;
}
.wechat em {
    font-weight: 400;
}
.tea-item {
    background: #fff;
    margin-top: 1.066667rem;
}
.introduce-title {
    font-size: .373333rem;
    color: #555;
    margin: .266667rem auto;
    border-bottom: 1px #b54f4a solid;
    position: relative;
}
.introduce-title::after, .introduce-title::before {
    content: "";
    width: .08rem;
    height: .08rem;
    border-radius: 50%;
    background: #b54f4a;
    display: block;
    position: absolute;
}
.introduce-title::before {
    left: 0;
    bottom: -0.053333rem;
}
.introduce-title::after {
    right: 0;
    bottom: -0.053333rem;
}
.introduce-title span {
    position: absolute;
    border-radius: 50%;
    width: .533333rem;
    height: .533333rem;
    top: -0.266667rem;
    left: 50%;
    margin-left: -0.266667rem;
    color: #fff;
    line-height: 1.4;
    background: #b54f4a;
    text-align: center;
}
.introduce-title span i {
    font-size: .373333rem;
}
.top-title {
    font-size: 0.5rem;
    text-align: center;
    color: #b54f4a;
    margin: .533333rem auto .266667rem;
    display: block;
}
.introduce-image {
    display: flex;
    padding: 0 .133333rem .266667rem;
}
.introduce-image span {
    width: 50%;
    float: left;
}
.introduce-image span img {
    width: 100%;
    height: 100%;
    padding: .133333rem;
    box-sizing: border-box;
}
.introduce-format {
    padding: .266667rem .266667rem .533333rem;
    display: flex;
}
.introduce-format span {
    width: 50%;
    box-sizing: border-box;
    font-size: 0.36rem;
    line-height: 150%;
    margin-right: .266667rem;
    padding: .266667rem;
    flex-direction: column;
    display: flex;
    justify-content: center;
}
.introduce-format span p {
    padding: .266667rem 0;
    line-height: 0.6rem;
    letter-spacing: 0.05rem;
}
.product-kouliang {
    width: 50%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
}
.product-kouliang img {
    width: 100%;
    border: 0;
    vertical-align: middle;
}
.product-kouliang .name {
    font-size: 0.386rem;
    font-weight: bold;
    margin-top: .266667rem;
    text-align: center;
}
.product-kouliang .price {
    text-align: center;
    margin-top: .266667rem;
    color: #b54f4a;
}
.product-kouliang .price b {
    font-size: 0.386rem;
}
.product-kouliang .price em {
    font-weight: normal;
    white-space: nowrap;
    display: inline-block;
    border: 1px solid #ffd580;
    line-height: .373333rem;
    background: #ffffe5;
    padding: 1px .08rem;
    font-size: .32rem;
    color: #b54f4a;
    margin-left: .133333rem;
    font-style: normal;
}
.product-kouliang .subtitle {
    margin-bottom: .213333rem;
    margin-top: .213333rem;
    color: #000;
    font-size: 0.34rem;
    width: 100%;
    text-align: center;
    border-top: 1px solid #f5f5f5;
    padding-top: .266667rem;
}
.product-kouliang .seebtn {
    padding: .133333rem .266667rem;
    text-align: center;
    background: #b54f4a;
    color: #fff;
    font-size: .373333rem;
    font-weight: 700;
    margin: .266667rem auto;
    border-radius: 5px;
    width: 3rem;
}
.plate-introduce {
    padding: .266667rem .266667rem 0;
    font-size: 0.36rem;
    text-align: justify;
}
.plate-introduce p {
    text-indent: 0.82rem;
    letter-spacing: 0.05rem;
    line-height: 0.6rem;
}
.introduce-format-list {
    display: flex;
    margin: .133333rem;
}
.introduce-format-list .list-product {
    padding: .133333rem 0;
}
.addp {
    padding: .133333rem;
    float: left;
}
.back-dashi {
    padding-bottom: .533333rem;
    background: #fff;
    margin-top: 1.066667rem;
}
.back-dashi p {
    padding: .133333rem .266667rem;
    text-align: center;
    background: #b54f4a;
    color: #fff !important;
    font-size: .373333rem;
    font-weight: 700;
    margin: .266667rem auto;
    border-radius: .133333rem;
    width: 3rem;
    display: block;
}
.introduce-image .dashicha-img {
    width: 100%;
    height: 100%;
    padding: .133333rem;
    box-sizing: border-box;
}
</style>