<template>
  <div class="login">
    <h1>ini login</h1>
    <h2>{{hallo}}</h2>
    <form action="">
      <input type="email" id="email" v-model="email">
      <label for="email">email</label>
      <br>
      <input type="password" id="pass" v-model="pass">
      <label for="pass">password</label>
      <br>
      <button @click.prevent="loginAkun">login biasa</button>
      <button @click.prevent="loginGoogle">login google</button>
      <button>login facebook</button>
    </form>
    <button @click="logoutAccount">logout</button>
    <button @click="whosuser">current user</button>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
// import firebase from "../components/firebaseinit";
import { db, auth, authGoogle, authFacebook } from "../components/firebaseinit";

export default {
  name: "login",
  data() {
    return {
      hallo: "hai apa kabar",
      email: "",
      pass: ""
    };
  },
  methods: {
    whosuser() {
      console.log(auth.currentUser.email);
    },
    loginAkun() {
      // console.log('register');
      auth.signInWithEmailAndPassword(this.email, this.pass).then(
        user => {
          var email = user.user.email;
          alert(`you are loggin as ${user.user.email}`);
          this.$router.push("/todo");
        },
        err => {
          alert(err.message);
        }
      );
    },
    loginGoogle() {
      const provider = authGoogle;
      auth
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          // console.log(user);

          var usersRef = db.collection("users");
          var query = usersRef.where("idUser", "==", auth.currentUser.uid);
          query.get().then(dataUser => {
            if (dataUser.size == 0) {
              usersRef.add({
                idUser: auth.currentUser.uid,
                jenisKelaminUser: null,
                namaUser: auth.currentUser.email,
                profilePictureUser: null,
                umurUser: null
              })
            }
          });
        })
        .then(() => {
          this.$router.push("/todo");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log("err");
          console.log(`${errorCode} ${errorMessage}`);
        });
    },
    logoutAccount() {
      auth.signOut().then(() => {
        alert("logout succed");
        this.$router.push("/login");
      });
    }
  }
};
</script>
