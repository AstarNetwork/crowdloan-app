<template>
  <div id="stake-dot" class="max-w-full mx-auto gradient">
    <div class="background-left">
      <div class="background-right pt-20 pb-20">
        <div class="max-w-2xl mx-auto pl-4 pr-4">
          <Title> Stake DOT </Title>
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
              <Input label="Polkadot Address" type="text" required />
              <Input
                label="Available Amount"
                innerLabel="DOT"
                type="text"
                placeholder="0"
                disabled
                required
              />
              <Input
                label="Staking Amount"
                innerLabel="DOT"
                type="text"
                placeholder="0"
                disabled
                required
              />
              <Input label="Referral Address (optional)" type="text" />
              <Input
                label="Estimated Amount"
                innerLabel="ASTA"
                type="text"
                placeholder="0"
                disabled
                required
              />
              <Input
                label="Email Address (optional)"
                type="text"
                placeholder="youremail@example.com"
              />
              <Button>Stake Now</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from './shared/Input.vue';
import Button from './shared/Button.vue';
import Title from './shared/Title.vue';
import { ActionTypes } from '@/store/action-types';
import { useStore } from 'vuex';

export default defineComponent({
  components: { Input, Button, Title },
  setup(props, { emit }) {
    const store = useStore();

    const staking = async () => {
      console.log('staking');
      store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
        msg: 'The amount of token to be transmitted must not be zero',
        alertType: 'error'
      });
    };

    return {
      staking
    };
  }
});
</script>

<style scoped>
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
