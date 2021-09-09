<template>
  <div id="hero">
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
          Support the
          <ruby
            >Astar Network<rt
              class="text-xs md:text-lg font-thin md:font-normal"
              >(Previously Plasm Network)</rt
            ></ruby
          >
          Parachain Auction
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
          Stake DOT <small>&amp;</small> <br />Get ASTA Today!
        </h1>
        <a href="#stake-dot"><Button>Stake DOT now</Button></a>
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
  props: {}
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
</style>
