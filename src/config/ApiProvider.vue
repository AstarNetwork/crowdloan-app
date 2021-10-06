<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { connectApi } from './connectApi';

const endpoint = 'wss://rpc.polkadot.io';

export default defineComponent({
  provide: {
    api: connectApi(endpoint)
  }
});
</script>
