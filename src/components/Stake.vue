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
            rewards. Also, the hardware wallet is not supported now! <br />
            The minimum contribution is set to 5 DOT.
          </p>
          <div class="form-container p-12">
            <!-- <div class="bg-orange text-white mb-4 py-2 text-xs font-bold">
              Warning: the hardware wallet is not supported now!
            </div> -->

            <form class="p-4" @submit="onShowModalDisclaimer">
              <label class="block text-left mb-2 text-base text-label">
                Polkadot Address
                <strong v-if="input && input.required" class="text-danger"
                  >*</strong
                >
              </label>
              <AddressSmall
                v-model:isOpen="modalAccount"
                :address="data.polkadotAddress"
              />
              <!-- <Input
                label="Polkadot Address"
                type="text"
                required
                v-model="data.polkadotAddress"
                :validationMessage="data.errors['polkadotAddress']"
              /> -->
              <balance
                :balance="data.availableAmount"
                :decimals="10"
                :unit="'DOT'"
              />

              <!-- <InputMax
                v-model="data.stakingAmount"
                label="Staking Amount"
                innerLabel="DOT"
                type="number"
                min="0"
                placeholder="0"
                required
                v-on:max="setMaxAmt"
                :validationMessage="data.errors['stakingAmount']"
              /> -->

              <InputAmount
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
              <Button
                :disabled="!isEnableStaking"
                :class="!isEnableStaking && 'button-disable'"
                >Contribute Now</Button
              >
              <!-- <Button disabled>Stake Now</Button> -->
            </form>

            <!-- {{ data }} -->
            <div class="p-3" v-if="resultHash">
              <h3>Contribution success:</h3>
              <a
                :href="`https://polkadot.subscan.io/extrinsic/${resultHash}`"
                target="_blank"
              >
                <div class="font-bold hashResult">
                  Check the transaction : {{ resultHash }}
                </div>
              </a>
            </div>

            <div class="mt-7">
              <InputWithCopy
                v-model="referLink"
                label="Invite your friends and Get a reward"
                type="text"
                disabled
              />
            </div>
          </div>
        </div>
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

  <Disclaimer
    v-if="modalDisclaimer"
    v-model:isOpen="modalDisclaimer"
    v-on:agree="staking"
  />
</template>

<script lang="ts">
import {
  DEFAULT_REWARD_AMOUNT,
  MINIMUM_STAKING_AMOUNT,
  MIN_BALANCE,
  PARA_ID,
  REWARD_RATIO
} from '@/config/crowdloan';
import { isValidAddressPolkadotAddress } from '@/config/polkadot';
import { ActionTypes } from '@/store/action-types';
import { ApiPromise } from '@polkadot/api';
import { web3FromSource } from '@polkadot/extension-dapp';
import { AccountInfo } from '@polkadot/types/interfaces';
import { keyring } from '@polkadot/ui-keyring';
import BN from 'bn.js';
import { computed, defineComponent, inject, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { StakeFormData } from '../data/StakeFormData';
import Disclaimer from './Disclaimer.vue';
import ModalAccount from './ModalAccount.vue';
import AddressSmall from './shared/AddressSmall.vue';
import Balance from './shared/Balance.vue';
import Button from './shared/Button.vue';
import Input from './shared/Input.vue';
import InputAmount from './shared/InputAmount.vue';
import InputWithCopy from './shared/InputWithCopy.vue';
import Title from './shared/Title.vue';

export default defineComponent({
  components: {
    Input,
    InputWithCopy,
    InputAmount,
    Button,
    Title,
    Balance,
    AddressSmall,
    ModalAccount,
    Disclaimer
  },
  setup(props, { emit }) {
    const store = useStore();
    const data = reactive<StakeFormData>(new StakeFormData());
    const api: any = inject('api');

    const modalAccount = ref(false);
    const modalDisclaimer = ref(false);
    const allAccounts = ref();
    const allAccountNames = ref();
    const resultHash = ref('');
    const referLink = ref('');

    const burnsWarning =
      "Account with balance below the existential deposit will be reaped (Polkadot's existential deposit is 1 DOT)";

    // check referral address as querystring
    let params = new URL(window.location.href).searchParams;
    let referral = params.get('referral');
    console.log('ref', referral);
    if (referral) {
      data.referralAddress = referral;
    }

    // set accounts from extensions
    keyring.accounts.subject.subscribe((accounts: any) => {
      if (api && accounts) {
        // console.log('accounts', Object.keys(accounts));
        allAccounts.value = Object.keys(accounts);
        allAccountNames.value = Object.values(accounts).map((obj: any) =>
          obj.option.name.replace('\n              ', '')
        );

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

          //set referral link
          referLink.value = `${window.location.origin}/?referral=${data.polkadotAddress}`;
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

    // const setMaxAmt = () => {
    //   data.stakingAmount = data.availableAmount
    //     .div(new BN(10 ** 10))
    //     .toNumber();
    // };

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

      if (stakingAmount > 9999) {
        data.errors['stakingAmount'] =
          'Staking amount should be lower than 9999.';
        return false;
      }
      const bnStakingAmount = new BN(stakingAmount).mul(new BN(10 ** 10));

      if (bnStakingAmount.gte(availableAmount)) {
        data.errors['stakingAmount'] =
          'Staking amount can not be greater than available amount.';
        return false;
      }

      const balance = data.availableAmount.div(new BN(10 ** 10)).toNumber();
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
      modalDisclaimer.value = false;

      await setAvailableAmount();
    };

    const isEnableStaking = computed(
      () =>
        data.polkadotAddress &&
        data.polkadotAddress.length > 0 &&
        data.stakingAmount >= MINIMUM_STAKING_AMOUNT &&
        data.availableAmount.div(new BN(10 ** 10)).toNumber() >=
          MINIMUM_STAKING_AMOUNT &&
        data.errors['polkadotAddress'] === '' &&
        (data.errors['stakingAmount'] === '' ||
          data.errors['stakingAmount'] === burnsWarning)
    );

    const onShowModalDisclaimer = (e: any) => {
      e.preventDefault();

      modalDisclaimer.value = true;
    };

    const staking = async () => {
      modalDisclaimer.value = false;
      store.dispatch(ActionTypes.SET_LOADING, { loading: true });

      const apiData: ApiPromise = (await api).api;
      const injector = await web3FromSource('polkadot-js');

      const contributeTransaction = apiData.tx.crowdloan.contribute(
        PARA_ID,
        data.stakingAmount * 10 ** 10,
        null
      );

      if (data.referralAddress) {
        try {
          const memo = apiData.createType('AccountId', data.referralAddress);
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
                const hashResult = batch.hash.toHex();
                console.log('hashResult', hashResult);
                store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
                  msg: `Thank you for your contribution!...!`,
                  alertType: 'success'
                });
                resultHash.value = hashResult;
                store.dispatch(ActionTypes.SET_LOADING, { loading: false });

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
      } else {
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
    };

    return {
      data,
      isEnableStaking,
      resultHash,
      referLink,
      staking,
      allAccounts,
      allAccountNames,
      modalAccount,
      modalDisclaimer,
      onShowModalDisclaimer
    };
  }
});
</script>

<style scoped>
.bg-orange {
  background: #ffa500;
}

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
  width: 25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.button-disable {
  cursor: not-allowed;
}
</style>
