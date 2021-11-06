<template>
  <div class="text-left relative mb-6">
    <label v-if="label" class="block mb-2 text-base text-label">
      {{ label }}
      <strong v-if="input && input.required" class="text-danger">*</strong>
    </label>
    <div class="w-full flex">
      <input
        class="
          border-input-border-normal border-solid border
          rounded-sm
          font-normal
          text-lg
          pl-4
          pr-4
          pt-2
          pb-2
          w-full
          box-border
          focus:outline-none focus:ring focus:border-input-border-focus
          transition-shadow
        "
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        ref="input"
      />
    </div>
    <span
      v-if="innerLabel"
      class="absolute top-8 right-0 text-xl font-light pt-2 pb-2 pl-4 pr-4"
      >{{ innerLabel }}</span
    >
    <span v-if="validationMessage" class="text-danger mt-1">
      {{ validationMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    innerLabel: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    validationMessage: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const input = ref();

    return { input };
  }
});
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
