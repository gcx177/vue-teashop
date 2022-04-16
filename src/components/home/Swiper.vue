<template>
    <div class="swiper-main">
        <!-- 滑动组件 -->
        <swiper v-if="swiperList.length > 0" :options="swiperOption">
		  <swiper-slide 
			v-for='(item,index) in swiperList' 
			:key='index'
			@click.native="$router.push('/goodslist')"
		   >
			<img :src="item.imgUrl">
		  </swiper-slide>
		</swiper>
        <!-- 小圆点滚动 -->
        <div class="swiper-pagination"></div> 
    </div>
</template>

<script>
// 引入插件和样式
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Swiper',
  data(){
    return{
		swiperList:[
			{
				id:1,
				imgUrl:'./images/swiper1.jpeg'
			},
			{
				id:2,
				imgUrl:'./images/swiper2.jpeg'
			},
			{
				id:3,
				imgUrl:'./images/swiper3.jpeg'
			},
            {
				id:4,
				imgUrl:'./images/swiper4.jpeg'
			},
            {
				id:5,
				imgUrl:'./images/swiper5.jpeg'
			}
		],
		swiperOption: {
            // 循环轮播
            loop: true,
            // 自动播放,并且保证滑动、点击轮播图后仍能自动播放
			autoplay: {
                delay: 2500,
                stopOnLastSlide: false,
                disableOnInteraction: false
            },
			speed: 500,
			pagination: {
				el: '.swiper-pagination' // 添加小圆点
			}
            
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
.swiper-main {
    width: 100%;
    height: 4.9304rem;
}
.swiper-main img {
    width: 100%;
    height: 4.9304rem;
}
.swiper-pagination {
    width: 100%;
}
.swiper-container {
    height: 100%;
    margin-bottom: -32px;
}

::v-deep .swiper-pagination span{
	margin:0 .106667rem;
    background-color: #fff;
}
::v-deep .swiper-pagination .swiper-pagination-bullet-active{
	background-color: #b0352f;
}
::v-deep .swiper-pagination-bullet {
	opacity: 1;
	width: .213333rem;
	height: .213333rem;
}
</style>