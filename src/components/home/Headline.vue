<template>
    <div class="headline">
        <div class="toutiao"></div>
        <div class="scroll-up">
            <ul :class="{marquee_top:animate}">
                <li v-for="item in scrollData" :key="item.id"><router-link to="/home">{{item.title}}</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        animate: false,
        scrollData: [
            {id: 1, title: '岩茶为何不提春茶概念？'},
            {id: 2, title: '重要公告 | 客服功能已经上线'}
        ]
    };
  },
  mounted() {
    setInterval (this.showMarquee, 2000)
  },
  methods: {
    showMarquee() {
        this.animate = true;

        setTimeout (() => {
            this.scrollData.push(this.scrollData[0]);
            this.scrollData.shift();
            this.animate = false;
        }, 500);

    }
  }
}
</script>


<style scoped>
.headline {
    display: flex;
    width: 100%;
    height: 1.16rem;
    padding: 0.3rem 0.2rem;
    border-top: 1px solid #f3f3f3;
    box-sizing: border-box;
    background-color: #fff;
}
.scroll-up {
    position: relative;
    height: .533333rem;
    line-height: .533333rem;
    overflow: hidden;
    list-style: none;
    flex: 1;
}
.scroll-up li {
    height: .533333rem;
    font-size: 0.4rem;
}
.toutiao {
    width: 2.49rem;
    padding-right: .133333rem;
    margin-right: .4rem;
    height: 100%;
    background: url(http://imgcon.tea7.com/6363726507138286614601463.png) center center no-repeat;
    background-size: contain;
}
::v-deep a {
    text-decoration: none;
    color: #222;
    font-size: .4rem;
}
.marquee_top {
    transition: all 0.5s;
    margin-top: -.533333rem;
}
</style>
