<style scoped>
    #card {
      font-size: 12px;
      line-height: 1.5;
      text-align: left;
    }
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

    .cover_div {
        background: #000000;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 500;
        opacity: 0.6;
        filter: Alpha(opacity=70);
    }

    .follow_btn {
        margin-left: 5px;
        margin-right: -5px;
    }

    .card_img {
        background: url("../../static/img/imgLoading.gif") no-repeat center;
        background-size: 30px 30px;
    }

    .card_info_head {
        background: url("../../static/img/imgLoading.gif") no-repeat center;
        background-size: 10px 10px;
    }

    [v-cloak] {
        display: none;
    }
</style>

<template>
    <div id="card">
        <div class="share_box" :class="{show:clickShare}" @click="clickShare = false">
            <img class="share" src="../../static/img/share.png">
            <div class="shade"></div>
        </div>
        <router-link to="/001-home">
            <div class="back_home">
              <i class="ion-chevron-left"></i>返回首页
            </div>
        </router-link>
            <div class="card">
            <div class="card_in">
                <div class="card_info">
                    <img class="card_info_head" @click="fnGoToPersonalCardListPage(false)" :true-src="oPostDetails.head"/>
                    <div class="card_info_texts" @click="fnGoToPersonalCardListPage(false)">
                        <span class="card_info_name" v-text="oPostDetails.username"></span>
                        <span class="card_info_time" v-text="oPostDetails.publishDate"></span>
                    </div>

                    <span class="card_label">
                         <i class="icon ion-ios-pricetags-outline"></i>
                         <span v-text="oPostDetails.type"></span>
                     </span>

                    <span v-cloak v-if="bIsShowDelay && oPostDetails.isOwn" class="operate_btn ripple_box shineBox" @click="fnShowModal(oPostDetails.id, oPostDetails.content, 'modifyPost')">
                        <i class="ion-ios-gear"></i>
                    </span>

                    <span v-cloak v-if="bIsShowDelay && !oPostDetails.isOwn" class="follow_btn ripple_box shineBox" @click="fnFollow" :class="{selected:bIsFollow}">
                        <span v-if="bIsFollow">已关注</span>
                        <span v-if="!bIsFollow">关注</span>
                    </span>
                </div>
                <div class="card_title">
                    浏览量：<span v-text="oPostDetails.views"></span>
                </div>
                <div class="card_title">
                    <p v-text="oPostDetails.title"></p>
                </div>
                <div class="card_texts">
                    <p v-text="oPostDetails.content"></p>
                </div>
                <div class="card_imgs">
                    <div class="demo-gallery">
                        <a v-for="item in aImages" :href="item.path" data-size="" :data-med="item.path" data-med-size="">
                            <img class="card_img" alt=""  :true-src="item.path"/>
                        </a>
                    </div>
                    <div class="demo-gallery">
                        <video class="card_img" poster="" v-for="item in aVideos" :id="item.id" controls>
                            <source :src="item.path" type="video/ogg">
                            <source :src="item.path" type="video/mp4">
                            <source :src="item.path" type="video/webm">
                            Your browser does not support the video tag
                        </video>
                    </div>
                    <div class="demo-gallery" v-if="oAudio.path" v-cloak>
                        <audio controls>
                            <source :src="oAudio.path" type="audio/ogg">
                            <source :src="oAudio.path" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
                <div class="card_video">

                </div>
            </div>
        </div>

        <div class="zan" v-if="aSupportInfoShow.length !== 0" v-cloak>
            <div class="flex_row zan_top">
                <i class="ion-ios-heart-outline"></i>
                <div class="flex1">
                    <img v-for="item in aSupportInfoShow" class="support_head" @click="fnGoToPersonalCardListPage(item.id)" :true-src="item.head"/>
                </div>
            </div>

            <span class="more_btn" @click="fnClickShowMoreSupport" v-if="bShowSupportButton" v-cloak>点击显示更多点赞</span>
        </div>

        <div class="card_talk_box">
            <div v-for="(item, index) in aCmtList" class="card_talk">
                <div class="card_in">
                    <div class="card_info">
                        <img class="card_info_head" @click="fnGoToPersonalCardListPage(item.id)" :true-src="item.head"/>
                        <div class="card_info_texts">
                            <span class="card_info_name" @click="fnGoToPersonalCardListPage(item.id)">
                                <span v-text="item.username"></span>
                                <span style="float: right" v-text="index + 1 + '楼'"></span>
                            </span>
                            <span class="card_info_time" v-text="item.createDate"></span>
                            <div class="talk_texts">
                                <p v-text="item.content"></p>
                            </div>
                        </div>

                        <span v-if="item.isOwn" class="operate_btn2 ripple_box" @click="fnShowModal(item.id, item.content, 'modifyCmt')" v-cloak>
                            <i class="ion-ios-gear"></i>
                        </span>
                    </div>

                </div>
            </div>
        </div>

        <span class="more_btn" v-if="bIsMoreCmt" @click="fnGetTotalCmt" v-cloak>点击查看更多评论</span>

        <div style="height: 40px; width: 100%; float: left;"></div>

        <div class="card_bottom_btns flex_row" v-cloak>
            <span class="card_bottom_btn flex1 ripple_box" @click="clickShare = true">
                <i class="ion-android-open"></i>
                分享
            </span>
            <span class="card_bottom_btn flex1 ripple_box" @click="fnGoToCmtPage">
                <i class="ion-chatbubble-working"></i>
                评论  {{oPostDetails.reviews || ''}}
            </span>
            <span v-if="bIsShowDelay && !oPostDetails.isOwn" class="card_bottom_btn flex1 ripple_box" @click="fnGoToRewardPage">
                <i class="ion-eye"></i>
                打赏 {{oPostDetails.rewards || ''}}
            </span>
            <span class="card_bottom_btn flex1 ripple_box" @click="fnSupport">
                <i :style="{color: sSupportColor}" class="ion-thumbsup"></i>
                赞  {{iSupport || ''}}
            </span>
        </div>

        <!-- <div :style="{display: bIsShowButton ? 'block' : 'none'}">
            <span class="model_btn" @click="fnGoToModify" :style="{borderBottom: sIsBorderBottomStyle}">修改</span>
            <span class="model_btn" v-if="sCurModifyType === 'modifyCmt'" @click="fnDelete">删除</span>
        </div> -->

    </div>
