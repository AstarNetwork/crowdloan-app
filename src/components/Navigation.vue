<template>
  <div class="container max-w-screen-xl mx-auto">
    <div class="flex">
      <nav class="flex justify-between flex-wrap p-6 w-full">
        <a href="/">
          <div class="flex items-center flex-no-shrink mr-6">
            <img src="@/assets/img/brand-logo-mark.png" class="w-12" />
            <img src="@/assets/img/brand-logo.svg" class="h-7 ml-3" />
          </div>
        </a>
        <div class="block sm:hidden">
          <button
            @click="toggle"
            class="
              flex
              items-center
              px-3
              py-2
              border-0
              rounded
              text-teal-lighter
              border-teal-light
              hover:text-black hover:border-transparent
            "
          >
            <svg
              class="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          :class="open ? 'block' : 'hidden'"
          class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
        >
          <div class="text-base sm:flex-grow text-right">
            <a
              href="https://docs.astar.network/learn/polkadot-plo/faq"
              target="_blank"
              class="
                no-underline
                block
                mt-4
                sm:inline-block sm:mt-0
                text-teal-lighter
                hover:underline hover:text-primary
                mr-4
              "
            >
              FAQ
            </a>
            <a
              href="https://docs.astar.network/learn/polkadot-plo/"
              target="_blank"
              class="
                no-underline
                block
                mt-4
                sm:inline-block sm:mt-0
                text-teal-lighter
                hover:underline hover:text-primary
                mr-4
              "
            >
              Documentation
            </a>
            <a
              href="https://docs.astar.network/learn/token-economics/token-allocation"
              target="_blank"
              class="
                no-underline
                block
                mt-4
                sm:inline-block sm:mt-0
                text-teal-lighter
                hover:underline hover:text-primary
                mr-4
              "
            >
              Token Economics
            </a>
            <div
              class="
                no-underline
                block
                mt-4
                sm:inline-block sm:mt-0
                text-teal-lighter
                dropdown
                hover:underline hover:text-primary
              "
            >
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
                  href="https://github.com/AstarNetwork/plasmdocs/blob/master/wp/en.pdf"
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
  name: 'Navigation',
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

<style lang="css" scoped>
.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  background-clip: padding-box;
  min-width: 160px;
  box-shadow: 0 0 3px rgba(2, 2, 2, 0.2);
  border-radius: 0.15rem;
  text-align: left;
  padding: 0.5rem 0;
  z-index: 1000;
}

.dropdown-content a {
  display: block;
  padding: 0.25rem 1rem;
  color: #001f40;
  transition: color 0.15s ease-in-out;
}

.dropdown-content a:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.dropdown {
  cursor: pointer;
}

.dropdown::after {
  background-image: url('~@/assets/img/chevron-down.svg');
  background-size: 20px 20px;
  background-position-y: 5px;
  display: inline-block;
  width: 20px;
  height: 20px;
  content: '';
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
