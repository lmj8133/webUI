<template>
  <div class="home">
    <Topbar />
    <b-container fluid="lg" class="px-0">
      <!-- <Sidebar /> -->
      <b-container>
        <form :id="upload_form_id"></form>
        <FileInput
          :required="true"
          accept=".h"
          :form="upload_form_id"
          class="mb-3"
          @file-changed="file => fileChanged(file)"
        ></FileInput>
        <b-spinner
          class="mt-3"
          variant="secondary"
          label="Loading..."
          v-if="!datas"
        ></b-spinner>
        <b-container class="mb-3 px-0" v-for="data in datas" :key="data.id">
          <Dropdown
            :data="data"
            :value="
              new_value[data.title] == undefined
                ? new_value[data.title]
                : old_value[data.id]
            "
            :disabled="dependencyCheck(data)"
            v-if="data.widget_type == 'dropdown'"
            @value-changed="
              (title, new_value) => valueChanged(title, new_value)
            "
          />
          <checkbox
            :data="data"
            :value="new_value[data.title] || old_value[data.id]"
            :disabled="old_value[data.dependency] || false"
            v-if="data.widget_type == 'checkbox'"
            @value-changed="
              (title, new_value) => valueChanged(title, new_value)
            "
          />
        </b-container>
        <b-container>
          <b-button
            class="mt-3"
            id="comfirm-btn"
            variant="success"
            size="lg"
            @click="comfirm()"
            >Comfrim</b-button
          >
        </b-container>
        <b-modal id="no-file-alert" hide-footer title="No file uploaded">
          <div class="text-center">
            Please upload a file
          </div></b-modal
        >
        <b-modal id="no-change-alert" hide-footer title="">
          <div class="text-center">
            Value not changed
          </div></b-modal
        >
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
      old_value: {},
      new_value: {},
      uuid: "",
      file_name: ""
    };
  },
  computed: {
    return_value() {
      return this.old_value;
    }
  },
  methods: {
    dependencyCheck(data) {
      if (!data.dependency) {
        return false;
      }
      if (this.new_value[data.dependency] != undefined) {
        this;
      }
      return this.old_value[data.dependency];
    },
    valueChanged(title, new_value) {
      console.log(this.new_value);
      if (
        this.old_value[title] != undefined &&
        new_value == this.old_value[title]
      ) {
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
          let datas = response.data.data;
          if (response.data.status != "success") {
            console.log(response.data);
            return;
          }
          this.old_value = datas.value;
          this.uuid = datas.uuid;
        });
      this.file_name = file.name;
    },
    comfirm() {
      if (this.file_name == "") {
        this.$bvModal.show("no-file-alert");
        return;
      }
      if (Object.keys(this.new_value).length == 0) {
        this.$bvModal.show("no-change-alert");
        return;
      }
      var url = "/download";
      axios
        .post(
          url,
          {
            uuid: this.uuid,
            change: this.new_value
          },
          { responseType: "blob" }
        )
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.file_name);
          document.body.appendChild(link);
          link.click();
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
