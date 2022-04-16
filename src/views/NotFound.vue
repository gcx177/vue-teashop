<template>
    <div class="not-found">
        <div class="describe">
            <div class="content">
                <div class="icon">
                    <i class="iconfont icon-weizhaodaoshangpin"></i>
                </div>
                <p class="txt">对不起哦，小七去泡茶了，一时半会儿无法回来</p>
                <p class="txt">您可以<span @click="goHome">返回首页</span></p>
            </div>
        </div>
        <footer>茶七网 - 以茶会友，愿一辈子做您的茶友</footer>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goHome() {
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="scss" scoped>
.not-found {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .describe {
        flex: 1;
        width: 100%;
        position: relative;
        .content {
            position: absolute;
            width: 100%;
            height: 8rem;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            .icon {
                width: 100%;
                height: 5.333333rem;
                text-align: center;
                line-height: 5.333333rem;
                i {
                    font-size: 4rem;
                    color: #333;
                }
            }
            .txt {
                width: 100%;
                flex: 1;
                font-size: .426667rem;
                color: #333;
                text-align: center;
                line-height: 1.333333rem;
                font-weight: bold;
                span {
                    padding: .053333rem .186667rem;
                    background: #b54f4a;
                    margin: 0 .16rem;
                    color: #fff;
                    border-radius: .133333rem;

                }
            }
        }
    }
    footer {
        height: 1.6rem;
        width: 100%;
        text-align: center;
        line-height: 1.6rem;
        font-size: .373333rem;
        color: #8f8c8c;
    }
}
</style>