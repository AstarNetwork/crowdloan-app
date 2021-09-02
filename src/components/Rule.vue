<template>
  <div class="text-left">
    <h3 class="text-primary font-bold text-2xl mb-2">{{ rule.title }}</h3>
    <p class="mb-4">{{ rule.rule }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    rule: {
      type: Object,
      required: true
    }
  }
});
</script>
