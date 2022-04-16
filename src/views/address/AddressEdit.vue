<template>
    <div class="address-edit">
        <div class="head-back">
            <i class="iconfont icon-xiangzuo1" @click="$router.back()"></i>
            <h2 v-if="addressState">添加地址</h2>
            <h2 v-else>编辑地址</h2>
            <i class="iconfont icon-shouye1" @click="$router.push('/home')"></i>
        </div>
        <section>
            <van-address-edit
            v-if="addressState"
            :area-list="areaList"
            show-set-default
            :show-delete="false"
            @save="onSave"
            />

            <van-address-edit
            v-else
            :address-info="userInfo"
            :area-list="areaList"
            show-set-default
            show-delete
            @save="onUpdate"
            @delete="onDelete"
            />
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import http from '@/common/api/request.js'

export default {
  data() {
    return {
      areaList: areaList,
      addressState: false,
      userInfo: {}
    };
  },
  components: {
      Tabber
  },
  created() {
      if(this.$route.query.key == 'add') {
          // 是通过添加进入的编辑页面
          this.addressState = true
      } else {
          // 是通过修改地址进入的页面
          let optipns = JSON.parse(this.$route.query.key);
          optipns.isDefault = optipns.isDefault == 1 ? true : false
          this.userInfo = optipns
      }
  },
  methods: {
    // 添加地址的函数
    onSave(content) {
        content.isDefault = content.isDefault == true ? 1 : 0
        http.$axios({
            url: '/api/addAddress',
            method: "POST",
            headers: {
                token: true
            },
            data: {
                ...content
            }
        }).then(res => {
            if(res.success) {
                Toast(res.message);
                this.$router.push('/address/index')
            }
        })
  
    },
    onDelete(content) {

        http.$axios({
            url: '/api/deleteAddress',
            method: "POST",
            headers: {
                token: true
            },
            data: {
                id: content.id
            }
        }).then(res => {
            if(res.success) {
                Toast(res.message);
                this.$router.push('/address/index')
            }
        })

    },
    // 更新地址函数
    onUpdate(content) {
        content.isDefault = content.isDefault == true ? 1 : 0
        http.$axios({
            url: '/api/updateAddress',
            method: "POST",
            headers: {
                token: true
            },
            data: {
                ...content
            }
        }).then(res => {
            if(res.success) {
                Toast(res.message);
                this.$router.push('/address/index')
            }
        })
    }
  },
};
</script>

<style scoped lang="scss">
.address-edit {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    section {
        flex: 1;
        overflow: hidden;
        width: 100%;
        .van-address-edit {
            padding: 0;
        }
    }
}

.van-address-edit ::v-deep .van-address-edit__fields {
    border-radius: 0;
}
.van-address-edit ::v-deep .van-button--danger {
    background-color: #b0352f;
    border: 1px solid #b0352f;
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
</style>