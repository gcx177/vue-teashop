<template>
    <div class="head-back">
       <i class="iconfont icon-xiangzuo1" @click="$router.push('/home')"></i>
       <h2>
           <slot></slot>
       </h2>
       <i class="iconfont icon-search" @click="$router.push('/search')" v-if="$route.path == '/master'"></i>
       <i class="iconfont icon-shouye1" @click="$router.push('/home')" v-else></i>
    </div>
</template>

<script>
export default {
    name: 'Back'
}
</script>

<style scoped>
.head-back {
    display: flex;
    width: 100%;
    height: 1.173333rem;
    line-height: 1.173333rem;
    color: #fff;
    background: #b0352f;
}
.head-back h2 {
    flex: 1;
    height: 100%;
    font-size: .426667rem;
    font-weight: 400;
    display: block;
    text-align: center;
}
.head-back i {
    display: block;
    width: 1.173333rem;
    height: 1.173333rem;
    color: #fff;
    font-size: .533333rem;
    line-height: 1.173333rem;
    text-align: center;
}
</style>