<template>
  <div class="status-background">
    <div class="container--status">
      <div class="column--status">
        <StatusItem
          v-for="(item, index) in statusData"
          :item="item"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineComponent, ref, inject } from 'vue';
import { StatusData } from '@/data/StatusData';
import StatusItem from './StatusItem.vue';
import { ApiPromise } from '@polkadot/api';
import BN from 'bn.js';
import type { Option } from '@polkadot/types';
import type { FundInfo, ParaId } from '@polkadot/types/interfaces';
import type { Campaign } from '@/hooks/useFunds';
import { PARA_ID, UNIT } from '@/config/shiden/crowdloan';
import { getParticipants } from '@/data/shiden/ThirdpartyApi';

export default defineComponent({
  components: {
    StatusItem
  },
  props: {
    data: {
      type: Object as () => StatusData[],
      required: true
    }
  },
  setup(props) {
    const api: any = inject('api');
    const CAMPAIGN_IDX = 0;
    const statusData = ref<StatusData[]>(props.data);

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
          // console.log('paraId', apiData.query.crowdloan);
          const paraIds: any[] = [PARA_ID];

          await apiData.query.crowdloan?.funds.multi(
            paraIds,
            (campaigns: Option<FundInfo>[]) => {
              // console.log('c', campaigns);
              const result = transformMulti([[paraIds], campaigns]);
              // console.log('result', result);
              statusData.value[1].value = result[CAMPAIGN_IDX].info.raised
                .toBn()
                .div(new BN(10 ** UNIT))
                .toNumber();
            }
          );

          // MEMO: not working on kusama rpc endpoint - participants
          // await apiData.derive.crowdloan.contributions(
          //   PARA_ID,
          //   (derive: any) => {
          //     // console.log('d', derive);
          //     statusData.value[0].value = derive.contributorsHex.length;
          //   }
          // );
          // MEMO: we use thirdparty api temporary
          statusData.value[0].value = await getParticipants();
        } else {
          setTimeout(() => {
            getData();
          }, 3000);
        }
      } catch (e) {
        console.error('e', e);
      }
    };

    getData();

    return {
      statusData
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/status.scss';
</style>
