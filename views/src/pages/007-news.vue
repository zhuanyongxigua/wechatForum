<style scoped>
    /*modal自定义样式*/

    .ivu-modal-footer {
        display: none;
    }

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ivu-modal {
        top: 0;
    }

    .ivu-modal-content {
        width: 60%;
        margin-left: 20%;

    }

    .ivu-modal-body {
        padding: 0px;
    }

    .support_head {
        height: 25px;
        width: 25px;
    }
</style>

<template class="body_in">
    <div id="news">

        <div class="back_home" onclick="window.location.href='006-newsList.html'">
            <i class="ion-chatbubble-working"></i>更多系统消息
        </div>

        <div class="card">
            <div class="share_box" :class="{show:clickShare}" @click="clickShare = false">
                <img class="share" src="../../static/img/share.png">
                <div class="shade"></div>
            </div>
            <div class="card_in">
                <div class="card_info">
                    <img class="card_info_head" :src="oSysMsgDetails.head"/>
                    <div class="card_info_texts">
                        <span class="card_info_name">平台</span>
                        <span class="card_info_time" v-text="oSysMsgDetails.createDate"></span>
                    </div>
                </div>

                <div class="card_title">
                    <p v-text="'浏览量：' + oSysMsgDetails.views"></p>
                </div>

                <div class="card_title">
                    <p v-text="oSysMsgDetails.title"></p>
                </div>
                <div class="news_box" v-html="oSysMsgDetails.content"></div>
            </div>
        </div>

        <div class="zan" v-if="aSupportInfoShow.length !== 0">
            <div class="flex_row zan_top">
                <Icon type="ios-heart-outline"></Icon>
                <div class="flex1">
                    <img v-for="item in aSupportInfoShow" class="support_head" :src="item.head" @click="fnGoToPersonalCardListPage(item.id)"/>
                </div>
            </div>

            <span class="more_btn" @click="fnClickShowMoreSupport" v-if="bShowSupportButton">点击显示更多点赞</span>
        </div>

        <div class="card_talk_box">
            <div class="card_talk">
                <div v-for="(item, index) in aCmtList" class="card_in">
                    <div class="card_info">
                        <img class="card_info_head" :src="item.head" onclick="window.location.href='008-personalCardList.html'" />
                        <div class="card_info_texts">
                            <span class="card_info_name" onclick="window.location.href='008-personalCardList.html'">
                                {{item.username}}
                                <span style="float: right" v-text="index + 1 + '楼'"></span>
                            </span>
                            <span class="card_info_time" v-text="item.createDate"></span>
                            <div class="talk_texts">
                                <p v-text="item.content"></p>
                            </div>
                        </div>
                        <span v-if="item.isOwn" class="operate_btn2 ripple_box" @click="fnShowModal(item.id, item.content)">
                        <Icon type="ios-gear"></Icon>
                    </span>
                    </div>
                </div>
            </div>
        </div>

        <span class="more_btn" v-if="bIsMoreCmt" @click="fnGetTotalCmt">点击查看更多评论</span>

        <div style="height: 40px; width: 100%; float: left;"></div>

        <div class="card_bottom_btns flex_row">
            <span class="card_bottom_btn flex1 ripple_box" @click="clickShare = true">
                <i class="ion-android-open"></i>
                分享
            </span>
            <span class="card_bottom_btn flex1 ripple_box" @click="fnGoToCmtPage">
                <i class="ion-chatbubble-working"></i>
                评论 {{oSysMsgDetails.reviews || ''}}
            </span>
            <span class="card_bottom_btn flex1 ripple_box" @click="fnGoToRewardPage">
                <i class="ion-eye"></i>
                打赏 {{oSysMsgDetails.rewards || ''}}
            </span>
            <span class="card_bottom_btn flex1 ripple_box" @click="fnSupport">
                <i :style="{color: sSupportColor}" class="ion-thumbsup"></i>
                赞 {{iSupport || ''}}
            </span>
        </div>

        <!-- <Modal v-model="modal1" class-name="vertical-center-modal" :closable="false" width="50%">
            <span class="model_btn" @click="fnGoToModifyCmtPage" style="border-bottom: 1px solid #eee">修改</span>
            <span class="model_btn" @click="fnDelete">删除</span>

            <div slot="footer" style="display: none;"></div>
        </Modal> -->

    </div>
</template>


