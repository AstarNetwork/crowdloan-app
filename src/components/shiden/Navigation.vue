<template>
  <div class="container--navigation">
    <div class="flex">
      <nav class="navigation">
        <a href="/">
          <div class="column--logo">
            <img src="@/assets/shiden/shiden-logo.svg" class="logo" />
          </div>
        </a>
        <div class="column--mobile-menu">
          <button @click="toggle" class="button--menu">
            <svg
              class="menu"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div :class="open ? 'block' : 'hidden'" class="sm:flex column--right">
          <div class="column--links">
            <a
              href="https://docs.astar.network/learn/polkadot-plo/faq"
              target="_blank"
              class="link-item"
            >
              FAQ
            </a>
            <a
              href="https://docs.astar.network/learn/polkadot-plo/"
              target="_blank"
              class="link-item"
            >
              Forum
            </a>
            <div class="link-item dropdown">
              Community
              <div class="dropdown-content right-1 md:right-auto">
                <a
                  class="dropdown-item"
                  href="https://twitter.com/AstarNetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Twitter</a
                >
                <a
                  class="dropdown-item"
                  href="https://discord.gg/Z3nC9U4"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Discord</a
                >
                <a
                  class="dropdown-item"
                  href="https://t.me/PlasmOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Telegram</a
                >
                <a
                  class="dropdown-item"
                  href="https://medium.com/astar-network"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Medium</a
                >
                <a
                  class="dropdown-item"
                  href="https://github.com/PlasmNetwork/plasmdocs/blob/master/wp/en.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Whitepaper</a
                >
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let open = ref<boolean>(false);

    const toggle = (): void => {
      open.value = !open.value;
    };

    return {
      open,
      toggle
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/navigation.scss';
</style>
