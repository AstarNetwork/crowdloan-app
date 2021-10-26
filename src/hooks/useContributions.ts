import { ref, Ref, watch } from 'vue';
import type { ApiPromise } from '@polkadot/api';
import type { DeriveContributions } from '@polkadot/api-derive/types';
import type { ParaId } from '@polkadot/types/interfaces';

export default function useContributions(apiRef: Ref<ApiPromise>, paraId: ParaId) {

  const numContributions = ref(0);

  watch(
    () => apiRef?.value,
    async () => {
      
      const unsub = await apiRef.value.derive.crowdloan.contributions(paraId, (derive: DeriveContributions) => {
        console.log('c', derive)
      })
    }
  );

  return {
    numContributions
  };
}