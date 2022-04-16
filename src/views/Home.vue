<template>
  <div class="home">
    <div class="headers">
      <div class="headers-main">
        <Header></Header>
        <ly-tab
          v-model="selectedId"
          :items="items"
          :options="options" @change="changeTab">
        </ly-tab>
      </div>
    </div>
    <section class="sec_content" ref="wrapper">
      <div>
        <Swiper></Swiper>
        <Icons></Icons>
        <Headline></Headline>
        <Sevenrecommend></Sevenrecommend>
        <SpecialOffer></SpecialOffer>
        <YouXuan></YouXuan>
        <Baokuan></Baokuan>
        <div class="chaju">
          <img :src="cjSrc">
          <div class="chaju-home">
            <ul>
              <li class="chaju-produce">
                <img :src="cjSrcProduce">
                <div class="name">建阳红色芝麻毫建盏茶具</div>
                <div class="price">
                  <span>￥</span>
                  <b>399</b>
                </div>
              </li>
              <li>
                <div class="chaju-more">
                  <div class="see-more">
                    <div>MORE</div>
                    <div>查看更多</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <TeaCulture></TeaCulture>
        <Favorite></Favorite>
        <Footer></Footer>
      </div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import Header from '@/components/home/Header.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import Headline from '@/components/home/Headline.vue'
import Sevenrecommend from '@/components/home/Sevenrecommend.vue'
import SpecialOffer from '@/components/home/SpecialOffer.vue'
import YouXuan from '@/components/home/YouXuan.vue'
import Baokuan from '@/components/home/Baokuan.vue'
import TeaCulture from '@/components/home/TeaCulture.vue'
import Favorite from '@/components/home/Favorite.vue'
import Footer from '@/components/home/Footer.vue'
// 引入插件
import BScroll from '@better-scroll/core'
import http from '@/common/api/request.js'

export default {
  name: "Home",
  components: {
    Tabber,
    Header,
    Swiper,
    Icons,
    Headline,
    Sevenrecommend,
    SpecialOffer,
    YouXuan,
    Baokuan,
    TeaCulture,
    Favorite,
    Footer
  },
  data() {
    return {
      selectedId: 0,
      items: [],
      options: {
        activeColor: '#b0352f'
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
      cjSrc: './images/chaju.jpg',
      cjSrcProduce: './images/chajuproduct.jpeg',
      scroll: null
    }
  },
  mounted() {
    this.getData()

    this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {
            pullUpLoad: true,
            scrollbar: true,
            pullDownRefresh: true,
            zoom: true,
            // 允许click事件触发
            click: true,
            bounce: false
        })
    })
    this.$bus.$on('imageLoading', () => {
      this.scroll.refresh()
    })
  },
  methods: {
    changeTab(item, index) {
      if(index >= 1 && index <= 6) {
        this.$router.push(`/teaList/${index}`)
      }
    },
    async getData() {
      let res = await http.$axios({
        url: '/api/tab'
      })
      this.items = res
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.headers {
  width: 100%;
  height: 2.346667rem;
}
::v-deep .ly-tab {
  height: 1.173333rem!important;
  top: 1.173333rem;
  border-bottom: 0;
  box-shadow: none;
  background-color: #fff;
}
::v-deep .ly-tab-list {
  padding: .32rem .266667rem;
}
.ly-tab /deep/ .ly-tabbar {
  border-bottom: 0;
  box-shadow: none;
}
.ly-tab /deep/ .ly-tab-item {
  font-size: .4rem;
}
.sec_content {
  background-color: #f5f5f5;
  flex: 1;
  overflow: hidden;
}
.headers-main {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
.chaju {
  margin-top: .4rem;
}
.chaju img {
  display: block;
  width: 100%;
}
.chaju .chaju-home {
  background: #fff;
  padding: 0.4rem 0.4rem 0.4rem 0;
}
.chaju .chaju-home ul {
  display: flex;
}
.chaju .chaju-home ul li {
  float: left;
  width: 3.5rem;
  margin-left: 0.4rem;
  text-align: center;
}
.chaju-produce img {
    display: block;
    width: 100%;
}
.chaju-produce .name {
  padding: .213333rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.4rem;
  color: #333;
}
.chaju-produce .price {
  color: #b0352f;
  height: 0.5rem;
  line-height: 0.5rem;
}
.chaju-produce .price span {
  font-size: 0.32rem;
}
.chaju-produce .price b {
  font-size: 0.5rem;
}
.chaju-more {
  position: relative;
  background: #f3f3f3;
}
.see-more {
  background: #f3f3f3;
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.see-more div {
  text-align: center;
  font-size: 0.32rem;
}
.see-more div:first-child {
  width: 50%;
  border-bottom: 1px solid #ccc;
  color: #999;
  padding-bottom: 0.1rem;
  margin-bottom: 0.1rem;
}
.see-more::after {
  content: "";
  position: absolute;
  margin: .133333rem;
  border: 1px solid #e4e4e4;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
