<style scoped>
    [v-cloak] {
        display: none;
    }
</style>

<template class="body_in">
    <div id="my">
        <div class="usercenter_top">
            <div class="usercenter_head" @click="fnLoginWithGithub">
                <img class="usercenter_head_img" :src="oMyInfo.iconUrl" />
            </div>

            <span class="my_top_name" v-cloak>
            {{oMyInfo.username}}
            <span class="user_type2" v-text="oMyInfo.type" v-if="oMyInfo.type" v-cloak></span>
            </span>
        </div>

        <div class="conent_top0_width100">
            <div class="qb_box">
                <div class="ddfl_brn ripple_box" @click="fnGoToFollowAndFanPage('followList')">
                    <span class="qb_num" v-text="oMyInfo.attentions"></span>
                    <span>关注</span>
                </div>
                <div class="ddfl_brn ripple_box" @click="fnGoToFollowAndFanPage('fanList')">
                    <span class="qb_num" v-text="oMyInfo.fans"></span>
                    <span>粉丝</span>
                </div>
                <div class="ddfl_brn">
                    <span class="qb_num" v-text="oMyInfo.posts"></span>
                    <span>发帖</span>
                </div>
                <div class="ddfl_brn ripple_box" onclick="window.location.href='002-score.html'">
                    <span class="qb_num" v-text="oMyInfo.credit"></span>
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

            <div class="list_style4 ripple_box" onclick="window.location.href='002-score.html'">
                <div class="width90_box">
                    <span class="left_text"><i class="icon icon-43 usercenter_icon"></i>钱包</span>
                    <span class="right_text arrow_right"></span>
                </div>
            </div>

            <div class="list_style4 ripple_box" onclick="window.location.href='015-settings.html'">
                <div class="width90_box">
                    <span class="left_text"><i class="icon icon-101 usercenter_icon"></i>设置</span>
                    <span class="right_text arrow_right"></span>
                </div>
            </div>

        </div>

        <div style="height: 50px; float: left; width: 100%;"></div>

        <div class="foot_menu">
            <router-link to="/002-score">
                <span id="column1" class="ripple_box">首页</span>
            </router-link>
            <router-link to="/002-score">
                <span id="column2" class="ripple_box">赚积分</span>
            </router-link>
            <router-link to="/003-send">
                <span id="column3" class="ripple_box">发帖</span>
            </router-link>
            <router-link to="/004-my">
                <span id="column4" class="ripple_box selected">我的</span>
            </router-link>
        </div>

    </div>
</template>

<script>
    export default({
        data() {
            return {
                oMyInfo: {}
            }
        },
        //加载组件时发出请求
        created: function() {
            // this.fnGetMyInfo();
        },
        methods: {
            fnLoginWithGithub() {
                window.location.href = '/api/auth/github';
            },
            fnGetMyInfo() {
                axios.post('/wechat/myInfo', {})
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
            }
        },
    })
</script>
