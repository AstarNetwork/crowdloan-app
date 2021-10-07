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
            rewards
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
              <Input
                v-model="data.availableAmount"
                label="Available Amount"
                innerLabel="DOT"
                type="number"
                placeholder="0"
                disabled
                required
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
                label="Estimated Amount"
                innerLabel="ASTR"
                type="number"
                placeholder="0"
                disabled
                required
              />
              <Input
                v-model="data.emailAddress"
                label="Email Address (optional)"
                type="text"
                placeholder="youremail@example.com"
                :validationMessage="data.errors['emailAddress']"
              />
              <Button :disabled="!isEnableStaking">Stake Now</Button>
            </form>
            {{ data }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, watch, computed, ref } from 'vue';
import { AccountInfo, Balance } from '@polkadot/types/interfaces';
import { web3FromSource } from '@polkadot/extension-dapp';
import Input from './shared/Input.vue';
import Button from './shared/Button.vue';
import Title from './shared/Title.vue';
import { StakeFormData } from '../data/StakeFormData';
import { ActionTypes } from '@/store/action-types';
import { isValidAddressPolkadotAddress } from '@/config/polkadot';
import { ApiPromise } from '@polkadot/api';
import { useStore } from 'vuex';
import { keyring } from '@polkadot/ui-keyring';

export default defineComponent({
  components: { Input, Button, Title },
  setup(props, { emit }) {
    const AIR_REWARD = 400;
    const REFERRAL_RATE = 1.05;
    const EARLY_BIRD_RATE = 1.1;

    const store = useStore();
    const data = reactive<StakeFormData>(new StakeFormData());
    const api: any = inject('api');

    const allAccounts = ref();
    keyring.accounts.subject.subscribe((accounts: any) => {
      if (api && accounts) {
        console.log('accounts', Object.keys(accounts));
        allAccounts.value = Object.keys(accounts);
        data.polkadotAddress = Object.keys(accounts)[0];
      }
    });

    watch(
      () => data.emailAddress,
      () => {
        validateEmail(data.emailAddress ?? '');
      }
    );
    watch(
      () => [api, data.polkadotAddress],
      async () => {
        if (api && validatePolkadotAddress(data.polkadotAddress)) {
          try {
            const apiData: ApiPromise = (await api).api;
            const account: AccountInfo = (await apiData.query.system.account(
              data.polkadotAddress
            )) as AccountInfo;
            data.availableAmount = account.data.free.toNumber() || 0;
          } catch (e) {
            console.error(e);
          }
        }
      }
    );
    watch(
      () => [data.stakingAmount, data.referralAddress],
      () => {
        // if (validateStakingAmount(data.stakingAmount, data.availableAmount)) {
        const baseReward = data.stakingAmount * AIR_REWARD;

        const validReferralAddress =
          data.referralAddress &&
          !validateReferralAddress(data.referralAddress);

        // if (isEarlybird && validReferralAddress) {
        //   data.estimatedAmount = baseReward * EARLY_BIRD_RATE * REFERRAL_RATE;
        // } else if (isEarlybird) {
        //   data.estimatedAmount = baseReward * EARLY_BIRD_RATE;
        // } else
        if (validReferralAddress) {
          data.estimatedAmount = baseReward * REFERRAL_RATE;
        } else {
          data.estimatedAmount = baseReward;
        }
        // } else {
        //   data.estimatedAmount = 0;
        // }
      }
    );

    const validateEmail = (value: string): void => {
      const regEx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!value || regEx.test(value)) {
        data.errors['emailAddress'] = '';
      } else {
        data.errors['emailAddress'] = 'Invalid Email Address.';
      }
    };
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
      availableAmount: number
    ): boolean => {
      if (stakingAmount <= 0) {
        data.errors['stakingAmount'] =
          'Staking amount should be greater than 0.';
        return false;
      }
      if (stakingAmount > availableAmount) {
        data.errors['stakingAmount'] =
          'Staking amount can not be greater than available amount.';
        return false;
      }
      data.errors['stakingAmount'] = '';
      return true;
    };

    const validateReferralAddress = (address: string): boolean => {
      const isAddressValid = isValidAddressPolkadotAddress(address);
      if (!isAddressValid) {
        data.errors['referralAddress'] = 'Enter a valid referral address.';
        return false;
      }
      data.errors['referralAddress'] = '';
      return true;
    };

    const isEnableStaking = computed(
      () =>
        data.polkadotAddress &&
        data.polkadotAddress.length > 0 &&
        data.stakingAmount > 0 &&
        data.errors['polkadotAddress'] === '' &&
        data.errors['emailAddress'] === '' &&
        data.errors['stakingAmount'] === ''
    );

    const staking = async (e: any) => {
      e.preventDefault();

      store.dispatch(ActionTypes.SET_LOADING, { loading: true });

      const apiData: ApiPromise = (await api).api;
      const injector = await web3FromSource('polkadot-js');

      const contributeTransaction = apiData.tx.crowdloan.contribute(
        2088,
        data.stakingAmount * 10 ** 12,
        null
      );

      if (data.referralAddress) {
        try {
          const memo = apiData.createType('Bytes', data.referralAddress);
          const memoTransaction = apiData.tx.crowdloan.addMemo(2088, memo);

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
                if (data.emailAddress) {
                  // await addToMailchimp(
                  //   data.emailAddress,
                  //   {},
                  //   'https://polkadot.us17.list-manage.com/subscribe/post?u=27084e1d9e6f92398b5c7ce91&id=2c580b74e1',
                  // );
                }

                const hashResult = batch.hash.toHex();
                console.log('hashResult', hashResult);
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
                api.events.system.ExtrinsicFailed.is(event)
              );

              if (status.status.isFinalized) {
                if (data.emailAddress) {
                  // await addToMailchimp(
                  //   data.emailAddress,
                  //   {},
                  //   'https://polkadot.us17.list-manage.com/subscribe/post?u=27084e1d9e6f92398b5c7ce91&id=2c580b74e1',
                  // );
                }

                const hashResult = contributeTransaction.hash.toHex();
                console.log('hashResult', hashResult);
                store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
                  msg: `Staking Complete: ${hashResult}`,
                  alertType: 'success'
                });
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
</style>
