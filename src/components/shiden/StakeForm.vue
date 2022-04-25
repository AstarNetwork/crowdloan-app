<template>
  <div class="wrapper">
    <div class="container--form">
      <!-- Memo: Reference (old design) -->
      <!-- <div class="row--stake-status">
        <div class="column--stake-status">
          <span class="text--label">Your current contributions</span>
          <div class="box--status">
            <div class="box-status-bg" />
            <div class="status--value">
              <span class="text--input-value">{{ currentContributions }}</span>
            </div>
          </div>
        </div>
        <div class="column--stake-status">
          <span class="text--label">Your estimated rewards</span>
          <div class="box--status">
            <div class="box-status-bg" />
            <div class="status--value">
              <span class="text--input-value">{{ yourEstimatedRewards }}</span>
            </div>
          </div>
        </div>
      </div> -->

      <div class="row--input">
        <div>
          <span class="text--label">Your available token</span>
        </div>
        <div class="box--amount">
          <span class="text--input-value">{{ availableBalance }}</span>
        </div>
      </div>
      <div class="row--input">
        <div>
          <span class="text--label">Add contributions</span>
        </div>
        <div :class="isTyping && 'input--active'" class="row--input-amount">
          <div class="box--input">
            <table class="table--input">
              <tr class="tr--input">
                <input
                  v-model="stakeAmount"
                  inputmode="decimal"
                  type="number"
                  min="0"
                  pattern="^[0-9]*(\.)?[0-9]*$"
                  placeholder="0"
                  class="input input--no-spin"
                  @focus="setIsTyping(true)"
                  @blur="setIsTyping(false)"
                />
                <td>
                  <div class="text--unit">
                    <span class="text--input-value">KSM</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="row--error">
            <span class="text--err-msg">{{ errMsg }}</span>
          </div>
        </div>
      </div>
      <div class="row--input">
        <div class="estimation">
          <span class="text--label">Your rewards</span>
          <span>(You will get at least 1KSM={{ REWARD_RATIO }}SDN+)</span>
        </div>
        <div class="box--amount">
          <span class="text--earning">{{ earningRewards }}</span>
        </div>
      </div>
      <div class="container--disclaimer">
        <div class="row--disclaimer--title">
          <span>Please read carefully before making your contribution</span>
        </div>
        <div class="box--disclaimer-line">
          <div class="row--disclaimer">
            <div>
              <span class="text--form-order">1.</span>
            </div>
            <div>
              <div>
                <span class="text--form"
                  >KSM will be locked for 48 weeks. Rewards SDN has
                  vesting.</span
                >
              </div>
              <a
                href="https://medium.com/astar-network/announcing-the-second-official-shiden-crowdloan-d11d71debd52"
                class="text--learn-more"
                target="_blank"
                rel="noopener noreferrer"
                >Learn more.</a
              >
            </div>
          </div>
          <div class="row--disclaimer">
            <span class="text--form-order">2.</span>
            <span class="text--form"
              >Please DO NOT join from a Ledger/Lockdrop account. We cannot
              provide any support for those accounts.</span
            >
          </div>
          <div class="row--disclaimer">
            <span class="text--form-order">3.</span>
            <span class="text--form"
              >Proxy accounts and multi signatures are not able to receive
              rewards.</span
            >
          </div>
        </div>
      </div>
      <div class="row--contribute-btn">
        <button
          :disabled="isDisable"
          :class="isDisable && 'btn--disabled'"
          class="btn--gradient"
          @click="contribute"
        >
          Contribute
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  MINIMUM_STAKING_AMOUNT,
  MIN_BALANCE,
  REWARD_RATIO,
  UNIT
} from '@/config/shiden/crowdloan';
import { defineComponent, ref, computed, watch } from 'vue';
import { formatBalance } from '@polkadot/util';
import BN from 'bn.js';

export default defineComponent({
  props: {
    isEnableStaking: {
      type: Boolean,
      default: false
    },
    availableAmount: {
      type: BN,
      required: true
    }
  },
  emits: ['staking'],
  setup(props, { emit }) {
    const stakeAmount = ref<string>('');
    const isTyping = ref<boolean>(false);
    const setIsTyping = (typing: boolean): void => {
      isTyping.value = typing;
    };

    const availableBalance = computed(() => {
      const value = props.availableAmount;
      const formatted = formatBalance(value, {
        withSiFull: true,
        decimals: UNIT
      });

      const formattedValue = formatted
        .split(' ')
        .slice(0, 2)
        .join(' ')
        .replace('Unit', '');

      return `${formattedValue.toLocaleString()} KSM`;
    });

    const earningRewards = ref('0 SDN');
    const errMsg = ref('');

    const validateStakingAmount = (
      stakingAmount: number,
      availableAmount: BN
    ): boolean => {
      if (stakingAmount < MINIMUM_STAKING_AMOUNT) {
        errMsg.value = `Minimum contribute amount: ${MINIMUM_STAKING_AMOUNT} KSM`;
        return false;
      }

      if (stakingAmount > 9999) {
        errMsg.value = 'Staking amount should be lower than 9999.';
        return false;
      }

      const bnStakingAmount = new BN(10 ** UNIT).muln(stakingAmount);
      if (bnStakingAmount.gte(availableAmount)) {
        errMsg.value =
          'Staking amount can not be greater than available amount.';
        return false;
      }

      const remainingBal = availableAmount.sub(
        new BN(10 ** UNIT).muln(stakingAmount)
      );
      // MEMO: https://wiki.polkadot.network/docs/build-protocol-info#existential-deposit
      if (remainingBal.lt(new BN(MIN_BALANCE * 10 ** UNIT))) {
        errMsg.value = `Account with balance below the existential deposit will be reaped (Kusama's existential deposit is ${MIN_BALANCE} KSM)`;
        return false;
      }

      errMsg.value = '';
      return true;
    };

    watch(
      () => stakeAmount.value,
      () => {
        if (
          validateStakingAmount(
            Number(stakeAmount.value),
            props.availableAmount
          )
        ) {
          const baseReward = Number(stakeAmount.value);
          const estimatedAmount = baseReward * REWARD_RATIO;
          earningRewards.value = `At least ${estimatedAmount.toLocaleString(
            'en-US'
          )} SDN+`;
        }
      }
    );

    const isDisable = computed(() => {
      if (!props.isEnableStaking || errMsg.value.length > 0) {
        return true;
      } else {
        if (MINIMUM_STAKING_AMOUNT > Number(stakeAmount.value)) {
          return true;
        } else {
          return false;
        }
      }
    });

    const contribute = () => {
      emit('staking', Number(stakeAmount.value));

      stakeAmount.value = '';
      earningRewards.value = '';
    };

    return {
      stakeAmount,
      isTyping,
      setIsTyping,
      availableBalance,
      earningRewards,
      errMsg,
      isDisable,
      REWARD_RATIO,
      contribute
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/stake-form.scss';
</style>
