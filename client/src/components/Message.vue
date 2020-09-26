<template>
  <div :class="status ? 'leftMsg' : 'rightMsg'">
    <div :class="status  ? 'recieved' : 'sender'">
      <p class="name">{{name}}</p>
      <p class="message">{{message}}</p>
      <p class="time">{{time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "message", "time", "status"]
};
</script>

<style lang="scss" scoped>
.sender,
.recieved {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: black;
  width: 40%;
  border-radius: 15px;
  padding: 10px;
  margin: 20px 10px;
  p {
    margin: 0;
  }
  .name {
    position: absolute;
    top: -15px;
    font-size: 0.75em;
    font-weight: bold;
  }
}
.recieved {
  background: #fff;
}
.sender {
  background: #d0eeba;
}
.leftMsg {
  display: flex;
  justify-content: flex-start;
}
.rightMsg {
  display: flex;
  justify-content: flex-end;
}
</style>