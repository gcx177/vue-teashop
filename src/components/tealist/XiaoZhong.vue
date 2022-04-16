<template>
    <div class="xiaozhong" :style="{backgroundImage: `url(${backgroundImages.img1})`}">
        <div class="toptxt">
            <p class="top-txt1">正山小种</p>
            <p class="top-txt2">源自武夷山 红茶鼻祖</p>
        </div>
        <div class="top-banner">
            <img :src="backgroundImages.img2" @load="imageLoad">
        </div>
        <p class="top-txt3">
            世界上最早的红茶，正山小种延续了四百年的传奇
            <br>
            条索壮实带天然花香，味醇厚甘爽，喉韵悠长尽是特色
            <span><i class="iconfont icon-xiangxia"></i></span>
        </p>
        <div class="nav">
            <ul class="nav-item">
                <li class="nav_conten"><span @click="scroll.scrollTo(0, -675, 50)">基础款</span></li>
                <li class="nav_conten"><span @click="scroll.scrollTo(0, -1750, 50)">礼盒款</span></li>
                <li class="nav_conten"><span @click="scroll.scrollTo(0, -2190, 50)">选购指南</span></li>
            </ul>
        </div>
        <div class="jck-product">
            <img :src="backgroundImages.img3">
            <b>基础款-爆款</b>
            <p>BASIC SECTION</p>
        </div>
        <div class="product1" :style="{backgroundImage: `url(${backgroundImages.img4})`}">
            <div>
                <div class="pd">
                    <div class="pic">
                        <img :src="productImg.img1">
                    </div>
                    <div class="pd-price">
                        <span>第一档</span>
                        <h1>正山小种 1 號</h1>
                        <div class="logan">
                            <span>天然花香无烟型</span>
                        </div>
                        <div class="price">
                            <b>88</b>
                            <span>/250g</span>
                        </div>
                        <div class="pbtn">立即购买></div>
                    </div>
                </div>
                <p class="txt">这款适合当工作口粮茶饮用的正山小种，单泡不到2元，产自武夷山高海拔茶园，山野气息独特，带天然花香，滋味浓醇香甜，性价比实在高。</p>
            </div>
        </div>
        <div class="product1" :style="{backgroundImage: `url(${backgroundImages.img4})`}">
            <div>
                <div class="pd">
                    <div class="pic">
                        <img :src="productImg.img2">
                    </div>
                    <div class="pd-price">
                        <span>第二档</span>
                        <h1>正山小种 2 號</h1>
                        <div class="logan">
                            <span>薯蜜香馥郁芬芳</span>
                        </div>
                        <div class="price">
                            <b>89</b>
                            <span>/150g</span>
                        </div>
                        <div class="pbtn">立即购买></div>
                    </div>
                </div>
                <p class="txt">这款正山小种有三大特点，其一是条索更加紧细秀气，很是好看；其二是薯蜜香桂圆味显著，滋味更加甘醇爽滑；最后是耐泡度更高，可达10泡！</p>
            </div>
        </div>
        <div class="product1" :style="{backgroundImage: `url(${backgroundImages.img4})`}">
            <div>
                <div class="pd">
                    <div class="pic">
                        <img :src="productImg.img3">
                    </div>
                    <div class="pd-price">
                        <span>第三档</span>
                        <h1>正山小种 3 號</h1>
                        <div class="logan">
                            <span>清甜顺滑花果香</span>
                        </div>
                        <div class="price">
                            <b>99</b>
                            <span>/150g</span>
                        </div>
                        <div class="pbtn">立即购买></div>
                    </div>
                </div>
                <p class="txt">这款正山小种是1號的升级款，精选一芽一两叶为原料，等级最高，滋味清甜如蜂蜜水，杯中水中皆是花果香，经久不散，十分稳定耐泡。</p>
            </div>
        </div>
        <div class="jck-product">
            <img :src="backgroundImages.img3">
            <b>礼盒款-大气</b>
            <p>GIFT SECTION</p>
        </div>
        <div class="product2" :style="{backgroundImage: `url(${backgroundImages.img4})`}">
            <div class="product2-bg">
                <div class="name">
                    <div class="name-bd">
                        <h2>正山小种-1號复古罐装250g</h2>
                        <p>花香显 水顺甜</p>
                    </div>
                </div>
                <div class="price-btn">
                    <div class="price-btn-pr">78</div>
                    <div class="price-btn-buy">立即购买></div>
                </div>
                <div class="product2-picture">
                    <img :src="productImg.img4">
                </div>
            </div>
        </div>
        <div class="product2" :style="{backgroundImage: `url(${backgroundImages.img4})`}">
            <div class="product2-bg">
                <div class="name">
                    <div class="name-bd">
                        <h2>正山小种-蓝色臻品250g</h2>
                        <p>周正沉稳 经典永传</p>
                    </div>
                </div>
                <div class="price-btn">
                    <div class="price-btn-pr">99</div>
                    <div class="price-btn-buy">立即购买></div>
                </div>
                <div class="product2-picture">
                    <img :src="productImg.img5" @load="imageLoad">
                </div>
            </div>
        </div>
        <div class="backtop-footer" @click="backTop">
            回到顶部
        </div>
    </div>
