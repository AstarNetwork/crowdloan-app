<template>
  <div class="container--faq">
    <div class="box--faq">
      <div class="row--faq-title">
        <span class="text--faq-title">FAQ</span>
      </div>
      <div>
        <Expander
          v-for="(faq, index) in faqs"
          :key="index"
          :caption="faq.question"
          ><div v-html="faq.answer"></div
        ></Expander>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Expander from './Expander.vue';

export default defineComponent({
  components: { Expander },
  props: {
    faqs: {
      type: Array,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/faq.scss';
</style>
