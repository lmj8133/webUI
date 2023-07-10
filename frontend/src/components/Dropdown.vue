<template>
  <b-input-group
    class="checkbox"
    :prepend-html="
      '<label class=\'flex-grow-1 mb-0 w-100 mr-auto\' for=\'' +
        data.result.id +
        '__BV_toggle_\'>' +
        data.title +
        '</label>'
    "
  >
    <!-- <b-input-group-prepend class="flex-grow-1">
      <label
        class="b-input-group-text w-100 mr-auto mb-0 text-left align-items-center"
      >
        {{ data.title }}
      </label>
    </b-input-group-prepend> -->
    <b-input-group-append class="input-group-append" :id="data.id">
      <b-dropdown
        :id="data.result.id"
        :text="value ? value : data.result.default_text"
        dropright
        variant="outline-secondary"
      >
        <b-dropdown-item
          href="#"
          v-for="content in data.content"
          :key="content.id"
          :id="content.id"
          :value="content.value"
          @click="value = content.value"
          >{{ content.value }}</b-dropdown-item
        >
      </b-dropdown>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      config_topic: "Config Modifier"
    };
  },
  computed: {
    return_value() {
      return this.value;
    }
  }
};
</script>

<style></style>
