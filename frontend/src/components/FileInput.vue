<template>
  <div>
    <CFormInput
      type="file"
      id="formFile"
      class="mb-3"
      :form="form"
      :valid="valid ? true : false"
      @change="$store.dispatch('updateHeaderFile', $event.target.files[0])"
    />
  </div>
</template>

<script>
import { CFormInput } from "@coreui/vue";
import { useStore } from "vuex";

export default {
  components: { CFormInput },
  name: "FileInput",
  emits: ["file-changed"],
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: String || Boolean,
      default: "",
    },
    form: {
      type: String,
      default: "",
    },
  },
  setup() {
    const store = useStore();
  },
  data() {
    return {
      file: null,
    };
  },
};
</script>
