<template>
  <div class="pt-20 pb-20 status-background">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap justify-center">
        <StatusItem v-for="(item, index) in data" :item="item" :key="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatusItem from './StatusItem.vue';

export default defineComponent({
  components: {
    StatusItem
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
});
</script>

<style scoped>
no-webp .status-background {
  background-image: url('~@/assets/img/holo-bg.jpg');
}

.status-background {
  background-image: url('~@/assets/img/holo-bg.webp');
}

.status-background {
  background-color: #e3e3fd;
  background-size: cover;
}
</style>