<script>
    export default({
        data () {
            return {
                oSysMsgDetails: {},
                aCmtList: [],
                modal1: false,
                iSupport: 0,
                isSupported: false,
                bPreventClickSupport: false, //防止过快点赞造成服务器产生错误数据
                sSupportColor: '',
                aSupportInfoShow: [],
                aSupportInfoAll: [],
                bShowSupportButton: true,
                iCurCmtId: null,
                clickShare: false,
                loc: location.href.split('#')[0],
                iTotalCmtNum: 0
            }
        },
        //加载组件时发出请求
        created: function() {
            this.fnGetSysMsgDetails();
        },
        computed: {
            bIsMoreCmt: function() {
                if (!this.aCmtList || this.aCmtList.length >= this.iTotalCmtNum) {
                    return false;
                }
                return true;
            }
        },
        methods: {
            fnGetSysMsgDetails: function() {
                var that = this;
                var type = 'POST';
                var url = '/topic/searchTopicDetail';
                var postData = {};

                postData.id = parseFloat(global.GetArgsFromHref(this.loc, "id"));
                postData.parmType = 1;

                function ajaxSuccess(data) {
                    var oData = JSON.parse(JSON.stringify(data));
                    that.oSysMsgDetails = oData;
                    that.aCmtList = oData.tReviewVos || [];
                    that.iSupport = oData.supports;
                    that.isSupported = oData.isSupported;
                    that.iTotalCmtNum = oData.reviews;
                    that.sSupportColor = oData.isSupported ? '#ff566b' : '#777';
                    that.aSupportInfoAll = oData.tSupportVos;
                    if (!that.aSupportInfoAll) {
                        that.bShowSupportButton = false;
                        that.aSupportInfoShow = [];
                    } else {
                        that.aSupportInfoShow = that.aSupportInfoAll.slice(0, 100);
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnGetTotalCmt: function() {
                var that = this;
                var type = 'POST';
                var url = '/topic/searchTopicReviewsByParm';
                var postData = {};

                postData.pageSize = this.iTotalCmtNum;
                postData.currentPage = 1;
                postData.param = {
                    topicVo: {
                        id: global.GetArgsFromHref(this.loc, "id")
                    }
                };
                function ajaxSuccess(data) {
                    that.aCmtList = data.rows.concat();
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnSupport: function() {
                var that = this;
                var type = 'PUT';
                var url = '/wechat/';
                var postData = {};

                if (this.bPreventClickSupport) {
                    return;
                }

                url += this.isSupported ? 'cancelTopicSupport' : 'addTopicSupport';
                postData.topicId = parseFloat(global.GetArgsFromHref(this.loc, "id"));

                function ajaxSuccess(data) {
                    if (data.success) {
                        that.fnGetSysMsgDetails();
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        }
                    }
                    //防止过快点赞造成服务器产生错误数据
                    setTimeout(function() {
                        that.bPreventClickSupport = false;
                    }, 300);
                }
                global.ajax(type, postData, url, ajaxSuccess);
                this.bPreventClickSupport = true;
            },
            fnShowModal: function(id, content) {
                this.modal1 = true;
                this.iCurCmtId = id;
                this.sCurCmtContent = content;
            },
            fnGoToCmtPage: function() {
                window.location.href = '011-talk.html?id=' + global.GetArgsFromHref(this.loc, "id");
            },
            fnGoToRewardPage: function() {
                window.location.href = '012-reward.html?topicId=' +
                    global.GetArgsFromHref(this.loc, "id") +
                    '&sHead=' + this.oSysMsgDetails.head +
                    '&sUserName=' + encodeURI(this.oSysMsgDetails.username);
            },
            fnGoToPersonalCardListPage: function(id) {
                window.location.href = '008-personalCardList.html?id=' + id;
            },
            fnGoToModifyCmtPage: function() {
                window.location.href = '011-talk.html?id=' + this.iCurCmtId + '&mode=modify' + '&content=' + encodeURI(this.sCurCmtContent);
                this.modal1 = false;
            },
            fnClickShowMoreSupport: function() {
                var iLength = this.aSupportInfoShow.length;
                if (iLength != this.aSupportInfoAll.length) {
                    this.aSupportInfoShow.concat(this.aSupportInfoAll.slice(iLength, iLength + 100));
                } else {
                    this.bShowSupportButton = false;
                }
            },
            fnDelete: function() {
                var that = this;
                var type = 'DELETE';
                var url = '/topic/removeTopicReview';
                var postData = {};

                postData.id = this.iCurCmtId;

                function ajaxSuccess(data) {
                    if (data.success) {
                        $.toast("删除成功");
                        that.modal1 = false;
                        that.fnGetSysMsgDetails();
                    } else {
                        $.toast('删除失败');
                    }
                }

                $.confirm({
                    title: '确认删除',
                    text: '确认删除此评论？',
                    onOK: function () {
                        global.ajax(type, postData, url, ajaxSuccess);
                    },
                    onCancel: function () {
                        setTimeout(function() {that.modal1 = false;}, 500);
                    }
                });
            },
        },
    })
</script>
