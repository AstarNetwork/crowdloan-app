<template>
  <div class="overflow-x-hidden">
    <ApiProvider>
      <Navigation class="max-w-full mx-auto" />
      <ConnectAccountNew />
    </ApiProvider>

    <modal-loading v-if="isLoading" />

    <transition name="fade">
      <alert-box v-if="showAlertMsg" :msg="alertMsg" :alert-type="alertType" />
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import ApiProvider from '../config/ApiProvider.vue';
import Navigation from '../components/Navigation.vue';
import ConnectAccountNew from '../components/earlyadopter/ConnectAccountNew.vue';
import AlertBox from '../components/shared/AlertBox.vue';
import ModalLoading from '../components/shared/ModalLoading.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'EarlyAdopter',
  components: {
    ApiProvider,
    Navigation,
    ConnectAccountNew,
    AlertBox,
    ModalLoading
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
