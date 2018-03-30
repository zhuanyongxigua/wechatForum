<style scoped>
    .reward_input {
        margin-left: 0px;
    }
</style>

<template class="body_in">
    <div id="reward">
        <div class="usercenter_top">
            <div class="usercenter_head">
                <img class="usercenter_head_img" :src="sHead" />
            </div>
            <span class="my_top_name" v-text="'打赏给：'+ sUserName">
            </span>
        </div>

        <input class="reward_input" placeholder="请输入打赏积分" v-model="sRewardMonry"/>

        <span class="send_btn ripple_box" @click="fnReward">确认打赏</span>

    </div>

</template>
<script>
    import { global } from '../../static/js/lib/global'
    export default ({
        data() {
            return {
                sRewardMonry: '',
                loc: location.href.split('#')[1],
                topicId: this.$route.query.topicId,
                sHead: this.$route.query.sHead,
                sUserName: this.$route.query.sUserName
            }
        },
        created() {

        },
        methods: {
            fnReward:function() {
                var postData = {};
                var that = this;
                var type = 'PUT';
                var url = '/wechat/rewardTopic';

                //表单验证
                if(global.verifyIsNull(this.sRewardMonry)){
                    $.alert('请输入打赏积分');
                    return;
                }

                if(!global.isNum(this.sRewardMonry)){
                    $.alert('请输入数字');
                    return;
                }

                postData.id = this.topicId;
                postData.rewardCredit = this.sRewardMonry;

                function ajaxSuccess(data) {
                    if (data.success) {
                        $.alert({
                            title: '提示',
                            text: '提交成功',
                            onOK: function () {
                                window.history.back();
                            }
                        });
                    }else{
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        } else if (data.message === 'CREDIT_ERROR_001') {
                            $.alert('积分不足');
                            location.href = '013-recharge.html';
                        } else {
                            $.alert('打赏失败');
                        }
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            }
        },
    })
</script>
