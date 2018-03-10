<style type="text/css" scoped>

</style>

<template class="body_in">
    <div class="">
        <div class="news">
            <div class="news_in">
                <span class="news_title" onclick="window.location.href='006-newsList.html'">
                    <i class="icon ion-chatbubble-working"></i>
                    更多系统消息：
                </span>
                <!-- Swiper -->
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div v-for="item in aSysMsg" class="swiper-slide" @click="fnGoToSysMsgDetails(item.id)" v-text="item.title"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.css'
    export default{
        data () {
            return {
                aSysMsg: [],
            }
        } ,
        props:['myTab'],
        //加载组件时发出请求
        created() {

        },
        methods: {
            fnGetSysMsg() {
                axios.post('/wechat/searchSystemTopics', {})
                    .then(res => {
                        var aData = JSON.parse(JSON.stringify(res.data));
                        data.forEach((ele) => {
                            this.aSysMsg.push(ele);
                        });
                        this.$nextTick(() => {
                            //swiper
                            var swiper = new Swiper('.swiper-container', {
                                direction: 'vertical',
                                loop: true, //循环
                                autoplay: {
                                    delay: 2500,
                                    disableOnInteraction: false,
                                },
                                pagination: {
                                    el: '.swiper-pagination',
                                    clickable: true,
                                },
                            });
                        });
                    })
                    .catch(console.log);
            },
            fnGoToSysMsgDetails(id) {
                window.location.href = '007-news.html?id=' + id;
            },
        },
        mounted() {

        },
        updated() {

        }
    }
</script>
