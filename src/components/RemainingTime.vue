<template>
  <div class="bg-dark py-20 background">
    <h2 class="title text-5xl lg:text-6xl font-black pb-4">Remaining Time</h2>
    <p class="text-danger text-xl lg:text-2xl font-bold mb-4">
      The third auction will end in:
    </p>
    <div class="flex flex-wrap justify-center">
      <RemainingTimeItem
        :currentValue="days"
        :maxValue="maxDays"
        label="Days"
      />
      <RemainingTimeItem :currentValue="hours" :maxValue="24" label="Hours" />
      <RemainingTimeItem
        :currentValue="minutes"
        :maxValue="60"
        label="Minutes"
      />
      <RemainingTimeItem
        :currentValue="seconds"
        :maxValue="60"
        label="Seconds"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import moment, { duration } from 'moment';
import RemainingTimeItem from './RemainingTimeItem.vue';

export default defineComponent({
  props: {
    startTime: {
      type: Object,
      required: true
    },
    endTime: {
      type: Object,
      required: true
    }
  },
  components: { RemainingTimeItem },
  setup(props) {
    const seconds = ref<number>(0);
    const minutes = ref<number>(0);
    const hours = ref<number>(0);
    const days = ref<number>(0);
    const maxDays = ref<number>(0);
    let interval: number;

    maxDays.value = Math.floor(
      duration(props.endTime.diff(props.startTime)).asDays()
    );

    onMounted(() => {
      interval = window.setInterval(() => {
        const now = moment.utc();
        // TODO handle if now is before or after interval
        if (now >= props.startTime && now <= props.endTime) {
          const diff = duration(props.endTime.diff(now));
          hours.value = diff.hours();
          minutes.value = diff.minutes();
          seconds.value = diff.seconds();
          days.value = Math.floor(diff.asDays());
        }
      }, 1000);
    });

    onUnmounted(() => {
      window.clearInterval(interval);
    });

    return {
      maxDays,
      days,
      hours,
      minutes,
      seconds
    };
  }
});
</script>

<style scoped>
no-webp .background {
  background-image: url('~@/assets/img/remaining-time-bg.jpg');
}

.background {
  background-image: url('~@/assets/img/remaining-time-bg.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.title {
  background: linear-gradient(
    90deg,
    #dcedff 4.44%,
    #ffe7fa 21.36%,
    #dcedff 37.78%,
    #fff 53.21%,
    #fff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
