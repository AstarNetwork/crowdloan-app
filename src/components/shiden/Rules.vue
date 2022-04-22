<template>
  <div class="container--rules">
    <div class="box--rules">
      <div class="row--rule-title">
        <span class="text--rule-title">
          Why host a Crowdloan and how does it work?
        </span>
      </div>
      <div class="column-rule">
        <Rule v-for="(rule, index) in rules" :rule="rule" :key="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Rule from './Rule.vue';

export default defineComponent({
  components: { Rule },
  props: {
    rules: {
      type: Array,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/rules.scss';
</style>
