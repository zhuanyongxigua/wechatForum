<style scoped>
    .input_class {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
    input[type=checkbox]+span {
        border: 1px solid #dddee1;
        display: inline-block;
        height: 14px;
        width: 14px;
        border-radius: 2px;
        background-color: white;
    }

    input[type=checkbox]:checked+span {
        border-radius: 2px;
        border-color: #2d8cf0;
        background-color: #2d8cf0;
    }

    .interest_item {
        display: inline-block;
    }
</style>

<template class="body_in">
    <div id="interest">
        <div class="send_top" style="border: 0;">
            <Checkbox v-for="item in aHobbyType" v-model="item.status" class="interest_item">{{item.name}}</Checkbox>
        </div>

        <span class="send_btn ripple_box" @click="fnSaveInfo">确定</span>
    </div>
</template>

<script>
    export default({
        data () {
            return {
                oMyInfo: {},
                aHobbyCode: [],
                aHobbyType: []
            }
        },
        //加载组件时发出请求
        created: function() {
            this.fnGetHobbyType();
        },
        methods: {
            fnGetHobbyType() {
                var postData = {};
                var that = this;
                var type = 'POST';
                var url = '/dictionary/searchThreshold';

                postData.type = 'TopicType';

                function ajaxSuccess(data) {
                    that.aHobbyType = JSON.parse(JSON.stringify(data));
                    that.aHobbyType.map(function(ele) {return ele.status = false});
                    that.$nextTick(function() {
                        that.oMyInfo = JSON.parse(localStorage.getItem('oMyInfo'));
                        localStorage.removeItem('oMyInfo');
                        that.oMyInfo.hobby.split('、').forEach(function(ele) {
                            that.aHobbyType.find(function(element) {return element.id == ele;}).status = true;
                        });
                    });
                }
                global.ajax(type, postData, url, ajaxSuccess);
            },
            fnSaveInfo: function() {
                var that = this;
                var type = 'PUT';
                var url = '/wechat/modifyMyInfo';
                var aHobbyCode = [];
                var aHobbyType = [];
                this.aHobbyType.forEach(function(ele) {
                    if (ele.status) {
                        aHobbyCode.push(ele.id);
                        aHobbyType.push(ele.name);
                    }
                });
                this.oMyInfo.hobby = aHobbyCode.join('、');
                this.oMyInfo.hobbyStr = aHobbyType.join('、');

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
