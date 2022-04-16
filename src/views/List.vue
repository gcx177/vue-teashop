<template>
    <div class="list">
        <Header></Header>
        <section>
          <div class="list-left">
            <ul class="left-item">
              <li v-for="(item, i) in listArr" :key="i" @click="goScroll(i)" :class="{active: i == currentIndex}">{{item.name}}</li>
            </ul>
          </div>
          <div class="list-right" ref="right">
            <div class="right-div">
              <div class="right-img"><img :src="topImage"></div>
              <div class="right-nav" v-for="(item, i) in listArr" :key="i" ref="rightNav">
                  <div class="nav-item">
                    <div class="nav-hd">
                      <span class="nav-txt">{{item.name}}</span>
                    </div>
                    <ul>
                      <li class="nav-product" v-for="(itemPro, i) in item.children" :key="i" @click="$router.push({name: 'GoodsList'})">
                        <img :src="itemPro.imgUrl" @load="imageLoad">
                        <span>{{itemPro.name}}</span>
                      </li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import Header from '@/components/list/Header.vue'
// 引入插件
import BScroll from '@better-scroll/core'
import http from '@/common/api/request.js'

export default {
  name: 'List',
  components: {
    Tabber,
    Header
  },
  data() {
    return {
      topImage: '../images/fenlei/topbg.jpg',
      image: '../images/fenlei/tuijian/product1.jpeg',
      scroll: null,
      listArr: [], // 分类数据
      allHeight: [], // 承载右侧每个元素的高度
      scrollY: 0 // 右侧滚动的距离
    }
  },
  async mounted() {
    await this.getData()
    
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.right, {
        pullUpLoad: true,
        scrollbar: true,
        pullDownRefresh: true,
        disableTouch: false,
        zoom: true,
        // 允许click事件触发
        click: true,
        // 触发滚动事件
        probeType: 3,
        bounce: false
      })

      // 由于数据渲染的图片和$refs获取的不一致性，这这里模拟一个异步的操作
      // 目前没有想到更好的方法，这样才能正确地获取每个元素的高度
      setTimeout(() =>{
        this.getItemHeight()
      }, 300)
    })

    this.$bus.$on('imageLoading', () => {
      this.scroll.refresh()
    })
  },
  methods: {
    async getData() {
      let res = await http.$axios({
        url: '/api/goods/lists'
      })
      this.listArr = res
    },
    imageLoad() {
      // 由于我们获取图片的时候并没有设置高度，因此需要在监听图片的load事件
      this.$bus.$emit('imageLoading')
    },
    goScroll(index) {
      // 点击进行上下滑动(左右联动)
      this.scroll.scrollTo(0, -this.allHeight[index])
    },
    // 获取右侧列表每一项的高度
    getItemHeight() {
        let arr = this.$refs.rightNav;
        let height = 0
        this.allHeight.push(height);
        height += 136

        if(arr) {
          for(let i = 0; i<arr.length-1; i++) {
            height = arr[i].clientHeight + height + 20
            this.allHeight.push(height)
          }
        }
        
        // 监听滚轮的滚动事件
        this.scroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(pos.y)
        })
    }
  },
  computed: {
    currentIndex() {
      return this.allHeight.findIndex((item, i) => {
        return this.scrollY >= item && this.scrollY < (this.allHeight[i+1] ? this.allHeight[i+1] : this.allHeight[i]+500)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  section {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
}
.list-left {
  width: 2.48rem;
  background-color: #fff;
  overflow: hidden;
  border-right: .026667rem solid #efefef;
  .left-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        margin: 0.2rem 0;
        text-align: center;
        font-size: .4rem;
    }
    li:nth-child(1) {
      margin-top: 0.4rem;
    }
  }
}
.active {
  color: #b54f4a;
  border-left: .16rem solid #b54f4a;
}

.list-right {
  padding: 0 .266667rem;
  flex: 1;
  overflow: hidden;
  .right-img {
    margin: .266667rem 0;
    img {
      width: 100%;
      vertical-align: middle;
      border: 0;
    }
  }
  .right-nav {
    .nav-item {
      color: #333;
      margin-bottom: .266667rem;
      .nav-hd {
        text-align: center;
        margin: .533333rem auto .266667rem;
        font-size: .48rem;
        .nav-txt {
          position: relative;
          text-align: center;
          font-size: .48rem;
        }
      }
      ul {
        list-style: none;
        overflow: hidden;
        li {
          width: 33.3%;
          float: left;
          text-align: center;
          padding: .266667rem;
          box-sizing: border-box;
          img {
            width: 80%;
            display: block;
            margin: 0 auto;
            border-radius: 50%;
          }
          span {
            display: block;
            font-size: .373333rem;
          }
        }
      }
    }
  }
}
.nav-txt::after, .nav-txt::before {
  position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    margin: auto;
    height: .026667rem;
    width: 0.53333rem;
    background-color: #d9d9d9;
}
.nav-txt::after {
  right: -0.74667rem;
}
.nav-txt::before {
  left: -0.74667rem;
}
.right-div {
  overflow: hidden;
}
.right-nav:last-child {
  height: 14.933333rem;
}
</style>