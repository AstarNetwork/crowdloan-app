<template>
  <div class="column--rule-item">
    <span class="text--item-title">{{ rule.title }}</span>
    <span class="text--item-description">{{ rule.rule }}</span>
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

<style lang="scss" scoped>
@import 'src/components/shiden/styles/rules.scss';
</style>
