<template>
  <div class="font-sans">
    <Header />
    <RemainingTime :startTime="startTime" :endTime="endTime" />
    <Stake />
    <Status :data="statusItems" />
    <Rules />
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

    return {
      startTime,
      endTime,
      statusItems
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
