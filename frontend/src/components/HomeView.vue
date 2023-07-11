<template>
  <div class="home">
    <Topbar />
    <Sidebar />
    <b-container>
      <form :id="upload_form_id"></form>
      <file-input
        :required="true"
        accept=".h"
        :form="upload_form_id"
        class="mb-3"
        @file-changed="file => fileChanged(file)"
      ></file-input>
      <b-spinner
        class="mt-3"
        variant="secondary"
        label="Loading..."
        v-if="!datas"
      ></b-spinner>
      <b-container class="mb-3 px-0" v-for="data in datas" :key="data.id">
        <Dropdown
          :data="data"
          v-if="data.widget_type == 'dropdown'"
          @value-changed="(title, new_value) => valueChanged(title, new_value)"
        />
        <checkbox
          :data="data"
          v-if="data.widget_type == 'checkbox'"
          @value-changed="(title, new_value) => valueChanged(title, new_value)"
        />
      </b-container>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Topbar from "./Topbar.vue";
import Sidebar from "./Sidebar.vue";
import FileInput from "./FileInput.vue";
import Dropdown from "./Dropdown.vue";
import Checkbox from "./Checkbox.vue";
export default {
  components: { Topbar, Sidebar, FileInput, Dropdown, Checkbox },
  name: "HomeView",
  mounted() {
    var url = "/api?file=data.json";
    if (process.env.NODE_ENV === "development") {
      // url = "http://localhost:5000/api?file=data.json";
    }
    url = url + "&timestamp=" + new Date().getTime();
    axios.get(url).then(response => {
      console.log(response.data);
      if (response.data.status != "success") {
        console.log(response.data);
        return;
      }
      this.datas = response.data.data;
    });
  },
  data() {
    return {
      msg: "Welcome",
      datas: this.datas,
      upload_form_id: "upload_form_id",
      value: {},
      new_value: {}
    };
  },
  computed: {
    return_value() {
      return this.value;
    }
  },
  methods: {
    valueChanged(title, new_value) {
      console.log(this.new_value);
      if (this.value[title] != undefined && new_value == this.value[title]) {
        delete this.new_value[title];
        return;
      }
      this.new_value[title] = new_value;
    },
    fileChanged(file) {
      console.log(file);
      var url = "/upload";
      if (process.env.NODE_ENV === "development") {
        // url = "http://localhost:5000/upload";
      }
      axios
        .post(
          url,
          { file: file },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            this.datas[i].result.default_text = response.data[i].default_text;
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
