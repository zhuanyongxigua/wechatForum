<style scoped>
    .left_text {
        text-align: left;
    }
    [v-cloak] {
        display: none;
    }
</style>

<template class="body_in">
    <div id="my">
        <div class="usercenter_top">
            <div class="usercenter_head" @click="fnLoginWithGithub">
                <img class="usercenter_head_img" v-if="oMyInfo.avatar" :src="oMyInfo.avatar"/>
                <p v-else>点击github登录</p>
            </div>

            <span class="my_top_name" v-cloak>
            {{oMyInfo.username}}
            <span class="user_type2" v-text="oMyInfo.type" v-if="oMyInfo.type" v-cloak></span>
            </span>
        </div>

        <div class="conent_top0_width100">
            <div class="qb_box">
                <div class="ddfl_brn ripple_box" @click="fnGoToFollowAndFanPage('followList')">
                    <span class="qb_num">0</span>
                    <span>关注</span>
                </div>
                <div class="ddfl_brn ripple_box" @click="fnGoToFollowAndFanPage('fanList')">
                    <span class="qb_num">0</span>
                    <span>粉丝</span>
                </div>
                <div class="ddfl_brn">
                    <span class="qb_num">0</span>
                    <span>发帖</span>
                </div>
                <div class="ddfl_brn ripple_box" @click="fnGoToScorePage">
                    <span class="qb_num">0</span>
                    <span>积分</span>
                </div>

            </div>

        </div>

        <div class="conent_top0_width100">

            <div class="list_style4 ripple_box" @click="fnGoToPersonalCardListPage(oMyInfo.id)">
                <div class="width90_box">
                    <span class="left_text"><i class="icon icon-67 usercenter_icon"></i>空间</span>
                    <span class="right_text arrow_right"></span>
                </div>
            </div>
            <router-link to="/002-score">
                <div class="list_style4 ripple_box">
                    <div class="width90_box">
                        <span class="left_text"><i class="icon icon-43 usercenter_icon"></i>钱包</span>
                        <span class="right_text arrow_right"></span>
                    </div>
                </div>
            </router-link>
            <router-link to="/015-settings">
                <div class="list_style4 ripple_box">
                    <div class="width90_box">
                        <span class="left_text"><i class="icon icon-101 usercenter_icon"></i>设置</span>
                        <span class="right_text arrow_right"></span>
                    </div>
                </div>
            </router-link>

        </div>

        <div style="height: 50px; float: left; width: 100%;"></div>

        <my-footer my-tab="4"></my-footer>

    </div>
</template>

<script>
    import footer from '../components/footer.vue'
    export default({
        data() {
            return {
                oMyInfo: {

                }
            }
        },
        //加载组件时发出请求
        created: function() {
            this.fnGetMyInfo();
        },
        components: {
          'my-footer': footer
        },
        methods: {
            fnLoginWithGithub() {
                if (process.env.NODE_ENV === 'development') {
                    window.location.href = 'http://localhost:3000/api/auth/github';
                } else {
                    window.location.href = 'http://zhuanyongxigua.cn:8080/api/auth/github';
                }
                
            },
            fnGetMyInfo() {
                axios.post('api/myInfo', {})
                    .then(res => {
                        this.oMyInfo = Object.assign({}, res.data);
                    })
                    .catch(err => {

                    })
            },
            fnGoToFollowAndFanPage(sCurMode) {
                window.location.href='009-followList.html?sCurMode=' + sCurMode
            },
            fnGoToPersonalCardListPage(id) {
                window.location.href = '008-personalCardList.html?id=' + id;
            },
            fnGoToScorePage() {
                this.$router.push('002-score');
            }
        },
    })
</script>
