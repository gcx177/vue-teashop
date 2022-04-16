<template>
    <div class="address">
        <section ref="wrapper">
            <div>
                <div class="head-back">
                    <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
                    <h2>
                        我的地址
                    </h2>
                    <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
                </div>
                <div class="address-content">
                    <ul v-if="list.length">
                        <li v-for="item in list" :key="item.id" @click="editAddress(item)">
                            <div class="address-info">
                                <p><em class="name">{{item.name}}</em><em class="phone">{{item.tel}}</em></p>
                                <p>
                                    <span class="default" v-if="item.isDefault == 1">[默认]&nbsp;</span>
                                    <span class="place">{{item.province + ' ' + item.city + ' ' + item.county}}</span>&nbsp;
                                    <span class="detail">{{item.addressDetail}}</span>
                                </p>
                                <div class="tubiao">
                                    <i class="iconfont icon-xiangyou1"></i>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="no-address" v-else>
                        <div class="no-address-icon"><i class="iconfont icon-dizhi"></i></div>
                        <p>快递小哥找不到您，留个地址呗</p>
                    </div>
                    <div class="add-address" @click="addAddress('add')">添加地址</div>
                </div>
            </div>
        </section>
        <Tabber></Tabber>
    </div>
</template>


<script>
import Tabber from '@/components/common/Tabber.vue'
// 引入插件
import BScroll from '@better-scroll/core'
import http from '@/common/api/request.js'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'AddressIndex',
    components: {
        Tabber
    },
    data() {
        return {
            isShow: false,
            scroll: null,
            pathStatus: false
        }
    },
    mounted() {

        // 从订单页面进来的
        if(this.$route.query.type == 'select') {
            this.pathStatus = true
        }

        this.getData()

        this.$nextTick(() => {
            // 可以使用$refs来直接获取元素
            if(this.$refs.wrapper) {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    pullUpLoad: true,
                    scrollbar: true,
                    pullDownRefresh: true,
                    zoom: true,
                    // 运行在better-scroll中触发点击事件
                    click: true,
                    bounce: false
                })
            }
        })
    },
    computed: {
        ...mapState({
            list: state => state.address.list
        })
    },
    methods: {
        ...mapMutations(['initData']),
        addAddress(option) {
            this.$router.push({
                name: 'AddressEdit',
                query: {
                    key: option
                }
            })
        },
        getData() {
            http.$axios({
                url: '/api/selectAddress',
                headers: {
                    token: true
                }
            }).then(res => {
                if(res.success) {
                    this.initData(res.data)
                }
            })
        },
        editAddress(option) {

            if(this.pathStatus) {
                // 表示从订单页面进入的(表示选择状态)
                // 把选中的地址存进本地存储
                if(localStorage.getItem('selectAddress') !== null) {
                    localStorage.removeItem('selectAddress')
                    localStorage.setItem('selectAddress', JSON.stringify(option))
                } else {
                    localStorage.setItem('selectAddress', JSON.stringify(option))
                }

                this.$router.back()

            } else {
                this.$router.push({
                    name: 'AddressEdit',
                    query: {
                        key: JSON.stringify(option)
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
.address {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    section {
        flex: 1;
        overflow: hidden;
        width: 100%;
    }
}
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
.address-content {
    width: 100%;
    .no-address {
        width: 100%;
        color: #9e9e9e;
        overflow: hidden;
        .no-address-icon {
            width: 4rem;
            height: 4rem;
            margin: .266667rem auto;
            text-align: center;
            line-height: 4rem;
            i {
                font-size: 2.666667rem;
            }
        }
        p {
            font-size: .533333rem;
            text-align: center;
        }
    }
    .add-address {
        background: #b0352f;
        color: #fff;
        width: 100px;
        text-align: center;
        margin: 1.066667rem auto .533333rem;
        padding: .266667rem .32rem;
        font-size: .426667rem;
        border-radius: .133333rem;
    }
    ul {
        list-style: none;
        overflow: hidden;
        li {
            margin-top: .266667rem;
            width: 100%;
            .address-info {
                width: 100%;
                box-sizing: border-box;
                background: #fff;
                position: relative;
                padding: .266667rem 1.546667rem .266667rem .32rem;
                p {
                    padding: .133333rem;
                    font-size: .4rem;
                    color: #222;
                    em {
                        color: #333;
                        font-weight: 700;
                        font-style: normal;
                    }
                    .phone {
                        margin-left: .4rem;
                    }
                }
                .tubiao {
                    position: absolute;
                    height: 100%;
                    text-align: center;
                    width: 1.333333rem;
                    line-height: 2.133333rem;
                    right: 0;
                    top: 0;
                    i {
                        font-size: .666667rem;
                        color: #9e9e9e;
                    }
                }
            }
        }
    }
}
.default {
    color: #b0352f;
}
</style>