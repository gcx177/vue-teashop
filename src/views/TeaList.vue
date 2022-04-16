<template>
    <div class="tea-list">
        <Back>茶七网</Back>
        <ly-tab
          v-model="selectedId"
          :items="items"
          :options="options" @change="changeTab">
        </ly-tab>
        <section ref="wrapper2">
            <JinJunMei :scroll="scroll" v-if="contentIndex == 1"></JinJunMei>
            <DaHongPao :scroll="scroll" v-if="contentIndex == 2"></DaHongPao>
            <LongJing :scroll="scroll" v-if="contentIndex == 3"></LongJing>
            <BaiCha :scroll="scroll" v-if="contentIndex == 4"></BaiCha>
            <PuEr :scroll="scroll" v-if="contentIndex == 5"></PuEr>
            <XiaoZhong :scroll="scroll" v-if="contentIndex == 6"></XiaoZhong>
        </section>
    </div>
</template>

<script>
import Back from '@/components/common/Back.vue'
import JinJunMei from '@/components/tealist/JinJunMei.vue'
import DaHongPao from '@/components/tealist/DaHongPao.vue'
import LongJing from '@/components/tealist/LongJing.vue'
import BaiCha from '@/components/tealist/BaiCha.vue'
import PuEr from '@/components/tealist/PuEr.vue'
import XiaoZhong from '@/components/tealist/XiaoZhong.vue'
// 引入插件
import BScroll from '@better-scroll/core'
// 引入二次封装的axios
import http from '@/common/api/request.js'

export default {
    name: 'TeaList',
    data() {
        return {
            selectedId: 0,
            items: [],
            options: {
                activeColor: '#b0352f'
                // 可在这里指定labelKey为你数据里文字对应的字段
            },
            scroll: null,
            // 点击Tab切换面板
            contentIndex: null
        }
    },
    components: {
        Back,
        JinJunMei,
        DaHongPao,
        LongJing,
        BaiCha,
        PuEr,
        XiaoZhong
    },
    mounted() {
        this.getDataList()
        this.selectedId = parseInt(this.$route.params.id) - 1
        this.contentIndex = parseInt(this.$route.params.id)
        this.$nextTick(() => {
            // 可以使用$refs来直接获取元素
            this.scroll = new BScroll(this.$refs.wrapper2, {
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
        changeTab(item) {
            if(item) { // 第一次点击tab跳转时，item可能不存在，只有当它存在时才将id给contentIndex
                this.contentIndex = item.id
                this.$router.push(`/teaList/${item.id}`)
            }
        },
        async getDataList() {
            let res = await http.$axios({
                url: '/api/teaTab'
            })
            this.items = res
        }
    }
}
</script>

<style scoped>
.tea-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.ly-tab {
    height: 1.413333rem;
}
.ly-tab ::v-deep .ly-tabbar {
    box-shadow: none;
    height: 1.413333rem;
    z-index: 999;
}
.ly-tab ::v-deep span {
    font-size: .426667rem;
}
section {
    height: 100%;
    overflow: hidden;
}
</style>