<template>
  <CInputGroup class="mb-3">
    <CInputGroupText class="flex-grow-1 text-start">
      <CFormLabel class="w-100 me-auto my-0" :for="data.id">
        {{ data.title }}
      </CFormLabel>
    </CInputGroupText>
    <CInputGroupText>
      <CFormCheck
        type="checkbox"
        :id="data.id"
        :checked="value"
        :disabled="disabled"
        color="secondary"
        aria-label="Checkbox for following text input"
        @change="
          $emit('value-changed', data.title, $event.target.checked)
        "
      />
    </CInputGroupText>
  </CInputGroup>
</template>

<script>
import {
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormCheck,
  CTooltip,
} from "@coreui/vue";
export default {
  name: "Checkbox",
  components: {
    CInputGroup,
    CInputGroupText,
    CFormLabel,
    CFormCheck,
    CTooltip,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Boolean,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["value-changed"],
  data() {
    return {};
  },
  methods: {
    tooltip() {
      var tip_str = "";
      for (var tip in this.data.content) {
        if (tip == "id" || tip == "value") continue;
        if (tip == "note") {
          tip_str += this.data.content[tip] + "\r\n";
          continue;
        }
        tip_str += tip + ": " + this.data.content[tip] + "\r\n";
      }

      return tip_str;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-check-input:checked {
  --cui-form-check-input-checked-bg-color: var(--cui-gray-500);
  --cui-form-check-input-checked-border-color: var(--cui-gray-500);
}
.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba(58, 58, 58, 0.25);
}
</style>
