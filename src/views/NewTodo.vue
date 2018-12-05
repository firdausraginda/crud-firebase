<template>
  <div class="newtodo">
    <h2>this is {{name}}</h2>
    <form @submit.prevent="addList">
      <input id="nama" type="text" v-model="namaTask" placeholder="nama task" required>
      <br>
      <input id="deskripsi" type="text" v-model="descTask" placeholder="deskripsi task" required>
      <br>
      <!-- <label for="country">Status</label> -->
      <select id="country" name="country" v-model="statusTask">
        <option :value=true>Sudah Selesai</option>
        <option :value=false>Belum Selesai</option>
      </select>
      <br>
      <button type="submit">Submit</button>
      <router-link to="/todo">
        <button>
          Cancel
        </button>
      </router-link>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.newtodo {
  h2 {
    color: lightblue;
  }
  p {
    color: orange;
  }
}
</style>

<script>
// import db from "../components/firebaseinit";
import { db, auth, authGoogle, authFacebook } from "../components/firebaseinit";

export default {
  name: "newtodo",
  data() {
    return {
      name: "New Todo",
      namaTask: null,
      descTask: null,
      statusTask: null,
      tglTask: null
    };
  },
  methods: {
    addList() {
      db
        .collection("tasks")
        .add({
          idUser: auth.currentUser.uid,
          namaTask: this.namaTask,
          descTask: this.descTask,
          statusTask: this.statusTask
        })
        .then(() => {
          alert("list berhasil di tambahkan");
          this.$router.push("/todo");
        })
        .catch(error => console.log(err));
    }
    // addList() {
    //   db
    //     .collection("users")
    //     .add({
    //       namaTask: this.namaTask,
    //       descTask: this.descTask,
    //       statusTask: this.statusTask,
    //       tglTask: new Date(this.tglTask)
    //     })
    //     .then(docRef => {
    //       alert("list berhasil di tambahkan");
    //       this.$router.push("/todo");
    //     })
    //     .catch(error => console.log(err));
    // }
  }
};
</script>
