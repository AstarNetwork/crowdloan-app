<template>
  <div id="hero">
    <Navigation />
    <div class="container--header-main">
      <div class="row--head-line">
        <span class="text--head-line">Shiden Crowdloan for Kusama Auction</span>
      </div>
      <button @click="goToStakingArea" class="btn--gradient">
        Contribute now
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from './Navigation.vue';

export default defineComponent({
  components: { Navigation },
  props: {},
  setup() {
    const goToStakingArea = () => {
      const el = document.getElementById('stake');
      el && el.scrollIntoView({ behavior: 'smooth' });
    };

    return {
      goToStakingArea
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/header.scss';
</style>
