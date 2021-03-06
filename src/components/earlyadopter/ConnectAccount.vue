<template>
  <div class="pt-20 pb-20 status-background">
    <div class="max-w-6xl mx-auto">
      <div class="justify-center">
        <h1 class="font-bold text-xl">
          Early adopter participation confirmation
        </h1>
        <div>
          <div>
            <div
              class="
                mt-1
                w-full
                rounded-md
                bg-white
                dark:bg-darkGray-900
                border border-gray-300
                dark:border-darkGray-500
              "
            >
              <div
                v-if="!showConnectMetamsk"
                class="transform text-gray-400 dark:text-darkGray-500"
              >
                Loading....
              </div>

              <h3
                v-if="showConnectMetamsk"
                class="
                  text-lg
                  font-extrabold
                  text-blue-900
                  dark:text-white
                  mb-6
                  text-center
                "
              >
                Choose Account that you want to apply the lockdrop bonus.
              </h3>

              <div v-if="showConnectMetamsk && filterAccounts.length === 0">
                <h3>You did not participated in the Polkadot Crowdloan</h3>
              </div>
              <ul
                v-else
                class="
                  max-h-56
                  rounded-md
                  py-1
                  text-base
                  overflow-auto
                  focus:outline-none
                "
              >
                <AccountOption
                  v-for="(account, index) in filterAccounts"
                  :key="index"
                  :key-idx="index"
                  :address="account"
                  :addressName="allAccountNames[index]"
                  :contributed="allContributedD[index]"
                  :checked="selAccount === index"
                  v-model:selOption="selAccount"
                />
              </ul>

              <div class="border-2 border-dashed" />

              <div class="my-2">
                <MetamaskOption
                  v-show="showConnectMetamsk"
                  @connectMetamask="connectMetamask"
                />
                <div v-if="isResultReward" class="mt-3 font-bold">
                  <div v-if="prevLockdropInfo">
                    This account is eligible for a early bird bonus :
                    {{ formatASTR(prevLockdropInfo.bonusAmt) }} ASTR
                  </div>
                  <div v-else>
                    This account did not participate in the Lockdrop
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { keyring } from '@polkadot/ui-keyring';
import allJson from '@/static/allContributors.json';
import BN from 'bn.js';
import MetamaskOption from '@/components/earlyadopter/MetamaskOption.vue';
import AccountOption from '@/components/earlyadopter/AccountOption.vue';
import { saveForBonusUser } from '@/db';
import { UNIT, REWARD_RATIO } from '@/config/crowdloan';

export default defineComponent({
  components: {
    MetamaskOption,
    AccountOption
  },
  setup(props, { emit }) {
    const api: any = inject('api');
    const showConnectMetamsk = ref<boolean>(false);
    const allAccounts = ref<string[]>([]);
    const filterAccounts = ref<string[]>([]);
    const allAccountNames = ref<string[]>([]);
    const allContributed = ref<BN[]>([]);
    const allContributedD = ref<number[]>([]);
    const isResultReward = ref<boolean>(false);
    const prevLockdropInfo = ref();
    const selAccount = ref(0);

    const findContributed = async (addr) => {
      let contributed = new BN(0);
      const list: any = allJson;
      for (const elem of list) {
        if (elem.who === addr) {
          contributed = new BN(elem.contributed);
          // contributed = elem.contributed / 10 ** UNIT;
          return contributed;
        }
      }
      return contributed;
    };

    // set accounts from extensions
    keyring.accounts.subject.subscribe((accounts: any) => {
      if (api && accounts) {
        // console.log('accounts', Object.keys(accounts));
        allAccounts.value = Object.keys(accounts);
        allAccountNames.value = Object.values(accounts).map((obj: any) =>
          obj.option.name.replace('\n              ', '')
        );
      }
    });

    watch(
      () => allAccounts.value,
      async (accounts) => {
        if (accounts) {
          showConnectMetamsk.value = true;
          filterAccounts.value = [];
          allContributed.value = [];
          for await (const account of allAccounts.value) {
            const contributed = await findContributed(account);
            // console.log('a', account + '/' + contributed.toString(10));
            allContributed.value.push(contributed);
            allContributedD.value.push(
              contributed.div(new BN(10 ** UNIT)).toNumber()
            );

            if (contributed.gtn(0)) {
              filterAccounts.value.push(account);
            }
          }
        }
      }
    );

    const connectMetamask = async (ethAddr: string, ss58: string) => {
      // ethAddr = '0x7d5aAD39da469B6496841215CeC5B14e3FcaDaDF';
      console.log(ethAddr + '/' + ss58);
      let response = await fetch('static/first-crowdloan.json');
      const firstLockdrop = await response.json();
      let jsonObj = firstLockdrop.find((item) => item.lockOwner === ethAddr);
      // console.log('cr1', jsonObj);

      if (!jsonObj) {
        // console.log('fetch second lockdrop');
        response = await fetch('static/second-crowdloan.json');
        const secondLockdrop = await response.json();
        jsonObj = secondLockdrop.find((item) => item.lockOwner === ethAddr);
        // console.log('cr2', jsonObj);
      }

      isResultReward.value = true;

      if (jsonObj) {
        // set current crowdloan info : bonus 10% of contribution
        const amtContribution = allContributed.value[selAccount.value];
        jsonObj = {
          prevInfo: jsonObj,
          userEth: ethAddr,
          userSS58: ss58,
          targetBonusAddress: allAccounts.value[selAccount.value],
          amtContribution: amtContribution.toString(10),
          bonusAmt: amtContribution.muln(REWARD_RATIO / 10).toString(10),
          createdAt: new Date()
        };
        prevLockdropInfo.value = jsonObj;
        console.log('f', jsonObj);
        saveForBonusUser(jsonObj);
      } else {
        console.log('no bonus reward');
      }
    };

    // connectMetamask('0x7d5aAD39da469B6496841215CeC5B14e3FcaDaDF', '');

    const formatASTR = (reward) => {
      if (reward) {
        const formatted =
          new BN(reward).div(new BN(10 ** (UNIT - 2))).toNumber() / 100;
        return formatted;
      }
      return 0;
    };

    return {
      showConnectMetamsk,
      allAccounts,
      filterAccounts,
      allAccountNames,
      allContributed,
      allContributedD,
      prevLockdropInfo,
      selAccount,
      isResultReward,
      formatASTR,
      connectMetamask
    };
  }
});
</script>
<style scoped>
h1 {
  font-family: 'Kanit', sans-serif;
}
</style>
