<style type="text/css" scoped>
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
    <div>
        <my-homeSysNews></my-homeSysNews>

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
                                    <img class="card_info_head head_icon_img" alt="" src="../../static/img/001.jpg" @click="fnGoToPersonalCardListPage(item.owner)"/>
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
        <my-footer :my-tab="1"></my-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import {global} from '../../static/js/lib/global'
    //图片查看器，显示的部分在app.vue里面。
    import {initPhotoSwipeFromDOM} from '../../static/js/lib/PhotoSwipeDemo'
    import IScroll from 'iscroll/build/iscroll-probe.js'
    import footer from '../components/footer.vue'
    import homeSysNews from '../components/homeSysNews.vue'

    export default{
        data () {
            return {
                tab: {
                    1: true,
                    2: false,
                    3: false,
                    4: false
                },
                oQueryInfo: {
                    queryType: '',
                    typeCode: '',
                    queryStr: ''
                },
                iCurrentPage: 1,
                bIsMore: true,
                aType: [],
                aPostList: [],
                aSysMsg: [],
                sCurPostId: '',
                pullUpFlag: null,
                myScroll: undefined
            }
        } ,
        //加载组件时发出请求
        created() {
            document.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, global.isPassive() ? {
                capture: false,
                passive: false
            } : false);
            //确保tab不会因为页面刷新而重置
            if (localStorage.getItem('oHomeTabInfo')) {
                this.tab = JSON.parse(localStorage.getItem('oHomeTabInfo')).tab;
                this.oQueryInfo.queryType = JSON.parse(localStorage.getItem('oHomeTabInfo')).queryType;
                localStorage.removeItem('oHomeTabInfo');
            }

            window.onbeforeunload = (e) => {
                var oHomeTabInfo = {};
                oHomeTabInfo.tab = this.tab;
                oHomeTabInfo.queryType = this.oQueryInfo.queryType;
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
        components: {
            'my-footer': footer,
            'my-homeSysNews': homeSysNews
        },
        methods: {
            fnGetType() {
                axios.post('api/getRoleType', {type: 'TopicType'})
                    .then(res => {
                        var aData = JSON.parse(JSON.stringify(res.data));
                        aData.unshift({
                            id: '',
                            name: '全部'
                        });
                        this.aType = aData;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            fnGetPostList(bIsSearchButton) {
                var postData = {};

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

                axios.post('api/getPostList', postData)
                    .then(res => {
                        var aData = JSON.parse(JSON.stringify(res.data));
                        if (aData.rows) {
                            aData.rows.forEach((ele) => {
                                ele.aFileImage = [];
                                ele.aFileVideo = [];
                                ele.oFileAudio = {};
                                if (ele.tFileVos) {
                                    ele.tFileVos.forEach((element) => {
                                        if (element.type === 1) {
                                            element.path = global.baseUrl + 'api/getImage/' + element.path;
                                            ele.aFileImage.push(element);
                                        } else if (element.type === 2) {
                                            element.path = global.baseUrl + element.path.slice(2);
                                            ele.aFileVideo.push(element);
                                        } else {
                                            element.path = global.baseUrl + element.path.slice(2);
                                            ele.oFileAudio = element;
                                        }
                                    });
                                }
                                this.aPostList.push(ele);
                            });
                        }

                        if (this.aPostList.length == res.data.total) {
                            this.bIsMore = false;
                        }

                        this.$nextTick(() => {
                            if (this.myScroll != undefined) {
                                setTimeout(() => {
                                    this.myScroll.refresh();
                                }, 100);
                            } else {
                                this.fnLoadIscroll();
                                setTimeout(() => {
                                    this.myScroll.refresh();
                                }, 100);
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            fnLoadIscroll() {
                this.myScroll = new IScroll('#wrapper', {
                    probeType: 3,
                    scrollbars: true,
                    shrinkScrollbars: 'scale',
                    interactiveScrollbars: true,
                    startX: 0,
                    startY: 0,
                });
                this.myScroll.on('scroll', () => {
                    if (this.myScroll.y < (this.myScroll.maxScrollY - 40)) { //判断上拉是否到底且超过一段距离，如超过则说明需要获取更多消息
                        if (this.bIsMore) {
                            this.pullUpFlag = 1;
                        }
                    }
                });

                this.myScroll.on('scrollEnd', () => {
                    if (this.pullUpFlag == 1) {
                        if (this.bIsMore) {
                            this.pullUpFlag = 0;
                            setTimeout(() => {
                                this.iCurrentPage++;
                                this.fnGetPostList();
                            }, 500)
                        }
                    }
                });
            },
            fnChangeTab(index) {
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
            fnGoToCardPage(id, event) {
                var oCurPageOperateRecord = {};
                oCurPageOperateRecord.sCurPostId = 'postLiId' + id;
                oCurPageOperateRecord.aPostList = this.aPostList;
                oCurPageOperateRecord.iCurrentPage = this.iCurrentPage;
                oCurPageOperateRecord.tab = this.tab;
                oCurPageOperateRecord.queryType = this.oQueryInfo.queryType;
                localStorage.setItem('oCurPageOperateRecord', JSON.stringify(oCurPageOperateRecord));
                this.$router.push({path: '005-card', query: {id: id}});
            },
            fnGoToPersonalCardListPage(id) {
                this.$router.push({path: '008-personalCardList', query: {id: id}});
            }
        },
        mounted() {
            //进入帖子详情页后后退，回到原来阅览位置，赋值部分在created钩子下
            this.$nextTick(() => {
                if (this.sCurPostId) {
                    this.fnLoadIscroll();
                    setTimeout(() => {
                        this.myScroll.refresh();
                        this.myScroll.scrollToElement(document.getElementById(this.sCurPostId), 0, 0, -100);
                    }, 100);
                }
            })
        },
        updated() {
            //每次上传新图片后，调整图片高度，使其与宽度相同。
            this.$nextTick(() => {
                var w = window.innerWidth;
                //图片的宽度是通过CSS设置的
                $('.card_img').css('height', w * 0.92 * 0.303333);
                $('.card_talk_img').css('height', (w * 0.92 - 62) * 0.303333);
                global.fnAllImgDelayLoad(true);
                initPhotoSwipeFromDOM('demo-gallery');
            });
        }
    }
</script>
