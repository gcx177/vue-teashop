<template>
    <header>
        <div class="logo-icon">
            <i class="iconfont icon-xiangzuo1" @click="$router.push('/home')"></i>
        </div>
        <div class="search">
            <div>
                <i class="iconfont icon-search"></i>
            </div>
            <input type="text" placeholder="搜您喜欢的..." @click="toSearch">
        </div>
        <div class="kefu">
            <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HomeHeader',
    methods: {
        toSearch() {
            this.$router.push('/search')
        }
    }
}
</script>

<style scoped>
header {
    width: 100%;
    height: 1.173333rem;
    background-color: #b0352f;
    display: flex;
}
header .logo-icon {
    width: 1.173333rem;
    height: 100%;
    text-align: center;
}
header .logo-icon i {
    font-size: .533333rem;
    line-height: 1.173333rem;
    font-weight: 400;
    color: #fff;
}
header .kefu {
    height: 100%;
    width: 1.173333rem;
}
header .search {
    flex: 1;
    display: flex;
    height: .8rem;
    border-radius: .426667rem;
    background-color: #fff;
    margin-top: .186667rem;
}
.kefu {
    text-align: center;
    line-height: 1.173333rem;
}
.kefu i {
    font-size: .64rem;
    font-weight: 400;
    color: #fff;
}
.search div {
    height: 100%;
    width: .8rem;
    text-align: center;
    line-height: .7rem;
}
.search div i {
    font-size: .533333rem;
    color: #ccc;
}
.search input {
    flex: 1;
    width: 100%;
    height: 100%;
    border-top-right-radius: .426667rem;
    border-bottom-right-radius: .426667rem;
    border: none;
    font-size: .346667rem;
    outline: none;
}
.search input::-webkit-input-placeholder {
    font-size: .346667rem;
}
</style>