<template>
  <div class="register">
    <h1>ini register</h1>
    <h2>{{hallo}}</h2>
    <form action="">
      <input type="email" id="email" v-model="email">
      <label for="email">email</label>
      <br>
      <input type="password" id="pass" v-model="pass">
      <label for="pass">password</label>
      <br>
      <button @click.prevent="registerAkun">register</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import { db, auth, authGoogle, authFacebook } from "../components/firebaseinit";
// import firebase from "../components/firebaseinit";
export default {
  name: "register",
  data() {
    return {
      hallo: "hai apa kabar",
      email: "",
      pass: ""
    };
  },
  methods: {
    registerAkun() {
      // console.log('register');
      auth.createUserWithEmailAndPassword(this.email, this.pass).then(
        user => {
          alert(`account created ${user.user.email}`);
          auth.signOut()
          this.$router.push("/login");
        },
        err => {
          alert(err.message);
        }
      );
    }
  }
};
</script>