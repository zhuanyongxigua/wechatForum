<style type="text/css">
    #wrapper {
        position: absolute;
        z-index: 1;
        top: 130px;
        bottom: 50px;
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
        /*transform: translateZ(0);*/
        transform: translate3d(0, 0, 0);
        /*-webkit-transform: translateZ(0);*/
        -webkit-transform: translate3d(0, 0, 0);
        /*-moz-transform: translateZ(0);*/
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
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

    /*swiper*/

    .swiper-wrapper {
        height: 50px;
    }

    .swiper-slide {
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 14px;
        overflow: hidden;
        padding-right: 10px;
    }

    .card_img {
        background: url("../../static/img/imgLoading.gif") no-repeat center;
        background-size: 30px 30px;
    }

    .head_icon_img {
        background: url("../../static/img/imgLoading.gif") no-repeat center;
        background-size: 10px 10px;
    }
</style>

<template class="body_in">
    <div id="home">
        <div class="share_box" :class="{show:clickShare}" @click="clickShare = false">
            <img class="share" src="" true-src="../../static/img/share.png">
            <div class="shade"></div>
        </div>

        <div class="news">
            <div class="news_in">
                <span class="news_title" onclick="window.location.href='006-newsList.html'">
                    <i class="icon ion-chatbubble-working"></i>
                    更多系统消息：
                </span>
                <!-- Swiper -->
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div v-for="item in aSysMsg" class="swiper-slide" @click="fnGoToSysMsgDetails(item.id)" v-text="item.title"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab_btns">
            <span class="tab_btn ripple_box" @click="fnChangeTab(1)">
            <span class="tab_btn_in" :class="{selected:tab[1]}">最新</span>
            </span>
            <span class="tab_btn ripple_box" @click="fnChangeTab(2)">
            <span class="tab_btn_in" :class="{selected:tab[2]}">最热</span>
            </span>
            <span class="tab_btn ripple_box" @click="fnChangeTab(3)">
            <span class="tab_btn_in" :class="{selected:tab[3]}">推荐</span>
            </span>
            <span class="tab_btn ripple_box" @click="fnChangeTab(4)">
            <span class="tab_btn_in" :class="{selected:tab[4]}">关注</span>
            </span>
        </div>
        <div id="wrapper">
            <div id="scroller">
                <ul>
                    <li>
                        <div class="searth_box" v-show="tab[1]">
                            <div class="searth_box_in">
                                <select v-model="oQueryInfo.typeCode" class="form-control options" @change="fnGetPostList(true)">
                                    <option v-for="item in aType" :value="item.id" v-text="item.name"></option>
                                </select>
                                <input v-model="oQueryInfo.queryStr" type="text" class="searth_input" placeholder="搜索标题" />
                                <span class="searth_btn" @click="fnGetPostList(true)">搜索</span>
                            </div>
                        </div>
                    </li>

                    <li v-for="item in aPostList" :id="'postLiId' + item.id">
                        <div class="card">
                            <div class="card_in">
                                <div class="card_info">
                                    <img class="card_info_head head_icon_img" alt="" src="" @click="fnGoToPersonalCardListPage(item.owner)" :true-src="item.head" />
                                    <div class="card_info_texts">
                                        <span class="card_info_name" @click="fnGoToPersonalCardListPage(item.owner)" v-text="item.username">
                                         <span class="user_type" v-text="item.identity"></span>
                                        </span>
                                        <span class="card_info_time" v-text="item.publishDate"></span>
                                    </div>
                                    <span class="card_label">
                                         <i class="icon ion-ios-pricetags-outline"></i>
                                         <span style="font-size: 12px" v-text="item.type"></span>
                                    </span>
                                </div>
                                <div class="card_title" @click="fnGoToCardPage(item.id, $event)">
                                    <p v-text="item.title"></p>
                                </div>
                                <div class="card_texts" @click="fnGoToCardPage(item.id, $event)">
                                    <p v-text="item.content"></p>
                                </div>
                                <div class="card_imgs">
                                    <div class="demo-gallery">
                                        <a v-for="imageItem in item.aFileImage" :href="imageItem.path" data-size="" :data-med="imageItem.path" data-med-size="">
                                            <img class="card_img" src="" alt="" :true-src="imageItem.path"/>
                                        </a>
                                    </div>
                                    <div class="demo-gallery" v-if="item.aFileVideo.length">
                                        <img v-for="videoItem in item.aFileVideo" class="card_img" src="../../static/img/video_player.jpg" alt="" />
                                    </div>
                                    <div class="demo-gallery" v-if="item.oFileAudio.path">
                                        <audio :src="item.oFileAudio.path" controls></audio>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

        <div class="foot_menu">
            <span id="column1" class="ripple_box selected">首页</span>
            <span id="column2" class="ripple_box" onclick="window.location.href='002-score.html'">赚积分</span>
            <span id="column3" class="ripple_box" onclick="window.location.href='003-send.html'">发帖</span>
            <span id="column4" class="ripple_box" onclick="window.location.href='004-my.html'">我的</span>
        </div>

        <!-- 图片查看器共用部分 -->
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>

                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter"></div>
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button class="pswp__button pswp__button--share" title="Share"></button>
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                                <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// import global
var myScroll, pullUpFlag;

