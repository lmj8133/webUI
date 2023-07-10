<template>
  <div class="home">
    <Topbar />
    <Sidebar />
    <b-container>
      <form :id="formID"></form>
      <file-input :required="true" accept=".h" :form="formID" class="mb-3"></file-input>
      <b-spinner
        class="mt-3"
        variant="secondary"
        label="Loading..."
        v-if="!datas"
      ></b-spinner>
      <b-container
        class="mb-3 px-0"
        v-for="data in datas"
        :key="data.id"
      >
        <Dropdown :data="data" v-if="data.widget_type == 'dropdown'" />
        <checkbox :data="data" v-if="data.widget_type == 'checkbox'" />
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
      url = "static/data.json";
    }
    axios.get(url).then(response => {
      this.datas = response.data;
    });
  },
  data() {
    return {
      msg: "Welcome",
      datas: this.datas,
      formID: "config-modifier-form",
    };
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
