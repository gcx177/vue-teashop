// 引入axios
import axios from "axios";
import store from '@/store/index.js'
import router from '@/router/index.js'

export default {
    common: {
        method: 'GET',
        data: {},
        params: {},
        headers: {}
    },

    $axios(options = {}) {

        options.method = options.method || this.common.method;
        options.data = options.data || this.common.data;
        options.params = options.params || this.common.params;
        options.headers = options.headers || this.common.headers;

        // 是否是登录状态
        if(options.headers.token) {
            // 从store中查看是否存在token
            options.headers.token = store.state.user.token
            if(!options.headers.token) {
                // 如果没有用户的token信息，则要求用户先登陆
                router.push('/login')
            }
        }

        return axios(options).then(v => {
            let  data = v.data.data;
            
            return new Promise((resolve, reject) => {
                if(!data) {
                    reject(new Error('数据有误'))
                }

                resolve(data)
            })
        })


    }
}