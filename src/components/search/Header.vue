<template>
    <header>
        <div class="logo-icon" @click="$router.back()">
            <i class="iconfont icon-xiangzuo1"></i>
        </div>
        <div class="search">
            <div class="search-i">
                <i class="iconfont icon-search"></i>
            </div>
            <input type="text" placeholder="搜您喜欢的..." v-model="inputValue" @keyup.enter="toSearchList">
        </div>
        <div class="soushuo" @click="toSearchList">
            搜索
        </div>
    </header>
</template>

<script>
export default {
    name: 'SearchHeader',
    data() {
        return {
            inputValue: this.$route.query.key || '',
            searchArr: []
        }
    },
    methods: {
        toSearchList() {
            // 如果搜索的关键字为空，直接return
            if(this.inputValue.trim().length == 0) {
                return
            }
            // 判断之前有没有搜索的本地存储
            if(localStorage.getItem('searchList')) {
                this.searchArr = JSON.parse(localStorage.getItem('searchList'))
            } else {
                localStorage.setItem('searchList', '[]')
            }
            

            // 增加数据
            this.searchArr.unshift(this.inputValue)

            // 把数据传入本地存储
            localStorage.setItem('searchList', JSON.stringify([...new Set(this.searchArr)]))
            
            // 如果查询的结果与query参数一致，直接return
            if(this.inputValue == this.$route.query.key) return

            // 跳转页面
            this.$router.push({name: 'ProductList', query: {key: this.inputValue}})
        }
    },
    watch: {
        // 监听路由的变化
        $route() {
            this.inputValue = this.$route.query.key
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
    height: 1.173333rem;
    color: #fff;
    font-size: .48rem;
    text-align: center;
}
header .logo-icon i {
    font-size: .533333rem;
    line-height: 1.173333rem;
    font-weight: 400;
    color: #fff;
}
header .soushuo {
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
.soushuo {
    width: 1.173333rem;
    height: 1.173333rem;
    color: #fff;
    text-align: center;
    line-height: 1.173333rem;
    font-size: .426667rem;
}
.search .search-i {
    height: 100%;
    width: .8rem;
    text-align: center;
    line-height: .7rem;
}
.search .search-i i {
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
.search form {
    flex: 1;
    width: 100%;
    height: 100%;
    border-top-right-radius: .426667rem;
    border-bottom-right-radius: .426667rem;
    font-size: .346667rem;
}
</style>