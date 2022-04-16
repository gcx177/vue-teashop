export default {
    state: {
        // 当前订单
        orderList: [],
        // 订单号
        orderID: localStorage.getItem('tea_orderid') || ''
    },
    getters: {

    },
    mutations: {
        initOrder(state, orderList) {
            state.orderList = orderList
            state.orderID = orderList[0]['order_id']

            localStorage.setItem('tea_orderid', orderList[0]['order_id'])
        }
    }, 
    actions: {

    }
}