<template>
  <div>
    <label
      class="flex justify-center cursor-pointer my-2"
      @click="onLoadAccount"
    >
      <div class="flex items-center">
        <div class="h-8 w-8 overflow-hidden mr-3 flex-shrink-0">
          <img width="80" src="@/assets/img/ethereum.png" />
        </div>
        <div class="flex items-center">
          <template v-if="!curAddress">
            <div class="text-sm font-medium dark:text-darkGray-100">
              Connect to Metamask
            </div>
          </template>
          <template v-else>
            <div>
              <div class="text-sm font-medium dark:text-darkGray-100">
                Ethereum Extension
              </div>
              <div class="text-xs text-gray-500 dark:text-darkGray-400">
                {{ shortenAddr(ecdsaAccounts.ethereum) }}
              </div>
            </div>
          </template>
        </div>
        <div v-if="errorMsg" class="text-sm">{{ errorMsg }}</div>
      </div>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue';
import { useStore } from 'src/store';
import * as utils from './utils';
import { getShortenAddress } from './addressUtils';
import { EcdsaAddressFormat } from './CustomSignature';
import { useMetamask } from './useMetamask';

export default defineComponent({
  components: {},
  props: {
    checked: {
      type: Boolean
    }
  },
  emits: ['update:sel-checked', 'connectMetamask'],
  setup(props, { emit }) {
    const ASTAR_SS58_FORMAT = 5;
    // const store = useStore();
    // const isH160 = true;
    const { requestAccounts, requestSignature } = useMetamask();

    // const currentEcdsaAccount = computed(() => store.getters['general/currentEcdsaAccount']);
    // const ecdsaAccounts = ref<EcdsaAddressFormat>(currentEcdsaAccount.value);
    // const curAddress = ref<string>(currentEcdsaAccount.value.ss58);
    const ecdsaAccounts = ref<EcdsaAddressFormat>();
    const curAddress = ref<string>();

    // watchEffect(() => {
    //   if (isH160.value) {
    //     curAddress.value = currentEcdsaAccount.value.h160;
    //   }
    // });

    const errorMsg = ref('');

    const shortenAddr = (addr: string) => {
      return getShortenAddress(addr);
    };

    const onLoadAccount = async () => {
      if (curAddress.value) {
        return;
      }

      try {
        const accounts = await requestAccounts();
        const loadingAddr = accounts[0];
        const loginMsg = `Sign to apply the lockdrop bonus ${loadingAddr}`;

        const signature = await requestSignature(loginMsg, loadingAddr);
        console.log(signature);

        if (typeof signature !== 'string') {
          throw new Error('Failed to fetch signature');
        }

        // FIXME: keccak issue should be resolved : https://github.com/cryptocoinjs/keccak/pull/22
        const pubKey = utils.recoverPublicKeyFromSig(
          loadingAddr,
          loginMsg,
          signature
        );

        console.log(`Public key: ${pubKey}`);

        const ss58Address = utils.ecdsaPubKeyToSs58(pubKey, ASTAR_SS58_FORMAT);

        console.log(`ethereum: ${loadingAddr} / ss58: ${ss58Address}`);

        ecdsaAccounts.value = { ethereum: loadingAddr, ss58: ss58Address };
        curAddress.value = ss58Address;
        onSelectMetamask();
      } catch (err: any) {
        console.error('err', err);
        errorMsg.value = err.message;
      }
    };

    const onSelectMetamask = () => {
      emit('update:sel-checked', true);
      emit('connectMetamask', ecdsaAccounts.value?.ethereum, curAddress.value);
    };

    return {
      curAddress,
      shortenAddr,
      ecdsaAccounts,
      errorMsg,
      onLoadAccount,
      onSelectMetamask
    };
  },
  methods: {
    opClass(checked: boolean) {
      if (checked) {
        return 'text-blue-900 cursor-default select-none relative py-2 pl-3 pr-6 bg-blue-200 bg-opacity-20';
      } else {
        return 'not-checkerd';
      }
    }
  }
});
</script>

<style scoped>
.not-checkerd {
  @apply text-blue-900 cursor-default select-none relative py-2 pl-3 pr-6;
}
.not-checkerd:hover {
  @apply hover:bg-gray-50;
}
</style>
