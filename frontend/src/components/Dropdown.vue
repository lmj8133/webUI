<template>
  <CInputGroup class="mb-3">
    <CInputGroupText class="flex-grow-1 text-start">
      <CFormLabel class="w-100 me-auto my-0" :for="data.result.id">
        {{ data.title }}
      </CFormLabel>
    </CInputGroupText>
    <CDropdown alignment="end" variant="input-group" :disabled="disabled">
      <CDropdownToggle
        color="secondary"
        variant="outline"
        :id="data.result.id"
        :disabled="disabled"
        :type="data.result.type"
        >{{ value ? value : data.result.default_text }}</CDropdownToggle
      >
      <CDropdownMenu :disabled="disabled">
        <CTooltip
          v-for="content in data.content"
          :key="content.id"
          :content="tooltip(content)"
          placement="right"
          :fallback-placements="['left']"
          :delay="{ show: 0, hide: 0 }"
          :trigger="['hover']"
        >
          <template #toggler="{ on }">
            <CDropdownItem
              :id="content.id"
              :value="content.value"
              v-on="on"
              @click="$emit('value-changed', data.title, content.value)"
              >{{ content.value }}</CDropdownItem
            >
          </template>
        </CTooltip>
      </CDropdownMenu>
    </CDropdown>
  </CInputGroup>
</template>

<script>
import {
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTooltip,
} from "@coreui/vue";
export default {
  name: "Dropdown",
  components: {
    CInputGroup,
    CInputGroupText,
    CFormLabel,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CTooltip,
  },
  emits: ["value-changed"],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String || Number || Boolean,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    tooltip(content) {
      var tip_str = "";
      for (var tip in content) {
        if (tip == "id" || tip == "value") continue;
        if (tip == "note") {
          tip_str += content[tip] + "\r\n";
          continue;
        }
        tip_str += tip + ": " + content[tip] + "\r\n";
      }
      return tip_str;
    },
  },
};
</script>

<style></style>
