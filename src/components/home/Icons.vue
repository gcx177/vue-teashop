<template>
    <ul class="icons">
        <li v-for="item in iconsList" :key="item.id" @click="$router.push('/goodslist')">
            <i>
                <img :src="item.imgUrl">
            </i>
            <span>{{item.title}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            iconsList: [
                {
                    id: 1,
                    title: '自饮茶',
                    imgUrl: './images/icons1.png'
                },
                {
                    id: 2,
                    title: '茶具',
                    imgUrl: './images/icons2.png'
                },
                {
                    id: 3,
                    title: '茶礼盒',
                    imgUrl: './images/icons3.png'
                },
                {
                    id: 4,
                    title: '领福利',
                    imgUrl: './images/icons4.png'
                },
                {
                    id: 5,
                    title: '官方验证',
                    imgUrl: './images/icons5.png'
                }
            ]
        }
    }
}
</script>

<style scoped>
.icons {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    background-color: #fff;
}
.icons i {
    display: flex;
    width: 100%;
    height: 1.3rem;
    padding: 0 auto;
    justify-content: center;
}
.icons i img {
    width: 1rem;
    height: 1rem;
}
.icons span {
    display: block;
    width: 100%;
    font-size: 0.4rem;
    text-align: center;
}
.icons li {
    flex: 1;
}
</style>