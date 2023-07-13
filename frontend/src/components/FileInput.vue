<template>
  <div>
    <CFormInput type="file" id="formFile" />
    <!-- <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here...   "
      drop-placeholder="Drop file here..."
      :required="required"
      :accept="accept"
      :form="form"
      @change="$emit('file-changed', $event.target.files[0])"
    ></b-form-file> -->
  </div>
</template>

<script>
import { CFormInput } from "@coreui/vue";
export default {
  components: { CFormInput },
  name: "FileInput",
  emits: ["file-changed"],
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: "",
    },
    form: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      file: null,
    };
  },
};
</script>
