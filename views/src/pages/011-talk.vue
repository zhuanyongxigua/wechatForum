<template class="body_in">
    <div id="talk">
        <div class="send_top" style="border: 0;">
            <textarea class="post_textarea" v-model="oFormInfo.content"></textarea>
        </div>

        <span class="send_btn ripple_box" @click="fnSubmitReview">发表评论</span>

    </div>
</template>


<script>
    var loc = location.href.split('#')[0];
    var id = global.GetArgsFromHref(loc,"id");

    export default({
        data () {
            return {
                id: id,
                oFormInfo: {
                    content: ''
                }
            }
        },
        //加载组件时发出请求
        created: function() {
            this.oFormInfo.content = decodeURI(global.GetArgsFromHref(loc,"content")) || '';
        },
        methods: {
            //发表评论
            fnSubmitReview: function() {
                var postData = {};
                var that = this;
                var type = 'PUT';
                var url = '/wechat/';

                //表单验证
                if(global.verifyIsNull(this.oFormInfo.content)){
                    $.alert('请填写内容');
                    return;
                }

                postData = this.oFormInfo;
                if (global.GetArgsFromHref(loc,"mode")) {
                    postData.id = id;
                    url += 'modifyTopicReview';

                } else {
                    postData.topicId = id;
                    url += 'addTopicReview';
                }


                function ajaxSuccess(data) {
                    if (data.success) {
                        $.alert({
                            title: '提示',
                            text: '提交成功',
                            onOK: function () {
                                window.history.back();
                            }
                        });
                    } else {
                        if (data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        } else {
                            $.alert('评论失败');
                        }
                    }
                }
                global.ajax(type, postData, url, ajaxSuccess);
            }
        },
    })
</script>
