<template>
  <div id="app">
      <navigation></navigation>
      <router-view/>
      <foot></foot>
  </div>
</template>

<script>
  import navigation from '@/components/navigation';
  import foot from '@/components/foot';

  export default {
    name: 'App',
    components:
      {
        navigation,foot
      }
  }
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: gainsboro;
}
</style>
