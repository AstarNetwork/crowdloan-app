<template>
  <div class="expander">
    <h2 class="row--item">
      <button
        @click="toggle"
        :class="[{ colapsed: isCollapsed }, 'expander-button']"
      >
        {{ caption }}
      </button>
    </h2>
    <div
      v-show="!isCollapsed"
      :class="[{ 'h-0': isCollapsed, 'h-auto': !isCollapsed }, 'content']"
    >
      <slot />
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

<style lang="scss" scoped>
@import 'src/components/shiden/styles/expender.scss';
</style>
