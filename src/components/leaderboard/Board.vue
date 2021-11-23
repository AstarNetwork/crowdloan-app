<template>
  <div class="flex flex-col mb-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="list-container">
          <VirtualList :data="dataSource">
            <template v-slot="{ item, index }">
              <div class="item-container">
                <div class="cell cell-index">{{index}}</div>
                <div class="cell">{{item}}</div>
              </div>
            </template>
          </VirtualList>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue';
import { VirtualList } from 'vue3-virtual-list';

export default defineComponent({
  components: {
    VirtualList
  },
  props: {},
  setup() {
    const dataSource = [];

    for (let i=0; i<100; i++) {
      dataSource.push({
        name: 'test'
      })
    }

    return {
      dataSource
    }
  }
});
</script>

<style scoped>
.list-container {
  width: 800px;
  height: 600px;
  border: 2px solid #4caf50;
  margin: 0 auto;
}
.item-container {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>