</template>

<script>
export default {
    name: 'XiaoZhong',
    props: ['scroll'],
    data() {
        return {
            backgroundImages: {
                img1: '../images/xiaozhong/bg.png',
                img2: '../images/xiaozhong/bg2.png',
                img3: '../images/xiaozhong/bg3.png',
                img4: '../images/xiaozhong/bg4.png'
            },
            productImg: {
                img1: '../images/xiaozhong/product1.jpeg',
                img2: '../images/xiaozhong/product2.jpeg',
                img3: '../images/xiaozhong/product3.jpeg',
                img4: '../images/xiaozhong/product4.jpg',
                img5: '../images/xiaozhong/product5.jpg',
            }
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
.xiaozhong {
    background-size: contain;
    overflow: hidden;
}
.toptxt .top-txt1 {
    color: #a30112;
    text-align: center;
    padding: .133333rem;
    font-size: .8rem;
    font-weight: bold;
    box-sizing: border-box;
    margin-top: .266667rem;
}
.toptxt .top-txt2 {
    color: #a30112;
    text-align: center;
    font-size: .386rem;
    box-sizing: border-box;
    letter-spacing: .213333rem;
    padding-left: .213333rem;
}
.top-banner {
    border-radius: 0.2rem;
    overflow: hidden;
    position: relative;
    margin: 0.3rem;
    box-shadow: -4px 0px 10px rgb(0 0 0 / 30%);
}
.top-banner img {
    width: 100%;
    vertical-align: middle;
}
.top-txt3 {
    text-align: center;
    box-sizing: border-box;
    color: #363636;
    font-size: .386rem;
    line-height: 1.8;
    font-weight: 600;
}
.top-txt3 span {
    display: block;
    font-size: .7rem;
    color: #363636;
    font-size: .8rem;
}
.nav {
    background: #a30112;
    padding: .266667rem 0;
    margin-bottom: .533333rem;
    box-sizing: border-box;
}
.nav-item {
    display: flex;
}
.nav_conten {
    flex: 1;
    text-align: center;
    line-height: .718667rem;
}
.nav_conten span {
    padding: 0.1rem 0rem;
    border-radius: 5px;
    color: #e8c689;
    display: inline-block;
    font-size: .4rem;
}
.jck-product {
    text-align: center;
    background-size: contain;
    color: #a30112;
}
.jck-product img {
    display: block;
    width: 1rem;
    margin: 0 auto;
}
.jck-product b {
    font-size: .4rem;
    display: block;
    padding: .133333rem;
}
.jck-product p {
    font-size: .35rem;
}
.product1 {
    margin: 0.2rem 0.3rem 0.6rem;
    border-radius: 0.2rem;
    padding: 0.2rem;
}
.product1 .pd {
    display: flex;
    padding: 0.2rem 0.2rem 0;
}
.product1 .txt {
    display: block;
    line-height: 2;
    font-size: .35rem;
    color: #e8c688;
    margin-top: 0.2rem;
    padding: 0.2rem;
    border-radius: 0.2rem;
    text-align: justify;
}
.product1 .pic {
    width: 4.5rem;
}
.product1 .pic img {
    width: 100%;
    vertical-align: middle;
}
.pd-price {
    text-align: center;
    padding-left: 0.2rem;
    flex: 1;
}
.pd-price span {
    text-align: center;
    display: inline-block;
    position: relative;
    font-size: .426667rem;
    color: #e7c588;
}
.pd-price h1 {
    font-size: .5rem;
    color: #fff;
    text-align: center;
    margin: .233333rem auto;
    font-weight: bold;
}
.pd-price .logan {
    text-align: center;
    margin: .133333rem auto;
}
.pd-price .logan span {
    color: #fff;
    text-align: center;
    padding-top: .133333rem;
    border-top: 1px dashed #fff;
    display: block;
}
.pd-price .price {
    color: #fff;
}
.pd-price .price b {
    position: relative;
    padding-left: .4rem;
    font-size: 1rem;
    height: 1rem;
    line-height: 1rem;
}
.pd-price .price b::after {
    content: "¥";
    position: absolute;
    left: 0;
    top: 0;
    font-size: .4rem;
}
.pd-price .price span {
    color: #fff;
}
.pbtn {
    background: #e7c588;
    border-radius: .133333rem;
    color: #a30112;
    font-size: 0.386rem;
    padding: .133333rem;
    box-sizing: border-box;
    margin: .133333rem .266667rem 0;
}
.product2 {
    text-align: center;
    margin-top: 1.2rem;
    margin-bottom: 4.5rem;
} 
.product2 .product2-bg {
    position: relative;
    display: block;
    padding-bottom: 3.5rem;
}
.product2 .product2-bg .name {
    background-color: rgb(172, 18, 22);
    margin: 0 auto;
    padding: 0.2rem;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,-50%);
}
.name-bd {
    border: 2px solid #e7c588;
    padding: 0.2rem;
    color: #e7c588;
}
.name-bd h2 {
    font-size: .4rem;
    padding-bottom: 0.2rem;
    text-align: center;
}
.name-bd p {
    text-align: center;
    font: 14px/1.4 PingFangSC-Light,helvetica,"Microsoft YaHei", arial;
}
.price-btn {
    margin-top: 1.2rem;
    display: inline-table;
}
.price-btn-pr {
    position: relative;
    display: inline-block;
    padding-left: .4rem;
    font-size: 1rem;
    height: 1rem;
    line-height: 1rem;
    color: #e7c588;
}
.price-btn-pr::after {
    content: "¥";
    position: absolute;
    left: 0;
    top: .053333rem;
    font-size: .4rem;
    height: .4rem;
    line-height: .4rem;
}
.price-btn-buy {
    display: inline-block;
    background: #e7c588;
    border-radius: .133333rem;
    color: #a30112;
    font-size: 0.386rem;
    padding: .053333rem .133333rem;
    box-sizing: border-box;
    margin: 0.2rem .266667rem 0 .533333rem;
    vertical-align: top;
}
.product2-picture {
    position: absolute;
    width: 90%;
    top: 5.5rem;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: .133333rem;
    border: 1px solid #de090e;
}
.product2-picture img {
    width: 100%;
    border: 0;
    vertical-align: middle;
}
.backtop-footer {
    background-color: rgb(172, 18, 22);
    height: 2.666667rem;
    font-size: .533333rem;
    letter-spacing: .16rem;
    color: #e7c588;
    line-height: 2.666667rem;
    text-align: center;
}
</style>