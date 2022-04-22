<template>
  <div class="main--shiden">
    <Header />
    <Status :data="statuses" />
    <Stake />
    <HubSpot />
    <Rules :rules="rules" />
    <Faq :faqs="faqs" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '../components/shiden/Header.vue';
import Stake from '../components/shiden/Stake.vue';
import Status from '../components/shiden/Status.vue';
import Rules from '../components/shiden/Rules.vue';
import Faq from '../components/shiden/Faq.vue';
import Footer from '../components/shiden/Footer.vue';
import HubSpot from '../components/HubSpot.vue';
import { statusItems, ruleItems, faqItems } from '../data/shiden/AppData';
import { StatusData } from '../data/StatusData';
import { RuleData } from '../data/RuleData';
import { FaqData } from '../data/FaqData';
export default defineComponent({
  components: {
    Header,
    Stake,
    Status,
    Rules,
    Faq,
    HubSpot,
    Footer
  },
  setup() {
    const statuses = ref<StatusData[]>(statusItems);
    const rules = ref<RuleData[]>(ruleItems);
    const faqs = ref<FaqData[]>(faqItems);
    return {
      statuses,
      rules,
      faqs
    };
  }
});
</script>
<style lang="scss" scoped>
@import 'src/components/shiden/styles/shiden-main.scss';
</style>
