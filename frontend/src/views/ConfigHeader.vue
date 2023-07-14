<template>
  <div class="home body flex-grow-1 px-3">
    <CContainer>
      <form :id="uploadFormID"></form>
      <FileInput
        :accept="file_name"
        :form="uploadFormID"
        @file-changed="fileChanged"
      ></FileInput>
      <div class="text-center">
        <CSpinner class="mt-3" color="secondary" v-if="!datas"></CSpinner>
      </div>
      <CContainer class="mb-3 px-0" v-for="data in datas" :key="data.id">
        <Dropdown
          :data="data"
          :value="
            new_value[data.title] == undefined
              ? new_value[data.title]
              : old_value[data.id]
          "
          :disabled="dependencyCheck(data)"
          v-if="data.widget_type == 'dropdown'"
          @value-changed="(title, new_value) => valueChanged(title, new_value)"
        />
        <checkbox
          :data="data"
          :value="
            new_value[data.title] == undefined
              ? new_value[data.title]
              : old_value[data.id]
          "
          :disabled="dependencyCheck(data) || false"
          v-if="data.widget_type == 'checkbox'"
          @value-changed="(title, new_value) => valueChanged(title, new_value)"
        />
      </CContainer>
      <CModal id="no-file-alert" hide-footer title="No file uploaded">
        <div class="text-center">Please upload a file</div></CModal
      >
      <CModal id="no-change-alert" hide-footer title="">
        <div class="text-center">Value not changed</div></CModal
      >
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";
import FileInput from "@/components/FileInput.vue";
import Dropdown from "@/components/Dropdown.vue";
import Checkbox from "@/components/Checkbox.vue";
import { CContainer, CSpinner, CButton, CModal } from "@coreui/vue";
import { useStore } from "vuex";
import { computed } from "vue";
import store from "../store";

export default {
  components: {
    FileInput,
    Dropdown,
    Checkbox,
    CContainer,
    CSpinner,
    CButton,
    CModal,
  },
  name: "ConfigHeader",
  setup() {
    const store = useStore();
    return {
      uploadFormID: store.state.uploadFormID,
      datas: computed(() => store.state.headerData),
    };
  },
  mounted() {
    var url = "/api?file=data.json";
    if (process.env.NODE_ENV === "development") {
      // url = "http://localhost:5000/api?file=data.json";
    }
    url = url + "&timestamp=" + new Date().getTime();
    axios.get(url).then((response) => {
      console.log(response.data);
      if (response.data.status != "success") {
        console.log(response.data);
        return;
      }
      this.datas = response.data.data;
    });

    // store.dispatch("updateHeaderData", response.data.data);
  },
  data() {
    return {
      old_value: {},
      new_value: {},
      uuid: "",
      file_name: "",
    };
  },
  computed: {
    return_value() {
      return this.old_value;
    },
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
        .then((response) => {
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
        // this.$bvModal.show("no-file-alert");
        return;
      }
      if (Object.keys(this.new_value).length == 0) {
        // this.$bvModal.show("no-change-alert");
        return;
      }
      var url = "/download";
      axios
        .post(
          url,
          {
            uuid: this.uuid,
            change: this.new_value,
          },
          { responseType: "blob" }
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.file_name);
          document.body.appendChild(link);
          link.click();
        });
    },
  },
};
</script>

<style scoped></style>
