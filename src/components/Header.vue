<template>
  <div id="hero">
    <!-- <div class="bg-orange text-white mb-4 py-2 text-xs font-bold">
      Warning: It's not live yet. Please wait until we officially start!!
    </div> -->
    <Navigation class="max-w-full mx-auto" />
    <div class="container flex items-center max-w-screen-xl mx-auto">
      <div class="ml-8 self-center text-center lg:text-left pt-10">
        <p
          class="
            mb-2
            text-2xl
            md:text-4xl md:font-bold
            lg:text-4xl lg:font-bold
          "
        >
          Astar Crowdloan Event - Support
          <ruby
            >Astar Network<rt
              class="text-xs md:text-lg font-thin md:font-normal"
              >(Previously Plasm Network)</rt
            ></ruby
          >
        </p>
        <h1
          class="
            text-5xl
            lg:text-9xl
            md:text-8xl
            font-extrabold
            md:font-black
            lg:font-black
            mb-12
            pb-6
          "
        >
          Contribute DOT <small>&amp;</small> <br />Get ASTR Today!
        </h1>
        <!-- <Button v-on:click="goToStakingArea">Contribute DOT now</Button> -->
        <button
          @click="goToStakingArea"
          class="px-12 py-3 bg-primary text-xl text-white button-gradient"
        >
          Contribute DOT now
        </button>
        <a
          href="https://medium.com/astar-network/astar-crowdloan-event-summary-a7d64629a1c1"
          target="_blank"
          class="ml-6"
          ><Button>Learn More</Button></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from './Navigation.vue';
import Button from './shared/Button.vue';

export default defineComponent({
  name: 'Header',
  components: { Navigation, Button },
  props: {},
  setup() {
    const goToStakingArea = () => {
      window.scrollTo(0, 1200);
    };

    return {
      goToStakingArea
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
no-webp #hero {
  background-image: url('~@/assets/img/hero-image.jpg');
}

#hero {
  background-image: url('~@/assets/img/hero-image.webp');
}

#hero {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

@media (orientation: landscape) {
  #hero {
    height: 100vh;
  }
}

@media (orientation: portrait) {
  #hero {
    min-height: 80vh;
  }
}

h1 {
  background: linear-gradient(
    93.07deg,
    #0f3f70 7.5%,
    #68316c 24.65%,
    #0f3f70 43.08%,
    #001f40 67.09%,
    #001f40 89.81%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-weight: 700;
}

.bg-orange {
  background: #ffa500;
}

.button-gradient {
  background: linear-gradient(
    83.83deg,
    #694ea4 0%,
    #1b6dc1 37.5%,
    #1b6dc1 65.1%,
    #2ea0c4 100%
  );
  box-shadow: 0px 2px 2px rgb(0 0 0 / 30%);
  border: 0;
  color: #fff;
  transition: all 0.15s ease-in-out;
}
</style>
