<template>
  <div class="flex flex-col mb-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div
        class="mt-5 py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <h2 class="font-bold text-xl">Referral Leaderboard ({{ dataSize }})</h2>
        <div class="list-container">
          <!-- <div class="flex flex-col mb-8">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="
                  py-2
                  align-middle
                  inline-block
                  min-w-full
                  sm:px-6
                  lg:px-8
                "
              >
                <div
                  class="
                    shadow
                    overflow-hidden
                    border-b border-gray-200
                    dark:border-darkGray-600
                    rounded-lg
                  "
                >
                  <table
                    class="
                      min-w-full
                      divide-y divide-gray-200
                      dark:divide-darkGray-600
                    "
                  >
                    <tbody
                      class="
                        bg-white
                        dark:bg-darkGray-800
                        divide-y divide-gray-200
                        dark:divide-darkGray-600
                      "
                    >
                      <tr v-for="(item) in dataSource" :key="item.index">
                        <td class="px-3 py-4 text-center">
                          <div class="relative h-5 mx-auto truncate">
                            {{ item.referAddress }}
                          </div>
                        </td>
                        <td class="px-3 py-4 text-center">
                          <div class="relative w-5 h-5 mx-auto">
                            {{ item.numStakers }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> -->

          <!-- <DynamicScroller
            class="scroller"
            :items="dataSource"
            :min-item-size="32"
            key-field="referAddress"
          >
            <template v-slot="{ item, index }">
              <DynamicScrollerItem
                :item="item"
                :size-dependencies="[item.referAddress]"
                :data-index="index">
                <div class="item-container">
                  <div class="cell mx-4 rAddress">{{ index }}</div>
                  <div class="cell mx-4 rAddress">{{ item.referAddress }}</div>
                  <div class="cell rAmount">{{ item.numStakers }}</div>
                </div>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
           -->

          <div class="item-container flex">
            <div class="flex-none mx-4 rIndex">Ranking</div>
            <div class="flex-grow rAddress">Address</div>
            <div class="flex-none mx-4 rAmount">Total Rewards(Referrers)</div>
          </div>
          <RecycleScroller
            class="scroller"
            :items="dataSource"
            :item-size="32"
            key-field="referAddress"
            v-slot="{ item, index }"
          >
            <div class="item-container flex">
              <div class="flex-none mx-4 rIndex">{{ index + 1 }}</div>
              <div class="flex-grow rAddress">{{ item.referAddress }}</div>
              <div class="flex-none mx-4 rAmount">
                {{ item.reward }} ASTR ({{ item.numStakers }})
              </div>
            </div>
          </RecycleScroller>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import { defineComponent, ref, watch } from 'vue';
import BN from 'bn.js';
import { RecycleScroller } from 'vue3-virtual-scroller';
import json from '@/static/final-result.json';
// import { fetchEvent } from '@/db';
import { encodeAddress } from '@polkadot/util-crypto';

export default defineComponent({
  components: {
    RecycleScroller
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
      dataSource.value = list.map((obj) => {
        obj.referAddress = encodeAddress(`0x${obj.referMemo}`, 0);
        obj.reward =
          new BN(obj.referral_bonus_astr)
            .div(new BN(10 ** (UNIT - 2)))
            .toNumber() / 100;
        return obj;
      });
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
