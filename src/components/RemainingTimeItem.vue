<template>
  <div
    class="
      relative
      flex
      items-center
      justify-center
      w-40
      lg:w-48
      h-40
      lg:h-48
      m-2
    "
  >
    <div class="absolute w-40 lg:w-48 m-2">
      <svg viewBox="0 0 36 36" ref="svg"></svg>
    </div>
    <dl class="float-none flex flex-col text-white">
      <dt class="text-5xl order-1 lg:text-6xl">{{ currentValue }}</dt>
      <dt class="uppercase order-2 text-xs lg:text-sm mt-2 text-gray">
        {{ label }}
      </dt>
    </dl>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    maxValue: {
      type: Number,
      default: 0
    },
    currentValue: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const percentage = computed(
      () => (props.currentValue / props.maxValue) * 100
    );
    const svg = ref();
    const template = `
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#25BED2"></stop>
          <stop offset="20%" stop-color="#2686E9"></stop>
          <stop offset="90%" stop-color="#8B5BC5"></stop>
          <stop offset="100%" stop-color="#FF92CC"></stop>
        </linearGradient>
      </defs>
      <path
        stroke="#333A50"
        fill="none"
        strokewidth="6"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      ></path>
      <path
        class="linear-gradient"
        stroke="url(#gradient)"
        #PLACEHOLDER#
        fill="none"
        strokewidth="6"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      ></path>`;

    watch([percentage], () => {
      const newTemplate = template.replace(
        '#PLACEHOLDER#',
        `stroke-dasharray="${percentage.value}, 100"`
      );

      svg.value.innerHTML = newTemplate;
    });

    return {
      percentage,
      svg
    };
  }
});
</script>
