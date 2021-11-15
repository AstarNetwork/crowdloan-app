<template>
  <ApiProvider>
    <Header />
  </ApiProvider>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ApiProvider from '../config/ApiProvider.vue';
import Header from '../components/external/Header.vue';

export default defineComponent({
  name: 'ExternalHeader',
  components: {
    ApiProvider,
    Header
  }
});
</script>
