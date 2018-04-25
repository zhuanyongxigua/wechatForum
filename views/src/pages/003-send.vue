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
                <div v-for="(item, index) in aFileImage" class="post_img">
                    <img :id="'imgID' + index" :src="item.path">
                    <span class="delete_img_btn ripple_box" @click="aFileImage.splice(index, 1)"></span>
                </div>
            </div>
        </div>

        <div class="send_bottom">
            <div class="medias_tab_btns">
                <span class="medias_tab_btn selected" @click="fnChangeTab(1)">
                    <i class="ion-android-image"></i>
                </span>
            </div>

            <div class="post_medias">
                <div>
                    <span class="add_img_btn">
                        <input id="fileImage" name="file" type="file" accept="image/*" @change="fnSelectFile" multiple>
                    </span>
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
    import footer from '../components/footer.vue'

    export default ({
        data() {
            return {
                oFormInfo: {
                    typeCode: '',
                    title: '',
                    content: ''
                },
                aFileImage: [],
                aFileImageInServer: [],
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
                    var oData = R.clone(data);
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
            fnGetType() {
                axios.post('api/getRoleType', {type: 'TopicType'})
                    .then(res => this.aType = R.clone(res.data))
                    .catch(console.log);
            },
            fnPublishPost() {
                var postData = {};
                var that = this;
                var url = 'api/';
                var oAudioObj = {};

                //表单验证
                let channelOne = function(x) {
                    this._value = x;
                }
                channelOne.of = x => new channelOne(x);
                R.selectChannel = f => val => val.constructor === channelOne ? val : f(val);
                let mySecurity = x => y => z => z[x] || z[x] === 0 ? z : channelOne.of(y);
                let myAlert = x => {
                    if (x.constructor === channelOne) {
                        $.alert(x._value);
                        return false;
                    } else {
                        return true;
                    }
                }
                  
                let isPass = R.compose(
                    myAlert,
                    R.selectChannel(mySecurity('content')('请填写内容')),
                    R.selectChannel(mySecurity('title')('请填写标题')),
                    R.selectChannel(mySecurity('typeCode')('请选择类型'))
                )(this.oFormInfo);
                if (!isPass) return;
                
                postData.type = this.aType.find(ele => ele.id == that.oFormInfo.typeCode).name;
                postData.typeCode = this.oFormInfo.typeCode;
                postData.title = this.oFormInfo.title;
                postData.content = this.oFormInfo.content;
                postData.tFileVos = [];

                if (global.GetArgsFromHref(this.loc, 'mode')) {
                    let aNew = R.differentWith(R.eqProps('id'), this.aFileImage, this.aFileImageInServer);
                    let aDel = R.differentWith(R.eqProps('id'), this.aFileImageInServer, this.aFileImage);
                    url = url + 'modifyUserTopic';
                    postData.id = global.GetArgsFromHref(this.loc, 'id');
                } else {
                    url = url + 'addUserPost';
                }
                let fd = new FormData();
                this.aFileImage.forEach(ele => {
                    fd.append('file', ele, ele.name);
                })
                
                axios.post('api/uploadImage', fd, {
                    onUploadProgress: uploadEvent => {
                        console.log('upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
                    }
                })
                    .then(res => {
                        res.data.rows.forEach(ele => postData.tFileVos.push({id: ele._id}));
                        return axios.put(url, postData);
                    })
                    .then(res => {
                        if (res.data.success) {
                            $.hideLoading();
                            $.alert({
                                title: '提示',
                                text: '提交成功' + (res.data.message ? ('，' + res.data.message) : '') + '!',
                                onOK: function() {
                                    that.$router.push("001-home");
                                }
                            });
                            localStorage.removeItem('aFileImage');
                        } else {
                            if (res.data.message === 'USER_BAN_CODE') {
                                $.alert('账户禁用，无法操作');
                            } else {
                                $.alert({
                                    title: '提示',
                                    text: '发帖失败',
                                });
                            }
                        }
                    })
                    .catch(err => {
                        $.hideLoading();
                        if (err.response.status === 403 || err.response.status === 401) {
                            $.alert("请登录之后再发帖");
                        } else {
                            $.alert("提交失败");
                        }
                    });
                $.showLoading("正在提交");
            },
            fnSelectFile(event) {
                this.oSelectedFile = event.target.files[0];
                const windowURL = window.URL || window.webkitURL || window.mozURL;
                let dataURL = windowURL.createObjectURL(this.oSelectedFile);
                this.oSelectedFile.path = dataURL;
                this.oSelectedFile.myType = 'local';
                this.aFileImage.push(this.oSelectedFile);
                event.target.value = "";
            },
        },
        mounted() {},
        updated() {
            //每次上传新图片后，调整图片高度，使其与宽度相同。
            this.$nextTick(() => {
                let w = $(window).get(0).innerWidth;
                //图片的宽度通过CSS设置
                $('.post_img').css('height', w * 0.94 * 0.23);
                $('.post_img img').css('height', w * 0.94 * 0.23);
                $('.add_img_btn').css('height', w * 0.94 * 0.23);
                $('.ts_box').css('height', w * 0.94 * 0.23);
            });
        }
    })
</script>
