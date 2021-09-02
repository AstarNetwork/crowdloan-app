<template>
  <div class="pt-28 pb-28 max-w-5xl mx-auto px-3">
    <div><Title>The Rules of Astar’s Polkadot Crowdloan</Title></div>
    <div class="grid grid-cols-2 gap-x-20 gap-y-16 pt-6">
      <div>
        <h3>Parachain Auction</h3>
        <p class="text-left">
          Polkadot is a shared protocol that enables blockchain networks to
          operate together seamlessly. To be a part of the Polkadot network,
          Astar Network must secure a slot during the Polkadot parachain
          auction. We are raising DOT from our community to help win the
          auction.
        </p>
      </div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Title from './shared/Title.vue';

export default defineComponent({
  components: { Title }
});
</script>
