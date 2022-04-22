<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { connectApi } from './connectApi';
import { CROWDLOAN_ENDPOINT } from '../config/shiden/crowdloan';

// const endpoint = 'ws://127.0.0.1:9944';
const endpoint = CROWDLOAN_ENDPOINT;

export default defineComponent({
  provide: {
    api: connectApi(endpoint)
  }
});
</script>
