<template>
  <div class="flex-col text-center mt-4 mb-4 ml-6 mr-6">
    <div class="status-item-value font-bold text-6xl lg:text-7xl">
      {{ $n(item.value, 'decimal') }}
    </div>
    <div class="text-xl font-normal">{{ item.description }}</div>
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

<style scoped>
.status-item-value {
  font-family: 'Kanit', sans-serif;
  background: linear-gradient(
    90deg,
    #1b6dc1 4.46%,
    #8b5bc5 61.01%,
    #ff5cb3 118.75%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
