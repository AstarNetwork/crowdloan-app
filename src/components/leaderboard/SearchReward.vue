<template>
  <div class="flex flex-col mb-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div
        class="mt-5 py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <div class="form-container p-12">
          <form class="p-4" @submit="onResult">
            <Input label="My Account" type="text" v-model="myAddress" />
            <Button
              :disabled="!myAddress"
              :class="!myAddress && 'button-disable'"
              >Find My ASTR Reward</Button
            >
          </form>

          <div class="p-3" v-if="resultInfo.length > 0">
            <h2 class="font-bold text-xl mt-2">Your ASTR Reward:</h2>

            <!-- <div v-if="rankInfo">
              <h3 class="font-bold text-sm mt-3 rank_info">Referral Rank:</h3>
              <div class="mb-3">
                Total number of Referrals:
                <span class="rank_info text-xl">{{ rankInfo.numStakers }}</span>
              </div>
            </div> -->

            <ul
              v-for="rInfo of resultInfo"
              :key="rInfo"
              class="my-3 border border-gray-300 rounded-md"
            >
              <li>
                <h4>
                  <span class="font-bold text-xl">{{ rInfo[1] }} ASTR</span>
                </h4>
                <a
                  :href="`https://astar.subscan.io/account/${astrAccount}`"
                  class="font-bold text-blue-500"
                  target="_blank"
                  >{{ astrAccount }}</a
                >
              </li>
            </ul>
          </div>
          <div v-if="searching && resultInfo.length === 0">
            <h3>No contribution by the address</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { ActionTypes } from '@/store/action-types';
import Input from '../shared/Input.vue';
import Button from '../shared/Button.vue';
import { convertToPolkadotAddress } from '@/components/earlyadopter/utils';

export default defineComponent({
  components: {
    Input,
    Button
  },
  props: {
    // leaderboardData: {
    //   type: Array,
    //   required: true
    // }
  },
  setup(props) {
    const store = useStore();
    const searching = ref(false);
    const myAddress = ref('');
    const headersInfo = ref<string[]>([]);
    const resultInfo = ref<any>([]);
    const INPUT_ADDR_LENGTH = 48;
    const ASTAR_ADDR_LENGTH = 47;
    const astrAccount = ref<string>();
    // const rankInfo = ref();

    const onResult = async (e: any) => {
      e.preventDefault();

      resultInfo.value = [];
      const myAddr = myAddress.value;
      if (!myAddr || myAddr.length !== INPUT_ADDR_LENGTH) {
        return;
      }

      searching.value = true;
      store.dispatch(ActionTypes.SET_LOADING, { loading: true });

      let response = await fetch('static/astar-crowdloan-reward-88w.csv');
      const str = await response.text();

      headersInfo.value = str.slice(0, str.indexOf('\n')).split(',');
      // console.log('d', headersInfo.value);

      const rows = str.slice(str.indexOf('\n') + 1).split('\n');
      // console.log('r', rows[0].slice(0, ASTAR_ADDR_LENGTH));

      for (const row of rows) {
        if (
          convertToPolkadotAddress(row.slice(0, ASTAR_ADDR_LENGTH)) === myAddr
        ) {
          resultInfo.value.push(row.split(','));
          astrAccount.value = row.slice(0, ASTAR_ADDR_LENGTH);
        }
      }

      response = await fetch('static/all-partner-contributions.csv');
      const str2 = await response.text();

      const rows2 = str2.split('\n');
      // console.log('r2', rows2[0]);
      for (const row of rows2) {
        if (
          convertToPolkadotAddress(row.slice(0, ASTAR_ADDR_LENGTH)) === myAddr
        ) {
          resultInfo.value.push(row.split(','));
          astrAccount.value = row.slice(0, ASTAR_ADDR_LENGTH);
        }
      }

      //find ranking
      // const leaderboardData: any = props.leaderboardData;
      // let ranking = 1;
      // for (const item of leaderboardData) {
      //   if (item.referMemo === myAddr) {
      //     item.ranking = ranking;
      //     rankInfo.value = item;
      //     break;
      //   }
      //   ranking++;
      // }

      store.dispatch(ActionTypes.SET_LOADING, { loading: false });
    };

    return {
      searching,
      myAddress,
      headersInfo,
      resultInfo,
      astrAccount,
      // rankInfo,
      onResult
    };
  }
});
</script>
<style scoped>
button:disabled,
button[disabled] {
  opacity: 0.5;
}

.form-container {
  border: solid 1px #fff;
  background: linear-gradient(180deg, #f0f5fb 0%, #fff 100%);
  border-radius: 0.15rem;
  box-shadow: -5px 5px 20px #d3c0e1, 5px -5px 20px #b7d1eb;
}

.rank_info {
  font-family: 'Kanit', sans-serif;
  color: #1b6dc1;
}
</style>
