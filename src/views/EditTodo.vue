<template>
  <div class="edittodo">
    <h2>this is {{name}}</h2>
    <form @submit.prevent="updateList">
      <input id="nama" type="text" v-model="namaTask" placeholder="nama list">
      <br>
      <input id="deskripsi" type="text" v-model="descTask" placeholder="deskripsi list">
      <br>
      <select id="country" name="country" v-model="statusTask">
        <option :value=true>Sudah Selesai</option>
        <option :value=false>Belum Selesai</option>
      </select>
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
.edittodo {
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
  name: "edittodo",
  data() {
    return {
      name: "Edit Todo",
      namaTask: null,
      descTask: null,
      statusTask: null
    };
  },
  created() {
    db
      .collection("tasks")
      .where("namaTask", "==", this.$route.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(element => {
          this.namaTask = element.data().namaTask;
          this.descTask = element.data().descTask;
          this.statusTask = element.data().statusTask;
        });
      });
  },
  methods: {
    updateList() {
      db
        .collection("tasks")
        .where("namaTask", "==", this.$route.params.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(element => {
            element.ref
              .update({
                namaTask: this.namaTask,
                descTask: this.descTask,
                statusTask: this.statusTask
              })
              .then(() => {
                this.$router.push({
                  name: "viewtodo",
                  params: { id: this.namaTask }
                });
              });
          });
        });
    }
  }
};
</script>
