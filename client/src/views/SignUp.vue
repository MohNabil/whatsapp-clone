<template>
  <b-container>
    <b-row>
      <b-col>
        <img src="../../src/assets/whatsapp-logo.png" alt="logo" class="logo-img" />
        <h2>Sign Up to Mohamed's Nabil Whatsapp</h2>
        <b-form class="signup-form" @submit="sendData().prevent">
          <b-form-group id="input-group-1" label="Email" label-for="input-1">
            <b-form-input
              id="input-1"
              type="email"
              v-model="email"
              required
              placeholder="Enter Email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input
              id="input-2"
              type="password"
              v-model="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Name" label-for="input-3">
            <b-form-input
              id="input-3"
              type="text"
              v-model="name"
              required
              placeholder="Enter Your Name"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Sign Up</b-button>
        </b-form>
        <div class="msg">{{msg}}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      msg: ""
    };
  },
  methods: {
    async sendData() {
      const data = {
        name: this.name,
        password: this.password,
        email: this.email
      };
      const postData = await fetch("http://localhost:9000/postUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      try {
        const result = await postData.json();
        if (result) {
          this.msg = "You successfully Signed Up";
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-img {
  width: 100px;
  height: 100px;
}
.signup-form {
  border: 1px solid black;
  margin-top: 50px;
  padding: 10px;
  #input-group-1,
  #input-group-2,
  #input-group-3 {
    text-align: left;
    font-size: 1.2em;
    font-weight: bold;
  }
}
.msg {
  background: #74b674;
}
</style>