<template>
  <div>
    <CFormInput
      type="file"
      id="formFile"
      class="mb-3 file-input"
      :accept="accept"
      :valid="valid ? true : false"
      @change="$emit('file-changed', $event.target.files[0])"
    />
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
  },
  data() {
    return {
      file: null,
    };
  },
};
</script>

<style lang="scss">
.file-input:focus {
  --cui-input-focus-border-color: var(--cui-gray-500) !important;
  box-shadow: 0 0 0 0.25rem rgba(58, 58, 58, 0.25) !important;
}
</style>