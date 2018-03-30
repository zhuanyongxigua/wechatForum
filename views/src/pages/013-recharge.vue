<style scoped>
    .recharge_div {
        width: 100%;
        overflow: hidden;
        text-align: center;

    }

    .recharge_div_in {
        width: 94%;
        margin: 20px auto;
        overflow: hidden;
    }

    .recharge_loop_div {
        float: left;
        width: 30.33%;
        overflow: hidden;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 1.5%;
        padding: 10px 0px;
    }

    .recharge_text1 {
        display: inline-block;
        width: 100%;
        font-size: 20px;
        color: #ff687b;
    }

    .recharge_text2 {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        color: #999;
    }

    .selected {
        background-color: #ff687b;
        border: 1px solid #ff687b;
    }

    .selected .recharge_text1 {
        color: #fff;
    }

    .selected .recharge_text2 {
        color: #fff;
    }

</style>

<template class="body_in">
    <div id="recharge">
        <div class="recharge_div">
            <div class="recharge_div_in">
                <div class="recharge_loop_div" v-for="(item, index) in aCreditRule" @click="fnSelectCreditRule(index)"
                     :class="{selected: item.isSelected}">
                    <span class="recharge_text1" v-text="item.integral + '积分'"></span>
                    <span class="recharge_text2" v-text="item.money + '元'"></span>
                </div>
            </div>
        </div>

        <span class="send_btn ripple_box" @click="fnGetPayInfo">去支付</span>

    </div>
</template>

<script>
    export default({
        data () {
            return {
                aCreditRule: [],
                oCurCreditRule: {},
            }
        },
        created: function () {
            this.fnGetCreditRule();
        },
        methods: {
            fnGetCreditRule() {
                axios.post('/api/getRechargeRule', {})
                    .then(res => {
                        var aData = JSON.parse(JSON.stringify(res.data));
                        aData.map(function (ele) {
                            ele.isSelected = false;
                            return ele;
                        });
                        this.aCreditRule = aData;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            fnGetPayInfo: function () {
                if (!('money' in this.oCurCreditRule)) {
                    $.alert('请选择套餐');
                    return;
                }

                axios.post('/api/recharge', {
                    money: this.oCurCreditRule.money,
                    integral: this.oCurCreditRule.integral
                })
                    .then(res => {
                        if (res.data.success) {
                            $.alert('支付成功', () => this.$router.push('/002-score'));
                        } else {
                            if (res.data.message === 'USER_BAN_CODE') {
                                $.alert('账户禁用，无法操作');
                                return;
                            }
                            $.alert('支付失败');
                        }
                    })
                    .catch(err => {
                        if (err.response.status === 403) {
                            $.alert("登录之后才能充值");
                        }
                    })
            },
            fnSelectCreditRule: function (sCreditRuleIndex) {
                this.aCreditRule.forEach(function (ele) {
                    ele.isSelected = false
                });
                this.aCreditRule[sCreditRuleIndex].isSelected = true;
                this.oCurCreditRule = this.aCreditRule[sCreditRuleIndex];
            },
            fnWechatPay: function (payInfo) {
                
            }
        },
    });

</script>
