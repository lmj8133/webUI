<template>
  <div class="home body flex-grow-1 px-3">
    <CContainer>
      <FileInput accept=".h" @file-changed="fileChanged"></FileInput>
      <div class="text-center">
        <CSpinner class="mt-3" color="secondary" v-if="!datas"></CSpinner>
      </div>
      <CContainer class="mb-3 px-0" v-for="data in datas" :key="data.id">
        <Dropdown
          :data="data"
          :value="
            new_value[data.title] != undefined
              ? new_value[data.title]
              : old_value[data.id]
          "
          :disabled="dependencyCheck(data.dependency)"
          v-if="data.widget_type == 'dropdown'"
          @value-changed="(title, new_value) => valueChanged(title, new_value)"
        />
        <checkbox
          :data="data"
          :value="
            new_value[data.title] != undefined
              ? new_value[data.title]
              : old_value[data.id]
          "
          :disabled="dependencyCheck(data.dependency)"
          v-if="data.widget_type == 'checkbox'"
          @value-changed="(title, new_value) => valueChanged(title, new_value)"
        />
      </CContainer>
      <CToaster placement="bottom-end">
        <CToast v-for="(toast, index) in toasts" :delay="toast.delay" visible>
          <CToastHeader closeButton v-if="toast.title">
            <span class="me-auto fw-bold">{{ toast.title }}</span>
          </CToastHeader>
          <CToastBody>
            {{ toast.content }}
          </CToastBody>
          <CToastClose class="me-2 m-auto" v-if="!toast.title" />
        </CToast>
      </CToaster>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";
import FileInput from "@/components/FileInput.vue";
import Dropdown from "@/components/Dropdown.vue";
import Checkbox from "@/components/Checkbox.vue";
import {
  CContainer,
  CSpinner,
  CButton,
  CModal,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody,
  CToastClose,
} from "@coreui/vue";
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
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
    CToastClose,
  },
  name: "ConfigHeader",
  setup() {
    const store = useStore();

    var url = "/api?file=data.json";
    url = url + "&timestamp=" + new Date().getTime();
    axios.get(url).then((response) => {
      if (response.data.status != "success") {
        console.log(response.data);
      }
      var datas = response.data.data;
      store.dispatch("updateHeaderData", datas);

      var data_index = {};
      for (var i in datas) {
        data_index[datas[i].id] = {
          title: datas[i].title,
          index: i,
        };
        data_index[datas[i].title] = {
          id: datas[i].id,
          index: i,
        };
      }
      store.dispatch("updateDataIndex", data_index);
    });

    return {
      datas: computed(() => store.state.headerData),
      data_index: computed(() => store.state.dataIndex),
      is_confirm: computed(() => store.state.isConfirm),
    };
  },
  data() {
    return {
      // old_value: { "id1": "value1", "id2": "value2" },
      old_value: {},
      // new_value: { "title1": "value1", "title2": "value2" },
      new_value: {},
      uuid: "",
      file: undefined,
      file_name: "",
      toasts: [],
    };
  },
  watch: {
    is_confirm: function (newVal, oldVal) {
      if (newVal) {
        this.confirm();
      }
      this.$store.dispatch("confirm", false);
    },
  },
  methods: {
    dependencyCheck(dependency) {
      if (!dependency) {
        return false;
      }
      if (this.new_value[this.data_index[dependency]["title"]] != undefined) {
        return !this.new_value[this.data_index[dependency]["title"]];
      }
      return !this.old_value[dependency];
    },
    valueChanged(title, new_value) {
      if (
        this.old_value[this.data_index[title]["id"]] != undefined &&
        new_value == this.old_value[this.data_index[title]["id"]]
      ) {
        delete this.new_value[title];
        return;
      }
      this.new_value[title] = new_value;
    },
    fileChanged(file, event = null) {
      if (!file) {
        return;
      }
      var url = "/upload";
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
          this.file_name = file.name;
          if (this.file != file) {
            this.new_value = {};
            this.createToast("File uploaded", file.name);
            this.file = file;
          }
          if (event == "confirm") {
            this.confirm();
          }
        });
    },
    confirm() {
      if (!this.file_name) {
        this.createToast("No file uploaded", "Please upload a file");
        return;
      }
      if (Object.keys(this.new_value).length == 0) {
        this.createToast("No change", "Value not changed");
        return;
      }

      // check file
      var url = "/api?file=" + this.uuid + ".h&check=1";
      axios.get(url).then((response) => {
        if (response.data.status != "success") {
          console.log(response.data);
          this.fileChanged(this.file, "confirm");
        } else {
          this.download();
        }
      });
    },
    download() {
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
          axios.post("/clear", { uuid: this.uuid });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createToast(title, content, delay = 4000) {
      this.toasts.push({
        title: title,
        content: content,
        delay: delay,
      });
    },
  },
};
</script>

<style scoped></style>
