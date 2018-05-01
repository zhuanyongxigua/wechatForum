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
            this.oFormInfo.content = this.$route.query.content || '';
        },
        methods: {
            //发表评论
            fnSubmitReview() {
                let postData = {};
                //表单验证
                if(global.verifyIsNull(this.oFormInfo.content)){
                    $.alert('请填写内容');
                    return;
                }

                postData.content = this.oFormInfo.content;
                if (this.$route.query.mode) {
                    postData.id = this.$route.query.id;
                } else {
                    postData.postId = this.$route.query.id;
                }

                axios.post('/api/editCmt', postData)
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
