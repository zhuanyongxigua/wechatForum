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

    #wrapper2 {
        position: absolute;
        z-index: 1;
        top: 40px;
        bottom: 0px;
        left: 0;
        width: 100%;
        background: #f0f0f0;
        overflow: hidden;
        height: 200px;
    }
</style>

<template class="body_in" onload="loaded()">
<div id="newsList">
    <div class="news" style="background: #ff566b; border: 0px;">
        <div class="width90_box flex_row">
            <input v-model="queryStr" type="text" class="news_searth_input" placeholder="搜索消息"/>
            <span class="news_searth_btn ripple_box" @click="getSysMsgList(true)">搜索</span>
        </div>
    </div>

    <div id="wrapper">
        <div id="scroller">
            <ul>
                <li v-for="item in aSysMsgList" class="ripple_box" @click="fnGotoSysMsgDetails(item.id)">
                    <div class="news_list">
                        <div class="card_in">
                            <div class="news_info">
                                <i class="ion-chatbubble-working"></i>
                                <div class="card_info_texts">
                                    <span class="news_info_title" v-text="item.title"></span>
                                    <span class="card_info_time" v-text="item.createDate"></span>
                                </div>
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
            if(newsList.bIsMore){
                pullUpFlag = 1;
            }
        }
    });

    myScroll.on('scrollEnd', function () {
        if(pullUpFlag == 1){
            if (newsList.bIsMore) {
                pullUpFlag = 0;
                setTimeout(function(){
                    newsList.iCurrentPage++;
                    newsList.getSysMsgList();
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
        data() {
            return {
                aSysMsgList: [],
                iCurrentPage: 1,
                bIsMore: true,
                queryStr: ''
            }
        },
        //加载组件时发出请求
        created: function () {
            this.getSysMsgList();
        },
        methods: {
            getSysMsgList: function (bIsSearchButton) {
                var postData = {};
                var that = this;
                var type = 'POST';
                var url = '/topic/searchTopicsByParm';

                if (bIsSearchButton) {
                    this.aSysMsgList = [];
                    this.iCurrentPage = 1;
                    this.bIsMore = true;
                }

                postData.pageSize = 9;
                postData.currentPage = this.iCurrentPage;
                postData.param = {};
                postData.param.topicVo = {
                    type1: 2,
                    title: this.queryStr,
                    status: true
                };

                function ajaxSuccess(data) {
                    var aData = JSON.parse(JSON.stringify(data));
                    aData.rows.forEach(function(ele) {
                        that.aSysMsgList.push(ele);
                    });
                    if (that.aSysMsgList.length == data.total) {
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
            fnGotoSysMsgDetails: function(id) {
                window.location.href = '007-news.html?id=' + id;
            }
        },
    })
</script>
