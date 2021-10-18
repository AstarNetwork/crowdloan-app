<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { connectApi } from './connectApi';

const endpoint = 'ws://127.0.0.1:9944';

export default defineComponent({
  provide: {
    api: connectApi(endpoint)
  }
});
</script>
