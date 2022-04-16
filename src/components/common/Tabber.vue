<template>
    <div class="tabber">
        <ul>
            <li 
            v-for="(item, index) in routerList" 
            :key="index" @click="switchTab(item.path)" 
            :class="$route.path.includes(item.path) ? 'active' : ''">
                <i :class="item.activeClass"></i>
                <span :class="$route.path.includes(item.path) ? 'active' : ''">{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            routerList: [
                {
                    title: '首页',
                    path: '/home',
                    activeClass: ['iconfont', 'icon-shouye'] 
                },
                {
                    title: '分类',
                    path: '/list',
                    activeClass: ['iconfont', 'icon-fenlei'] 
                },
                {
                    title: '大师茶',
                    path: '/master',
                    activeClass: ['iconfont', 'icon-dashi'] 
                },
                {
                    title: '购物车',
                    path: '/cart',
                    activeClass: ['iconfont', 'icon-gouwuche'] 
                },
                {
                    title: '我的',
                    path: '/my',
                    activeClass: ['iconfont', 'icon-wode'] 
                }
            ]
        }
    },
    methods: {
        switchTab(path) {
            // 判断是否点击的是同一个路由
            if(this.$route.path == path) return
            this.$router.replace(path)
        }
    }
}
</script>

<style scoped>
.tabber {
    width: 100%;
    background-color: #fff;
    height: 1.44rem;
}
.tabber ul {
    display: flex;
    height: 100%;
    justify-content: space-around;
}
.tabber ul li {
    display: flex;
    width: 100%;
    flex-direction: column;
}
.tabber ul li i {
    font-size: .613333rem;
    height: .666667rem;
    padding-top: .16rem;
    width: 100%;
    text-align: center;
    line-height: .666667rem;
}
span {
    font-size: .32rem;
    height: .613333rem;
    line-height: .613333rem;
    text-align: center;
    color: #666666;
}
.active {
    color: #b54f4a;
}
</style>