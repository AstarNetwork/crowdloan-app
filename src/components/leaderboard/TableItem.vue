<template>
  <div class="item-container">
    <div class="cell cell-index">1</div>
    <div class="cell">name</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';

export default defineComponent({
  components: {
  },
  props: {
  },
});
</script>

<style scoped>
.item-container {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>
