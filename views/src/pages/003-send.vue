<style scoped>
    .add_img_btn {
        border: none;
    }

    .add_img_btn input {
        height: 80px;
    }

    .stop_record {
        background-color: #0aa5df;
    }

    .post_title_input,
    .post_textarea {
      margin-left: 0px;
    }

    .medias_tab_btn {
        float: left;
        margin-left: 5px;
    }

    [v-cloak] {
        display: none;
    }
</style>

<template class="body_in">
    <div id="send">
        <div class="send_top">
            <div>
                <select v-model="oFormInfo.typeCode" class="post_title_input" style="padding-left: 0px;">
                    <option value="">请选择类别</option>
                    <option v-for="item in aType" :value="item.id" v-text="item.name"></option>
                </select>
            </div>
            <input v-model="oFormInfo.title" class="post_title_input" placeholder="请输入标题" />
            <textarea v-model="oFormInfo.content" class="post_textarea" placeholder="请输入内容"></textarea>
            <div class="post_medias">
                <div v-for="item in aFileImage" class="post_img">
                    <img :id="'imgID' + item.id" :src="item.path">
                    <span class="delete_img_btn ripple_box" @click="fnDelMedia(item.id, 'image')"></span>
                </div>
                <div v-for="item in aFileVideo" class="post_img">
                    <img :id="'videoId' + item.id" src="../../static/img/video_player.jpg">
                    <span class="delete_img_btn ripple_box" @click="fnDelMedia(item.id, 'video')"></span>
                </div>
            </div>

            <div class="post_medias">
                <div v-show="oLocalWechatAudioInfo.localId" class="post_play">
                    <div class="record_square" style="" @click="fnPlayRecord">
                        <i class="ion-play"></i>
                    </div>
                    <span class="delete_img_btn2 ripple_box" @click="fnDelMedia('id', 'audio')"></span>
                </div>
                <audio v-if="oAudio.path" :src="oAudio.path" controls></audio>
                <span v-if="oAudio.path" class="delete_img_btn2 ripple_box" @click="fnDelMedia('id', 'audio')"></span>
            </div>
        </div>

        <div class="send_bottom">
            <div class="medias_tab_btns">
                <span class="medias_tab_btn" @click="fnChangeTab(1)" :class="{selected:tab[1]}">
                    <i class="ion-android-image"></i>
                </span>
            </div>

            <div class="post_medias">
                <div v-show="tab[1]">
                    <span class="add_img_btn">
                    <input id="fileImage" name="file" type="file" accept="image/*" @change="fnSelectFile" multiple>
                </span>
                </div>

                <div v-show="tab[2]">
                    <span class="add_img_btn">
                    <input id="fileVideo" name="filename" type="file" accept="video/*" multiple>
                </span>
                    <span class="ts_box">
                    提示：支持标清30秒左右(100秒以内)本地小视频
                </span>
                </div>

                <div v-show="tab[3]">
                    <span v-if="!bRecording" class="send_btn2" @click="fnStartRecord">点击录音</span>
                    <span v-else class="send_btn2 stop_record" @click="fnStopRecord">停止录音</span>
                </div>
            </div>
        </div>

        <span class="send_btn ripple_box" @click="fnPublishPost">确认发送</span>

        <div style="height: 50px; width: 100%; float: left;"></div>

        <my-footer my-tab="3"></my-footer>
    </div>
</template>

