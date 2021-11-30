<template>
  <div class="flex flex-col mb-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div
        class="mt-5 py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <h2 class="font-bold text-xl">Referral Leaderboard</h2>
        <div class="list-container">
          <div class="flex flex-col mb-8">
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
          </div>

          <!-- <VirtualList :data="dataSource">
            <template v-slot="{ item, index }">
              <div class="item-container">
                <div class="cell mx-4 rAddress">{{index}}</div>
                <div class="cell mx-4 rAddress">{{item.referAddress}}</div>
                <div class="cell rAmount">{{item.numStakers}}</div>
              </div>
            </template>
          </VirtualList> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { VirtualList } from 'vue3-virtual-list';
import { db, fetchEvent } from '@/db';
import { encodeAddress } from '@polkadot/util-crypto';

export default defineComponent({
  components: {
    // VirtualList
  },
  props: {},
  setup() {
    interface MEMO_DATA {
      numStakers: number;
      referMemo: string;
      referAddress: string;
      stakers: any;
    }
    const dataSource = ref<MEMO_DATA[]>([]);

    fetchEvent().then((data) => {
      const list: MEMO_DATA[] = data?.list;
      list
        .map((obj) => {
          obj.referAddress = encodeAddress(obj.referMemo);
          return obj;
        })
        .forEach((item) => {
          dataSource.value.push(item);
        });
      console.log(dataSource.value);
    });

    return {
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
