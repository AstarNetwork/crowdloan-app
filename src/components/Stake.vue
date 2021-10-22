<template>
  <div id="stake-dot" class="max-w-full mx-auto gradient">
    <div class="background-left">
      <div class="background-right pt-20 pb-20">
        <div class="max-w-2xl mx-auto pl-4 pr-4">
          <Title>Stake DOT</Title>
          <p class="mb-12">
            <img
              src="@/assets/img/info.svg"
              class="w-4 h-4 align-middle inline"
            />
            Note: Proxy accounts and multi signatures are not able to receive
            rewards. <br />
            That the minimum contribution is set to 5 DOT by Parity.
          </p>
          <div class="form-container p-12">
            <form class="p-4" @submit="staking">
              <Input
                label="Polkadot Address"
                type="text"
                required
                v-model="data.polkadotAddress"
                :validationMessage="data.errors['polkadotAddress']"
              />
              <balance
                :balance="data.availableAmount"
                :decimals="12"
                :unit="'DOT'"
              />
              <Input
                v-model="data.stakingAmount"
                label="Staking Amount"
                innerLabel="DOT"
                type="number"
                min="0"
                placeholder="0"
                required
                :validationMessage="data.errors['stakingAmount']"
              />
              <Input
                label="Referral Address (optional)"
                type="text"
                v-model="data.referralAddress"
                :validationMessage="data.errors['referralAddress']"
              />
              <Input
                v-model="data.estimatedAmount"
                label="Minimum Amount You Get (Excluded Bonus)"
                innerLabel="ASTR"
                type="number"
                placeholder="0"
                disabled
              />
              <Button :disabled="!isEnableStaking">Stake Now</Button>
            </form>
            <!-- {{ data }} -->
            <div class="p-3" v-if="resultHash">
              <h3>Staking success:</h3>
              <a
                :href="`https://rococo.subscan.io/extrinsic/${resultHash}`"
                target="_blank"
              >
                <div class="font-bold w-36 hashResult">{{ resultHash }}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, watch, computed, ref } from 'vue';
import { AccountInfo } from '@polkadot/types/interfaces';
import { web3FromSource } from '@polkadot/extension-dapp';
import BN from 'bn.js';
import Input from './shared/Input.vue';
import Button from './shared/Button.vue';
import Title from './shared/Title.vue';
import Balance from './shared/Balance.vue';
import { StakeFormData } from '../data/StakeFormData';
import { ActionTypes } from '@/store/action-types';
import { isValidAddressPolkadotAddress } from '@/config/polkadot';
import { ApiPromise } from '@polkadot/api';
import { useStore } from 'vuex';
import { keyring } from '@polkadot/ui-keyring';
import {
  PARA_ID,
  MINIMUM_STAKING_AMOUNT,
  DEFAULT_REWARD_AMOUNT
} from '@/config/crowdloan';

