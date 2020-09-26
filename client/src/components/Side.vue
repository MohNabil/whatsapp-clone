<template>
  <div>
    <div class="side__top">
      <ChatUser
        :name="user.name"
        :imageSrc="user.name === 'Mohamed Nabil' ? 'https://lh3.googleusercontent.com/a-/AOh14GjTtce9IhwJ0irEWcEO1y4nOWfXrHMDwwxKV2sjtQ' : null"
      />
      <div class="side__top--left">
        <b-icon-bullseye></b-icon-bullseye>
        <b-icon-chat-left-text-fill></b-icon-chat-left-text-fill>
        <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
      </div>
    </div>
    <div class="side__search">
      <input type="text" class="search-input" placeholder="search your contacts" />
      <b-icon-search class="search-icon"></b-icon-search>
    </div>
    <div class="side__body">
      <div class="side__body--header">
        <h2>List of Friends Chat</h2>
      </div>
      <div v-for="friend in friends" :key="friend.name">
        <ChatUser
          :name="friend.name"
          :message="friend.messages && friend.messages.items && friend.messages.items[0] ? friend.messages.items[0].message: null"
          :class="`${frName === friend.name ? 'active': ''}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  BIconChatLeftTextFill,
  BIconBullseye,
  BIconThreeDotsVertical,
  BIconSearch
} from "bootstrap-vue";
import ChatUser from "../components/ChatUser";
export default {
  components: {
    BIconChatLeftTextFill,
    BIconBullseye,
    BIconThreeDotsVertical,
    BIconSearch,
    ChatUser
  },
  data() {
    return {
      friends: []
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    frName() {
      return this.$store.state.clickedFriend;
    }
  },
  created() {
    fetch("https://whatsappserver-app.herokuapp.com/users")
      .then(res => res.json())
      .then(
        data =>
          (this.friends = data.filter(item => item.name !== this.user.name))
      )
      .catch(err => console.log(err));
  }
  // methods: {
  //   async fetchUserData() {
  //     const name = this.clickedFriend;
  //     const result = await fetch(
  //       `http://localhost:9000/getUserMessages/${name}`
  //     );
  //     try {
  //       const res = await result.json();
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.side__top {
  background: lightgray;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .side__top--left {
    width: 30%;
    margin-right: 20px;
    font-size: 1.2em;
    display: flex;
    justify-content: space-evenly;
  }
}
.side__search {
  height: 50px;
  background: #e9e7e7;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  .search-input {
    border: none;
    outline-width: 0;
    flex: 1;
    padding: 5px;
    border-radius: 15px;
    margin: 0 5px;
  }
  .search-icon {
    position: absolute;
    right: 10px;
  }
}
.side__body {
  .side__body--header {
    text-align: left;
    margin: 10px 0 10px 10px;
    border-bottom: 1px solid lightgray;
  }
}
.active {
  background: lightgrey;
}
</style>