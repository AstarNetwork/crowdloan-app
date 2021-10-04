<template>
  <div class="font-sans">
    <Header />
    <RemainingTime :startTime="startTime" :endTime="endTime" />
    <Stake />
    <Status :data="statuses" />
    <Rules :rules="rules" />
    <Faq :faqs="faqs" />
    <Footer />
  </div>

  <modal-loading v-if="isLoading" />

  <transition name="fade">
    <alert-box v-if="showAlertMsg" :msg="alertMsg" :alert-type="alertType" />
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import moment from 'moment';
import { useStore } from 'vuex';
import Header from './components/Header.vue';
import RemainingTime from './components/RemainingTime.vue';
import Stake from './components/Stake.vue';
import Status from './components/Status.vue';
import Rules from './components/Rules.vue';
import Faq from './components/Faq.vue';
import Footer from './components/Footer.vue';
import { statusItems, ruleItems, faqItems } from './data/AppData';
import { StatusData } from './data/StatusData';
import { RuleData } from './data/RuleData';
import { FaqData } from './data/FaqData';
import ModalLoading from './components/shared/ModalLoading.vue';
import AlertBox from './components/shared/AlertBox.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    RemainingTime,
    Stake,
    Status,
    Rules,
    Faq,
    Footer,
    ModalLoading,
    AlertBox
  },
  setup() {
    const startTime = moment.utc([2021, 1, 1]);
    const endTime = moment.utc([2022, 1, 1]);
    const statuses = ref<StatusData[]>(statusItems);
    const rules = ref<RuleData[]>(ruleItems);
    const faqs = ref<FaqData[]>(faqItems);

    const store = useStore();

    const isLoading = computed(() => store.getters.isLoading);
    const showAlertMsg = computed(() => store.getters.showAlert.showAlertMsg);
    const alertMsg = computed(() => store.getters.showAlert.alertMsg);
    const alertType = computed(() => store.getters.showAlert.alertType);

    return {
      startTime,
      endTime,
      statuses,
      rules,
      faqs,
      isLoading,
      showAlertMsg,
      alertMsg,
      alertType
    };
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
