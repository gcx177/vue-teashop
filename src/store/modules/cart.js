import { Toast } from 'vant';
import { Dialog } from 'vant';
import http from '@/common/api/request.js'

export default {
    state: {
        list:[], // 购物车数据
        selectList: [] // 选中的数据
    },
    getters: {
        isAllChecked(state) {
            return state.list.length == state.selectList.length
        },
        total(state) {
            let total = {
                num: 0,
                price: 0
            }

            state.list.forEach(item => {
                if(item.checked) {
                    total.num += parseInt(item.goods_num);
                    total.price += item.goods_num*item.goods_price
                }
            })

            return total
        }
    },
    mutations: {
        listData(state, cartArr) {
            state.list = cartArr
            state.selectList = state.list.map(v => {
                return v.id
            })
            
        },
        // 全选
        checkedAll(state) {
            state.selectList = state.list.map(v => {
                v.checked = true;
                return v.id;
            })
        },
        // 全不选
        checkedNo(state) {

            state.list.forEach(v => {
                v.checked = false;
            });

            state.selectList = [];
        },
        // 单选
        checkedOne(state, id) {
            let i = state.selectList.indexOf(id);

            // 在selectList中能够找到对应的id，就删除
            if(i > -1) {
                state.selectList.splice(i, 1);
            } else {
                state.selectList.push(id)
            }
        },
        // 删除商品
        delGoods(state) {
            state.list = state.list.filter(item => {
                // 将未选中的重新赋给list
                return state.selectList.indexOf(item.id) == -1
            })
        }
    },
    actions: {
        checkAllFn({commit, getters}) {
            
            getters.isAllChecked ? commit('checkedNo') : commit('checkedAll')
        },
        delGoodsFn({state, commit}, id) {

            let cartArr = []

            if(state.selectList.length == 0 && typeof id !== 'number') {
                Toast('还未选择商品')
                return
            }

            Dialog.confirm({
                message: '确定要删除这些商品吗？',
              }).then(() => {

                    // 单个删除
                    if(typeof id == 'number') {
                        cartArr = [id]
                        let index = state.list.findIndex(item => {
                            return item.id == id;
                        });

                        state.list.splice(index, 1);

                        if(state.selectList.indexOf(id) !== -1) {
                            let i = state.selectList.indexOf(id);

                            state.selectList.splice(i, 1);
                        }
                    
                    } else {
                        // 多选删除
                        cartArr = state.selectList
                        // 先删除选中的数据
                        commit('delGoods')
                        // 全不选(把购物车中所以的商品的checked设置为false)
                        commit('checkedNo')
                    }

                    http.$axios({
                        url: '/api/deleteCart',
                        method: 'POST',
                        data: {
                            goodsId: cartArr
                        }
                    }).then(res => {

                        console.log(res);
                    })
                }).catch(() => {
                    // on cancel
                });
        }
    }
}