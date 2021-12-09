<template>
  <div class="overflow-x-hidden">
    <ApiProvider>
      <Navigation class="max-w-full mx-auto" />
      <ConnectAccount />
    </ApiProvider>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ApiProvider from '../config/ApiProvider.vue';
import Navigation from '../components/Navigation.vue';
import ConnectAccount from '../components/earlyadopter/ConnectAccount.vue';

export default defineComponent({
  name: 'EarlyAdopter',
  components: {
    ApiProvider,
    Navigation,
    ConnectAccount
  }
});
</script>
