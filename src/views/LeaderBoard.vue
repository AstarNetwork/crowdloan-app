<template>
  <div class="overflow-x-hidden">
    <ApiProvider>
      <Navigation class="max-w-full mx-auto" />
      <Status :data="statuses" />
      <Board />
    </ApiProvider>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ApiProvider from '../config/ApiProvider.vue';
import Navigation from '../components/Navigation.vue';
import Status from '../components/Status.vue';
import Board from '../components/leaderboard/Board.vue';
import { statusItems } from '../data/AppData';
import { StatusData } from '@/data/StatusData';

export default defineComponent({
  name: 'LeaderBoard',
  components: {
    ApiProvider,
    Navigation,
    Status,
    Board
  },
  setup() {
    const statuses = ref<StatusData[]>(statusItems);
    return {
      statuses
    };
  }
});
</script>
