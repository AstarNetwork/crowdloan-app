<template>
  <div class="flex flex-col mb-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div
        class="mt-5 py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <h2 class="font-bold text-xl">Referral Leaderboard ({{ dataSize }})</h2>
        <div class="list-container">
          <div class="item-container flex">
            <div class="flex-none mx-4 rIndex">Ranking</div>
            <div class="flex-grow rAddress">Address</div>
            <div class="flex-none mx-4 rAmount">Total number of Referrals</div>
          </div>
          <RecycleScroller
            class="scroller"
            :items="dataSource"
            :item-size="32"
            key-field="referMemo"
            v-slot="{ item, index }"
          >
            <div class="item-container flex">
              <div class="flex-none mx-4 rIndex">{{ index + 1 }}</div>
              <div class="flex-grow rAddress">{{ item.referMemo }}</div>
              <div class="flex-none mx-4 rAmount">
                {{ item.numStakers }}
              </div>
            </div>
          </RecycleScroller>
        </div>

        <SearchContribution :leaderboard-data="dataSource" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import { defineComponent, ref, watch } from 'vue';
import { RecycleScroller } from 'vue3-virtual-scroller';
import json from '@/static/leaderboard-result.json';
import SearchContribution from '@/components/leaderboard/SearchContribution.vue';
// import { encodeAddress } from '@polkadot/util-crypto';

export default defineComponent({
  components: {
    RecycleScroller,
    SearchContribution
  },
  props: {},
  setup() {
    const UNIT = 10; // polkadot unit
    interface MEMO_DATA {
      numStakers: number;
      referMemo: string;
      referAddress: string;
      contributed: string;
      referrer_bonus_astr: string;
      reward: number;
    }
    const dataSource = ref<MEMO_DATA[]>([]);
    const dataSize = ref(0);

    // fetchEvent().then((data) => {
    //   const list: MEMO_DATA[] = data?.list;
    //   dataSize.value = list.length;
    //   dataSource.value = list.map((obj) => {
    //     obj.referAddress = encodeAddress(`0x${obj.referMemo}`, 0);
    //     return obj;
    //   });
    //   console.log(dataSource.value);
    // });

    const getJson = async () => {
      const list: any = json;
      dataSize.value = list.length;
      dataSource.value = list;
      // dataSource.value = list.map((obj) => {
      // obj.referAddress = encodeAddress(`0x${obj.referMemo}`, 0);
      // obj.reward =
      //   new BN(obj.referral_bonus_astr)
      //     .div(new BN(10 ** (UNIT - 2)))
      //     .toNumber() / 100;
      // return obj;
      // });
    };

    getJson();

    return {
      dataSize,
      dataSource
    };
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
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.scroller {
  height: 90%;
}
.rIndex {
  font-family: 'Kanit', sans-serif;
  color: #ff5cb3;
}
.rAmount {
  font-family: 'Kanit', sans-serif;
  color: #1b6dc1;
}
</style>
