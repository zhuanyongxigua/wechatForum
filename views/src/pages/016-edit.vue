<template class="body_in">
    <div id="edit">
        <div class="send_top" style="border: 0;">
            <textarea class="post_textarea" v-model="sContent"></textarea>
        </div>

        <span class="send_btn ripple_box" @click="fnSaveInfo">确定</span>

    </div>
</template>


<script>
    export default({
        data () {
            return {
                sContent: '',
                loc: location.href.split('#')[0],
                oMyInfo: {}
            }
        },
        //加载组件时发出请求
        created: function () {
            this.fnGetMyInfo();
        },
        methods: {
            fnGetMyInfo: function () {
                this.oMyInfo = JSON.parse(localStorage.getItem('oMyInfo'));
                localStorage.removeItem('oMyInfo');
                if (global.GetArgsFromHref(this.loc, 'mode') === 'username') {
                    this.sContent = this.oMyInfo.username;
                } else {
                    this.sContent = this.oMyInfo.introduction;
                }
            },
            fnSaveInfo: function() {
                var that = this;
                var type = 'PUT';
                var url = '/wechat/modifyMyInfo';
                if (global.GetArgsFromHref(this.loc, 'mode') === 'username') {
                    this.oMyInfo.username = this.sContent;
                    if (global.verifyIsNull(this.sContent)) {
                        $.alert("不能为空");
                        return;
                    }
                } else {
                    this.oMyInfo.introduction = this.sContent;
                }

                function ajaxSuccess(data) {
                    if (data.success) {
                        $.alert("保存成功" + (data.message ? ('，' + data.message) : '') + '!', function() {
                            history.back();
                        });
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                            return;
                        } else {
                            $.alert('保存失败');
                        }
                    }
                }

                global.ajax(type, this.oMyInfo, url, ajaxSuccess);
            }
        },
    })
</script>
