<template>
    <div class="login-message">
        <BackTo>找回密码</BackTo>
        <section>
            <div class="message">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="username"
                        name="username"
                        label="手机号"
                        placeholder="请输入手机号"
                    />
                    <div style="overflow: hidden">
                        <van-field
                        v-model="code"
                        name="authcode"
                        label="验证码"
                        placeholder="请输入验证码"
                        class="authcode-item"
                        />
                        <div :class="['get-authcode', {'discolor': !isClick}]" @click="sendCode">{{clickMessage}}</div>
                    </div>
                    <div class="load-btn">
                        <van-button round block type="info" native-type="submit">下一步</van-button>
                    </div>
                </van-form>
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

export default {
    name: 'Login',
    components: {
        Tabber,
        BackTo
    },
    data() {
        return {
            username: '',
            code: '',
            // 是否可以点击
            isClick: true,
            timerNum: 30,
            clickMessage: '获取短信验证码',
            dxCode: '' // 短信验证码
        }
    },
    methods: {
        // 用户登录
        onSubmit(values) {
            let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if(!reg.test(this.username)) {
                Toast('请输入正确的手机号')
                return
            }

            // 用户输入证明验证码是正确的
            if(this.code == this.dxCode && this.dxCode !== '') {
                
                // 告诉后端用户输入的手机号是否存在
                http.$axios({
                    url: '/api/selectUser',
                    method: 'POST',
                    data: {
                        phone: this.username
                    }
                }).then(res => {
                    // 登录失败
                    if(!res.success) {
                        Toast(res.message)
                        return
                    }
                    
                    this.$router.push({
                        name: 'RecoverySet',
                        query: {
                            phone: this.username
                        }
                    })

                })

            } else {
                Toast('验证码不正确，请输入正确的验证码')
                return
            }
        },
        // 点击按钮，获取短信验证码
        sendCode() {
            if(this.isClick) {
                let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                if(!reg.test(this.username)) {
                    Toast('请输入正确的手机号')
                    return
                } else {

                    // 请求短信验证码接口
                    http.$axios({
                        url: '/api/code',
                        method: 'POST',
                        data: {
                            phone: this.username
                        }
                    }).then(res => {
                        // 将获取到的短信验证码进行存储
                        this.dxCode = res.data
                    })

                    this.isClick = false
                    // 倒计时
                    this.clickMessage = `${this.timerNum}s之后再次发送`
                    let timer = setInterval(() => {
                        --this.timerNum
                        this.clickMessage = `${this.timerNum}s之后再次发送`
                    }, 1000)

                    // 判断什么时候停止定时器
                    setTimeout(() => {
                        clearInterval(timer)
                        this.timerNum = 30
                        this.isClick = true
                        this.clickMessage = '获取短信验证码'
                    }, 30000);
                }
            }

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

.authcode-item {
    width: 55%;
    float: left;
}
.get-authcode {
    float: right;
    width: 3.8rem;
    height: 1.173333rem;
    background-color: rgb(176, 53, 47);
    color: #f5f5f5;
    margin-top: .533333rem;
    text-align: center;
    line-height: 1.173333rem;
    font-size: .426667rem;
    border-radius: .133333rem;
}
.load-btn {
    margin-top: .533333rem;
    margin-bottom: .533333rem;
}
.login-others {
    width: 100%;
    display: flex;
    font-size: .426667rem;
    color: #222;
    height: .56rem;
    line-height: .56rem;
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
    i {
        font-size: .48rem;
    }
}
.discolor {
    background: gainsboro;
}


</style>