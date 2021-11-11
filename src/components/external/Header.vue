<template>
  <div class="pt-20 pb-20 status-background">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap justify-center">
        <!-- Participants -->
        <div class="flex-col text-center mt-4 mb-4 ml-6 mr-6">
          <div class="status-item-value font-bold text-6xl lg:text-7xl">
            {{ $n(participants, 'decimal') }}
          </div>
          <div class="text-xl font-normal">Participants</div>
        </div>
        <!-- DOT Contributed -->
        <div class="flex-col text-center mt-4 mb-4 ml-6 mr-6">
          <div class="status-item-value font-bold text-6xl lg:text-7xl">
            {{ $n(dotContributed, 'decimal') }}
          </div>
          <div class="text-xl font-normal">DOT Contributed</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { ApiPromise } from '@polkadot/api';
import BN from 'bn.js';
import type { Option } from '@polkadot/types';
import type { FundInfo, ParaId } from '@polkadot/types/interfaces';
import type { Campaign } from '../../hooks/useFunds';
import { PARA_ID, UNIT } from '@/config/crowdloan';

export default defineComponent({
  components: {
  },
  setup(props) {
    const api: any = inject('api');
    const CAMPAIGN_IDX = 0;

    const participants = ref(0);
    const dotContributed = ref(0);

    const transformMulti = ([[paraIds], optFunds]: [
      [ParaId[]],
      Option<FundInfo>[]
    ]): Campaign[] =>
      paraIds
        .map((paraId, i): [ParaId, FundInfo | null] => [
          paraId,
          optFunds[i].unwrapOr(null)
        ])
        .filter((v): v is [ParaId, FundInfo] => !!v[1])
        .map(
          ([paraId, info]): Campaign => ({
            accountId: '',
            firstSlot: info.firstPeriod,
            info,
            isCrowdloan: true,
            key: paraId.toString(),
            lastSlot: info.lastPeriod,
            paraId,
            value: info.raised
          })
        )
        .sort(
          (a, b) =>
            a.info.end.cmp(b.info.end) ||
            a.info.firstPeriod.cmp(b.info.firstPeriod) ||
            a.info.lastPeriod.cmp(b.info.lastPeriod) ||
            a.paraId.cmp(b.paraId)
        );

    const getData = async () => {
      try {
        const apiData: ApiPromise = (await api).api;

        if (apiData.query.crowdloan) {
          console.log('paraId', apiData.query.crowdloan);
          const paraIds: any[] = [PARA_ID];

          const unsub = await apiData.query.crowdloan?.funds.multi(
            paraIds,
            (campaigns: Option<FundInfo>[]) => {
              console.log('c', campaigns);
              const result = transformMulti([[paraIds], campaigns]);
              console.log('result', result);
              // @assume : retrieve first crowdloan on the campaigns
              // console.log('totalRaised', result[0].info.raised.toNumber())
              dotContributed.value = result[CAMPAIGN_IDX].info.raised
                .toBn()
                .div(new BN(10 ** UNIT))
                .toNumber();
            }
          );

          const unsub2 = await apiData.derive.crowdloan.contributions(
            PARA_ID,
            (derive: any) => {
              console.log('d', derive);
              participants.value = derive.contributorsHex.length;
            }
          );
        } else {
          //FIXME: tricky way to call crowdloan query again
          setTimeout(() => {
            getData();
          }, 2000);
        }
      } catch (e) {
        console.error('e', e);
      }
    };

    getData();

    return {
      participants,
      dotContributed
    };
  }
});
</script>

<style scoped>
no-webp .status-background {
  background-image: url('~@/assets/img/holo-bg.jpg');
}

.status-background {
  background-image: url('~@/assets/img/holo-bg.webp');
}

.status-background {
  background-color: #e3e3fd;
  background-size: cover;
}

.status-item-value {
  font-family: 'Kanit', sans-serif;
  background: linear-gradient(
    90deg,
    #1b6dc1 4.46%,
    #8b5bc5 61.01%,
    #ff5cb3 118.75%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
