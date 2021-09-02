<template>
  <div class="font-sans">
    <Header />
    <RemainingTime :startTime="startTime" :endTime="endTime" />
    <Stake />
    <Status :data="statusItems" />
    <Rules :rules="rules" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment from 'moment';
import Header from './components/Header.vue';
import RemainingTime from './components/RemainingTime.vue';
import Stake from './components/Stake.vue';
import Status from './components/Status.vue';
import Rules from './components/Rules.vue';
import { StatusData } from './data/StatusData';
import { RuleData } from './data/RuleData';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    RemainingTime,
    Stake,
    Status,
    Rules
  },
  setup() {
    const startTime = moment.utc([2021, 1, 1]);
    const endTime = moment.utc([2022, 1, 1]);
    const statusItems = ref<StatusData[]>([
      { value: 14164, description: 'Participants' },
      { value: 501137.7, description: 'DOT Contributed' },
      { value: 6845464.7, description: 'ASTA to be Distributed' }
    ]);

    const rules = ref<RuleData[]>([
      {
        title: 'Parachain Auction',
        rule: 'Polkadot is a shared protocol that enables blockchain networks to operate together seamlessly. To be a part of the Polkadot network, Astar Network must secure a slot during the Polkadot parachain auction. We are raising DOT from our community to help win the auction.'
      },
      {
        title: 'Earlier Participants Earn a Higher Bonus',
        rule: 'Unlike other projects, we encourage DOT holders to join our crowdloan as early as possible. The bonus rate we distribute will decrease over time - this means that the earlier participants join, the higher the bonus they’ll receive. At the last Kusama auction, the early contributors received around 110 SDN per KSM. On the other hand, the last minute contributors only received around 60 SDN per KSM.'
      },
      {
        title: 'ASN Token Distribution',
        rule: '1 month after successfully securing a Polkadot parachain slot, Astar network’s native token (ASN) will be distributed to the crowdloan participants’ addresses. The participants who join the crowdloan through exchanges will be able to see their balance once we enable token transfers.'
      },
      {
        title: 'Number of ASN token',
        rule: 'The number of ASN tokens the participants will receive is determined based on the time when they join Astar’s crowdloan, how many DOTs they lock for Astar, and the total amount of locked DOTs in the crowdloan.'
      }
    ]);

    return {
      startTime,
      endTime,
      statusItems,
      rules
    };
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
