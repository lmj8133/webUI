<template>
  <b-input-group class="checkbox">
    <b-input-group-prepend class="flex-grow-1">
      <label class="input-group-text w-100 mr-auto" :for="data.id">
        {{ data.title }}
      </label>
    </b-input-group-prepend>
    <b-input-group-append class="input-group-append">
      <div class="input-group-text">
        <input
          type="checkbox"
          :id="data.id"
          data-toggle="tooltip"
          title=""
          v-model="value"
        />
      </div>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: "Checkbox",
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
  }
};
</script>

<style></style>
