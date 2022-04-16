<template>
    <div class="my">
        <section>
          <div>
            <!-- 头部 -->
            <div class="my-header">
              <div class="header-btn">
                <div>
                    <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
                </div>
                <div>
                    <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
                </div>
              </div>
              <div class="feader-login">
                <div class="detail" v-if="loginStatus">
                  <div class="detail-img">
                    <img :src="userInfo.imgUrl" @click="goCusInfo">
                  </div>
                  <div class="detail-nick" @click="goCusInfo">
                    {{userInfo.nickname}}
                  </div>
                </div>
                <div class="login" @click="goLogin" v-else>登录 / 注册</div>
              </div>
            </div>
            <div class="my-order" v-if="loginStatus">
              <div class="order-item left" @click="goMyOrder(1)">
                <div class="icon"><i class="iconfont icon-daifukuan"></i></div>
                <div class="txt">待结算</div>
              </div>
              <div class="order-item" @click="goMyOrder(2)">
                <div class="icon"><i class="iconfont icon-yifukuan"></i></div>
                <div class="txt">已结算</div>
              </div>
            </div>
            <div class="my-item">
              <h1>个人中心</h1>
              <ul>
                <li>
                  <div class="item-list">
                    <div class="icon"><i class="iconfont icon-taojinbi" style="color: #ff7e45;"></i></div>
                    <div class="intro">
                      我的茶币
                    </div>
                  </div>
                </li>
                <li @click="$router.push('/address/index')">
                  <div class="item-list">
                    <div class="icon"><i class="iconfont icon-dizhi" style="color: #ff4b4b;"></i></div>
                    <div class="intro">
                      地址管理
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-list" @click="goCollect">
                    <div class="icon"><i class="iconfont icon-shoucang" style="color: #ffce54;"></i></div>
                    <div class="intro">
                      我的收藏
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="my-item">
              <h1>优惠福利</h1>
              <ul>
                <li>
                  <div class="item-list">
                    <div class="icon"><i class="iconfont icon-youhuijuan" style="color: #ff774f;"></i></div>
                    <div class="intro">
                      优惠卷
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import { mapState } from 'vuex'

export default {
  name: 'My',
  data() {
    return {
      
    }
  },
  components: {
    Tabber
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      loginStatus: state => state.user.loginStatus
    })
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    },
    // 去往用户详情页
    goCusInfo() {
      this.$router.push({name: 'customerInfo'})
    },
    // 我的订单
    goMyOrder(key) {
      this.$router.push({
        name: 'MyOrderList',
        query: {
          orderStatus: key
        }
      })
    },
    goCollect() {
      this.$router.push({
        name: 'MyCollect'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.my {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgb(245, 245, 245);
  section {
    flex: 1;
    overflow: hidden;
    .my-header {
      background: rgb(182, 79, 74);
      width: 100%;
      height: 4.186667rem;
      display: flex;
      flex-direction: column;
      .feader-login {
        flex: 1;
        width: 100%;
        position: relative;
        .login {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: inline-block;
          background: rgba(255, 181, 0, 0.9);
          padding: 5px 20px;
          color: #fff;
          border-radius: 5px;
          margin: 0 auto;
          font-size: 0.4rem;
        }
      }
    }
    .my-item {
      background: #fff;
      margin-bottom: .266667rem;
      h1 {
        height: 1.173333rem;
        line-height: 1.173333rem;
        padding: 0 .32rem;
        position: relative;
        color: #9e9e9e;
        font-weight: 400;
        font-size: .4rem;
        border-bottom: .026667rem solid #e3e5e9;
      }
      ul {
        list-style: none;
        li {
          border-bottom: .026667rem solid#e3e5e9;
          width: 100%;
          height: 1.173333rem;
          .item-list {
            padding: 0 0 0 .32rem;
            height: 100%;
            line-height: 1.173333rem;
            display: flex;
            color: #222;
            .icon {
              box-sizing: border-box;
              height: 100%;
              padding-right: .266667rem;
              line-height: 1.013333rem;
              i {
                font-size: .533333rem;
              }
            }
            .intro {
              position: relative;
              height: 100%;
              flex: 1;
              padding-right: .266667rem;
              font-size: .4rem;
            }
          }
        }
      }
    }
  }
}
.header-btn {
    width: 100%;
    height: 1.173333rem;
    line-height: 1.173333rem;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        height: 1.173333rem;
        width: 1.173333rem;
        i {
            display: block;
            width: 1.173333rem;
            height: 1.173333rem;
            color: #fff;
            font-size: .533333rem;
            line-height: 1.173333rem;
            text-align: center;
        }
    }
}
.intro::before {
    content: "";
    position: absolute;
    right: 0.32rem;
    top: 50%;
    width: 0.2rem;
    height: 0.2rem;
    border-left: 1px solid currentColor;
    border-top: 1px solid currentColor;
    transform: translate3d(0,-50%,0) rotateZ(135deg);
}
.detail {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  .detail-img {
    width: 100%;
    height: 2rem;
    position: relative;
    top: 0;
    left: 0;
    img {
      position: absolute;
      height: 100%;
      width: 2rem;
      left: 50%;
      margin-left: -1rem;
      border-radius: 50%;
      display: block;
      border: 2px solid #fff;
    }
  }
  .detail-nick {
    flex: 1;
    width: 100%;
    text-align: center;
    line-height: 1.013333rem;
    height: 100%;
    font-size: .533333rem;
    color: #fff;
  }
}

.my-order {
  background: #fff;
  margin-top: .266667rem;
  margin-bottom: .266667rem;
  width: 100%;
  height: 1.6rem;
  border-bottom: .026667rem solid #e3e5e9;
  display: flex;
  .order-item {
    height: 100%;
    width: 50%;
    padding: .266667rem 0;
    box-sizing: border-box;
    position: relative;
    display: flex;
    .icon {
      width: 1.066667rem;
      height: 1.066667rem;
      text-align: center;
      line-height: 1.066667rem;
      margin-left: .533333rem;
      i {
        font-size: .8rem;
      }
      .icon-daifukuan {
        color: #ff7e45;
      }
      .icon-yifukuan {
        color: rgba(255, 181, 0, 0.9);
      }
    }
    .txt {
      font-size: .533333rem;
      margin-left: .533333rem;
      flex: 1;
      text-align: left;
      line-height: 1.066667rem;
      color: #222;
      font-weight: 300;
    }
  }
  .left {
    border-right: .026667rem solid #e3e5e9;
  }
}
</style>