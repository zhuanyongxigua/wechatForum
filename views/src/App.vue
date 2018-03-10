<template>
  <div id="app">
    <router-view/>
    <my-photoContainer></my-photoContainer>
  </div>
</template>

<script>
//专门用于显示图片的html部分，只要在整个项目中引入一份就可以了
import photoContainer from './components/photoContainer.vue'
export default {
  name: 'App',
  components: {
      'my-photoContainer': photoContainer
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
