<style type="text/css" scoped>

</style>

<template class="body_in">
    <div class="">
        <div class="foot_menu">
            <router-link to="/001-home">
                <span id="column1" :class="{ripple_box: true, selected: myTab == '1'}">首页</span>
            </router-link>
            <router-link to="/002-score">
                <span id="column2" :class="{ripple_box: true, selected: myTab == '2'}">赚积分</span>
            </router-link>
            <router-link to="/003-send">
                <span id="column3" :class="{ripple_box: true, selected: myTab == '3'}">发帖</span>
            </router-link>
            <router-link to="/004-my">
                <span id="column4" :class="{ripple_box: true, selected: myTab == '4'}">我的</span>
            </router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data () {
            return {

            }
        } ,
        props:['myTab'],
        //加载组件时发出请求
        created() {
            
        },
        methods: {

        },
        mounted() {

        },
        updated() {

        }
    }
</script>
