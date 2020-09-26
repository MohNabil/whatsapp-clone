<template>
  <div id="app">
    <div v-if="!user">
      <router-view />
    </div>
    <div v-if="user">
      <Home />
    </div>
  </div>
</template>

<script>
import Home from "./Home";
export default {
  components: {
    Home
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fff;
}
</style>
