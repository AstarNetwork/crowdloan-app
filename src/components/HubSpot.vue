<template>
  <div id="hubspotForm" v-once />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://js.hs-scripts.com/20284937.js';
    document.body.appendChild(script);
  }
});
</script>
