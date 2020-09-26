<template>
  <div class="user-container">
    <b-avatar variant="info" :text="!imageSrc ? userLetters : null" size="3em" :src="imageSrc"></b-avatar>
    <div class="user-info">
      <p @click="getFriendName(name)" class="friend">{{name}}</p>
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "message", "imageSrc"],
  computed: {
    userLetters() {
      const nameArray = this.name.split(" ");
      const firstLetters = nameArray.map(name => name[0]).join("");
      return firstLetters;
    }
  },
  methods: {
    getFriendName(name) {
      this.$store.commit("setFriend", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 10px;
    p {
      margin: 0;
      font-size: 0.75em;
      &:first-child {
        font-weight: bold;
        font-size: 1em;
      }
    }
    .friend {
      cursor: pointer;
    }
  }
}
</style>