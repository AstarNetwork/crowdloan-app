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
      <div class="row--disclaimer">
        <span class="text--label">
          KSM will be locked for 48weeks. Rewards SDN has vesting.
          <!-- Todo: Add article url -->
          <a
            href="/"
            class="text--learn-more"
            target="_blank"
            rel="noopener noreferrer"
            >&nbsp;Learn more</a
          >
        </span>
      </div>
      <div class="row--contribute-btn">
        <button
          :disabled="isDisable"
          :class="isDisable && 'btn--disabled'"
          class="btn--gradient"
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
  REWARD_RATIO,
  UNIT
} from '@/config/shiden/crowdloan';
import { StakeFormData } from '@/data/StakeFormData';
import { defineComponent, ref, computed } from 'vue';
import { formatBalance } from '@polkadot/util';
import BN from 'bn.js';

export default defineComponent({
  props: {
    isEnableStaking: {
      type: Boolean,
      default: false
    },
    availableAmount: {
      type: BN
    },
  },
  setup(props) {
    const stakeAmount = ref<string>('');
    const isTyping = ref<boolean>(false);
    const setIsTyping = (typing: boolean): void => {
      isTyping.value = typing;
    };

    // const currentContributions = computed(() => {
    //   const value = 123.456;
    //   return `${value.toLocaleString('en-US')} KSM`;
    // });

    // const yourEstimatedRewards = computed(() => {
    //   const value = 2829;
    //   return `${value.toLocaleString('en-US')} SDN`;
    // });

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

    const earningRewards = computed(() => {
      if (stakeAmount.value) {
        const value = Number(stakeAmount.value) * REWARD_RATIO;
        return `At least ${value.toLocaleString('en-US')} SDN+`;
      }
      return '0 SDN';
    });

    const errMsg = computed(() => {
      if (
        stakeAmount.value &&
        MINIMUM_STAKING_AMOUNT >= Number(stakeAmount.value)
      ) {
        return `Minimum contribute amount: ${MINIMUM_STAKING_AMOUNT} KSM`;
      } else {
        return null;
      }
    });

    const isDisable = computed(() => {
      if (MINIMUM_STAKING_AMOUNT >= Number(stakeAmount.value)) {
        return true;
      } else {
        return false;
      }
    });

    return {
      stakeAmount,
      isTyping,
      setIsTyping,
      // currentContributions,
      // yourEstimatedRewards,
      availableBalance,
      earningRewards,
      errMsg,
      isDisable,
      REWARD_RATIO
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/stake-form.scss';
</style>
