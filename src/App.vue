<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
  import Nav from './components/Nav.vue'
  export default {
    name: 'App',
    components: {
      Nav
    }
  }
</script>
<style>
  @import './assets/css/styles.css';
</style>
