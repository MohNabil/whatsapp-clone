<template>
  <b-container>
    <b-row>
      <b-col>
        <img src="../../src/assets/whatsapp-logo.png" alt="logo" class="logo-img" />
        <h2>Welcome to Mohamed's Nabil Whatsapp</h2>
        <b-form class="login-form" @submit="loginUser().prevent">
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

          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
        <div class="msg">{{msg}}</div>
        <router-link to="/sign-up" class="signup">Sign Up</router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      msg: ""
    };
  },
  methods: {
    async loginUser() {
      const data = {
        email: this.email,
        password: this.password
      };
      const login = await fetch(
        "https://whatsappserver-app.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      try {
        const result = await login.json();
        // console.log(result);
        if (result.message) {
          this.msg = result.message;
        } else {
          result["timestamp"] = new Date().toLocaleString();
          this.$store.commit("setUser", result);
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
.login-form {
  border: 1px solid black;
  margin-top: 50px;
  padding: 10px;
  #input-group-1,
  #input-group-2 {
    text-align: left;
    font-size: 1.2em;
    font-weight: bold;
  }
}
.signup {
  position: relative;
  top: 10px;
  margin-top: 15px;
}
</style>
