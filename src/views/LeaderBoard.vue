<template>
  <ApiProvider>
    <Status :data="statuses" />
    <Board />
  </ApiProvider>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ApiProvider from '../config/ApiProvider.vue';
import Status from '../components/leaderboard/Status.vue';
import Board from '../components/leaderboard/Board.vue';
import { referralStatusData } from '../data/AppData';
import { StatusData } from '@/data/StatusData';

export default defineComponent({
  name: 'LeaderBoard',
  components: {
    ApiProvider,
    Status,
    Board
  },
  setup() {
    const statuses = ref<StatusData[]>(referralStatusData)
    return {
      statuses
    }
  }
});
</script>
