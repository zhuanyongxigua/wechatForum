<style scoped>
    #wrapper {
        position: absolute;
        z-index: 1;
        top: 90px;
        bottom: 0px;
        left: 0;
        width: 100%;
        background: #fff;
        overflow: hidden;
    }

    #scroller {
        position: absolute;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        width: 100%;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -o-text-size-adjust: none;
        text-size-adjust: none;
    }

    #scroller ul {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
        text-align: left;
        overflow: hidden;
        background: #f0f0f0;
    }

    #scroller li {
        width: 100%;
        overflow: hidden;
        float: left;
    }
</style>

<template class="body_in" onload="loaded()">
<div id="followList">
    <div class="news" style="background: #ff566b; border: 0px;">
        <div class="width90_box flex_row">
            <input v-model="queryStr" type="text" class="news_searth_input" placeholder="搜索全部关注"/>
            <span class="news_searth_btn ripple_box" @click="fnGetFollowList(true)">搜索</span>
        </div>
    </div>

    <div id="wrapper">
        <div id="scroller">
            <ul>
                <li v-for="(item, index) in aFollowList">
                    <div class="follow_li">
                        <div class="card_in">
                            <div class="follow_info">
                                <img class="card_info_head" :src="item.head" @click="fnGoToPersonalCardListPage(item.attentionUserId)"/>
                                <div class="card_info_texts">
                                    <span class="card_info_name" @click="fnGoToPersonalCardListPage(item.attentionUserId)">
                                        <span v-text="item.username"></span>
                                    </span>
                                    <span class="card_info_time" v-text="'关注时间:' + item.createDate"></span>
                                </div>
                                <span class="follow_btn ripple_box" @click="fnFollow(index)" :class="{selected: sCurMode === 'followList'? !item.status : !item.attentionId}">
                                    <span v-if="sCurMode === 'followList'? item.status : item.attentionId">已关注</span>
                                    <span v-else>关注</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>


<script>
import {global} from '../../static/js/lib/global'
import {initPhotoSwipeFromDOM} from '../../static/js/lib/PhotoSwipeDemo'
// import IScroll from 'iscroll/build/iscroll-probe.js'
var myScroll, pullUpFlag;
function loaded() {
    myScroll = new IScroll('#wrapper', {
        probeType: 3,
        mouseWheel: true,//鼠标滑轮开启
        shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
        startX: 0,
        startY: 0,
    });
    myScroll.on('scroll',function (){
        if(this.y<(this.maxScrollY-40)){   //判断上拉是否到底且超过一段距离，如超过则说明需要获取更多消息
            if(followList.bIsMore){
                pullUpFlag = 1;
            }
        }
    });

    myScroll.on('scrollEnd', function () {
        if(pullUpFlag == 1){
            if (followList.bIsMore) {
                pullUpFlag = 0;
                setTimeout(function(){
                    followList.iCurrentPage++;
                    followList.fnGetFollowList();
                }, 500)
            }
        }
    });
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, global.isPassive() ? {
    capture: false,
    passive: false
} : false);
    export default({
        data () {
            return {
                aFollowList: [],
                iCurrentPage: 1,
                bIsMore: true,
                queryStr: '',
                loc: location.href.split('#')[0],
                //粉丝列表参数
                attentionId: null
            }
        },
        computed: {
            sCurMode: function() {
                return global.GetArgsFromHref(this.loc, "sCurMode")
            }
        },
        //加载组件时发出请求
        created: function () {
            this.fnGetFollowList();
        },
        methods: {
            fnFollow: function(iCurIndex) {
                var that = this;
                var type = 'PUT';
                var url = '/wechat/';
                var postData = {};

                function ajaxSuccess(data) {
                    if (data.success) {
                        if (that.sCurMode === 'followList') {
                            that.aFollowList[iCurIndex].status = !that.aFollowList[iCurIndex].status;
                            that.aFollowList[iCurIndex].id = data.result.attentionId;
                        } else {
                            that.aFollowList[iCurIndex].attentionId = data.result.attentionId;
                        }
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        }
                    }
                }

                if (this.sCurMode === 'followList' ? this.aFollowList[iCurIndex].status : that.aFollowList[iCurIndex].attentionId) {
                    $.confirm("确认取消关注？", function() {
                        url += 'unfollow';
                        postData.id = that.sCurMode === 'followList'? that.aFollowList[iCurIndex].id : that.aFollowList[iCurIndex].attentionId ;
                        type = 'DELETE';
                        global.ajax(type, postData, url, ajaxSuccess);
                    }, function() {
                        return;
                    });
                } else {
                    url += 'follow';
                    postData.attentionUserId = that.sCurMode === 'followList'? this.aFollowList[iCurIndex].attentionUserId : that.aFollowList[iCurIndex].userId ;
                    global.ajax(type, postData, url, ajaxSuccess);
                }
            },
            fnGetFollowList: function (bIsSearchButton) {
                var postData = {};
                var that = this;
                var type = 'POST';
                var url = '/wechat/searchAttentionList';

                postData.pageSize = 9;
                if (bIsSearchButton) {
                    postData.currentPage = 1;
                    this.iCurrentPage = 1;
                    this.aFollowList = [];
                    this.bIsMore = true;
                } else {
                    postData.currentPage = this.iCurrentPage;
                }
                postData.param = {};
                postData.param.userAttentionVo = {
                    attentionType: this.sCurMode === 'followList' ? 1 : 2,
                    queryStr: this.queryStr,
                    status: true
                };

                function ajaxSuccess(data) {
                    var aData = JSON.parse(JSON.stringify(data));
                    aData.rows.forEach(function(ele) {
                        ele.iRecordId = ele.attentionId;
                        that.aFollowList.push(ele);
                    });
                    if (that.aFollowList.length == data.total) {
                        that.bIsMore = false;
                    }
                    if (myScroll!=undefined) {
                        setTimeout(function() {
                            myScroll.refresh();
                        },100);
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnGoToPersonalCardListPage: function(id) {
                window.location.href = '008-personalCardList.html?id=' + id;
            }
        },
    })
</script>
