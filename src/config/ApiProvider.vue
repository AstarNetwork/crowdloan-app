<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { connectApi } from './connectApi';

// const endpoint = 'ws://127.0.0.1:9944';
// const endpoint = 'wss://rpc.tokyo-relay.astar.network';
const endpoint = 'wss://rpc.polkadot.io';

export default defineComponent({
  provide: {
    api: connectApi(endpoint)
  }
});
</script>
