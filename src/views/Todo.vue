<template>
  <div class="todo">
    <h2>this is {{name}}</h2>
    <img :src="user.profilePictureUser" alt="link profile picture kosong" class="profile-picture">
    <h2>{{user.namaUser}}</h2>
    <p>{{user.umurUser}} thn</p>
    <p>{{cekKelamin(user.jenisKelaminUser)}}</p>
    <hr>
    <ul v-for="task in tasks" :key="task.namaTask">
      <li>
        <h3>{{task.namaTask}}</h3>
        <p>{{task.descTask}}</p>
        <p>{{task.statusTask}}</p>
        <router-link :to="{name:'viewtodo', params: {id: task.namaTask}}">
          <button>
            detail
          </button>
        </router-link>
      </li>
    </ul>
    <router-link to="/newtodo">
      <button>
        Add
      </button>
    </router-link>
    <br>
    <progress :value="uploader" max="100"></progress>
    <br>
    <input type="file" @change="chooseFile">
    <button type="file" @click="uploadFile">
      submit
    </button>
    <br>
    <img class="displayPicture" :src="getGambar" alt="">
  </div>
</template>

<style lang="scss" scoped>
.todo {
  h2 {
    color: lightblue;
  }
  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  ul {
    li {
      list-style: none;
      ul {
        li {
          display: inline-block;
        }
      }
    }
  }
  progress {
    width: 50%;
    margin-bottom: 10px;
  }
  .displayPicture {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>

<script>
// import db from "../components/firebaseinit";
import {
  db,
  auth,
  authGoogle,
  authFacebook,
  storage
} from "../components/firebaseinit";

export default {
  name: "todo",
  data() {
    return {
      name: "Todo",
      tasks: [],
      user: {
        type: Object,
        default: null
      },
      uploader: "0",
      task: null,
      getGambar: null,
      fileGambar: null,
      altProfilePicture: null
    };
  },
  created() {
    this.getTask();
    this.getUser();
  },
  watch: {
    task() {
      this.task.on(
        "state_changed",
        img => {
          this.uploader = img.bytesTransferred / img.totalBytes * 100;
        },
        null,
        async () => {
          try {
            const downloadUrl = await this.task.snapshot.ref.getDownloadURL();
            this.getGambar = downloadUrl;
          } catch (error) {
            return `${error.code}`;
          }
        }
      );
    }
  },
  methods: {
    getTask() {
      db
        .collection("tasks")
        .where("idUser", "==", auth.currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(element => {
            this.tasks.push(element.data());
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUser() {
      db
        .collection("users")
        .where("idUser", "==", auth.currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(element => {
            this.user = element.data();
            if (this.user.profilePictureUser != null) {
              var imgRef = storage.ref(
                `display_picture/${this.user.profilePictureUser}`
              );
              imgRef.getDownloadURL().then(url => {
                this.user.profilePictureUser = url;
              });
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cekKelamin(jKelamin) {
      if (jKelamin == true) {
        return "laki-laki";
      } else if (jKelamin == false) {
        return "perempuan";
      } else {
        return "kelamin belum jelas"
      }
    },
    chooseFile(e) {
      this.fileGambar = e.target.files[0];
    },
    uploadFile(e) {
      // Get file
      // var file = e.target.files[0];

      // create a storage ref
      var storageRef = storage.ref("display_picture/" + this.fileGambar.name);

      // upload file
      this.task = storageRef.put(this.fileGambar);

      db
        .collection("users")
        .where("idUser", "==", auth.currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(element => {
            element.ref
              .update({
                profilePictureUser: this.fileGambar.name,
              })
          });
        });
    }
  }
};
</script>