export default defineComponent({
  components: { Input, Button, Title, Balance },
  setup(props, { emit }) {
    const store = useStore();
    const data = reactive<StakeFormData>(new StakeFormData());
    const api: any = inject('api');

    const allAccounts = ref();
    const resultHash = ref('');

    // set accounts from extensions
    keyring.accounts.subject.subscribe((accounts: any) => {
      if (api && accounts) {
        // console.log('accounts', Object.keys(accounts));
        allAccounts.value = Object.keys(accounts);
        data.polkadotAddress = Object.keys(accounts)[0];
      }
    });

    const setAvailableAmount = async () => {
      try {
        const apiData: ApiPromise = (await api).api;
        const account: AccountInfo = (await apiData.query.system.account(
          data.polkadotAddress
        )) as AccountInfo;
        console.log('acc', account);
        data.availableAmount = account.data.free.toBn() || new BN(0);
      } catch (e) {
        console.error(e);
      }
    };

    watch(
      () => [api, data.polkadotAddress],
      async () => {
        if (api && validatePolkadotAddress(data.polkadotAddress)) {
          await setAvailableAmount();
        }
      }
    );
    watch(
      () => data.stakingAmount,
      () => {
        if (validateStakingAmount(data.stakingAmount, data.availableAmount)) {
          const baseReward = data.stakingAmount;
          data.estimatedAmount = baseReward / 2;
        }
      }
    );

    const validatePolkadotAddress = (value: string): boolean => {
      if (!value) {
        data.errors['polkadotAddress'] = 'Polkadot address is required.';
        return false;
      }
      const isAddressValid = isValidAddressPolkadotAddress(value);
      if (isAddressValid) {
        data.errors['polkadotAddress'] = '';
      } else {
        data.errors['polkadotAddress'] = 'Invalid Polkadot address.';
      }
      return isAddressValid;
    };
    const validateStakingAmount = (
      stakingAmount: number,
      availableAmount: BN
    ): boolean => {
      if (stakingAmount <= 0) {
        data.errors['stakingAmount'] =
          'Staking amount should be greater than 0.';
        return false;
      }
      if (stakingAmount > 9999) {
        data.errors['stakingAmount'] =
          'Staking amount should be lower than 9999.';
        return false;
      }
      const bnStakingAmount = new BN(stakingAmount * 10 ** 12);

      if (bnStakingAmount.gte(availableAmount)) {
        data.errors['stakingAmount'] =
          'Staking amount can not be greater than available amount.';
        return false;
      }
      data.errors['stakingAmount'] = '';
      return true;
    };

    const initialize = async () => {
      data.stakingAmount = MINIMUM_STAKING_AMOUNT;
      data.estimatedAmount = DEFAULT_REWARD_AMOUNT;
      data.referralAddress = '';
      await setAvailableAmount();
    };

    const isEnableStaking = computed(
      () =>
        data.polkadotAddress &&
        data.polkadotAddress.length > 0 &&
        data.stakingAmount > 0 &&
        data.errors['polkadotAddress'] === '' &&
        data.errors['stakingAmount'] === ''
    );

    const staking = async (e: any) => {
      e.preventDefault();

      store.dispatch(ActionTypes.SET_LOADING, { loading: true });

      const apiData: ApiPromise = (await api).api;
      const injector = await web3FromSource('polkadot-js');

      const contributeTransaction = apiData.tx.crowdloan.contribute(
        PARA_ID,
        data.stakingAmount * 10 ** 12,
        null
      );

      if (data.referralAddress) {
        try {
          const memo = apiData.createType('Bytes', data.referralAddress);
          const memoTransaction = apiData.tx.crowdloan.addMemo(PARA_ID, memo);

          const batch = apiData.tx.utility.batchAll([
            contributeTransaction,
            memoTransaction
          ]);

          await batch.signAndSend(
            data.polkadotAddress,
            { signer: injector.signer },
            async (status) => {
              const error = status.events.filter(({ event }) =>
                apiData.events.system.ExtrinsicFailed.is(event)
              );

              if (status.status.isFinalized) {
                const hashResult = batch.hash.toHex();
                console.log('hashResult', hashResult);
                resultHash.value = hashResult;
                store.dispatch(ActionTypes.SET_LOADING, { loading: false });

                await initialize();
              }

              if (error.length) {
                store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
                  msg: `error occurred: ${error}`,
                  alertType: 'error'
                });
                store.dispatch(ActionTypes.SET_LOADING, { loading: false });
              }
            }
          );
        } catch (err) {
          store.dispatch(ActionTypes.SET_LOADING, { loading: false });
          console.error(err);
        }
      } else {
        try {
          await contributeTransaction.signAndSend(
            data.polkadotAddress,
            { signer: injector.signer },
            async (status) => {
              const error = status.events.filter(({ event }) =>
                apiData.events.system.ExtrinsicFailed.is(event)
              );

              if (status.status.isFinalized) {
                const hashResult = contributeTransaction.hash.toHex();
                console.log('hashResult', hashResult);
                store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
                  msg: `Staking Complete...!`,
                  alertType: 'success'
                });
                store.dispatch(ActionTypes.SET_LOADING, { loading: false });
                resultHash.value = hashResult;

                await initialize();
              }

              if (error.length) {
                store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
                  msg: `error occurred: ${error}`,
                  alertType: 'error'
                });
                store.dispatch(ActionTypes.SET_LOADING, { loading: false });
              }
            }
          );
        } catch (err) {
          store.dispatch(ActionTypes.SET_LOADING, { loading: false });
          console.error(err);
        }
      }
    };

    return {
      data,
      isEnableStaking,
      resultHash,
      staking
    };
  }
});
</script>

<style scoped>
button:disabled,
button[disabled] {
  opacity: 0.5;
}

.gradient {
  background: linear-gradient(180deg, #fff 0%, #fafbfe 30%);
}

.background-left {
  background-size: 550px;
  background-repeat: no-repeat;
  background-position: 0 bottom;
  background-image: url('~@/assets/img/stake-dot-left.png');
}

.background-right {
  background-size: 300px;
  background-repeat: no-repeat;
  background-position: right top;
  background-image: url('~@/assets/img/stake-dot-right.png');
}

.form-container {
  border: solid 1px #fff;
  background: linear-gradient(180deg, #f0f5fb 0%, #fff 100%);
  border-radius: 0.15rem;
  box-shadow: -5px 5px 20px #d3c0e1, 5px -5px 20px #b7d1eb;
}

.hashResult {
  display: inline-block;
  width: 15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
