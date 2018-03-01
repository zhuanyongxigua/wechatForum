<style scoped>
    .score_btns i {
        line-height: 26px;
    }

    [v-cloak] {
        display: none;
    }
</style>

<template class="body_in">
    <div id="score">

        <div class="score_top">
            <div class="score_box">
                <div class="score_num" v-text="oMyInfo.credit"></div>
                <div class="score_label">我的积分</div>
            </div>
        </div>

        <div class="score_btns flex_row">
            <div class="score_btn flex1 ripple_box" onclick="window.location.href='018-scoreRule.html'">
                <i class="ion-ios-pricetags"></i>
                <span>规则</span>
            </div>
            <div class="score_btn flex1 ripple_box" onclick="window.location.href='013-recharge.html'">
                <i class="ion-ios-cart"></i>
                <span>购买积分</span>
            </div>
            <div class="score_btn flex1 ripple_box" onclick="window.location.href='014-withdraw.html'">
                <i class="ion-social-yen"></i>
                <span>提现</span>
            </div>
        </div>

        <div class="expenses">
            <div class="expenses_title">
                <i class="ion-arrow-down-b"></i> 积分明细</div>
            <ul>
                <li v-for="item in aScoreList" class="list_style7">
                    <div class="text_left">
                        <span class="expenses_label" v-text="item.reason"></span>
                        <span class="expenses_time" v-text="item.createDate"></span>
                    </div>
                    <span :class="{green_text: item.path === 1, red_text: item.path === 2}" v-cloak>
                        {{(item.path === 1 ? '+' : '-') + item.credit}}
                    </span>
                </li>
            </ul>
        </div>

        <div style="height: 50px; float: left; width: 100%;"></div>

        <div class="foot_menu">
            <router-link to="/001-home">
                <span id="column1" class="ripple_box">首页</span>
            </router-link>
            <router-link to="/002-score">
                <span id="column2" class="ripple_box selected">赚积分</span>
            </router-link>
            <router-link to="/003-send">
                <span id="column2" class="ripple_box">发帖</span>
            </router-link>
            <router-link to="/004-my">
                <span id="column4" class="ripple_box">我的</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default({
        data() {
            return {
                aScoreList: [],
                oMyInfo: {}
            }
        },
        //加载组件时发出请求
        created: function() {
            this.fnGetMyInfo();
            this.fnGetScoreList();
        },
        methods: {
            fnGetMyInfo() {
                //获取服务列表信息
                axios.post('/wechat/myInfo', {})
                    .then(res => {
                        this.oMyInfo = Object.assign({}, res.data);
                    })
                    .catch(err => {

                    })
            },
            fnGetScoreList() {
                axios.post('/wechat/searchCreditLogs', {})
                    .then(res => {
                        this.aScoreList = JSON.parse(JSON.stringify(res.data));
                    })
                    .catch(err => {

                    })
            }
        },
    })
</script>
