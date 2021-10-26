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
import { defineComponent, inject } from 'vue';
import { ApiPromise } from '@polkadot/api';
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
  },
  setup(props) {
    const api: any = inject('api');

    const getData = async () => {
      //get data
      const apiData: ApiPromise = (await api).api;

      console.log('paraId', apiData);
      const paraId = [2000];
      const unsub = await apiData.query.crowdloan?.funds.multi(paraId, (campaigns) => {
        console.log('c', campaigns)
      })

      // console.log('campaign', campaign);
    }

    getData()

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
