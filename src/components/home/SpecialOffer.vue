<template>
    <div class="tejia">
        <header class="floortitle">
            <span><i class="iconfont icon-icon-test"></i>今日特价</span>
        </header>
        <div class="tejia-product">
            <div class="time">
                <span class="title">距结束</span>
                <van-count-down :time="time" format="HH:mm:ss">
                    <template #default="timeData">
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.hours >= 10 ? timeData.hours : '0' + timeData.hours }}</span>
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.minutes >= 10 ? timeData.minutes : '0' + timeData.minutes }}</span>
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.seconds >= 10 ? timeData.seconds : '0' + timeData.seconds }}</span>
                    </template>
                </van-count-down>
            </div>
            <div class="tj-product">
                <img class="tejia-img" :src="imgUrl">
                <div class="pro-content">
                    <div class="name">红茶鼻祖正山小种1号</div>
                    <div class="price"><del>￥128</del>￥68.0</div>
                    <div class="goumai">
                        <div class="btn">立即购买</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: 60 * 60 * 60 * 1000,
            imgUrl: './images/favorite2.jpeg'
        }
    }
}
</script>

<style scoped>
.tejia {
    background: #f9f8f8;
    margin-top: .4rem;
    padding: 0.2rem 0;
}
.floortitle {
    text-align: center;
    padding: 0.2rem 0;
    font-size: 0.5rem;
    color: #333333;
}
.floortitle span {
    position: relative;
    font-size: 0.5rem;
    color: #333333;
    text-align: center;
}
.floortitle span::before, .floortitle span::after {
    content: "";
    position: absolute;
    width: .213333rem;
    height: .213333rem;
    border-radius: 50%;
    display: block;
    background: #d4c0a7;
    top: 50%;
    transform: translateY(-50%);
}
.floortitle span::before {
    left: -0.5rem;
}
.floortitle span::after {
    right: -0.5rem;
}
.tejia {
    border: 1px solid #f3f3f3;
    margin: 0 0.5rem .2rem;
    padding: .266667rem;
    box-sizing: border-box;
}
.tejia-product {
    padding: .266667rem;
    border: .026667rem solid #f3f3f3;
    box-sizing: border-box;
}

.floortitle i {
    margin-right: .133333rem;
    color: #b0352f;
    font-size: .54rem;
    font-weight: 600;
    margin-top: .053333rem!important;
}
.tejia .time {
    padding: 0 0 .266667rem;
    font-size: 0.4rem;
    height: .6rem;
    background-color: #fff;
    position: relative;
}
.tj-product {
    height: 2.5rem;
    background-color: #fff;
    display: flex;
}
.tejia-product {
    background-color: #fff;
}

.colon {
    display: inline-block;
    margin: 0 .106667rem;
    color: #222;
}
.block {
    background: #333333;
    border-radius: .133333rem;
    text-align: center;
    font-size: 0.4rem;
    padding: 0 .133333rem;
    color: #fff;
}
.title {
    font-size: .4rem;
    position: absolute;
}

.van-count-down {
    position: absolute;
    left: 1.2rem;

}

.tejia-img {
    height: 2.5rem;
    width: 2.5rem;
    display: block;
    border: none;
}

.pro-content {
    flex: 1;
    height: 2.5rem;
    display: flex;
    flex-direction: column;
}

.pro-content .name {
    width: 100%;
    height: .56rem;
    margin-bottom: .266667rem;
    color: #333;
    text-align: right;
    line-height: .56rem;
    font-size: .426667rem;
}
.pro-content .price {
    width: 100%;
    height: .56rem;
    margin-bottom: .266667rem;
    color: #333;
    text-align: right;
    line-height: .56rem;
    font-size: .426667rem;
    color: #b0352f;
}
.pro-content .price del{
    color: #999999;
    font-size: .35rem;
}
.pro-content .price .goumai {
    width: 100%;
    flex: 1;
}
.pro-content .goumai .btn {
    float: right;
    background: #ffde00;
    border-radius: .133333rem;
    height: 0.8rem;
    line-height: .8rem;
    overflow: hidden;
    padding: 0 .266667rem;
    color: #333;
    font-size: .373333rem;
}
</style>