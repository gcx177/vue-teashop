<template>
    <div class="master">
        <Back>茶师亲制</Back>
        <section ref="wrapper">
          <div>
            <div class="master-pic">
                <div class="title">
                  <em></em>
                  <em></em>
                  <span>本期 · 热门茶师</span>
                  <em></em>
                  <em></em>
                </div>
                <div class="picture">
                  <img :src="pictures.dashiPicture">
                </div>
            </div>
            <!-- 茶师简介 -->
            <div>
              <div class="title">
                <em></em>
                <em></em>
                <span>大师介绍 · 茶缘伴生</span>
                <em></em>
                <em></em>
              </div>
              <div class="dashi-info">
                <div class="bg">
                  <div class="header-pic">
                    <img :src="pictures.touxiangImg">
                  </div>
                  <img :src="pictures.background" @load="imageLoad">
                </div>
                <div class="name">雷姣玲</div>
                <div class="label">
                  <i>匠人</i>
                  <span class="span1">普洱,云南滇红</span>
                  <span class="span2">普洱,云南滇红</span>
                </div>
                <div class="subtitle">愿这一杯茶能暖你的心。</div>
              </div>
              <!-- 人物介绍 -->
              <div class="dashi-introduce">
                <div class="introduce">
                  <div class="fixck">
                    <p><span>雷姣玲，云南农业大学茶学系硕士。</span></p>
                    <p><span>众多出身于制茶世家的茶师不同，雷姣玲在上大学前，和茶几乎没有什么交集。</span></p>
                    <p><span>也许是上天注定的缘分，2011年从云南农业大学茶学系硕士毕业后，</span></p>
                    <p><span>这位来自湖南的辣妹子便决意扎根云南，潜心学制茶。</span></p>
                    <p><img :src="pictures.background2" @load="imageLoad"></p>
                    <p><span>云南是茶树的发源地。</span></p>
                    <p><span>茶谚云：“高山云雾出好茶”，云南地处高原，但纬度较低，气候温暖湿润。</span></p>
                    <p><span>加上云南富含有机质的肥沃土壤，特别适宜茶树生长，因而云南茶素有内外品质俱佳的美誉。</span></p>
                    <p><img :src="pictures.background3" @load="imageLoad"></p>
                    <p><span>雷姣玲所制作的云南滇红，精选来自海拔1800米的高山大叶种鲜叶，全手工精制。</span></p>
                    <p><span>每一批茶都要经过严格审评与定级，方能制成一杯心目中最好的茶。</span></p>
                    <p><img :src="pictures.background4" @load="imageLoad"></p>
                    <p><img :src="pictures.background5" @load="imageLoad"></p>
                    <p><span>凭着5年来一千多个日日夜夜的磨练，</span></p>
                    <p><span>雷姣玲已经从一位门外汉变成真正的茶人，原料、工艺、评审样样皆有造诣。</span></p>
                    <p><span>她用她的专业知识为历史悠久的云南茶注入现代竞争力。</span></p>
                    <p><img :src="pictures.background6" @load="imageLoad"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="title">
                <em></em>
                <em></em>
                <span>为您推荐</span>
                <em></em>
                <em></em>
              </div>
          </div>
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import Back from '@/components/common/Back.vue'
// 引入插件
import BScroll from '@better-scroll/core'

export default {
  name: 'Master',
  components: {
    Tabber,
    Back
  },
  data() {
    return {
      scroll: null,
      pictures: {
        dashiPicture: '../images/dashi/dashi.jpeg',
        touxiangImg: '../images/dashi/dashitouxiang.jpeg',
        background: '../images/dashi/dashi2.jpg',
        background2: '../images/dashi/dashi3.jpg',
        background3: '../images/dashi/dashi4.jpg',
        background4: '../images/dashi/dashi5.jpg',
        background5: '../images/dashi/dashi6.jpg',
        background6: '../images/dashi/dashi7.jpg'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
        // 可以使用$refs来直接获取元素
        this.scroll = new BScroll(this.$refs.wrapper, {
            pullUpLoad: true,
            scrollbar: true,
            pullDownRefresh: true,
            zoom: true,
            // 运行在better-scroll中触发点击事件
            click: true,
            bounce: false
        })
    })
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
.master {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
section {
  flex: 1;
  overflow: hidden;
}
.master-pic {
  background-color: #fff;
}
.title {
    text-align: center;
    padding: 0.5rem 0;
}
.title em {
  display: inline-block;
  border-radius: 10px;
  width: 0.18rem;
  height: 0.45rem;
}
.title span {
  color: #b0352f;
  height: .8rem;
  line-height: .8rem;
  font-size: 0.4rem;
  padding: .133333rem .4rem;
}
.title em:nth-child(1) {
  background: #f4d2d1;
  transform: translate3d(0,0.08rem,0) rotateZ(135deg);
  margin-right: .4rem;
}
.title em:nth-child(2) {
  background: #cc1717;
  transform: translate3d(0, 0.08rem, 0) rotateZ(135deg);
  margin-right: .4rem;
}
.title em:nth-child(4) {
  background: #cc1717;
  transform: translate3d(0, 0.08rem, 0) rotateZ(45deg);
}
.title em:nth-child(5) {
  background: #f4d2d1;
  transform: translate3d(0, 0.08rem, 0) rotateZ(45deg);
  margin-left: .4rem;
}
.master img {
  width: 100%;
  vertical-align: middle;
}
.dashi-info {
  position: relative;
  background: #fff;
  padding-bottom: .266667rem;
  margin-bottom: .4rem;
  border-bottom: 1px solid #e3e3e3;
}
.dashi-info .bg {
  position: relative;
}
.header-pic {
  position: absolute;
    width: 3rem;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 5px 10px rgb(0 0 0 / 20%);
}
.dashi-info .name {
    text-align: center;
    margin-top: 1.8rem;
    font-size: 0.5rem;
}
.label {
  text-align: center;
}
.label i, 
.label span {
    font-size: .373333rem;
    height: .373333rem;
    line-height: .373333rem;
    border-radius: .533333rem;
    padding: .08rem .266667rem;
    margin: .133333rem;
}
.label i {
  background: #abae77;
  border: 1px solid #abae77;
  color: #fff;
  font-style: normal;
}
.dashi-info .label .span1 {
    color: #96776a;
    border: 1px solid #96776a;
}
.dashi-info .label .span2 {
    color: #98b14f;
    border: 1px solid #98b14f;
}
.subtitle {
    text-align: center;
    color: #d7be67;
    margin-top: .133333rem;
    padding: 0 .266667rem;
    font-size: 0.386rem;
    overflow: hidden;
    text-overflow: ellipsis;
}
.dashi-introduce introduce {
    padding: .266667rem;
    background: #fff;
}
.fixck {
    padding: 0 .266667rem;
    font-family: 'microsoft yahei',Arial, Verdana, sans-serif !important;
    font-size: .426667rem !important;
    color: #222 !important;
    line-height: 2em !important;
}
</style>