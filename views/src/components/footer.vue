<style type="text/css" scoped>

</style>

<template class="body_in">
    <div class="">
        <div class="foot_menu">
            <router-link to="/001-home">
                <span id="column1" class="ripple_box selected">首页</span>
            </router-link>
            <router-link to="/002-score">
                <span id="column2" class="ripple_box">赚积分</span>
            </router-link>
            <router-link to="/003-send">
                <span id="column3" class="ripple_box">发帖</span>
            </router-link>
            <router-link to="/004-my">
                <span id="column4" class="ripple_box">我的</span>
            </router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data () {
            return {
                tab: {
                    1: true,
                    2: false,
                    3: false,
                    4: false
                }
            }
        } ,
        //加载组件时发出请求
        created() {

        },
        methods: {
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
            }
        },
        mounted() {

        },
        updated() {

        }
    }
</script>
