<style scoped>
    .reward_input {
        margin-left: 0px;
    }
</style>
<template class="body_in">
    <div id="withdraw">

        <input type="number" class="reward_input" placeholder="请输入提现积分数" v-model="credit"/>

        <span class="send_btn ripple_box" @click="fnApplyWithdraw">确认提现</span>

        <div class="withdraw_texts">
            提现规则：积分大于1000可以提现。每笔提现平台收取1%手续费。
        </div>
    </div>
</template>

<script>
    export default({
        data () {
            return {
                credit: null
            }
        },
        //加载组件时发出请求
        created: function () {
//            this.fnApplyWithdraw();
        },
        methods: {
            fnApplyWithdraw: function () {
                var postData = {};
                var that = this;
                var type = 'PUT';
                var url = '/wechat/addApplyCash';

                if (!this.credit) {
                    $.alert('请输入提现积分数');
                    return;
                }

                postData.credit = this.credit;

                function ajaxSuccess(data) {
                    if (data.success) {
                        $.alert("申请提现成功", function() {
                            history.back();
                        });
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                            return;
                        }
                        $.alert('提现失败');
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
        },
    })
</script>
