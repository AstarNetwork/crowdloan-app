<template>
  <ApiProvider>
    <CrowdloanShiden />
  </ApiProvider>

  <modal-loading v-if="isLoading" />

  <transition name="fade">
    <alert-box v-if="showAlertMsg" :msg="alertMsg" :alert-type="alertType" />
  </transition>
</template>
<script lang="ts">
import ApiProvider from '../config/ApiProvider.vue';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import AlertBox from '../components/shared/AlertBox.vue';
import ModalLoading from '../components/shared/ModalLoading.vue';
import CrowdloanShiden from '../pages/CrowdloanShiden.vue';

export default defineComponent({
  name: 'Main',
  components: {
    CrowdloanShiden,
    ModalLoading,
    AlertBox,
    ApiProvider
  },
  created() {
    document.title = 'Shiden Network Crowdloan - Stake KSM and Get SDN Today!';
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.getters.isLoading);
    const showAlertMsg = computed(() => store.getters.showAlert.showAlertMsg);
    const alertMsg = computed(() => store.getters.showAlert.alertMsg);
    const alertType = computed(() => store.getters.showAlert.alertType);

    return {
      isLoading,
      showAlertMsg,
      alertMsg,
      alertType
    };
  }
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
