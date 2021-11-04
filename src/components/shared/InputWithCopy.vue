<template>
  <div class="text-left relative mb-6">
    <label v-if="label" class="block mb-2 text-sm text-gray-600">
      {{ label }}
      <strong v-if="input && input.required" class="text-danger">*</strong>
    </label>
    <div class="w-full flex">
      <input
        class="
          border-input-border-normal border-solid border
          rounded-sm
          font-normal
          text-sm
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
      <input id="hiddenAddr" type="hidden" :value="modelValue" />
      <button
        v-if="!showCopied"
        @click="copyAddress"
        class="bg-primary text-sm text-white px-6"
      >
        Copy
      </button>
      <button v-else class="bg-gray-400 text-sm text-white px-6" disabled>
        Copied
      </button>
    </div>
    <span
      v-if="innerLabel"
      class="absolute top-8 right-12 text-xl font-light pt-2 pb-2 pl-4 pr-12"
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

    const showCopied = ref(false);

    const clickedCopy = () => {
      showCopied.value = true;
    };

    return { input, showCopied, clickedCopy };
  },
  methods: {
    copyAddress() {
      var copyAddr = document.querySelector('#hiddenAddr') as HTMLInputElement;
      copyAddr.setAttribute('type', 'text');
      copyAddr.select();
      document.execCommand('copy');
      copyAddr.setAttribute('type', 'hidden');
      window.getSelection()?.removeAllRanges();

      this.clickedCopy();
    }
  }
});
</script>
