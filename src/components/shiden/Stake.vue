<template>
  <div id="stake" class="container--stake">
    <div class="box--stake">
      <div class="row--stake-title">
        <span class="text--stake-title">Join Now</span>
      </div>
      <div class="wrapper-user-information">
        <div class="column--login">
          <div class="login__row--note">
            <img
              src="@/assets/shiden/information.svg"
              class="icon--information"
            />
            <span
              >Note: Proxy accounts and multi signatures are not able to receive
              rewards</span
            >
          </div>
          <div class="login__column-btn">
            <button class="btn--gradient" @click="openModal">
              <span v-if="data.polkadotAddress">
                {{ getShortenAddress(data.polkadotAddress) }}
              </span>
              <span v-else> Connect to wallet </span>
            </button>
          </div>
        </div>
        <StakeForm :is-enable-staking="isEnableStaking" :data="data" />
      </div>
    </div>
  </div>
  <ModalAccount
    v-if="modalAccount"
    v-model:isOpen="modalAccount"
    :all-accounts="allAccounts"
    :all-account-names="allAccountNames"
    v-model:currentAccount="data.polkadotAddress"
  />
</template>

<script lang="ts">
import { useStore } from 'vuex';
import StakeForm from './StakeForm.vue';
import ModalAccount from '../ModalAccount.vue';
import { StakeFormData } from '../../data/StakeFormData';
import {
  DEFAULT_REWARD_AMOUNT,
  MINIMUM_STAKING_AMOUNT,
  MIN_BALANCE,
  PARA_ID,
  REWARD_RATIO,
  UNIT
} from '@/config/shiden/crowdloan';
import { isValidAddressPolkadotAddress } from '@/config/polkadot';
import { ActionTypes } from '@/store/action-types';
import { ApiPromise } from '@polkadot/api';
import { web3FromSource } from '@polkadot/extension-dapp';
import { AccountInfo } from '@polkadot/types/interfaces';
import { keyring } from '@polkadot/ui-keyring';
import BN from 'bn.js';
import { computed, defineComponent, inject, reactive, ref, watch } from 'vue';

export default defineComponent({
  components: { ModalAccount, StakeForm },
  props: {
    rules: {
      type: Array,
      required: true
    }
  },
  setup() {
    const store = useStore();
    const data = reactive<StakeFormData>(new StakeFormData());
    const api: any = inject('api');

    const modalAccount = ref(false);
    const allAccounts = ref();
    const allAccountNames = ref();
    const resultHash = ref('');
    const openModal = () => {
      modalAccount.value = true;
    };

    const burnsWarning =
      "Account with balance below the existential deposit will be reaped (Polkadot's existential deposit is 1 DOT)";

    // set accounts from extensions
    keyring.accounts.subject.subscribe((accounts: any) => {
      if (api && accounts) {
        // console.log('accounts', Object.keys(accounts));
        // adjust ss58format for kusama
        allAccounts.value = Object.keys(accounts).map(account => keyring.encodeAddress(account, 2))
        allAccountNames.value = Object.values(accounts).map((obj: any) =>
          obj.option.name.replace('\n              ', '')
        );

        data.polkadotAddress = allAccounts.value[0];;
      }
    });

    const setAvailableAmount = async () => {
      try {
        const apiData: ApiPromise = (await api).api;
        const account: AccountInfo = (await apiData.query.system.account(
          data.polkadotAddress
        )) as AccountInfo;
        console.log('acc', account);
        data.availableAmount =
          (account.data.free.toBn() as any) || (new BN(0) as any);
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
          data.estimatedAmount = baseReward * REWARD_RATIO;
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
      if (stakingAmount < MINIMUM_STAKING_AMOUNT) {
        data.errors[
          'stakingAmount'
        ] = `Staking amount should be greater than ${MINIMUM_STAKING_AMOUNT}.`;
        return false;
      }

      // const bnStakingAmount = new BN(stakingAmount).mul(new BN(10 ** UNIT));
      const bnStakingAmount = new BN(data.stakingAmount * 10 ** UNIT);

      if (bnStakingAmount.gte(availableAmount)) {
        data.errors['stakingAmount'] =
          'Staking amount can not be greater than available amount.';
        return false;
      }

      const balance = data.availableAmount.div(new BN(10 ** UNIT)).toNumber();
      const remainingBal = balance - stakingAmount;
      // Ref: https://wiki.polkadot.network/docs/build-protocol-info#existential-deposit
      if (MIN_BALANCE > remainingBal) {
        data.errors['stakingAmount'] = burnsWarning;
        return true;
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
        data.stakingAmount >= MINIMUM_STAKING_AMOUNT &&
        data.availableAmount.div(new BN(10 ** UNIT)).toNumber() >=
          MINIMUM_STAKING_AMOUNT &&
        data.errors['polkadotAddress'] === '' &&
        (data.errors['stakingAmount'] === '' ||
          data.errors['stakingAmount'] === burnsWarning)
    );

    // QUICK_FIX: the crowdloan period has been over
    // const isEnableStaking = computed(() => false);

    const staking = async () => {
      store.dispatch(ActionTypes.SET_LOADING, { loading: true });

      const apiData: ApiPromise = (await api).api;
      const injector = await web3FromSource('polkadot-js');

      const contributeTransaction = apiData.tx.crowdloan.contribute(
        PARA_ID,
        data.stakingAmount * 10 ** UNIT,
        null
      );

      try {
        await contributeTransaction.signAndSend(
          data.polkadotAddress,
          { signer: injector.signer },
          async (status) => {
            const error = status.events.filter(({ event }) =>
              apiData.events.system.ExtrinsicFailed.is(event)
            );

            if (error.length) {
              console.error(`error occurred: ${error}`);
              store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
                msg: `error occurred: ${error}`,
                alertType: 'error'
              });
              store.dispatch(ActionTypes.SET_LOADING, { loading: false });
              return;
            }

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
          }
        );
      } catch (err) {
        store.dispatch(ActionTypes.SET_LOADING, { loading: false });
        console.error(err);
        store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
          msg: `error occurred: ${err}`,
          alertType: 'error'
        });
      }
    }

    const getShortenAddress = (address: string): string => {
      return address
        ? `${address.slice(0, 9)}${'.'.repeat(6)}${address.slice(-9)}`
        : '';
    };

    return {
      UNIT,
      data,
      resultHash,
      allAccounts,
      allAccountNames,
      modalAccount,
      isEnableStaking,
      openModal,
      getShortenAddress
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/stake.scss';
</style>
