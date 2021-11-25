<template>
  <div class="flex flex-col mb-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div
        class="mt-5 py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <h2 class="font-bold text-xl">Referral Leaderboard</h2>
        <div class="list-container">
          <VirtualList :data="dataSource">
            <template v-slot="{ item, index }">
              <div class="item-container">
                <div class="cell mx-4 rAddress">{{index}}</div>
                <div class="cell rAmount">{{item}} ASTR</div>
              </div>
            </template>
          </VirtualList>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { VirtualList } from 'vue3-virtual-list';
import {
  PARA_ID
} from '@/config/crowdloan';

export default defineComponent({
  components: {
    VirtualList
  },
  props: {},
  setup() {
    const api: any = inject('api');
    const dataSource = ref<any>([]);

    const fetchEvent = async () => {
      const apiData: ApiPromise = (await api).api;
      const qEvents = await apiData.query.system.events.range(['0x6de1501ba660b975a2fa2425425fe57e04c8ec8691b6b69f688d8dd92dc43320','0x5de5306c9afcf8d66151889349f903e63ae759227b6e5ee5fcbb2850b7eadb1b'])
      qEvents.forEach((record: any) => {
        // Extract the event
        const { event } = record;
        console.log('dd', event.method)

        // Only get the `MemoUpdated` event
        if (event.method === 'MemoUpdated') {
          console.log('ddd:', event.data[1])
          const contributeMemo = {
            source: event.data[0].toHuman(),
            paraId: event.data[1].toHuman(),
            memo: event.data[2].toHuman(),
          };
            // Show what we are busy with
          console.log(`\t${event.section}:${event.method}:: (event ID=${event.index.toHuman()})`);
          console.log(contributeMemo);
        }
      });

      // apiData.query.system.events((events: any) => {
      //   console.log(`\nReceived ${events.length} events`);

      //   // Loop through the Vec<EventRecord>
      //   events.forEach((record: any) => {
      //     // Extract the event
      //     const { event } = record;

      //     // Only get the `MemoUpdated` event
      //     if (event.method === 'MemoUpdated') {
      //       console.log('ddd:', event.data[1])
      //       const contributeMemo = {
      //         source: event.data[0].toHuman(),
      //         paraId: event.data[1].toHuman(),
      //         memo: event.data[2].toHuman(),
      //       };
      //         // Show what we are busy with
      //       console.log(`\t${event.section}:${event.method}:: (event ID=${event.index.toHuman()})`);
      //       console.log(contributeMemo);
      //     }
      //   });
      // });
    }

    setTimeout(fetchEvent, 3000);

    for (let i=0; i<100; i++) {
      dataSource.value.push({
        name: 'test'
      })
    }

    return {
      dataSource
    }
  }
});
</script>

<style scoped>
.list-container {
  width: 800px;
  height: 600px;
  border: 2px solid #1b6dc1;
  margin: 0 auto;
}
.item-container {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.rAmount {
  font-family: 'Kanit', sans-serif;
  color: #1b6dc1;
}
</style>
