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
import { defineComponent, ref } from 'vue';
import { StatusData } from '../../data/StatusData';
import StatusItem from './StatusItem.vue';

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
    const statusData = ref<StatusData[]>(props.data);
    return {
      statusData
    };
  }
});
</script>

<style lang="scss" scoped>
@import 'src/components/shiden/styles/status.scss';
</style>