</template>

<script>
    import { global } from '../../static/js/lib/global'
    import { initPhotoSwipeFromDOM } from '../../static/js/lib/PhotoSwipeDemo'

    export default({
        data() {
            return {
                loc: location.href.split('#')[1],
                modal1: false,
                oPostDetails: {},
                aCmtList: [],
                iSupport: 0,
                isSupported: false, //是否已点赞
                bPreventClickSupport: false, //防止过快点赞造成服务器产生错误数据
                sSupportColor: '',
                aSupportInfoShow: [],
                aSupportInfoAll: [],
                bShowSupportButton: true,
                iCurCmtId: null,
                clickShare: false,
                aImages: [],
                aVideos: [],
                aAudios: [],
                oAudio: {},
                sCurModifyType: '',
                iTotalCmtNum: 0,
                bIsFollow: false,       //是否已关注
                bIsShowDelay: false,     //解决v-if在vue实例化后才渲染而产生的延迟闪烁
                bIsShowButton: false,
            }
        },
        //加载组件时发出请求
        created: function() {
            this.fnGetPostDetails();
        },
        computed: {
            bIsMoreCmt: function() {
                if (!this.aCmtList || this.aCmtList.length >= this.iTotalCmtNum) {
                    return false;
                }
                return true;
            },
            sIsBorderBottomStyle: function() {
                return this.sCurModifyType === 'modifyCmt' ? '1px solid #eee' : 'none';
            }
        },
        methods: {
            fnGetPostDetails: function() {
                var that = this;
                var type = 'GET';
                var url = '/api/getPostDtl?id=' + global.GetArgsFromHref(this.loc, "id");
                // axios.

                function ajaxSuccess(data) {
                    var oData = JSON.parse(JSON.stringify(data.row));
                    var aCurImages = [];
                    var aCurVideos = [];
                    var aCurAudios = [];
                    var oCurAudio = {};

                    that.oPostDetails = oData;
                    that.bIsShowDelay = true;
                    that.aCmtList = oData.tReviewVos;
                    that.iTotalCmtNum = oData.reviews;
                    that.aFileList = oData.tFileVos;
                    if (oData.tFileVos) {
                        oData.tFileVos.forEach(function(ele) {
                            if (ele.type === 1) {
                                ele.path = global.baseurl + ele.path;
                                aCurImages.push(ele);
                            } else if (ele.type === 2) {
                                ele.path = global.baseurl + ele.path.slice(2);
                                aCurVideos.push(ele);
                            } else {
                                if (!ele.path) return;
                                ele.path = global.baseurl + ele.path.slice(2);
                                oCurAudio = ele;
                            }
                        });
                        that.aImages = aCurImages;
                        that.aVideos = aCurVideos;
                        that.oAudio = oCurAudio;
                    }
                    that.iSupport = oData.supports;
                    that.isSupported = oData.isSupported;
                    that.bIsFollow = oData.attentionId || oData.attentionId == 0 ? true : false;
                    that.sSupportColor = oData.isSupported ? '#ff566b' : '#777';
                    that.aSupportInfoAll = oData.tSupportVos;
                    if (!that.aSupportInfoAll) {
                        that.bShowSupportButton = false;
                        that.aSupportInfoShow = [];
                    } else {
                        that.aSupportInfoShow = that.aSupportInfoAll.slice(0, 100);
                    }
                }
                global.ajax(type, false, url, ajaxSuccess);
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
                        that.fnGetPostDetails();
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
            fnFollow: function() {
                var that = this;
                var type = 'PUT';
                var url = '/wechat/';
                var postData = {};

                if (this.bIsFollow) {
                    url += 'unfollow';
                    postData.id = this.oPostDetails.attentionId;
                    type = 'DELETE';
                } else {
                    url += 'follow';
                    postData.attentionUserId = this.oPostDetails.owner;
                }

                function ajaxSuccess(data) {
                    if (data.success) {
                        that.fnGetPostDetails();
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        }
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnDelete: function() {
                var that = this;
                var type = 'DELETE';
                var url = '/topic/removeTopicReview';
                var postData = {};

                postData.id = this.sCurModifyType === 'modifyCmt' ? this.iCurCmtId : null;

                function ajaxSuccess(data) {
                    if (data.success) {
                        $.toast("删除成功");
                        that.modal1 = false;
                        that.fnGetPostDetails();
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
            fnShowModal: function(id, content, type) {
                this.modal1 = true;
                this.iCurCmtId = id;
                this.sCurCmtContent = content;
                this.sCurModifyType = type;
            },
            fnGoToCmtPage: function() {
                window.location.href = '011-talk.html?id=' + global.GetArgsFromHref(this.loc, "id");
            },
            fnGoToRewardPage: function() {
                window.location.href='012-reward.html?topicId='
                    + global.GetArgsFromHref(this.loc, "id")
                    + '&sHead=' + this.oPostDetails.head
                    + '&sUserName=' + this.oPostDetails.username;
            },
            fnGoToPersonalCardListPage: function(id) {
                window.location.href='008-personalCardList.html?id=' + (id || this.oPostDetails.owner);
            },
            fnGoToModify: function() {
                if (this.sCurModifyType === 'modifyCmt') {
                    window.location.href = '011-talk.html?id=' + this.iCurCmtId + '&mode=modify' + '&content=' + encodeURI(this.sCurCmtContent);
                } else {
                    window.location.href = '003-send.html?id=' + this.iCurCmtId + '&mode=modify' + '&content=';
                }
                this.modal1 = false;
            },
            fnClickShowMoreSupport: function() {
                var iLength = this.aSupportInfoShow.length;
                if (iLength != this.aSupportInfoAll.length) {
                    this.aSupportInfoShow.concat(this.aSupportInfoAll.slice(iLength, iLength + 100));
                } else {
                    this.bShowSupportButton = false;
                }
            }
        },
        updated: function() {
            this.$nextTick(function() {
                var w = $(window).get(0).innerWidth;
                $('.card_img').css('height', w * 0.94 * 0.303333);
                $('.card_talk_img').css('height', (w * 0.94 - 62) * 0.303333);
                global.fnAllImgDelayLoad(true);
                initPhotoSwipeFromDOM('demo-gallery');
            })
        }
    });
</script>
