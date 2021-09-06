<template>
  <div class="bg-white text-left expander">
    <h2 class="py-7 text-dark w-full">
      <button
        @click="toggle"
        :class="[
          { colapsed: isCollapsed },
          'w-full',
          'text-left',
          'text-lg',
          'border-0',
          'expander-button',
          'flex',
          'relative'
        ]"
      >
        {{ caption }}
      </button>
    </h2>
    <div
      v-show="!isCollapsed"
      :class="[
        { 'h-0': isCollapsed, 'h-auto': !isCollapsed },
        'py-4',
        'text-gray-2',
        'content'
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    caption: {
      type: String,
      required: true
    }
  },
  setup() {
    let isCollapsed = ref<boolean>(true);

    const toggle = (): void => {
      isCollapsed.value = !isCollapsed.value;
    };

    return { isCollapsed, toggle };
  }
});
</script>

<style scoped>
.expander {
  border: 1px solid rgba(0, 31, 64, 0.125);
  border-left: 0;
  border-right: 0;
  transition: display 600ms ease-out, height 600ms ease-out;
}

.expander:not(:first-of-type) {
  border-top: 0;
}

.expander-button {
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    border-radius 0.15s ease;
}

.expander-button::after {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  margin-left: auto;
  content: '';
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%239ca3af'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1rem;
  transition: transform 0.2s ease-in-out;
}

.expander-button:not(.colapsed)::after {
  transform: rotate(-180deg);
}

.content {
  transition: height 0.65s ease;
}
</style>
