<template>
  <div class="pt-20 pb-20 status-background">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap justify-center">
        <StatusItem
          v-for="(item, index) in statusData"
          :item="item"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { ApiPromise } from '@polkadot/api';
import BN from 'bn.js';
import { StatusData } from '../../data/StatusData';
import StatusItem from '../StatusItem.vue';

export default defineComponent({
  components: {
    StatusItem
  },
  props: {
    data: {
      type: Object as () => StatusData[],
      required: true
    }
  },
  setup(props) {
    const statusData = ref<StatusData[]>(props.data);

    return {
      statusData
    };
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
