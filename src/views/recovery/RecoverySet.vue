<template>
    <div class="login-message">
        <BackTo>登录</BackTo>
        <section>
            <div class="message">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="password"
                        name="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        :rules="[{ validator, message: '请填写正确的密码(密码包括阿拉伯数字、英文字母,并且不少于6位数,不多于12位)' }]"
                    />
                    <van-field
                        v-model="surepassword"
                        name="surepassword"
                        type="password"
                        label="确认密码"
                        placeholder="确认你的新密码"
                        :rules="[{ validator: validator2, message: '输入的密码与上面输入的密码不一致'}]"
                    />
                    <div class="load-btn">
                        <van-button round block type="info" native-type="submit">密码重置</van-button>
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
import http from '@/common/api/request.js'
import { Toast } from 'vant';

export default {
    name: 'Login',
    components: {
        Tabber,
        BackTo
    },
    data() {
        return {
            password: '',
            surepassword: ''
        }
    },
    methods: {
        onSubmit(values) {
            http.$axios({
                url: '/api/recovery',
                method: 'POST',
                data: {
                    phone: this.$route.query.phone,
                    password: this.password
                }
            }).then(res => {
                if(res.success) {
                    Toast(res.message)
                    this.$router.push('/login')
                }
            })
        },
        validator(val) {
            let reg = /^[a-zA-Z0-9_-]{6,12}$/
            return reg.test(val);
        },
        validator2(val) {
            return this.password == val;
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
    width: 1.866667rem;
    text-align: center;
}
.message ::v-deep .van-button {
    background-color: rgb(176, 53, 47);
    border: none;
}
.load-btn {
    margin-top: .533333rem;
}
</style>