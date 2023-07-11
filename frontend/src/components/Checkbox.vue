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
          :disabled="disabled"
          v-model="new_value"
          @input="$emit('value-changed', data.title, new_value)"
          @change="$emit('value-changed', data.title, new_value)"
        />
        <b-tooltip :target="data.id" triggers="hover">
          <div class="text-left">
            {{ tooltip() }}
          </div>
        </b-tooltip>
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["value-changed"],
  data() {
    return {
      new_value: this.value
    };
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
    }
  }
};
</script>

<style></style>
