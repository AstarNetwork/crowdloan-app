import { ref, Ref, watch } from 'vue';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';
import type { FundInfo, ParaId } from '@polkadot/types/interfaces';

export interface WinnerData {
  accountId: string;
  firstSlot: BN;
  isCrowdloan: boolean;
  key: string;
  lastSlot: BN;
  paraId: ParaId;
  value: BN;
}

export interface Campaign extends WinnerData {
  info: FundInfo;
  isCapped?: boolean;
  isEnded?: boolean;
  isWinner?: boolean;
}

export default function useFunds (apiRef: Ref<ApiPromise>) {
  const paraId = [2000];

  const campaign = ref<Campaign>();

  watch(
    () => apiRef?.value,
    async () => {
      const unsub = await apiRef.value.query.crowdloan?.funds.multi(paraId, (campaigns) => {
        console.log('c', campaigns)
      })
    }
  );

  return {
    campaign
  };
}