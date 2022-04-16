<template>
    <div class="cus-info">
        <div class="head-back">
            <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
            <h2>
                用户资料
            </h2>
            <span @click="save">保存</span>
        </div>
        <section>
            <div class="info-img">
                <el-upload 
                class="info-detail"
                action="/api/uploadImg"
                :show-file-list="false"
                name="imgUrl"
                :on-success="handleAvatarSuccess">
                    <img :src="imageUrl">
                    <div class="title">点击修改头像</div>
                </el-upload>
            </div>
            <div class="item">
                <ul>
                    <li>
                        <span>账号</span>
                        <div>{{userInfo.tel}}</div>
                    </li>
                    <li>
                        <span>昵称</span>
                        <input type="text" v-model="userNickname">
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul>
                    <li @click="$router.push('/address')">
                        <span class="jt">收货地址</span>
                    </li>
                </ul>
            </div>
            <div class="exit" @click="loginEmit">退出登录</div>
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import { mapState, mapMutations } from 'vuex'
import { MessageBox } from 'mint-ui';
import http from '@/common/api/request.js'
import { Toast } from 'vant';

export default {
    name: 'Info',
    data() {
        return {
            userNickname: '',
            imageUrl: ''
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
        })
    },
    components: {
        Tabber
    },
    mounted() {
        this.userNickname = this.userInfo.nickname
        this.imageUrl = this.userInfo.imgUrl
    },
    methods: {
        ...mapMutations(['loginOut']),
        // 保存用户登录信息
        save() {

            // 解决mysql存储问题
            this.imageUrl = this.imageUrl.replace(/\\/g, '/');

            http.$axios({
                url: '/api/updateMessage',
                method: 'POST',
                data: {
                    phone: this.userInfo.tel,
                    nickname: this.userNickname,
                    imgUrl: this.imageUrl
                }
            }).then(res => {
                Toast(res.message)
                let user = JSON.parse(localStorage.getItem('teaUserInfo'));
                user.nickname = this.userNickname
                user.imgUrl = this.imageUrl
                console.log(user);
                localStorage.setItem('teaUserInfo', JSON.stringify(user));

                this.$router.push('/my')
                setTimeout(() => {
                    this.$router.go(0)
                }, 0)

            })
        },
        // 退出登录
        loginEmit() {
            MessageBox.confirm('是否确定退出登录?').then(action => {
                if(action == 'confirm') {
                    this.loginOut();
                    // 清除购物车的本地存储
                    localStorage.removeItem('orderList')
                    localStorage.removeItem('tea_orderid')
                    localStorage.removeItem('selectAddress')
                    this.$router.push('/my')
                }
            }).catch(err => {})
        },
        // 上传成功后的回调函数
        handleAvatarSuccess(res, file) {
            this.imageUrl = res.data.data
        }
    }
}
</script>

<style scoped lang="scss">
.cus-info {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgb(245, 245, 245);
    section {
        flex: 1;
        overflow: hidden;
        .info-img {
            width: 100%;
            height: 4.08rem;
            background: #fff;
            overflow: hidden;
            position: relative;
            .info-detail {
                width: 4rem;
                height: 100%;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                img {
                    display: block;
                    width: 2.666667rem;
                    height: 2.666667rem;
                    margin: 9px auto;
                    border-radius: 50%;
                }
                .title {
                    width: 100%;
                    height: .933333rem;
                    line-height: .933333rem;
                    color: #999;
                    font-size: .48rem;
                    text-align: center;
                }
            }
        }
        .item {
            background: #fff;
            margin-top: .266667rem;
            ul {
                list-style: none;
                list-style-type: none;
                li {
                    width: 100%;
                    box-sizing: border-box;
                    padding-left: 0.41667rem;
                    font-size: .38889rem;
                    color: #333;
                    display: flex;
                    border-bottom: .026667rem solid #e3e5e9;
                    position: relative;
                    span {
                        display: block;
                        height: 1.52rem;
                        width: 1.92rem;
                        text-align: left;
                        line-height: 1.52rem;
                    }
                    div {
                        flex: 1;
                        height: 1.52rem;
                        line-height: 1.52rem;
                        color: #7f7f7f;
                    }
                    input {
                        outline: none;
                        border: none;
                        color: #7f7f7f;
                    }
                }
            }
        }
        .exit {
            margin: .666667rem auto;
            width: 9.6rem;
            height: 1.2rem;
            text-align: center;
            background: #fff;
            line-height: 1.2rem;
            font-size: 0.386rem;
            border-radius: .133333rem;
        }
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
.head-back span {
    display: block;
    width: 1.173333rem;
    height: 1.173333rem;
    color: #fff;
    font-size: .48rem;
    line-height: 1.173333rem;
    text-align: center;
}
.jt::after {
    content: "";
    position: absolute;
    right: 0.32rem;
    top: 50%;
    width: 0.2rem;
    height: 0.2rem;
    border-left: .026667rem solid currentColor;
    border-top: .026667rem solid currentColor;
    transform: translate3d(0,-50%,0) rotateZ(135deg);
}
.info-detail ::v-deep .el-upload {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
}
</style>