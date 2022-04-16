export default {
    state: {
        list: []
    },
    getters: {
        defaultAddress(state) {
            return state.list.filter(v => {
                return v.isDefault == 1;
            })
        }
    },
    mutations: {
        initData(state, arrData) {
            state.list = arrData
        }
    },
    actions: {

    }
}