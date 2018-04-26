<style scoped>
    .post_textarea {
        margin-left: 0px;
    }
</style>

<template class="body_in">
    <div id="talk">
        <div class="send_top" style="border: 0;">
            <textarea class="post_textarea" v-model="oFormInfo.content"></textarea>
        </div>

        <span class="send_btn ripple_box" @click="fnSubmitReview">发表评论</span>

    </div>
</template>

<script>
    import { global } from '../../static/js/lib/global'

    export default({
        data () {
            return {
                loc: location.href.split('#')[1],
                oFormInfo: {
                    content: ''
                }
            }
        },
        //加载组件时发出请求
        created() {
            this.oFormInfo.content = decodeURI(global.GetArgsFromHref(this.loc,"content")) || '';
        },
        methods: {
            //发表评论
            fnSubmitReview() {
                let postData = {};
                let url = '/api/';

                //表单验证
                if(global.verifyIsNull(this.oFormInfo.content)){
                    $.alert('请填写内容');
                    return;
                }

                postData = this.oFormInfo;
                if (global.GetArgsFromHref(this.loc, "mode")) {
                    postData.id = global.GetArgsFromHref(this.loc, "id");;
                    url += 'modifyTopicReview';

                } else {
                    postData.postId = global.GetArgsFromHref(this.loc, "id");;
                    url += 'addCmt';
                }

                axios.post(url, postData)
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                        $.alert({
                            title: '提示',
                            text: '提交成功',
                            onOK: function () {
                                window.history.back();
                            }
                        });
                    } else {
                        if (res.data.message === 'USER_BAN_CODE') {
                            $.alert('账户禁用，无法操作');
                        } else {
                            $.alert('评论失败');
                        }
                    }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
    })
</script>
