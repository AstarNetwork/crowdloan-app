<template>
  <footer>
    <span class="text--footer bordertest">
      © 2022 Astar Network. All Rights Reserved.
    </span>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
footer {
  padding-top: 32px;
  padding-bottom: 32px;
  width: 100%;
  text-align: center;
  border-top: 1px solid transparent;
  border-image: linear-gradient(
      90deg,
      #1b6dc1 4.46%,
      #8b5bc5 61.01%,
      #d55cb9 97.63%,
      #ff5cb3 118.75%
    )
    1;
}

.text--footer {
  font-size: 14px;
  font-weight: 600;
}
</style>
