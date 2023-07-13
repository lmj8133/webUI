<template>
  <CInputGroup class="checkbox">
    <b-input-group-prepend class="flex-grow-1">
      <label
        class="input-group-text w-100 mr-auto"
        :for="data.result.id + '__BV_toggle_'"
      >
        {{ data.title }}
      </label>
    </b-input-group-prepend>
    <b-input-group-append class="input-group-append" :id="data.id">
      <b-dropdown
        :id="data.result.id"
        :text="value == undefined ? value : data.result.default_text"
        dropright
        variant="outline-secondary"
        :disabled="disabled"
      >
        <span v-for="content in data.content" :key="content.id">
          <b-dropdown-item
            href="#"
            :id="content.id"
            :value="content.value"
            @click="$emit('value-changed', data.title, content.value)"
            >{{ content.value }}</b-dropdown-item
          >
          <b-tooltip :target="content.id" triggers="hover">
            <div class="text-left">
              {{ tooltip(content) }}
            </div>
          </b-tooltip>
        </span>
      </b-dropdown>
    </b-input-group-append>
  </CInputGroup>
</template>

<script>
export default {
  name: "Dropdown",
  emits: ["value-changed"],
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String || Number || Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
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
    }
  }
};
</script>

<style></style>