function loaded() {
    myScroll = new IScroll('#wrapper', {
        probeType: 3,
        scrollbars: true,
        shrinkScrollbars: 'scale',
        interactiveScrollbars: true,
        startX: 0,
        startY: 0,
    });
    myScroll.on('scroll', function() {
        if (this.y < (this.maxScrollY - 40)) { //判断上拉是否到底且超过一段距离，如超过则说明需要获取更多消息
            if (home.bIsMore) {
                pullUpFlag = 1;
            }
        }
    });

    myScroll.on('scrollEnd', function() {
        if (pullUpFlag == 1) {
            if (home.bIsMore) {
                pullUpFlag = 0;
                setTimeout(function() {
                    home.iCurrentPage++;
                    home.fnGetPostList();
                }, 500)
            }
        }
    });
}

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, global.isPassive() ? {
    capture: false,
    passive: false
} : false);

    export default {
        el: "#home",
        data () {
            return {
                tab: {
                    1: true,
                    2: false,
                    3: false,
                    4: false
                },
                oQueryInfo: {
                    queryType: 1,
                    typeCode: '',
                    queryStr: ''
                },
                clickShare: false,
                iCurrentPage: 1,
                bIsMore: true,
                aType: [],
                aPostList: [],
                aSysMsg: [],
                sCurPostId: ''
            }
        } ,
        //加载组件时发出请求
        created: function() {
            //确保tab不会因为页面刷新而重置
            if (localStorage.getItem('oHomeTabInfo')) {
                this.tab = JSON.parse(localStorage.getItem('oHomeTabInfo')).tab;
                this.oQueryInfo.queryType = JSON.parse(localStorage.getItem('oHomeTabInfo')).queryType;
                localStorage.removeItem('oHomeTabInfo');
            }

            window.onbeforeunload = function(e) {
                var oHomeTabInfo = {};
                oHomeTabInfo.tab = home.tab;
                oHomeTabInfo.queryType = home.oQueryInfo.queryType;
                localStorage.setItem('oHomeTabInfo', JSON.stringify(oHomeTabInfo));
            }
            //进入帖子详情页后后退，回到原来阅览位置，滚动部分在mounted钩子下
            if (localStorage.getItem('oCurPageOperateRecord')) {
                var oCurPageOperateRecord = JSON.parse(localStorage.getItem('oCurPageOperateRecord'));
                this.sCurPostId = oCurPageOperateRecord.sCurPostId;
                this.aPostList = oCurPageOperateRecord.aPostList;
                this.iCurrentPage = oCurPageOperateRecord.iCurrentPage;
                this.tab = oCurPageOperateRecord.tab;
                this.oQueryInfo.queryType = oCurPageOperateRecord.queryType;
                localStorage.removeItem('oCurPageOperateRecord');
            } else {
                this.fnGetPostList(true);
            }
            this.fnGetType();
            // this.fnGetSysMsg();
        },
        methods: {
            fnGetType: function() {
                var postData = {};
                var type = 'POST';
                var url = '/api/getRoleType';
                var that = this;

                postData.type = 'TopicType';

                function ajaxSuccess(data) {
                    var aData = JSON.parse(JSON.stringify(data));
                    aData.unshift({
                        id: '',
                        name: '全部'
                    });
                    that.aType = aData;
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnGetPostList: function(bIsSearchButton) {
                var postData = {};
                var type = 'POST';
                var url = '/api/getPostList';
                var that = this;

                postData.pageSize = 10;
                if (bIsSearchButton) {
                    postData.currentPage = 1;
                    this.iCurrentPage = 1;
                    this.aPostList = [];
                    this.bIsMore = true;
                } else {
                    postData.currentPage = this.iCurrentPage;
                }

                postData.param = {};
                postData.param.topicVo = this.oQueryInfo;


                function ajaxSuccess(data) {
                    var aData = JSON.parse(JSON.stringify(data));
                    if (aData.rows) {
                        aData.rows.forEach(function(ele) {
                            ele.aFileImage = [];
                            ele.aFileVideo = [];
                            ele.oFileAudio = {};
                            if (ele.tFileVos) {
                                ele.tFileVos.forEach(function(element) {
                                    if (element.type === 1) {
                                        element.path = global.baseurl + '/api/getImage/' + element.path;
                                        ele.aFileImage.push(element);
                                    } else if (element.type === 2) {
                                        element.path = global.baseurl + element.path.slice(2);
                                        ele.aFileVideo.push(element);
                                    } else {
                                        element.path = global.baseurl + element.path.slice(2);
                                        ele.oFileAudio = element;
                                    }
                                });
                            }
                            that.aPostList.push(ele);
                        });
                    }

                    if (that.aPostList.length == data.total) {
                        that.bIsMore = false;
                    }

                    that.$nextTick(function() {
                        if (myScroll != undefined) {
                            setTimeout(function() {
                                myScroll.refresh();
                            }, 100);
                        } else {
                            loaded();
                            setTimeout(function() {
                                myScroll.refresh();
                            }, 100);
                        }
                    })


                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnGetSysMsg: function() {
                var postData = {};
                var type = 'POST';
                var url = '/wechat/searchSystemTopics';
                var that = this;

                function ajaxSuccess(data) {
                    var aData = JSON.parse(JSON.stringify(data));
                    data.forEach(function(ele) {
                        that.aSysMsg.push(ele);
                    });
                    that.$nextTick(function() {
                        //swiper
                        var swiper = new Swiper('.swiper-container', {
                            direction: 'vertical',
                            loop: true, //循环
                            autoplay: {
                                delay: 2500,
                                disableOnInteraction: false,
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                        });
                    });
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnChangeTab: function(index) {
                for (var ele in this.tab) this.tab[ele] = false;
                this.tab[index] = true;
                this.bIsMore = true;
                this.aPostList = [];
                this.iCurrentPage = 1;
                this.oQueryInfo = {
                    queryType: index,
                    typeCode: '',
                    queryStr: ''
                };
                this.fnGetPostList();
            },
            fnGoToSysMsgDetails: function(id) {
                window.location.href = '007-news.html?id=' + id;
            },
            fnGoToCardPage: function(id, event) {
                var oCurPageOperateRecord = {};
                oCurPageOperateRecord.sCurPostId = 'postLiId' + id;
                oCurPageOperateRecord.aPostList = this.aPostList;
                oCurPageOperateRecord.iCurrentPage = this.iCurrentPage;
                oCurPageOperateRecord.tab = this.tab;
                oCurPageOperateRecord.queryType = this.oQueryInfo.queryType;
                localStorage.setItem('oCurPageOperateRecord', JSON.stringify(oCurPageOperateRecord));
                window.location.href = '005-card.html?id=' + id;
            },
            fnGoToPersonalCardListPage: function(id) {
                window.location.href = '008-personalCardList.html?id=' + id;
            }
        },
        mounted: function() {
            //进入帖子详情页后后退，回到原来阅览位置，赋值部分在created钩子下
            this.$nextTick(function() {
                if (this.sCurPostId) {
                    loaded();
                    setTimeout(function() {
                        myScroll.refresh();
                        myScroll.scrollToElement(document.getElementById(home.sCurPostId), 0, 0, -100);
                    }, 100);
                }
            })
        },
        updated: function() {
            //每次上传新图片后，调整图片高度，使其与宽度相同。
            this.$nextTick(function() {
                var w = $(window).get(0).innerWidth;
                //图片的宽度是通过CSS设置的
                $('.card_img').css('height', w * 0.92 * 0.303333);
                $('.card_talk_img').css('height', (w * 0.92 - 62) * 0.303333);
                global.fnAllImgDelayLoad(true);
                initPhotoSwipeFromDOM('demo-gallery');
            });
        }
    }
</script>
