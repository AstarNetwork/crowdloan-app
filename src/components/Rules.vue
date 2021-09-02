<template>
  <div class="pt-28 pb-28 max-w-5xl mx-auto px-3">
    <div><Title>The Rules of Astar’s Polkadot Crowdloan</Title></div>
    <div class="grid grid-cols-2 gap-x-20 gap-y-16 pt-6">
      <Rule v-for="(rule, index) in rules" :rule="rule" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Title from './shared/Title.vue';
import Rule from './Rule.vue';

export default defineComponent({
  components: { Title, Rule },
  props: {
    rules: {
      type: Array,
      required: true
    }
  }
});
</script>
