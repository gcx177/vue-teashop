<template>
    <div class="youxuan">
        <header class="floortitle">
            <span>专题优选</span>
        </header>
        <div class="youxuan-swiper">
            <swiper :options="swiperOption" ref="swiperSlide">
                <swiper-slide 
                    v-for='(item,index) in swiperList' 
                    :key='index' ref="swiperSlide"
                >
                    <img :src="item.imgUrl">
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
// 引入插件和样式
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'YouXuan',
    data() {
        return {
            swiperList:[
                {
                    id:1,
                    imgUrl:'./images/youxuan1.jpeg'
                },
                {
                    id:2,
                    imgUrl:'./images/youxuan2.jpeg'
                },
                {
                    id:3,
                    imgUrl:'./images/youxuan3.jpeg'
                }
            ],
            swiperOption: {
                // 设置每次滑动的距离
                width: 236
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style scoped>
.youxuan {
    background: #fff;
    margin-top: 15px;
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
.youxuan-swiper {
    padding: 0.2rem 0;
    height: 3.2rem;
}
::v-deep .youxuan-swiper img {
    height: auto;
    overflow: hidden;
    width: 100%;
    display: block;
    border-radius: .213333rem;
}
.youxuan-swiper ::v-deep .swiper-slide {
    width: 7.004rem!important;
    margin-left: .4rem;
}
.youxuan-swiper ::v-deep .swiper-slide:nth-of-type(3) {
    margin-right: .4rem;
}
</style>