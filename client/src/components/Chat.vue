<template>
  <div>
    <div class="chat__top">
      <ChatUser
        :name="user.name"
        :message="user.timestamp ? `Last seen ${user.timestamp}` : null"
        :imageSrc="user.name === 'Mohamed Nabil' ? 'https://lh3.googleusercontent.com/a-/AOh14GjTtce9IhwJ0irEWcEO1y4nOWfXrHMDwwxKV2sjtQ' : null"
      />
      <div class="chat__top--left">
        <b-icon-search></b-icon-search>
        <b-icon-paperclip></b-icon-paperclip>
        <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
      </div>
    </div>
    <div class="chat__body">
      <div
        v-for="msg in friendMessages.filter(msg => {
        if(this.clickedFriend){
          return msg.sendTo === this.user.name && msg.name === this.clickedFriend
        }
        return msg
        })"
        :key="msg.id"
      >
        <Message
          :name="msg.name"
          :message="msg.message"
          :time="msg.timestamp"
          :status="!msg.received"
        />
      </div>
      <div v-for="msg in userMessages" :key="msg.id">
        <Message
          :name="msg.name"
          :message="msg.message"
          :time="msg.timestamp"
          :status="msg.received"
        />
      </div>
    </div>
    <div class="chat__bottom">
      <b-icon-emoji-smile></b-icon-emoji-smile>
      <form class="chat__bottom--form" @submit="e => sendMsg(e)">
        <input type="text" class="msg-input" placeholder="Enter your message" v-model="message" />
        <button type="submit" class="send-btn">
          <b-icon-caret-right></b-icon-caret-right>
        </button>
      </form>
      <b-icon-mic></b-icon-mic>
    </div>
  </div>
</template>

<script>
import {
  BIconThreeDotsVertical,
  BIconSearch,
  BIconPaperclip,
  BIconMic,
  BIconEmojiSmile,
  BIconCaretRight
} from "bootstrap-vue";
import ChatUser from "../components/ChatUser";
import Message from "../components/Message";
import Pusher from "pusher-js";
export default {
  components: {
    BIconThreeDotsVertical,
    BIconSearch,
    BIconPaperclip,
    BIconMic,
    BIconEmojiSmile,
    BIconCaretRight,
    ChatUser,
    Message
  },
  data() {
    return {
      message: "",
      userMessages: [],
      friendMessages: []
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    clickedFriend() {
      return this.$store.state.clickedFriend;
    }
  },
  methods: {
    sendMsg(e) {
      e.preventDefault();
      const data = {
        message: this.message,
        name: this.user.name,
        timestamp: `${new Date().toLocaleString()}`,
        received: false,
        userId: this.user._id,
        sendTo: this.clickedFriend
      };
      fetch("https://whatsappserver-app.herokuapp.com/postMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          fetch("https://whatsappserver-app.herokuapp.com/addMsg", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(result => result.json())
            .then(data => {
              console.log(data);
            })
            .catch(err => console.log(err));
          this.message = "";
        })
        .catch(err => console.log(err));
    },
    async fetchAllData() {
      const result = await fetch(
        "https://whatsappserver-app.herokuapp.com/getAllMessages"
      );
      try {
        const res = await result.json();
        const userMsgs = res.filter(item => item.userId === this.user._id);
        const friendMsgs = res.filter(item => item.userId !== this.user._id);
        this.userMessages = [...userMsgs];
        this.friendMessages = [...friendMsgs];
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.fetchAllData();
    const pusher = new Pusher("dc6b2b525a365c4d4ac1", {
      cluster: "eu"
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", data => {
      this.userMessages = [...this.userMessages, data];
    });
  },
  mounted() {
    const pusher = new Pusher("dc6b2b525a365c4d4ac1", {
      cluster: "eu"
    });

    const channel = pusher.subscribe("messages");
    channel.unbind("inserted");
  }
};
</script>

<style lang="scss" scoped>
.chat__top {
  background: lightgray;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .chat__top--left {
    width: 30%;
    margin-right: 20px;
    font-size: 1.2em;
    display: flex;
    justify-content: space-evenly;
  }
}
.chat__body {
  height: calc(100vh - 150px);
  width: 100%;
  margin: 0 auto;
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  overflow: auto;
}
.chat__bottom {
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid lightgray;
  background: lightgray;
  .chat__bottom--form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    .msg-input {
      flex: 1;
      border: none;
      outline-width: 0;
      background: #fff;
      padding: 10px;
      border-radius: 15px;
      margin: 0 10px;
    }
    .send-btn {
      background: transparent;
      padding: 2px;
      height: 30px;
    }
  }
  svg {
    font-size: 1.25em;
  }
}
</style>