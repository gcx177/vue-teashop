<template>
    <div class="login-message">
        <BackTo>登录</BackTo>
        <section>
            <div class="message">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="username"
                        name="username"
                        label="手机号"
                        placeholder="请输入手机号"
                        :rules="[{ validator, message: '请填写正确的手机号' }]"
                    />
                    <van-field
                        v-model="password"
                        name="authcode"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        :rules="[{ validator: validator2, message: '请填写正确的密码(密码包括阿拉伯数字、英文字母,并且不少于6位数,不多于12位)' }]"
                        class="authcode-item"
                    />
                    <div class="load-btn">
                        <van-button round block type="info" native-type="submit">登录</van-button>
                    </div>
                </van-form>
                <div class="login-others">
                    <div class="left" @click="$router.push('/login')">
                        <div><i class="iconfont icon-mima"></i>短信登录</div>
                    </div>
                    <div class="center" @click="$router.push('/recovery')">
                        <div><i class="iconfont icon-mima"></i>找回密码</div>
                    </div>
                    <div class="right" @click="$router.push('/register')">
                        <div><i class="iconfont icon-shouji"></i>快速注册</div>
                    </div>
                </div>
                <div class="login-alter">
                    <h2>温馨提示</h2>
                   如果您之前使用的是短信验证码登录，并未设置登录密码，可以在“找回密码”中设置登录密码
                </div>
            </div>
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import BackTo from '@/views/login/BackTo.vue'
import { Toast } from 'vant';
import http from '@/common/api/request.js'
import { mapMutations } from 'vuex'

export default {
    name: 'Login',
    components: {
        Tabber,
        BackTo
    },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        ...mapMutations(['login']),
        onSubmit(values) {
            http.$axios({
                url: '/api/login',
                method: 'POST',
                data: {
                    username: this.username,
                    password: this.password
                }
            }).then(res => {
                // 登录失败
                if(!res.success) {
                    Toast(res.message);
                    return
                }

                // 登录成功 => 跳转页面，存储用户信息
                this.login(res.data)
                this.$router.push('/my')
            })
        },
        validator(val) {
            let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            return reg.test(val);
        },
        validator2(val) {
            let reg = /^[a-zA-Z0-9_-]{6,12}$/
            return reg.test(val);
        }
    }
}
</script>

<style scoped lang="scss">
.login-message {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #f5f5f5;
    section {
        flex: 1;
        overflow: hidden;
        .message {
            padding: .533333rem;
        }
    }
}
.message ::v-deep .van-cell {
    margin-top: .533333rem;
}
.message ::v-deep .van-field__label {
    width: 1.173333rem;
}
.message ::v-deep .van-button {
    background-color: rgb(176, 53, 47);
    border: none;
}
.login-others {
    width: 100%;
    display: flex;
    font-size: .426667rem;
    color: #222;
    height: .56rem;
    line-height: .56rem;
    margin-top: .533333rem;
    .left {
        height: .56rem;
        line-height: .56rem;
        flex: 1;
        text-align: left;
    }
    .right {
        height: .56rem;
        line-height: .56rem;
        flex: 1;
        text-align: right;
    }
    .center {
        height: .56rem;
        line-height: .56rem;
        flex: 1;
        text-align: center;
    }
    i {
        font-size: .48rem;
        margin-right: .133333rem;
    }
}
.load-btn {
    margin-top: .533333rem;
}

.login-alter {
    width: 100%;
    height: 4rem;
    margin-top: 1.6rem;
    text-align: center;
    line-height: 1.333333rem;
    font-size: .426667rem;
    color: #969799;
}
</style>