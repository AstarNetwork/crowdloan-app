<template>
  <div class="font-sans">
    <Header />
    <!-- <RemainingTime :startTime="startTime" :endTime="endTime" /> -->
    <!-- <Stake /> -->
    <Status :data="statuses" />
    <Board />
    <HubSpot />
    <Rules :rules="rules" />
    <Faq :faqs="faqs" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment from 'moment';
import Header from '../components/Header.vue';
// import RemainingTime from '../components/RemainingTime.vue';
// import Stake from '../components/Stake.vue';
import Status from '../components/Status.vue';
import Rules from '../components/Rules.vue';
import Faq from '../components/Faq.vue';
import Footer from '../components/Footer.vue';
import HubSpot from '../components/HubSpot.vue';
import Board from '../components/leaderboard/Board.vue';
import { statusItems, ruleItems, faqItems } from '../data/AppData';
import { StatusData } from '../data/StatusData';
import { RuleData } from '../data/RuleData';
import { FaqData } from '../data/FaqData';
export default defineComponent({
  components: {
    Header,
    // RemainingTime,
    // Stake,
    Status,
    Rules,
    Faq,
    Footer,
    HubSpot,
    Board
  },
  setup() {
    const startTime = moment.utc([2021, 1, 1]);
    const endTime = moment.utc('2021-12-02').add(11, 'h').add(55, 'm');
    const statuses = ref<StatusData[]>(statusItems);
    const rules = ref<RuleData[]>(ruleItems);
    const faqs = ref<FaqData[]>(faqItems);
    return {
      startTime,
      endTime,
      statuses,
      rules,
      faqs
    };
  }
});
</script>
