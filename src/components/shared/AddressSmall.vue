<template>
  <button type="button" class="modal-button" @click="openModal">
    <div
      class="
        h-6
        w-6
        rounded-full
        overflow-hidden
        border border-gray-100
        mx-3
        sm:mx-4
      "
    >
      <icon-base class="h-full w-full" viewBox="0 0 64 64">
        <icon-account-sample />
      </icon-base>
    </div>
    {{ shortenAddress }}
    <icon-base
      class="-mr-1 ml-2 h-4 w-4"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <icon-solid-chevron-down />
    </icon-base>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import IconBase from './IconBase.vue';
import IconSolidChevronDown from './IconSolidChevronDown.vue';
import IconAccountSample from './IconAccountSample.vue';

export default defineComponent({
  components: {
    IconBase,
    IconSolidChevronDown,
    IconAccountSample
  },
  props: {
    address: {
      type: String,
      required: true
    }
  },
  emits: ['update:is-open'],
  setup(props, { emit }) {
    const openModal = () => {
      emit('update:is-open', true);
    };

    const getShortenAddress = (address: string): string => {
      return address
        ? `${address.slice(0, 9)}${'.'.repeat(6)}${address.slice(-9)}`
        : '';
    };

    const { address } = toRefs(props);
    const shortenAddress = computed(() => {
      return getShortenAddress(address.value);
    });

    return {
      openModal,
      shortenAddress
    };
  }
});
</script>

<style scoped>
.modal-button {
  @apply inline-flex justify-center items-center w-full rounded-full border border-gray-300 px-4 py-2  bg-white text-xs font-medium text-gray-700;
}
.modal-button:hover {
  @apply bg-gray-100;
}
.modal-button:focus {
  @apply outline-none ring ring-gray-100;
}
</style>