<script>
    import {global} from '../../static/js/lib/global'
    import '../../node_modules/jquery-weui/dist/js/jquery-weui.js'
    import footer from '../components/footer.vue'

    export default ({
        data() {
            return {
                tab: {
                    1: true,
                    2: false,
                    3: false
                },
                oFormInfo: {
                    typeCode: '',
                    title: '',
                    content: ''
                },
                aFileImage: [],
                aFileVideo: [],
                aFileModifyNewMedia: [],
                aFileModifyDelMedia: [],
                oAudio: {},
                aType: [],
                sWechatServerAudioId: '',
                oLocalWechatAudioInfo: {},
                bIsShowHtmlAudioTag: false,
                loc: location.href.split('#')[0],
                bRecording: false,
                bIsShowDelay: false, //解决v-if在vue实例化后才渲染而产生的延迟闪烁
                oSelectedFile: {},
            }
        },
        //加载组件时发出请求
        created: function() {
            this.fnGetType();
            this.fnDelInvalidMediaFiles();
        },
        components: {
          'my-footer': footer
        },
        methods: {
            fnGetPostDetails() {
                var that = this;
                var type = 'POST';
                var url = '/topic/searchTopicDetail';
                var postData = {};

                this.aFileImage = [];
                this.aFileVideo = [];
                this.aAudios = [];
                this.oAudio = {};

                postData.id = parseFloat(global.GetArgsFromHref(this.loc, 'id'));
                postData.parmType = 1;

                function ajaxSuccess(data) {
                    var oData = JSON.parse(JSON.stringify(data));
                    that.oPostDetails = oData;
                    that.oFormInfo.typeCode = oData.typeCode;
                    that.oFormInfo.title = oData.title;
                    that.oFormInfo.content = oData.content;
                    that.aFileList = oData.tFileVos;
                    oData.tFileVos.forEach(function(ele) {
                        if (ele.type === 1) {
                            ele.path = global.baseurl + ele.path;
                            that.aFileImage.push(ele);
                        } else if (ele.type === 2) {
                            ele.path = global.baseurl + ele.path.slice(2);
                            that.aFileVideo.push(ele);
                        } else {
                            ele.path = global.baseurl + ele.path.slice(2);
                            that.oAudio = ele;
                        }
                    });
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnGetWechatPermsInfo() {
                var postData = {};
                var that = this;
                var type = 'POST';
                var url = 'http://www.11wdkj.com/forum/wechatRest/createJsapiSignature';

                postData.message = this.loc;

                $.ajax({
                    type: type,
                    url: url,
                    contentType: "application/json",
                    dataType: 'json',
                    data: JSON.stringify(postData),
                    success: function(data) {
                        wx.config({
                            debug: false,
                            appId: data.signatrue.appId,
                            timestamp: data.signatrue.timestamp,
                            nonceStr: data.signatrue.nonceStr,
                            signature: data.signatrue.signature,
                            jsApiList: [
                                'startRecord',
                                'stopRecord',
                                'playVoice',
                                'uploadVoice',
                                'chooseImage'
                            ]
                        });
                    }
                });

            },
            fnGetType() {
                var postData = {};
                var that = this;
                var type = 'POST';
                var url = '/api/getRoleType';

                postData.type = 'TopicType';

                function ajaxSuccess(data) {
                    data.forEach(function(ele) {
                        that.aType.push(ele)
                    });
                    if (global.GetArgsFromHref(that.loc, 'mode')) {
                        that.fnGetPostDetails();
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnPublishPost() {
                var postData = {};
                var that = this;
                var type = 'PUT';
                var url = '/api/';
                var oAudioObj = {};

                //表单验证
                for (var index in this.oFormInfo) {
                    if (global.verifyIsNull(this.oFormInfo[index].toString())) {
                        switch (index) {
                            case 'typeCode':
                                $.alert('请选择类型');
                                return;
                            case 'title':
                                $.alert('请填写标题');
                                return;
                            case 'content':
                                $.alert('请填写内容');
                                return;
                        }
                    }
                }

                postData.type = this.aType.find(function(ele) {
                    return ele.id == that.oFormInfo.typeCode;
                }).name;
                postData.typeCode = this.oFormInfo.typeCode;
                postData.title = this.oFormInfo.title;
                postData.content = this.oFormInfo.content;
                postData.tFileVos = [];

                if (global.GetArgsFromHref(this.loc, 'mode')) {
                    url = url + 'modifyUserTopic';
                    postData.tFileVos = this.aFileModifyNewMedia;
                    postData.delFileVos = this.aFileModifyDelMedia;
                    postData.id = global.GetArgsFromHref(this.loc, 'id');
                    if (this.sWechatServerAudioId) {
                        oAudioObj.audioId = this.sWechatServerAudioId;
                        postData.tFileVos.push(oAudioObj);
                    }
                } else {
                    url = url + 'addUserPost';
                    this.aFileImage.forEach(function(ele) {
                        var obj = {};
                        obj.id = ele.id;
                        postData.tFileVos.push(obj);
                    });
                    this.aFileVideo.forEach(function(ele) {
                        var obj = {};
                        obj.id = ele.id;
                        postData.tFileVos.push(obj);
                    });
                    if (this.sWechatServerAudioId) {
                        oAudioObj.audioId = this.sWechatServerAudioId;
                        postData.tFileVos.push(oAudioObj);
                    }
                }

                function ajaxSuccess(data) {
                    if (data.success) {
                        $.alert({
                            title: '提示',
                            text: '提交成功' + (data.message ? ('，' + data.message) : '') + '!',
                            onOK: function() {
                                that.$router.push("001-home");
                            }
                        });
                        localStorage.removeItem('aFileImage');
                        localStorage.removeItem('aFileVideo');
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        } else {
                            $.alert({
                                title: '提示',
                                text: '发帖失败',
                            });
                        }
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnDelMedia(iCurId, sCurType) {
                var postData = {};
                var oCurFile = {};
                var that = this;
                var type = 'DELETE';
                var url = '/wechat/deleteFile';

                if (global.GetArgsFromHref(this.loc, 'mode')) {
                    if (sCurType === 'image') {
                        this.aFileImage.forEach(function(ele, index) {
                            if (ele.id === iCurId) {
                                that.aFileModifyDelMedia.push(ele);
                                that.aFileImage.splice(index, 1);
                            }
                        });
                    }
                    if (sCurType === 'video') {
                        this.aFileVideo.forEach(function(ele, index) {
                            if (ele.id === iCurId) {
                                that.aFileModifyDelMedia.push(ele);
                                that.aFileVideo.splice(index, 1);
                            }
                        });
                    }
                    if (sCurType === 'audio') {
                        this.aFileModifyDelMedia.push(this.oAudio);
                        this.oAudio = {};
                    }
                    return;
                }

                if (sCurType === 'audio') {
                    this.oLocalWechatAudioInfo = {};
                    this.sWechatServerAudioId = '';
                    return;
                }

                oCurFile.id = iCurId;
                postData.delFileVos = [];
                postData.delFileVos.push(oCurFile);

                function ajaxSuccess(data) {
                    if (data.success) {
                        if (sCurType === 'image') {
                            that.aFileImage.forEach(function(ele, index) {
                                if (ele.id === iCurId) {
                                    that.aFileImage.splice(index, 1);
                                }
                            });
                            localStorage.setItem('aFileImage', JSON.stringify(that['aFileImage']));
                        }
                        if (sCurType === 'video') {
                            that.aFileVideo.forEach(function(ele, index) {
                                if (ele.id === iCurId) {
                                    that.aFileVideo.splice(index, 1);
                                }
                            });
                            localStorage.setItem('aFileVideo', JSON.stringify(that['aFileVideo']));
                        }
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            //重新加载页面时删除服务器无效的多媒体文件
            fnDelInvalidMediaFiles() {
                var aFileImage = JSON.parse(localStorage.getItem('aFileImage'));
                var aFileVideo = JSON.parse(localStorage.getItem('aFileVideo'));
                var postData = {};
                var that = this;
                var type = 'DELETE';
                var url = '/wechat/deleteFile';

                postData.delFileVos = [];
                if (aFileImage || aFileVideo) {
                    if (aFileImage) {
                        aFileImage.forEach(function(ele) {
                            var obj = {};
                            obj.id = ele.id;
                            postData.delFileVos.push(obj);
                        })
                    }
                    if (aFileVideo) {
                        aFileVideo.forEach(function(ele) {
                            var obj = {};
                            obj.id = ele.id;
                            postData.delFileVos.push(obj);
                        })
                    }

                    function ajaxSuccess(data) {
                        if (data.success) {
                            localStorage.removeItem('aFileImage');
                            localStorage.removeItem('aFileVideo');
                        }
                    }
                    global.ajax(type, postData, url, ajaxSuccess);
                }
            },
            fnChangeTab(index) {
                for (var ele in this.tab) this.tab[ele] = false;
                this.tab[index] = true;
            },
            fnStartRecord() {
                this.bRecording = true;
                this.bIsShowDelay = true;
                wx.startRecord({
                    success: function() {},
                    cancel: function() {
                        alert('用户拒绝授权录音');
                    }
                });
            },
            fnStopRecord() {
                var that = this;
                this.bRecording = false;
                wx.stopRecord({
                    success: function(res) {
                        that.oLocalWechatAudioInfo = res;
                        that.aFileModifyDelMedia.push(that.oAudio);
                        that.oAudio = {};
                        wx.uploadVoice({
                            localId: that.oLocalWechatAudioInfo.localId,
                            isShowProgressTips: 1,
                            success: function(res) {
                                that.sWechatServerAudioId = res.serverId
                            }
                        });
                    }
                });
            },
            fnPlayRecord() {
                wx.playVoice({
                    localId: this.oLocalWechatAudioInfo.localId,
                    success: function(res) {
                        console.log(res);
                    }
                });
            },
            fnSelectFile(event) {
                this.oSelectedFile = event.target.files[0];
                const fd = new FormData();
                fd.append('file', this.oSelectedFile, this.oSelectedFile.name)
                axios.post('/api/uploadImage', fd, {
                    onUploadProgress: uploadEvent => {
                        console.log('upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
                    }
                })
                    .then(res => {
                        event.target.value = "";
                        if ('path' in res.data) {
                            if (res.data.path === 'USER_BAN_CODE') {
                                $.alert('账户禁用，无法操作');
                                return;
                            }
                            var oData = JSON.parse(JSON.stringify(res.data));
                            oData.path = global.baseUrl + '/api/getImage/' + oData.path;
                            this["aFileImage"].push(oData);
                            localStorage.setItem("aFileImage", JSON.stringify(this["aFileImage"]));
                            if (global.GetArgsFromHref(this.loc, 'mode')) {
                                this.aFileModifyNewMedia.push(oData);
                            }
                        }
                    })
                    .catch(console.log)
            },
            fnWechatChooseImg() {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        console.log('chooseSuccess');
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    }
                });
            }
        },
        mounted() {
            // this.fnGetWechatPermsInfo();
        },
        updated() {
            //每次上传新图片后，调整图片高度，使其与宽度相同。
            this.$nextTick(function() {
                var w = $(window).get(0).innerWidth;
                //图片的宽度通过CSS设置
                $('.post_img').css('height', w * 0.94 * 0.23);
                $('.post_img img').css('height', w * 0.94 * 0.23);
                $('.add_img_btn').css('height', w * 0.94 * 0.23);
                $('.ts_box').css('height', w * 0.94 * 0.23);
            });
        }
    })
</script>
