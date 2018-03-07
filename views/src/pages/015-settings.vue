<style scoped>
    input {
        width: 77px;
        height: 77px;
        opacity: 0;
        position: absolute;
        top: 17px;
        margin-left: -38.5px;
        left: 50%;
    }
</style>

<template class="body_in">
    <div id="settings">
        <div class="usercenter_top">
            <div class="usercenter_head">
                <img class="usercenter_head_img" :src="oMyInfo.iconUrl"/>
            </div>
            <input id="fileImage" name="file" type="file" accept="image/*" @click="fnCallUploadPlugin">

            <span class="my_top_name" style="font-size: 13px;">点击修改头像</span>
        </div>

        <div class="settings_li" @click="fnGoToEditPage('username')">
            <div class="width90_box">
                <span class="settings_label">昵称</span>
                <span class="settings_item">
                        <span v-text="oMyInfo.username"></span>
                </span>
            </div>
        </div>

        <div class="settings_li">
            <div class="width90_box">
                <span class="settings_label">性别</span>
                <span class="settings_item2">
                    <select v-model="oMyInfo.sex" class="settings_select">
                        <option value="m">男</option>
                        <option value="f">女</option>
                    </select>
                </span>
            </div>
        </div>

        <div class="settings_li">
            <div class="width90_box">
                <span class="settings_label">身份</span>
                <span class="settings_item2">
                    <select v-model="oMyInfo.typeCode" class="settings_select">
                        <option v-for="item in aRoleType" :value="item.id" v-text="item.name"></option>
                    </select>
                </span>
            </div>
        </div>

        <div class="settings_li" @click="fnGoToEditPage('introduction')">
            <div class="width90_box">
                <span class="settings_label">简要介绍</span>
                <div class="settings_item">
                    <span v-text="oMyInfo.introduction"></span>
                </div>
            </div>
        </div>

        <div class="settings_li" @click="fnGoToInterestPage">
            <div class="width90_box">
                <span class="settings_label">个人爱好</span>
                <span class="settings_item">
                    <span v-text="oMyInfo.hobbyStr"></span>
                </span>
            </div>
        </div>

        <span class="send_btn ripple_box" @click="fnModifySettingInfo">保存</span>

    </div>
</template>

<script>
    export default({
        data () {
            return {
                oMyInfo: {},
                aRoleType: []
            }
        },
        //加载组件时发出请求
        created: function () {
            this.fnGetRoleType();
        },
        methods: {
            fnGetMyInfo: function() {
                var postData = {};
                var that = this;
                var type = 'POST';
                var url = '/wechat/myInfo';

                function ajaxSuccess(data) {
                    that.oMyInfo = Object.assign({}, data);
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnGetRoleType: function() {
                var postData = {};
                var that = this;
                var type = 'POST';
                var url = '/dictionary/searchThreshold';

                postData.type = 'UserType';

                function ajaxSuccess(data) {
                    data.forEach(function(ele) {
                        that.aRoleType.push(ele)
                    });
                    that.fnGetMyInfo();
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnModifySettingInfo: function () {
                var that = this;
                var type = 'PUT';
                var url = '/wechat/modifyMyInfo';
                var postData = {};

                function ajaxSuccess(data) {
                    if (data.success) {
                        $.alert("保存成功" + (data.message ? ('，' + data.message) : '') + '!');
                        that.fnGetMyInfo();
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                            return;
                        }
                    }
                }

                //表单验证
                if (!this.oMyInfo.username) {
                    $.alert("昵称不能为空");
                    return;
                }

                this.aRoleType.forEach(function(ele) {
                    if (ele.id == that.oMyInfo.typeCode) {
                        that.oMyInfo.type = ele.name;
                    }
                });
                postData = this.oMyInfo;
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnCallUploadPlugin: function() {
                var that = this;
                $('#fileImage').fileupload({
                    dataType: 'json',
                    add: function(e, data) {
                        data.url = global.baseurl + '/wechat/upload?beforeHead=' + that.oMyInfo.iconUrl;
                        if (data.files[0].size / 1024 / 1024 <= 10) {
                            data.submit();
                        } else {
                            alert("文件太大");
                        }
                    },
                    done: function(e, data) {
                        if (data.result === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                            return;
                        }
                        that.oMyInfo.iconUrl = global.baseurl + data.result;
                    },
                    fail: function(e, data) {
                        $.alert('上传失败');
                    }
                });
            },
            fnGoToEditPage: function(sMode) {
                localStorage.setItem('oMyInfo', JSON.stringify(this.oMyInfo));
                window.location.href = '016-edit.html?mode=' + sMode;
            },
            fnGoToInterestPage: function() {
                localStorage.setItem('oMyInfo', JSON.stringify(this.oMyInfo));
                window.location.href = '017-interest.html';
            }
        },
    })
</script>
