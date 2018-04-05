<style type="text/css" scoped>
    #wrapper {
        position: absolute;
        z-index: 1;
        top: 0px;
        bottom: 110px;
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
        overflow: auto;
        background: #f0f0f0;
    }

    #scroller li {
        width: 100%;
        overflow: auto;
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

    .searth_input {
        background: #eee url('') no-repeat 5px 9px;
        padding-left: 10px;
    }

    .searth_box {
        position: absolute;
        bottom: 51px;
    }

    .card_texts {
        float: none;
    }

    .card_info_name {
        font-weight: 20;
        font-size: 10px;
    }
</style>

<template class="body_in">
    <div>
        <div id="wrapper" style="overflow: auto;">
            <div id="scroller">
                <ul>
                    <li v-for="item in aPostList">
                        <div class="card">
                            <div class="card_in">
                                <div class="card_info">
                                    <div>
                                        <img class="card_info_head head_icon_img" alt="" :src="item.avatar"/>
                                    </div>
                                    <div>
                                        <div class="">
                                            <span class="card_info_name" v-text="item.username + '    ' + item.createdAt"></span>
                                        </div>
                                        <div class="card_texts">
                                            <p v-text="item.content"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="searth_box">
            <div class="searth_box_in">
                <input v-model="sPostMessage" type="text" class="searth_input" @keyup.enter="fnPostMsg"/>
                <span class="searth_btn" @click="fnPostMsg">发送</span>
            </div>
        </div>
        <my-footer :my-tab="5"></my-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import footer from '../components/footer.vue';
    import io from 'socket.io-client';
    import config from '../../config'
    export default{
        data () {
            return {
                oQueryInfo: {
                    queryType: '',
                    typeCode: '',
                    queryStr: ''
                },
                sPostMessage: '',
                bIsMore: true,
                aPostList: [],
                socket: null,
                aMsgList: [],
                isLogin: false,
                oMyInfo: {}
            }
        } ,
        //加载组件时发出请求
        created() {
            this.fnGetMyInfo();
            this.socket = io.connect(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:8080');
            this.socket.on('receive', (data) => {
                this.aPostList = this.aPostList.concat(data);
            })
        },
        components: {
            'my-footer': footer
        },
        methods: {
            fnGetMyInfo() {
                axios.post('api/myInfo', {})
                    .then(res => {
                        this.isLogin = true;
                        this.oMyInfo = Object.assign({}, res.data);
                    })
                    .catch(err => {
                        if (err.response.status === 403 || err.response.status === 401) {
                            $.alert("在’我的‘页面登陆之后才能参与聊天，没有登录只能查看消息，无法发送");
                        }
                    })
            },
            fnPostMsg() {
                if (!this.isLogin) {
                    $.alert("在'我的'页面登录之后才能参与聊天，没有登录只能查看消息，无法发送");
                    return;
                }
                if (!this.sPostMessage) {
                    $.alert("内容不能为空");
                    return;
                }
                let oPostData = {};
                oPostData.githubId = this.oMyInfo.githubId;
                oPostData.content = this.sPostMessage;
                oPostData.username = this.oMyInfo.username;
                oPostData.avatar = this.oMyInfo.avatar;

                this.socket.emit('postMessage', oPostData);
                this.sPostMessage = '';
            }
        },
        watch: {
            aPostList() {
                this.$nextTick(() => {
                    document.getElementById('wrapper').scrollTop = document.getElementById('wrapper').scrollHeight;
                })
            },
        },
        mounted() {
        },
        updated() {
        }
    }
</script>
