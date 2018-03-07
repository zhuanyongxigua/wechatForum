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

                axios.post('/wechatRest/charge', {
                    money: this.oCurCreditRule.money,
                    integral: this.oCurCreditRule.integral
                })
                    .then(res => {
                        if (data.success) {
                            //微信浏览器BOM对象WeixinJSBridge是否已准备好
                            if (typeof WeixinJSBridge == "undefined") {
                                if (document.addEventListener) {
                                    document.addEventListener('WeixinJSBridgeReady', that.fnWechatPay.bind(this, data.payInfo), false);
                                } else if (document.attachEvent) {
                                    document.attachEvent('WeixinJSBridgeReady', that.fnWechatPay.bind(this, data.payInfo));
                                    document.attachEvent('onWeixinJSBridgeReady', that.fnWechatPay.bind(this, data.payInfo));
                                }
                            } else {
                                that.fnWechatPay(data.payInfo);
                            }
                        } else {
                            if (data.message === 'USER_BAN_CODE') {
                                $.alert('账户禁用，无法操作');
                                return;
                            }
                            $.alert('支付失败');
                        }
                    })
                    .catch(err => {
                        console.log(err);
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
                //微信浏览器BOM对象WeixinJSBridge调用微信支付接口
                WeixinJSBridge.invoke('getBrandWCPayRequest', payInfo, function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        $.alert('支付成功', function () {
                            history.back();
                        });
                    } else {
                        $.alert('支付失败');
                    }
                });
            }
        },
    });

</script>
