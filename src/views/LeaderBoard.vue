<template>
  <ApiProvider>
    <Status />
  </ApiProvider>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ApiProvider from '../config/ApiProvider.vue';
import Status from '../components/leaderboard/Status.vue';

export default defineComponent({
  name: 'LeaderBoard',
  components: {
    ApiProvider,
    Status
  }
});
</script>
