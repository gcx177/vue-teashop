<template>
    <div class="baicha">
        <img :src="headerImages.background" class="s-img">
        <div class="top-des">
            <div>
                <div class="tea-manager">
                    <img :src="headerImages.person">
                    <b>肖丽梅</b>
                    <span>白茶产品经理</span>
                </div>
                <p>白茶的制作工艺是最天然的，通过阳光晾晒，再文火慢慢烘干，
                    既保留了其独有药效，也保持了它的天然香气。白茶的品种较多，
                    其中的档次也有细分，希望你们能通过这个专题更好的选购白茶产品。</p>
            </div>
            <b class="wechat"><em class="iconfont icon-weixin"></em>这是我的微信号：18960632380，欢迎随时找我交流</b>
        </div>
        <!-- 口粮茶 -->
        <div class="tea-item">
            <div class="introduce-title">
                <span><i class="iconfont icon-chaye"></i></span>
            </div>
            <b class="top-title">如果您想要寻找一款口粮茶</b>
            <div class="introduce-image">
                <span>
                    <img :src="kouliang.image1">
                </span>
                <span>
                    <img :src="kouliang.image2" @load="imageLoad">
                </span>
            </div>
            <div class="plate-introduce">
                <p>选购一款口粮茶，品种可能不是白茶中最优质的，但口感绝对是不错的。</p>
                <p>
                    这里的几款产品，价格和外形可能有些差异，但各有各的
                    <b style="color: #b54f4a;">特色优势</b>
                    ，每一款都值得选购。
                </p>
            </div>
            <div class="introduce-format-list" :style="{backgroundImage: `url(${backgroundImages})`}">
                <div class="list-product">
                    <div class="product-kouliang addp">
                        <img :src="kouliang.product1">
                        <p class="name">远致白茶清香型</p>
                        <p class="price">
                            <b>39元/80g</b>
                            <em>约300元/斤</em>
                        </p>
                        <p class="subtitle">
                            铁罐包装
                            <br>
                            时尚典雅
                        </p>
                        <p class="seebtn">查看详情></p>
                    </div>
                    <div class="product-kouliang addp">
                        <img :src="kouliang.product2">
                        <p class="name">福鼎白杜丹</p>
                        <p class="price">
                            <b>128元/350g</b>
                            <em>约180元/斤</em>
                        </p>
                        <p class="subtitle">
                            幸福礼盒装
                            <br>
                            5年陈茶 用心好礼
                        </p>
                        <p class="seebtn">查看详情></p>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- 外形口感 -->
        <div class="tea-item">
            <div class="introduce-title">
                <span><i class="iconfont icon-chaye"></i></span>
            </div>
            <b class="top-title">如果您想要更好一点的品种</b>
            <div class="introduce-image">
                <span>
                    <img :src="productImages.image1">
                </span>
                <span>
                    <img :src="productImages.image2" @load="imageLoad">
                </span>
            </div>
            <div class="introduce-format">
                <span>
                    <p>白牡丹分为特级.一级.二级。特级白牡丹，又称牡丹王。</p>
                    <p>这款<b style="color: #b54f4a;">牡丹王</b>产自福建政和。芽叶连枝，白毫多。采用政和白茶传统工艺制作，口感鲜醇凉爽，有青草香和花香，还增了一丝醇厚。</p>
                </span>
                <div class="product-kouliang">
                    <img :src="productImages.image3">
                    <p class="name">远致白茶政和牡丹王清香型铁罐装80g</p>
                    <p class="price">
                        <b>79元/80g</b>
                        <em>约490元/斤</em>
                    </p>
                    <p class="subtitle">
                        传统工艺
                        <br>
                        口感鲜醇
                    </p>
                    <p class="seebtn">查看详情></p>
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
                    要知道，白茶如果做出个性，是非常有魅力的！这里的
                    <b style="color: #b54f4a;">茶师市集</b>
                    ，精选了3位茶师的4款白茶！每一位茶师，每一款茶叶，我们都仔细甄选过，请您放心品鉴。
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
    name: 'BaiCha',
    props: ['scroll'],
    data() {
        return {
            headerImages: {
                background: '../images/baicha/baicha1.png',
                person: '../images/baicha/person.jpg'
            },
            kouliang: {
                image1: '../images/baicha/kouliangcha1.jpg',
                image2: '../images/baicha/kouliangcha2.jpg',
                product1: '../images/baicha/kouliangcha3.jpeg',
                product2: '../images/baicha/kouliangcha4.jpeg'
            },
            backgroundImages: '../images/baicha/background.gif',
            productImages: {
                image1: '../images/baicha/product1.jpg',
                image2: '../images/baicha/product2.jpg',
                image3: '../images/baicha/product3.jpeg'
            },
            dashiImages: '../images/baicha/dashi.jpg'
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
.baicha {
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