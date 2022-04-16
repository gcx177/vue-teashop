<template>
    <div class="longjing">
        <img :src="headerImages.background" class="s-img">
        <div class="top-des">
            <div>
                <div class="tea-manager">
                    <img :src="headerImages.person">
                    <b>陈建国</b>
                    <span>龙井产品经理</span>
                </div>
                <p>龙井属于绿茶，是中国茶品之首。龙井茶色泽翠绿，香气浓郁，甘醇爽口，
                    是很受大众欢迎的一个茶品种。那一款好的龙井，具体评判标准有哪些？
                    怎么选购一款适合自己的龙井呢？希望你们可以通过这个专题找到答案。</p>
            </div>
            <b class="wechat"><em class="iconfont icon-weixin"></em>这是我的微信号：15506901199，欢迎随时找我交流</b>
        </div>
        <!-- 口粮茶 -->
        <div class="tea-item">
            <div class="introduce-title">
                <span><i class="iconfont icon-chaye"></i></span>
            </div>
            <b class="top-title">如果您在寻找一款口粮茶</b>
            <div class="introduce-image">
                <span>
                    <img :src="kouliang.image1">
                </span>
                <span>
                    <img :src="kouliang.image2" @load="imageLoad">
                </span>
            </div>
            <div class="introduce-format">
                <span>
                    <p>作为
                        <b style="color: #b54f4a;">中国十大名茶</b>
                        之首的龙井，有“色绿、香郁、味甘、形美”
                        <b style="color: #b54f4a;">四绝</b>
                        的特点
                    </p>
                    <p>一款适合当口粮茶的龙井，它外形上可能有些许的不足，但优势在于
                        <b style="color: #b54f4a;">适口好喝</b>
                        的，而且价格不高。
                    </p>
                    <p>这款龙井，产地非龙井核心产区，但豆香怡人，
                        入口很顺，口感鲜爽醇厚，回甘明显。
                    </p>
                </span>
                <div class="product-kouliang">
                    <img :src="kouliang.product">
                    <p class="name">龙井1號</p>
                    <p class="price">
                        <b>68元/250g</b>
                        <em>约140元/斤</em>
                    </p>
                    <p class="subtitle">
                        口感鲜爽醇厚
                        <br>
                        好喝不贵
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
            <b class="top-title">如果您想要更好一点的外形口感</b>
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
                        <p class="name">龙井2號</p>
                        <p class="price">
                            <b>88元/150g</b>
                            <em>约290元/斤</em>
                        </p>
                        <p class="subtitle">
                            清鲜爽滑
                            <br>
                            果香与栗香混合
                        </p>
                        <p class="seebtn">查看详情></p>
                    </div>
                    <div class="product-kouliang addp">
                        <img :src="productImages.image2" @load="imageLoad">
                        <p class="name">龙井3號</p>
                        <p class="price">
                            <b>118元/150g</b>
                            <em>约370元/斤</em>
                        </p>
                        <p class="subtitle">
                            栗香明显
                            <br>
                            清爽甘醇
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
                <img :src="dashiImages" class="dashicha-img" @load="imageLoad">
            </div>
            <div class="plate-introduce">
                <p>
                    除了龙井，您是否要试一试其他品种的个性茶？这里的
                    <b style="color: #b54f4a;">茶师市集</b>
                    ，精选了数十位茶师亲制的几十款个性好茶：岩茶、铁观音、红茶、白茶等等。
                    每一位茶师，每一款茶叶，我们都仔细甄选过，请您放心品鉴。
                    更有优势一些。
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
                background: '../images/longjing/longjing1.png',
                person: '../images/longjing/person.jpg'
            },
            kouliang: {
                image1: '../images/longjing/kouliangcha1.jpg',
                image2: '../images/longjing/kouliangcha2.jpg',
                product: '../images/longjing/kouliangcha3.jpeg'
            },
            backgroundImages: '../images/longjing/background.gif',
            productImages: {
                image1: '../images/longjing/product1.jpeg',
                image2: '../images/longjing/product2.jpeg'
            },
            dashiImages: '../images/longjing/dashi.jpg'
        }
    },
    mounted() {
        this.$bus.$on('imageLoading', () => {
            this.scroll.refresh()
        })
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