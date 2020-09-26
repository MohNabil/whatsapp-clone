<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col cols="3" class="side-container">
          <Side />
        </b-col>
        <b-col cols="9" class="chat-container">
          <Chat />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Side from "./components/Side";
import Chat from "./components/Chat";
export default {
  name: "Home",
  components: {
    Side,
    Chat
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  .side-container {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    border: 1px solid gray;
  }
  .chat-container {
    padding: 0;
  }
}
</style>
