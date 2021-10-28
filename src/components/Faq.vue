<template>
  <div class="pt-20 pb-40">
    <div class="max-w-3xl mx-auto px-2">
      <Title>FAQ</Title>
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
import Title from './shared/Title.vue';
import Expander from './shared/Expander.vue';

export default defineComponent({
  components: { Title, Expander },
  props: {
    faqs: {
      type: Array,
      required: true
    }
  }
});
</script>
