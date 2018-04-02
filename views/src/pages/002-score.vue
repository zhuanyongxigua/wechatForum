<style scoped>
    .score_btns i {
        line-height: 26px;
    }

    .expenses_title {
        text-align: left;
    }

    .text_left {
        text-align: left;
    }

    .score_btn:last-child {
        border-right: 1px solid #eee;
    }

    [v-cloak] {
        display: none;
    }
</style>

<template class="body_in">
    <div id="score">

        <div class="score_top">
            <div class="score_box">
                <div class="score_num" v-text="oMyInfo.reward"></div>
                <div class="score_label">我的积分</div>
            </div>
        </div>

        <div class="score_btns flex_row">
            <router-link style="width: 33.3%" to="/018-scoreRule">
                <div class="score_btn flex1 ripple_box">
                    <i class="ion-ios-pricetags"></i>
                    <span>规则</span>
                </div>
            </router-link>
            <router-link style="width: 33.3%" to="/013-recharge">
                <div class="score_btn flex1 ripple_box">
                    <i class="ion-ios-cart"></i>
                    <span>购买积分</span>
                </div>
            </router-link>
            <router-link style="width: 33.3%" to="/014-withdraw">
                <div class="score_btn flex1 ripple_box">
                    <i class="ion-social-yen"></i>
                    <span>提现</span>
                </div>
            </router-link>
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

        <my-footer my-tab="2"></my-footer>
    </div>
</template>

<script>
    import footer from '../components/footer.vue'
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
        components: {
          'my-footer': footer
        },
        methods: {
            fnGetMyInfo() {
                //获取服务列表信息
                axios.post('api/myInfo', {})
                    .then(res => {
                        this.oMyInfo = Object.assign({}, res.data);
                    })
                    .catch(err => {

                    })
            },
            fnGetScoreList() {
                axios.post('api/getScoreList', {})
                    .then(res => {
                        this.aScoreList = JSON.parse(JSON.stringify(res.data));
                    })
                    .catch(err => {

                    })
            },
        },
    })
</script>
