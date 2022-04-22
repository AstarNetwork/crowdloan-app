<template>
  <div class="column--status-item">
    <div class="status-item-value">
      <!-- Todo: fetch the data from chain -->
      <span v-if="item.value" class="text--status-value">
        {{ $n(item.value, 'decimal') }}
      </span>
      <div v-else class="skeleton-animation column-skeleton">
        <span class="inline-block" />
      </div>
    </div>
    <div class="text--label">{{ item.description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/status.scss';
</style>
