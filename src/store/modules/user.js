export default {
    state: {
        // 登录状态
        loginStatus: false,
        // token
        token: null,
        // 用户信息: 用户头像 | 用户昵称
        userInfo: {}
    },
    getters: {

    },
    mutations: {
        login(state, user) {
            state.loginStatus = true
            state.token = user.token
            delete user.pwd
            state.userInfo = user

            // 持久化存储 => 本地存储
            localStorage.setItem('teaUserInfo', JSON.stringify(user));
        },
        // 读取本地存储
        getLocal(state) {
            let userInfo = JSON.parse(localStorage.getItem('teaUserInfo'));
            if(userInfo) {
                state.loginStatus = true
                state.token = userInfo.token
                state.userInfo = userInfo
            }
        },
        // 退出登录
        loginOut( state ) {
            state.loginStatus = false
            state.token = null
            state.userInfo = {}
            localStorage.removeItem('teaUserInfo')
        }
    },
    actions: {

    }
}