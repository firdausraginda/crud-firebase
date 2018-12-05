<template>
  <div class="viewtodo">
    <h2>this is {{title}}</h2>
    <h3>{{namaTask}}</h3>
    <h4>{{descTask}}</h4>
    <p>{{cekStatusTask(statusTask)}}</p>
    <!-- <p>{{cekStatus(statusTask)}}</p> -->
    <button @click="hapus">delete</button>
    <router-link :to="{name: 'edittodo'}">
      <!-- <router-link :to="{name:'edittodo', params: {id: id}}"> -->
      <button>
        Edit
      </button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.viewtodo {
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
  name: "viewtodo",
  data() {
    return {
      title: "View Todo",
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
          // console.log(element.data());
          this.namaTask = element.data().namaTask;
          this.descTask = element.data().descTask;
          this.statusTask = element.data().statusTask;
        });
      });
  },
  methods: {
    cekStatusTask(stTask) {
      if (stTask == true) {
        return "selamat istirahat";
      } else {
        return "kerjain iih";
      }
    },
    hapus() {
      if (confirm("yakin mau di apus?")) {
        db
          .collection("tasks")
          .where("namaTask", "==", this.$route.params.id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(element => {
              element.ref.delete();
              this.$router.push("/todo");
            });
          });
      }
    }
  }
  //   beforeRouteEnter(to, from, next) {
  //     db
  //       .collection("lists")
  //       .where("id", "==", to.params.id)
  //       .get()
  //       .then(querySnapshot => {
  //         querySnapshot.forEach(element => {
  //           next(vm => {
  //             (vm.id = element.data().id),
  //               (vm.nama = element.data().nama),
  //               (vm.deskripsi = element.data().deskripsi),
  //               (vm.tgl = element.data().tgl.toDate()),
  //               (vm.ceklis = element.data().ceklis);
  //           });
  //         });
  //       });
  //   },
  //   watch: {
  //     $route: "fetchData"
  //   },
  //   methods: {
  //     fetchData() {
  //       db
  //         .collection("lists")
  //         .where("id", "==", this.$route.params.id)
  //         .get()
  //         .then(querySnapshot => {
  //           querySnapshot.forEach(element => {
  //             (this.id = element.data().id),
  //               (this.nama = element.data().nama),
  //               (this.deskripsi = element.data().deskripsi),
  //               (this.tgl = element.data().tgl),
  //               (this.ceklis = element.data().ceklis);
  //           });
  //         });
  //     }
  //   }
};
</script>
