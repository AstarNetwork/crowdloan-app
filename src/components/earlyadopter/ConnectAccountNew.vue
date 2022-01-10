<template>
  <div class="pt-20 pb-20 status-background">
    <div class="max-w-6xl mx-auto">
      <div class="justify-center">
        <h1 class="font-bold text-xl mb-2">
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
              <div class="text-sm font-bold border border-gray-200 py-2">
                To apply for the lockdrop bonus, you must meet the following
                criteria: <br />
                1. You have participated on 1st or 2nd lockdrop <br />
                2. You have contributed to the Polkadot crowdloan campaign with
                a different account from the lockdrop
              </div>

              <MetamaskOption @connectMetamask="connectMetamask" />

              <div v-if="isMetamaskConnected">
                <div
                  v-if="allAccounts.length === 0"
                  class="transform text-gray-400 dark:text-darkGray-500"
                >
                  Loading....
                </div>

                <h3
                  v-else
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

                <div
                  v-if="allAccounts.length > 0 && filterAccounts.length === 0"
                >
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
                    :addressName="filterAccountNames[index]"
                    :contributed="filterContributedD[index]"
                    :checked="selAccount === index"
                    v-model:selOption="selAccount"
                  />
                </ul>

                <div class="border-2 border-dashed" />

                <div v-if="filterAccounts.length > 0" class="my-2">
                  <div class="mt-3 font-bold">
                    <div v-if="prevLockdropInfo">
                      This account is eligible for a early bird bonus :
                      {{ formatASTR(bonusAmt) }} ASTR

                      <button
                        class="
                          ml-5
                          px-3
                          bg-primary
                          text-xl text-white
                          button-gradient
                        "
                        v-if="!isAlreadyApplied && filterAccounts.length > 0"
                        @click="applyBonus"
                      >
                        Apply
                      </button>
                      <div
                        class="font-bold mt-2"
                        v-else-if="
                          isAlreadyApplied && filterAccounts.length > 0
                        "
                      >
                        Applied
                      </div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { keyring } from '@polkadot/ui-keyring';
import allJson from '@/static/allContributors.json';
import BN from 'bn.js';
import { ActionTypes } from '@/store/action-types';
import MetamaskOption from '@/components/earlyadopter/MetamaskOption.vue';
import AccountOption from '@/components/earlyadopter/AccountOption.vue';
import { saveForBonusUser, isAlreadyAppliedForBonus } from '@/db';
import { UNIT, REWARD_RATIO } from '@/config/crowdloan';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    MetamaskOption,
    AccountOption
  },
  setup(props, { emit }) {
    interface META_TYPE {
      ethAddr: string;
      ss58: string;
    }

    const store = useStore();

    const api: any = inject('api');
    const allAccounts = ref<string[]>([]);
    const allAccountNames = ref<string[]>([]);
    const filterAccounts = ref<string[]>([]);
    const filterAccountNames = ref<string[]>([]);
    const filterContributed = ref<BN[]>([]);
    const filterContributedD = ref<number[]>([]);
    const isMetamaskConnected = ref<boolean>(false);
    const prevLockdropInfo = ref();
    const metaInfo = ref<META_TYPE>();
    const selAccount = ref(0);
    const bonusAmt = ref<string>();
    const isAlreadyApplied = ref<boolean>(false);

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
          filterAccounts.value = [];
          filterAccountNames.value = [];
          filterContributed.value = [];
          filterContributedD.value = [];
          let index = 0;
          for await (const account of allAccounts.value) {
            const contributed = await findContributed(account);
            // console.log('a', account + '/' + contributed.toString(10));

            if (contributed.gtn(0)) {
              filterAccounts.value.push(account);
              filterAccountNames.value.push(allAccountNames.value[index]);
              filterContributed.value.push(contributed);
              filterContributedD.value.push(
                contributed.div(new BN(10 ** UNIT)).toNumber()
              );
            }
            index++;
          }

          const amtContribution = filterContributed.value[selAccount.value];
          bonusAmt.value = amtContribution.muln(REWARD_RATIO / 10).toString(10);
        }
      }
    );

    watch(
      () => selAccount.value,
      async () => {
        if (filterAccounts.value.length > 0) {
          console.log('sel', selAccount.value);
          // set current crowdloan info : bonus 10% of contribution
          const amtContribution = filterContributed.value[selAccount.value];
          bonusAmt.value = amtContribution.muln(REWARD_RATIO / 10).toString(10);
        }
      }
    );

    const connectMetamask = async (ethAddr: string, ss58: string) => {
      // ethAddr = '0xaa9ff8d823369c8499e80eba9f26646e94e2e2ea';
      console.log(ethAddr + '/' + ss58);

      store.dispatch(ActionTypes.SET_LOADING, { loading: true });

      let response = await fetch('static/first-crowdloan.json');
      const firstLockdrop = await response.json();
      let jsonObj = firstLockdrop.find(
        (item) => item.lockOwner.toLowerCase() === ethAddr
      );
      // console.log('cr1', jsonObj);

      if (!jsonObj) {
        // console.log('fetch second lockdrop');
        response = await fetch('static/second-crowdloan.json');
        const secondLockdrop = await response.json();
        jsonObj = secondLockdrop.find(
          (item) => item.lockOwner.toLowerCase() === ethAddr
        );
        // console.log('cr2', jsonObj);
      }

      isMetamaskConnected.value = true;
      metaInfo.value = {
        ethAddr,
        ss58
      };

      if (jsonObj) {
        prevLockdropInfo.value = jsonObj;
        isAlreadyApplied.value = await isAlreadyAppliedForBonus(
          jsonObj.lockOwner
        );
      } else {
        console.log('no bonus reward');
      }

      store.dispatch(ActionTypes.SET_LOADING, { loading: false });
    };

    const applyBonus = async () => {
      if (prevLockdropInfo.value && metaInfo.value) {
        const targetBonusAddress = filterAccounts.value[selAccount.value];

        if (targetBonusAddress === metaInfo.value.ss58) {
          store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
            msg: `Your bonus has been automatically applied...!`,
            alertType: 'warning'
          });
          return;
        }

        const jsonObj = {
          prevInfo: prevLockdropInfo.value,
          userEth: metaInfo.value.ethAddr,
          userSS58: metaInfo.value.ss58,
          targetBonusAddress,
          createdAt: new Date()
          // amtContribution: amtContribution.toString(10),
          // bonusAmt: amtContribution.muln(REWARD_RATIO / 10).toString(10),
        };
        console.log('f', jsonObj);
        await saveForBonusUser(jsonObj);
        isAlreadyApplied.value = true;

        store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
          msg: `The bonus form is applied successfully...!`,
          alertType: 'success'
        });
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
      allAccounts,
      filterAccounts,
      filterAccountNames,
      filterContributed,
      filterContributedD,
      selAccount,
      isMetamaskConnected,
      prevLockdropInfo,
      bonusAmt,
      isAlreadyApplied,
      applyBonus,
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
