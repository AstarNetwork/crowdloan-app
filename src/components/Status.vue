<template>
  <div class="pt-20 pb-20 status-background">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap justify-center">
        <StatusItem v-for="(item, index) in statusData" :item="item" :key="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { ApiPromise } from '@polkadot/api';
import type { DeriveContributions } from '@polkadot/api-derive/types';
import { StatusData } from '../data/StatusData';
import StatusItem from './StatusItem.vue';
import { PARA_ID } from '@/config/crowdloan';

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
    const api: any = inject('api');

    const statusData = ref<StatusData[]>(props.data);

    const getData = async () => {
      //get data
      const apiData: ApiPromise = (await api).api;

      if (apiData.query.crowdloan) {
        console.log('paraId', apiData.query.crowdloan);
        const paraId = [PARA_ID];

        const unsub = await apiData.query.crowdloan?.funds.multi(paraId, (campaigns) => {
          console.log('c', campaigns)
        })

        const unsub2 = await apiData.derive.crowdloan.contributions(PARA_ID, (derive: any) => {
          console.log('d', derive)
          statusData.value[0].value = derive.contributorsHex.length;
        })
      } else {
        //FIXME: tricky way to call crowdloan query again
        setTimeout(() => {
          getData();
        }, 2000);
      }
    }

    getData()

    return {
      statusData
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
